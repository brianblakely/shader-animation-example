precision lowp float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec2 viewport;
uniform float progress;

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
	float gradCol = gl_FragCoord.x/viewport.x;
	float gradRow = 1.0 - gl_FragCoord.y/viewport.y;
	bool display = progress > gradCol && progress > gradRow;

	float frequency = 100.0;
	float amplitude = 0.010;
	float distortion = sin(vTextureCoord.y*frequency) * amplitude;
	distortion -= distortion*progress;
	float offset = 0.25 - 0.25*progress;
	float compress = (vTextureCoord.x - 0.5)/abs(progress - 0.5)*0.5 + 0.5;;

  vec4 color = texture2D(uSampler, vec2(
    // compress + distortion,
    // vTextureCoord.y + offset
    vTextureCoord.x,
    vTextureCoord.y
  ));

  vec4 offsetColor = texture2D(uSampler, vec2(
    vTextureCoord.x + 0.1,
    vTextureCoord.y
  ));

	float noise = rand(gl_FragCoord.xy + vec2(progress, progress)) / 2.;

	float blend = mix(noise, color.b, progress);
	blend = mix(blend, 0.0, 1.0 - sign(color.a));

	if(bool(color.a) && vTextureCoord.x < cos(vTextureCoord.y*10.0) * 0.10 + (1.0 - progress)) {
    gl_FragColor = vec4(color.rgb*(1.0 - progress), 1.0);
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }

// 	if(vTextureCoord.x > 0.5 * .9) {
//     gl_FragColor = vec4(0.0, 0.0, progress, 1.0);
//   } else {
//     gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
//   }

// 	gl_FragColor = vec4(color.rg*progress, blend, 1.0);
}