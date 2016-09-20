import { TweenMax } from 'gsap';
import PIXI from 'pixi.js';
import fShader from './shader.fs';

PIXI.utils._saidHello = true; // Suppress Pixi's console message.

const cvs = document.querySelector(`canvas`);

cvs.width = cvs.offsetWidth;
cvs.height = cvs.offsetHeight;

const {width, height} = cvs;

const dpi = window.devicePixelRatio;

const renderer = new PIXI.autoDetectRenderer(
  width,
  height,
  {
    view: cvs,
    transparent: true,
    antialias: true,
    resolution: dpi
  }
);

const viewport = [width*dpi, height*dpi];

function filter(options = {}) {
  PIXI.Filter.call(this, null, fShader);

  Object.assign(this.uniforms, {
    viewport,
    mappedMatrix: new PIXI.Matrix()
  });
}

filter.prototype = Object.create(PIXI.Filter.prototype);

filter.prototype.constructor = filter;

Object.defineProperties(
  filter.prototype, {
    progress: {
      get() {
        return this.uniforms.progress;
      },
      set(value) {
        this.uniforms.progress = value;
      }
    }
  }
);

filter.prototype.apply = function(filterManager, input, output) {
  filterManager.calculateNormalizedScreenSpaceMatrix(this.uniforms.mappedMatrix);

  filterManager.applyFilter(this, input, output);
};

const myFilter = new filter();

const stage = new PIXI.Container();
stage.filters = [myFilter];
stage.filterArea = new PIXI.Rectangle(0,0,width,height);

const figure = new PIXI.Sprite.fromImage(`mm.png`);

figure.texture.baseTexture.on(`loaded`, ()=> {
  const figRatio = figure.width / figure.height,
        viewRatio = width / height;

  if(viewRatio <= 1) {
    figure.width = width/2;
    figure.height = figure.width * 1/figRatio;
  } else {
    figure.height = height/2;
    figure.width = figure.height * figRatio;
  }
});
figure.anchor.set(0.5, 1.0);
figure.x = width/2;
figure.y = height * 0.9;

stage.addChild(figure);

const draw = ()=> renderer.render(stage);

requestAnimationFrame(draw);

TweenMax.to(myFilter, 5, {progress: 1, onUpdate: draw, repeat: -1, yoyo: true });
