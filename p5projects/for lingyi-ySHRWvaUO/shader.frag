// Set the precision
precision highp float;

uniform vec2 mouse;
uniform sampler2D tex;

varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord;
  // Flip the texture coords
  uv.y = 1.0 - uv.y;

  // Get the color of the current pixel
  vec4 originalColor = texture2D(tex, uv);

  // Check if the pixel is not white
  if (originalColor.rgb != vec3(1.0)) {
    // Calculate the distance from the current fragment to the mouse position
    float distanceToMouse = distance(uv, mouse);

    // Check if the distance is within the specified radius
    if (distanceToMouse < 0.1) { // 0.1 is equivalent to 100 in normalized coordinates
      // Apply pixelation effect only within the circular region
      vec2 steps = vec2(200.0, 200.0) * mouse;
      vec2 pixelUv = floor(uv * steps) / steps;
      vec4 color = texture2D(tex, pixelUv);
      gl_FragColor = color;
    } else {
      // Keep the original color outside the circular region
      gl_FragColor = originalColor;
    }
  } else {
    // Keep the original color if it's white
    gl_FragColor = originalColor;
  }
}
