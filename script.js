import { TweenMax } from 'gsap';
import PIXI from 'pixi.js';
import shader from './shader.glsl';

PIXI.utils._saidHello = true; // Suppress Pixi's console message.

const cvs = document.querySelector(`canvas`);

cvs.width = cvs.offsetWidth;
cvs.height = cvs.offsetHeight;

const {width, height} = cvs;

const renderer = new PIXI.autoDetectRenderer(
  width,
  height,
  {
    view: cvs,
    transparent: true,
    antialias: true,
    resolution: devicePixelRatio
  }
);

const startTime = (new Date()).getTime();

const filter = new PIXI.Filter(
  null,
  shader,
  {
    iResolution: {
      value: {
        x: width,
        y: height,
        z: 0
      }
    },
    iGlobalTime: {
      value: 0
    }
  }
);

const stage = new PIXI.Container();
stage.width = width;
stage.height = height;
stage.filters = [filter];
stage.filterArea = new PIXI.Rectangle(0,0,width,height);

renderer.render(stage);

const draw = ()=> {
  renderer.render(stage);

  filter.uniforms.iGlobalTime = ((new Date()).getTime() - startTime) / 1000;

  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
