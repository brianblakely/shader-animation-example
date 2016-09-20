precision lowp float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform mat3 mappedMatrix;

uniform vec2 viewport;
uniform float progress;

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  vec3 mapCoord = vec3(vTextureCoord, 1.0) * mappedMatrix;

	float noise = rand(gl_FragCoord.xy + vec2(progress, progress)) / 2.0;

	float cutoff = cos(mapCoord.y*10.0) * 0.10 + (0.9 - progress);
	float inv = 1.0 - cutoff;

  vec4 color = texture2D(uSampler, vec2(
    mapCoord.x,
    mapCoord.y
  ));

  vec4 offColor = texture2D(uSampler, vec2(
    // 0.4 curr
    // 0.4 cutoff
    // 0.6 inv
    // 0.5 orig
    cutoff + (inv - cutoff)/2.,
    mapCoord.y
  ));

  vec4 bgColor = vec4(0.0, 0.0, 0.0, 1.0);

  vec3 blend = mix(color.rgb, bgColor.rgb, 1.0 - sign(color.a));

  // gl_FragColor = vec4(blend, 1.0);

  if(mapCoord.x > cutoff) {
    gl_FragColor = vec4(bgColor.rg, 0.,1.);
  }
  else if(mapCoord.x + (inv - cutoff)/2. >= cutoff) {
    gl_FragColor = vec4(mix(offColor.rgb, bgColor.rgb, 1.0 - sign(offColor.a)), 1.);
  }
  else {
    gl_FragColor = vec4(blend, 1.);
  }
}