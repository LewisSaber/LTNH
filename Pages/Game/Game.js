import Button from "../../src/Libs/LUI/Button.js"
import { newMinecraftStyle } from "../../src/Styles/BackgroundStyles.js"
import SaveManager from "../../src/Utilities/SaveManager.js"
import { components } from "./Component.designer.js"

window.addEventListener("load", function () {
  new SaveManager("game")

  new Button()
    .setSize(2, 2)
    .setDecoration(newMinecraftStyle(0.1))
    .attachToParent(components.mainComponent)
    .addEventListener("mousedown", () => {
      new SaveManager().clearSessionPlayerId()
      console.log(new SaveManager())
    })
})
