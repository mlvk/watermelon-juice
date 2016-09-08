import Ember from "ember";

export default Ember.Mixin.create({
  didInsertElement() {
    this.mc = new Hammer.Manager(this.element);
    this.mc.add( new Hammer.Tap({ event: "singleTap", taps: 1, time: 1000 }) );

    if(!this.get("disabledClick")){
      if(this.get("model")) {
        this.mc.on("singleTap", () => this.attrs.onClick(this.get("model")));
      } else {
        this.mc.on("singleTap", () => this.attrs.onClick());
      }
    }

    this._super();
  },

  willDestroyElement() {
    this._super();
    this.mc.destroy();
  }
});
