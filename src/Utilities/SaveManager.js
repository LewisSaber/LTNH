import Player from "../Game/Player.js"
import EventHandler from "../Libs/LUI/EventHandler.js"
import { mergeObject } from "../Libs/LUI/Utility.js"

export default class SaveManager extends EventHandler {
  constructor(page) {
    super()
    if (SaveManager.instance) return SaveManager.instance
    SaveManager.instance = this
    this.page = page
    this.sessionInformation = {
      account_id: undefined,
    }
    this.loadSessionData()
    this.loadAllPlayers()

    if (this.sessionInformation.account_id != undefined) {
      if (this.getPlayerWithId(this.sessionInformation.account_id))
        this.redirectToGame()
      else this.sessionInformation.account_id = undefined
    } else this.redirectToWelcome()

    window.addEventListener("beforeunload", () => {
      this.saveSessionData()
      let player = this.getPlayerWithId(this.sessionInformation.account_id)
      if (player) SaveManager.saveAccount(player)
    })
  }

  static sessionSavePath = "LTNH_Session_SAVE"
  static savePattern = /^save_\d{12}$/
  static gamePath = "/Pages/Game/Game.html"
  static welcomePath = "/Pages/Welcome/Welcome.html"

  redirectToGame = () => {
    if (this.page != "game") window.location.href = SaveManager.gamePath
  }
  redirectToWelcome = () => {
    if (this.page != "welcome") window.location.href = SaveManager.welcomePath
  }
  loadAllPlayers() {
    this.saves = this.getAllSaveFiles()
    this.players = this.getAllPlayers()
  }

  getPlayers() {
    return this.players
  }

  getAllPlayers() {
    let players = []
    for (let file of this.saves) {
      players.push(Player.load(JSON.parse(localStorage.getItem(file))))
    }
    return players
  }
  clearSessionPlayerId() {
    let player = this.getPlayerWithId(this.sessionInformation.account_id)
    if (player) SaveManager.saveAccount(player)
    this.sessionInformation.account_id = undefined
    this.saveSessionData()
  }

  loadSessionData() {
    let sessionData = localStorage.getItem(SaveManager.sessionSavePath)
    if (sessionData != null) {
      sessionData = JSON.parse(sessionData)
      this.sessionInformation = mergeObject(
        this.sessionInformation,
        sessionData
      )
    }
  }
  getPlayerWithId(id) {
    for (let player of this.players) {
      if (player.id == id) return player
    }
    return undefined
  }

  saveSessionData() {
    localStorage.setItem(
      SaveManager.sessionSavePath,
      JSON.stringify(this.sessionInformation)
    )
  }

  getAllSaveFiles() {
    let saves = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (SaveManager.savePattern.test(key)) {
        saves.push(key)
      }
    }
    return saves
  }

  static generateUniqueId() {
    const timestamp = new Date().getTime().toString()
    return `${timestamp}`.substring(0, 12)
  }

  createNewAccount(data) {
    let identificator = SaveManager.generateUniqueId()
    let newPlayer = new Player(data.nickName, identificator)
    SaveManager.saveAccount(newPlayer)
    this.switchToAccount(newPlayer)
  }

  switchToAccount(account) {
    this.sessionInformation.account_id = account.id
    this.saveSessionData()
  }

  static saveAccount(account) {
    localStorage.setItem("save_" + account.id, JSON.stringify(account.save()))
  }

  addInfoToPlayer(player, information, save = true) {
    for (const key in information) {
      player.addStat(key, information[key])
    }
    if (save) {
      SaveManager.saveAccount(player)
    }
  }
  deleteAccount(account) {
    localStorage.removeItem("save_" + account.id)
    this.dispatchEvent("deletedAccount", { id: account.id })
  }
}
