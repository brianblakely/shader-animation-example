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

const filter = new PIXI.Filter(
  null,
  fShader
);

const viewport = [width*dpi, height*dpi];

Object.assign(filter.uniforms, {
  viewport
});

const stage = new PIXI.Container();
stage.filters = [filter];
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

TweenMax.to(filter.uniforms, 2, {progress: 1, onUpdate: draw, repeat: -1, yoyo: true });
