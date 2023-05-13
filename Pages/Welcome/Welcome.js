import MainComponent from "../../src/Libs/LUI/MainComponent.js"
import { functionMerger, loadUtility } from "../../src/Libs/LUI/Utility.js"
import BackGround from "../../src/Libs/LUI/Background.js"
import Component from "../../src/Libs/LUI/Component.js"
import Button from "../../src/Libs/LUI/Button.js"
import BackgroundStyles, {
  newMinecraftStyle,
} from "../../src/Styles/BackgroundStyles.js"
import ButtonStyles from "../../src/Styles/ButtonStyles.js"
import SaveManager from "../../src/Utilities/SaveManager.js"
import Label from "../../src/Libs/LUI/Label.js"
import Form from "../../src/Libs/LUI/Form.js"
import { AnimatedInput1 } from "../../src/Components/InputComponents.js"
import { NewOkCancelDialog } from "../../src/Components/DialogComponents.js"

window.addEventListener("load", function () {
  loadUtility()
  let components = createComponents()
  window.components = components

  let saveManager = new SaveManager()
  saveManager.loadAllPlayers()
  createSaveManagerComponent(
    saveManager,
    components.saveListComponent,
    components.saveCreatorComponent,
    components.saveEditorComponent
  )
  this.window.saveManager = saveManager
  saveManager.getAllSaveFiles()
})

function createComponents() {
  let components = {}
  components.mainComponent = new MainComponent(20)
  components.playbutton = new Button()
    .setZLayer(1)
    .setSize(4, 4)
    .addComponent(
      new BackGround()
        .setSize("80%", "80%")
        .setName("Background")
        .setCenterAligment()
        .setImg("../../Assets/ButtonIcons/play.png")
        .setDecoration(() => ({
          "image-rendering": "pixelated",
        }))
    )
    .setDecoration(
      functionMerger(newMinecraftStyle(0.24), () => ({ cursor: "pointer" }))
    )
    .setHoverDecoration(ButtonStyles.hoverDarker1)
    .setCenterAligment()
    .addEventListener("mousedown", (evt, target) => {
      target.addCSSClass("spin")
    })
    .addEventListener("animationend", (_, target) => {
      target.removeCSSClass("spin")
      components.saveManagerComponent.open()
    })
    .attachToParent(components.mainComponent, "main")

  new BackGround()
    .setImg("../../Assets/Backgrounds/NightSky.jpg")
    .setSizeEqualToParent()
    //.setDecoration(() => ({ filter: "blur(3px)" }))
    .attachToParent(components.mainComponent)

  components.saveManagerComponent = new Component()
    .setDecoration(newMinecraftStyle())
    .setSize(14, "75%")
    .setCenterAligment()
    .attachToParent(components.mainComponent, "main")

  components.saveListComponent = new Component()
    .setName("savelist")
    .setSizeEqualToParent()
    .attachToParent(components.saveManagerComponent, "main")
    .setDecoration(() => ({
      "overflow-y": "auto",
    }))

  components.saveCreatorComponent = new Component()
    .setName("saveCreator")
    .setSizeEqualToParent()
    .attachToParent(components.saveManagerComponent, "main")

  components.saveEditorComponent = new Component()
    .setName("saveEditor")
    .setSizeEqualToParent()
    .attachToParent(components.saveManagerComponent, "main")

  return components
}

function createSaveManagerComponent(
  saveManager,
  saveListComponent,
  saveCreatorComponent,
  saveEditorComponent
) {
  let baseItemDecoration = functionMerger(
    () => ({
      "font-family": "sofia sans",
    }),
    newMinecraftStyle(0.19)
  )
  let buttonDecoration = functionMerger(
    () => ({
      cursor: "pointer",
      "font-family": "sofia sans",
      "image-rendering": "pixelated",
    }),
    newMinecraftStyle(0.1)
  )
  let baseItem = new Component()
    .setSize("90%", 3)
    .setName("Pensive")
    .setFloat("left")
    .setMargin(0.4, 0.7, "5%", "5%")
    .setDecoration(baseItemDecoration)

  for (let player of saveManager.getPlayers()) {
    let label = new Label()
      .setText(player.getNickName())
      .setSize("70%", 1.2)
      .centerText(false)
      .setPosition(2, 0.8)
      .setPointerEvents(false)
      .setFontSize(1.2)
    player.addEventListener("nickChange", ({ to }) => {
      label.setText(to)
    })

    let component = baseItem
      .copy()
      .addComponent(label)
      .addComponent(
        new Button()
          .setSize(1.6, 1.6)
          .setCenterAligment(false, true)
          .setRightAlignment()
          .setPosition(1, 0)
          .setDecoration(buttonDecoration)
          .setHoverDecoration(ButtonStyles.hoverDarker1)
          .setIcon("../../Assets/ButtonIcons/play.png")
          .addEventListener("mousedown", () => {
            // saveCreatorComponent.open()
          })
      )
      .addComponent(
        new Button()
          .setSize(0.86, 0.86)
          .setPosition(0.3, 0.3)
          .setDecoration(buttonDecoration)
          .setHoverDecoration(ButtonStyles.hoverDarker1)
          .setIcon("../../Assets/ButtonIcons/edit.png")
          .addEventListener("mousedown", () => {
            saveEditorComponent.open({ player })
          })
      )
      .attachToParent(saveListComponent)
    saveManager.addEventListener("deletedAccount", (evt) => {
      if (evt.id == player.id) {
        component.setParent()
      }
    })
  }

  let newSaveItem = baseItem
    .copy()
    .addComponent(
      new Label()
        .setText("Create New Save")
        .setSize("70%", 1.2)
        .setPosition(0, 0.8)
        .setPointerEvents(false)
        .setFontSize(1.2)
    )
    .addComponent(
      new Button()
        .setSize(1.6, 1.6)
        .setCenterAligment(false, true)
        .setRightAlignment()
        .setPosition(1, 0)
        .setDecoration(buttonDecoration)
        .setHoverDecoration(ButtonStyles.hoverDarker1)
        .setIcon("../../Assets/ButtonIcons/plus.png")
        .addEventListener("mousedown", () => {
          saveCreatorComponent.open()
        })
    )

  saveListComponent.addComponent(newSaveItem)
  createSaveCreatorComponent(
    saveListComponent,
    saveCreatorComponent,
    saveManager
  )
  createSaveEditorComponent(saveListComponent, saveEditorComponent, saveManager)
}

function createSaveEditorComponent(
  saveListComponent,
  saveEditorComponent,
  saveManager
) {
  let form = new Form()
    .setSize("70%", 10)
    .setPosition("15%", 2)
    .setName("formEdit")
  let decoration = () => ({
    "font-family": "sofia sans",
  })

  let nickInput = AnimatedInput1.copy()
  nickInput.setPosition(0, 3)
  nickInput.input.setName("nickName").setPlaceHolder("Nickname")
  new Label()
    .setText("Edit Save")
    .setSize("100%", 1.2)
    .setPosition(0, 0.4)
    .setPointerEvents(false)
    .setFontSize(1.2)
    .setDecoration(decoration)
    .attachToParent(saveEditorComponent)
  form.addComponent(nickInput)
  form.addInput(nickInput.input, false, "none", true)

  let save = new Button()
    .setText("Save Changes", 0.95)
    .setSize("80%", 1.1)
    .setPosition("10%", 6)
    .setDecoration(
      functionMerger(
        () => ({
          "vertical-align": "middle",
          "font-family": "sofia sans",
          cursor: "pointer",
        }),
        newMinecraftStyle(0.11)
      )
    )
    .setHoverDecoration(ButtonStyles.hoverDarker1)
    .attachToParent(form)
    .addEventListener("mousedown", (_, target) => {
      let data = form.getData()
      if (data) {
        saveManager.addInfoToPlayer(target.player, data)
      }
    })
  let cancelButton = new Button()
    .setText("Cancel", 0.8, "Red")
    .setSize(3, 1)
    .setDecoration(
      {
        "vertical-align": "middle",
        "font-family": "sofia sans",
        cursor: "pointer",
      },
      newMinecraftStyle(0.11)
    )
    .setBottomAligment()
    .setCenterAligment(true, false)
    .setPosition(0, 1)
    .setHoverDecoration(ButtonStyles.hoverDarker1)
    .addEventListener("mousedown", () => {
      saveListComponent.open()
    })
    .attachToParent(saveEditorComponent)

  let delete_button = new Button()

    .setSize(1, 1)
    .setDecoration(
      {
        "vertical-align": "middle",
        "font-family": "sofia sans",
        cursor: "pointer",
      },
      newMinecraftStyle(0.11)
    )
    .setBottomAligment()
    .setPosition(0.6, 1)
    .setIcon("../../Assets/ButtonIcons/delete.png")
    .setHoverDecoration(ButtonStyles.hoverDarker1)
    .addEventListener("mousedown", (_, target) => {
      target.options.informational.dialog.open()
    })
    .attachToParent(saveEditorComponent)

  let delete_dialog = new NewOkCancelDialog().addComponent(
    new Label()
      .setSize("80%")
      .setText("Are you sure you want to delete this save?")
      .setColor("red")
      .setFontSize(1.1)
      .centerText()
      .setCenterAligment(true, false)
      .setPosition(0, 0.4)
      .setDecoration({ "font-family": "sofia sans" })
  )
  delete_button.options.informational.dialog = delete_dialog
  delete_dialog.addEventListener("OK", (_, target) => {
    saveManager.deleteAccount(target.player)
    saveListComponent.open()
  })

  saveEditorComponent.addEventListener("open", ({ player }) => {
    form.fill({ nickName: player.getNickName() })
    save.player = player
    delete_dialog.player = player
  })
  saveEditorComponent.addEventListener("close", () => {
    form.fill({})
    delete save.player
    delete delete_dialog.player
  })
  saveEditorComponent.addComponent(form)
}

function createSaveCreatorComponent(
  saveListComponent,
  saveCreatorComponent,
  saveManager
) {
  let form = new Form()
    .setSize("70%", 10)
    .setPosition("15%", 2)
    .setName("formAccount")
  let decoration = () => ({
    "font-family": "sofia sans",
  })
  let nickInput = AnimatedInput1.copy()
  nickInput.setPosition(0, 3)
  nickInput.input.setName("nickName").setPlaceHolder("Nickname")
  new Label()
    .setText("Create New Save")
    .setSize("100%", 1.2)
    .setPosition(0, 0.4)
    .setPointerEvents(false)
    .setFontSize(1.2)
    .setDecoration(decoration)
    .attachToParent(saveCreatorComponent)
  form.addComponent(nickInput)
  form.addInput(nickInput.input, false, "none", true)

  let hopIn = new Button()
    .setText("Hop In", 0.95)
    .setSize("80%", 1.1)
    .setPosition("10%", 6)
    .setDecoration(
      functionMerger(
        () => ({
          "vertical-align": "middle",
          "font-family": "sofia sans",
          cursor: "pointer",
        }),
        newMinecraftStyle(0.11)
      )
    )
    .setHoverDecoration(ButtonStyles.hoverDarker1)
    .attachToParent(form)
    .addEventListener("mousedown", (_, target) => {
      let data = target.getParentByName("formAccount").getData()
      if (data) {
        saveManager.createNewAccount(data)
      }
    })
  let cancelButton = new Button()
    .setText("Cancel", 0.8, "Red")
    .setSize(3, 1)
    .setDecoration(
      functionMerger(
        () => ({
          "vertical-align": "middle",
          "font-family": "sofia sans",
          cursor: "pointer",
        }),
        newMinecraftStyle(0.11)
      )
    )
    .setBottomAligment()
    .setCenterAligment(true, false)
    .setPosition(0, 1)
    .setHoverDecoration(ButtonStyles.hoverDarker1)
    .addEventListener("mousedown", () => {
      saveListComponent.open()
    })
    .attachToParent(saveCreatorComponent)
  saveCreatorComponent.addComponent(form)
}
