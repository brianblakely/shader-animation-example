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
	float compress = mix(vTextureCoord.x, vTextureCoord.x / 0.5, progress);

  vec4 color = texture2D(uSampler, vec2(
    compress,
    // compress + distortion,
    vTextureCoord.y + offset
  ));

	float noise = rand(gl_FragCoord.xy);

	float blend = mix(noise, color.b, progress);
	blend = mix(blend, 0.0, 1.0 - sign(color.a));

	gl_FragColor = vec4(color.rg*progress, blend, 1.0);
}