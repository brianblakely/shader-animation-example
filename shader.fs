precision lowp float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec2 viewport;
uniform float progress;

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
	float noise = rand(gl_FragCoord.xy + vec2(progress, progress)) / 2.0;

	float cutoff = cos(vTextureCoord.y*10.0) * 0.10 + (0.9 - progress);

  vec4 color = texture2D(uSampler, vec2(
    vTextureCoord.x,
    vTextureCoord.y
  ));

  vec4 fgColor = texture2D(uSampler, vec2(
    vTextureCoord.x - cutoff,
    vTextureCoord.y
  ));

  vec4 bgColor = vec4(0.0, 0.0, 0.0, 1.0);

  vec3 blend = mix(color.rgb, bgColor.rgb, 1.0 - sign(fgColor.a));

  // gl_FragColor = vec4(blend, 1.0);

  if(vTextureCoord.x > cutoff) {
    gl_FragColor = vec4(blend, 1.0);
  } else {
    gl_FragColor = fgColor;
  }
}