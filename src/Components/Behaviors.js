import Component from "../Libs/LUI/Component.js"
import MainComponent from "../Libs/LUI/MainComponent.js"

/**
 *
 * @param {Component} component
 */
export function addDialogBehavior(component) {
  if (!component.isBuilt) component.build()
  component.setZLayer(Component.ZLAYERS.DIALOG)
  component.addEventListener(Component.events.open, (_, target) => {
    if (!target.hasParent()) {
      target.attachToParent(new MainComponent())
    }
  })
  component.addEventListener(Component.events.close, (_, target) => {
    target.detachFromParent()
  })
}
