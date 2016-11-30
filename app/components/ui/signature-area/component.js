import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['relative'],

  didInsertElement() {
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderHandler);

    this.resizeSubcription = Rx.Observable.fromEvent(window, 'resize')
      .throttle(250)
      .subscribe(() => this.prepareCanvas());
  },

  didReceiveAttrs(data) {
    if(this.get("signature") !== data.newAttrs.signature.value) {
      this.prepareCanvas();
    }
  },

  willDestroyElement() {
    this.resizeSubcription.dispose();
    if(Ember.isPresent(this.signaturePad)){
      this.signaturePad.off();
    }
  },

  clearCanvas() {
    if(Ember.isPresent(this.$canvas)) {
      const ratio =  Math.max(window.devicePixelRatio || 1, 1);
      this.$canvas.width = this.$canvas.offsetWidth * ratio;
      this.$canvas.height = this.$canvas.offsetHeight * ratio;
      this.$canvas.getContext("2d").scale(ratio, ratio);
    }
  },

  drawSignature() {
    if(Ember.isPresent(this.get("signature")) && Ember.isPresent(this.signaturePad)){
      this.signaturePad.fromDataURL(this.get("signature"));
    }
  },

  prepareCanvas() {
    this.clearCanvas();
    this.drawSignature();
  },

  afterRenderHandler : function(){
    this.$canvas = this.$('canvas')[0];
    this.signaturePad = new SignaturePad(this.$canvas, {onEnd: ::this.onEndHandler});
    this.prepareCanvas();
	},

  onEndHandler() {
    this.get("drawingEnded")(this.signaturePad.toDataURL());
  },

  actions: {
    clearSignature() {
      this.set("signature", undefined);
      this.clearCanvas();
    }
  }
});
