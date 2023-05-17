import Button from "../Libs/LUI/Button.js"
import Component from "../Libs/LUI/Component.js"
import Label from "../Libs/LUI/Label.js"
import { newMinecraftStyle } from "../Styles/BackgroundStyles.js"
import ButtonStyles from "../Styles/ButtonStyles.js"
import { addDialogBehavior } from "./Behaviors.js"

export function NewOkCancelDialog(text) {
  let component = new Component()
    .setSize(11, 8)
    .setCenterAligment()
    .setDecoration(newMinecraftStyle())

  addDialogBehavior(component)
  new Button()
    .setText("Ok", 1.1, undefined, 0, 0.13)
    .setSize(3.5, 1.5)
    .setName("okButton")
    .setParentRelation("okButton")
    .attachToParent(component)
    .setBottomAligment()
    .setPosition(1, 1)
    .setDecoration(
      {
        cursor: "pointer",
        "font-family": "sofia sans",
        "image-rendering": "pixelated",
      },

      newMinecraftStyle(0.1)
    )
    .setHoverDecoration(ButtonStyles.hoverDarker1)
    .addEventListener(Component.events.mousedown, (_, target) => {
      target.getParent().dispatchEvent("OK").close()
    })
  new Button()
    .setText("Cancel", 1.1, undefined, 0, 0.13)
    .setSize(3.5, 1.5)
    .setName("cancelButton")
    .setParentRelation("cancelButton")
    .attachToParent(component)
    .setBottomAligment()
    .setRightAlignment()
    .setPosition(1, 1)
    .setDecoration(
      {
        cursor: "pointer",
        "font-family": "sofia sans",
        "image-rendering": "pixelated",
      },

      newMinecraftStyle(0.1)
    )
    .addEventListener(Component.events.mousedown, (_, target) => {
      target.getParent().dispatchEvent("CANCEL").close()
    })
    .setHoverDecoration(ButtonStyles.hoverDarker1)

  if (text)
    new Label()
      .setText(text)
      .setSize(Component.PARENT_SIZE_DETERMINER, 1)
      .attachToParent(component)
      .centerText()
      .setFontSize(2.2)
  return component
}
