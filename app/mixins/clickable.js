import Mixin from '@ember/object/mixin';

export default Mixin.create({
  click() {
    if(!this.get("disabledClick")){
      if(this.get("model")) {
        this.get("onClick")(this.get("model"));
      } else {
        this.get("onClick")();
      }
    }
  }
});
