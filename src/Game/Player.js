import EventHandler from "../Libs/LUI/EventHandler.js"
import ObjectHelper from "../Libs/LUI/Helpers/ObjectHelper.js"

export default class Player extends EventHandler {
  static events = {
    nickChange: "nickChange",
  }
  constructor(nickName, id) {
    super()
    this.nickName = nickName
    this.id = id
  }

  addStat(statName, value) {
    switch (statName) {
      case "nickName":
        this.setNickName(value)
        break
      case "id":
        break

      default:
        if (this[statName] != undefined)
          if (this[statName] instanceof Object) {
            this[statName] = ObjectHelper.merge(this[statName], value)
          } else {
            this[statName] = value
          }
        else this[statName] = value
        break
    }
  }

  static load(player_json) {
    let player = new Player(player_json.nickName, player_json.id)
    return player
  }
  setNickName(nick) {
    this.dispatchEvent(Player.events.nickChange, {
      from: this.nickName,
      to: nick,
    })
    this.nickName = nick
  }

  getNickName() {
    return this.nickName
  }

  static toSave = ["nickName", "id"]
  save() {
    let save = {}
    for (const saving of Player.toSave) {
      if (this[saving])
        if (this[saving].save) save[saving] = this[saving].save()
        else if (this[saving] instanceof Object) {
          save[saving] = copyObject(this[saving])
        } else save[saving] = this[saving]
    }

    return save
  }
}
