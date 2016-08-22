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
    resolution: window.devicePixelRatio
  }
);

const filter = new PIXI.Filter(
  null,
  shader
);

filter.uniforms.resolution = [width*window.devicePixelRatio, height*window.devicePixelRatio];
filter.uniforms.maxTime = 50;

const stage = new PIXI.Container();
stage.width = width;
stage.height = height;
stage.filters = [filter];
stage.filterArea = new PIXI.Rectangle(0,0,width,height);

renderer.render(stage);

const draw = ()=> {
  renderer.render(stage);

  if(filter.uniforms.time >= filter.uniforms.maxTime) {
    filter.uniforms.time = -0.1;
  }
  filter.uniforms.time += 0.1;

  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
