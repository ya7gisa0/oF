uniform vec3      iResolution;           // viewport resolution (in pixels)
uniform float     iGlobalTime;           // shader playback time (in seconds)
uniform float     iTimeDelta;            // render time (in seconds)
uniform int       iFrame;                // shader playback frame
uniform float     iChannelTime[4];       // channel playback time (in seconds)
uniform vec3      iChannelResolution[4]; // channel resolution (in pixels)
uniform vec4      iMouse;                // mouse pixel coords. xy: current (if MLB down), zw: click

// fixed
//uniform samplerXX iChannel0..3;          // input channel. XX = 2D/Cube
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;

#define WAVES 8.0

void main(  ) {
    vec2 uv = -1.0 + 2.0 * gl_FragCoord.xy / iResolution.xy;
    
    float time = iGlobalTime * 1.0;
    
    vec3 color = vec3(0.0);
    
    for (float i=0.0; i<WAVES + 1.0; i++) {
        float freq = texture2D(iChannel0, vec2(i / WAVES, 0.0)).x * 7.0;
        
        vec2 p = vec2(uv);
        
        p.x += i * 0.04 + freq * 0.03;
        p.y += sin(p.x * 10.0 + time) * cos(p.x * 2.0) * freq * 0.2 * ((i + 1.0) / WAVES);
        float intensity = abs(0.01 / p.y) * clamp(freq, 0.35, 2.0);
        color += vec3(1.0 * intensity * (i / 5.0), 0.5 * intensity, 1.75 * intensity) * (3.0 / WAVES);
    }
    
    gl_FragColor = vec4(color, 1.0);
}