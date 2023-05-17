import Component from "../Libs/LUI/Component.js"
import Form from "../Libs/LUI/Form.js"
import Input from "../Libs/LUI/Input.js"
import Label from "../Libs/LUI/Label.js"

export let AnimatedInput1 = new Component()
  .setSize(7, 1)
  .setCenterAligment(true, false)

new Input()
  .setSize("100%", "100%")
  .setFontSize(0.8)
  .setDecoration(() => ({
    background: "none",
    "font-family": "sofia sans",
    "border-bottom": "1.4px solid black",
  }))
  .addEventListener(Input.events.input, (_, target) => {
    if (target.getValue(false) == "") {
      let label = target.parent.label
      if (label.cur_location == "up" || label.cur_location == undefined) {
        label
          .addCSSClass("input-label-move-down")
          .removeCSSClass("input-label-move-up")
        label.cur_location = "down"
      }
    } else {
      let label = target.parent.label
      if (label.cur_location == "down" || label.cur_location == undefined) {
        label
          .show()
          .addCSSClass("input-label-move-up")
          .removeCSSClass("input-label-move-down")
        label.cur_location = "up"
      }
    }
  })

  .addEventListener(Form.events.emptyRequirement, (_, target) => {
    target.addCSSClass("horizontal-shaking")
  })
  .addEventListener(Component.events.animationend, (_, target) => {
    target.removeCSSClass("horizontal-shaking")
  })
  .setParentRelation("input")
  .addEventListener(Input.events.placeholderChange, (evt, target) => {
    target.parent.label.setText(evt.text)
  })
  .attachToParent(AnimatedInput1)
new Label()
  .setParentRelation("label")
  .setSize("100%", "120%")
  .setPosition(0, -1)
  .setPointerEvents(false)
  .setFontSize(0.8)
  .centerText(false)
  .setDecoration((size, position) => ({
    "--size-y": `${size.y}px`,
    "--pos-top": `${position.y}px`,
    "font-family": "sofia sans",
  }))
  .addEventListener(Component.events.animationend, (evt, target) => {
    if (evt.animationName == "move-down") {
      target.removeCSSClass("input-label-move-down")
      target.hide()
    } else target.removeCSSClass("input-label-move-up")
  })
  .attachToParent(AnimatedInput1, undefined, false)
