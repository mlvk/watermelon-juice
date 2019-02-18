import { isPresent } from '@ember/utils';
import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';

export default Component.extend({
  classNames: ['relative'],

  didInsertElement() {
    scheduleOnce('afterRender', this, this.afterRenderHandler);

    this.resizeSubcription = Rx.Observable.fromEvent(window, 'resize')
      .throttle(250)
      .subscribe(() => this.prepareCanvas());
  },

  didReceiveAttrs() {
    let oldSignature = this.get('_previousSignature');
    let newSignature = this.get('signature');

    if(oldSignature && oldSignature !== newSignature) {
      this.prepareCanvas();
    }

    this.set('_previousSignature', newSignature);
  },

  willDestroyElement() {
    this.resizeSubcription.dispose();
    if(isPresent(this.signaturePad)){
      this.signaturePad.off();
    }
  },

  clearCanvas() {
    if(isPresent(this.$canvas)) {
      const ratio =  Math.max(window.devicePixelRatio || 1, 1);
      this.$canvas.width = this.$canvas.offsetWidth * ratio;
      this.$canvas.height = this.$canvas.offsetHeight * ratio;
      this.$canvas.getContext("2d").scale(ratio, ratio);
    }
  },

  drawSignature() {
    if(isPresent(this.get("signature")) && isPresent(this.signaturePad)){
      this.signaturePad.fromDataURL(this.get("signature"));
    }
  },

  prepareCanvas() {
    this.clearCanvas();
    this.drawSignature();
  },

  afterRenderHandler : function(){
    this.$canvas = this.$('canvas')[0];
    this.signaturePad = new SignaturePad(this.$canvas, {onEnd: this.onEndHandler.bind(this)});
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
