precision lowp float;

uniform vec2 resolution;
uniform float time;
uniform float maxTime;

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
	float gradCol = gl_FragCoord.x/resolution.x;
	float progress = time/maxTime;
	bool display = progress > gradCol;

	float col = rand(gl_FragCoord.xy);

	gl_FragColor = vec4(0.0, 0.0, display ? col : 0.0, 1.0);
}