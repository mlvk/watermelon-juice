import Component from '@ember/component';
import { notEmpty } from '@ember/object/computed';
import { buildStyles } from "watermelon-juice/utils/styles";
import colors from "watermelon-juice/constants/colors";
import Clickable from "watermelon-juice/mixins/clickable";
import { computed } from '@ember/object';

export default Component.extend(Clickable, {
  tagName: "a",

  classNames: ["row"],
  classNameBindings: ["disabled", "flat:flat:card-1"],
  attributeBindings:["componentStyles:style", "href", "type"],

  hasLabel: notEmpty("label"),

  componentStyles: computed("size", "padding", "color", "backgroundColor", "borderRadius", function(){
    const size = this.get("size") || "1";
    let padding = this.get("padding");
    const color = this.get("color") || "white";
    const backgroundColor = this.get("backgroundColor") || colors.SKY_BLUE;
    const borderRadius = this.get("borderRadius") || 0;

    padding = padding === undefined? size: padding;
    return buildStyles({
      "padding": `${padding}em`,
      "font-size": `${size/2}em`,
      "border-radius": `${borderRadius}px`,
      "color": color,
      "background-color": backgroundColor
    });
  })
});
