// Set the precision
precision highp float;

uniform vec2 mouse;
uniform sampler2D tex;

varying vec2 vTexCoord;

void main() {
  
  vec2 uv = vTexCoord;
  // Flip the texture coords
  uv.y = 1.0 - uv.y;
  
  vec2 steps = vec2(200.0, 200.0) * mouse;
  
  vec2 pixelUv = floor( uv * steps ) / steps;
  
  vec4 color = texture2D(tex, pixelUv);
  
  gl_FragColor = color;
} 