import Button from "../../src/Libs/LUI/Button.js"
import MainComponent from "../../src/Libs/LUI/MainComponent.js"
import { loadUtility } from "../../src/Libs/LUI/Utility.js"
import { newMinecraftStyle } from "../../src/Styles/BackgroundStyles.js"
import SaveManager from "../../src/Utilities/SaveManager.js"

window.addEventListener("load", function () {
  new SaveManager("game")
  loadUtility()

  let components = {}
  components.mainComponent = new MainComponent(20)
  new Button()
    .setSize(2, 2)
    .setDecoration(newMinecraftStyle(0.1))
    .attachToParent(components.mainComponent)
    .addEventListener("mousedown", () => {
      new SaveManager().clearSessionPlayerId()
      console.log(new SaveManager())
    })
})
