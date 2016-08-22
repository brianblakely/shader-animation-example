precision lowp float;

uniform vec2 viewport;
uniform float time;
uniform float maxTime;

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
	float gradCol = gl_FragCoord.x/viewport.x;
	float gradRow = 1.0 - gl_FragCoord.y/viewport.y;
	float progress = time/maxTime;
	bool display = progress > gradCol && progress > gradRow;

	float noise = rand(gl_FragCoord.xy);

	gl_FragColor = vec4(0.0, 0.0, display ? noise : 0.0, 1.0);
}