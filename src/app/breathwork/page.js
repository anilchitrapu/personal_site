'use client';

import { useEffect, useRef } from 'react';

export const metadata = {
  title: "breathwork",
  description: "4-7-8 breathing exercise, threejs, gsap"
};
import * as THREE from 'three';
import { gsap } from 'gsap';

export default function BreathworkPage() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Renderer / scene / camera
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true, 
      alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 4.5;

    // High subdivision for smooth ripples
    const geo = new THREE.SphereGeometry(1.2, 128, 64);

    // Spring physics system
    class SpringSystem {
      constructor() {
        this.springs = [];
        this.damping = 0.88;
        this.stiffness = 0.08;
      }
      
      addSpring(restValue) {
        return {
          value: restValue,
          velocity: 0,
          restValue: restValue,
          target: restValue,
          smoothTarget: restValue
        };
      }
      
      updateSpring(spring, deltaTime = 0.016) {
        spring.smoothTarget += (spring.target - spring.smoothTarget) * 0.1;
        
        const force = (spring.smoothTarget - spring.value) * this.stiffness;
        spring.velocity += force;
        spring.velocity *= this.damping;
        
        spring.velocity = Math.max(-2, Math.min(2, spring.velocity));
        
        spring.value += spring.velocity * deltaTime;
        return spring.value;
      }
    }

    const springSystem = new SpringSystem();
    const scaleSpring = springSystem.addSpring(1.0);
    const rippleSpring = springSystem.addSpring(0.05);
    const jellySpring = springSystem.addSpring(0.0);

    // Randomized rotation speeds
    const rotationSpeeds = {
      x: 0.0008 + Math.random() * 0.0004,
      y: 0.0012 + Math.random() * 0.0006,
      z: 0.0005 + Math.random() * 0.0003
    };

    // Uniforms
    const uniforms = {
      uTime: { value: 0 },
      uScale: { value: 1.0 },
      uRipple: { value: 0.05 },
      uColorShift: { value: 0.0 },
      uBreathPhase: { value: 0.0 },
      uNoiseAmp: { value: 0.08 },
      uJellyForce: { value: 0.0 },
      uCursorPos: { value: new THREE.Vector2(0, 0) },
      uCursorInfluence: { value: 0.0 },
      uFresnelPower: { value: 2.5 },
      uFresnelIntensity: { value: 0.8 }
    };

    // Shader material
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        precision highp float;
        uniform float uTime;
        uniform float uScale;
        uniform float uRipple;
        uniform float uBreathPhase;
        uniform float uNoiseAmp;
        uniform float uJellyForce;
        uniform vec2 uCursorPos;
        uniform float uCursorInfluence;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vRippleIntensity;
        varying vec3 vWorldPosition;
        varying vec3 vViewDirection;

        // 3D noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          
          i = mod289(i);
          vec4 p = permute(permute(permute(
                     i.z + vec4(0.0, i1.z, i2.z, 1.0))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                   
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        void main(){
          vec3 pos = position;
          
          pos *= uScale;
          
          vec4 worldPos = modelMatrix * vec4(pos, 1.0);
          vec2 screenPos = worldPos.xy;
          float cursorDist = length(screenPos - uCursorPos);
          float cursorEffect = exp(-cursorDist * 2.0) * uCursorInfluence;
          
          float jellyDeform = uJellyForce * cursorEffect;
          vec3 deformDir = normalize(vec3(screenPos - uCursorPos, 0.0));
          pos += deformDir * jellyDeform * 0.3;
          
          float dist = length(pos);
          float ripple1 = sin(dist * 12.0 - uTime * 2.0) * (0.02 + jellyDeform * 0.01);
          float ripple2 = sin(dist * 8.0 + uTime * 1.5) * (0.015 + jellyDeform * 0.008);
          float ripple3 = sin(dist * 16.0 - uTime * 3.0) * (0.01 + jellyDeform * 0.005);
          
          float wobbleSpeed = 1.0 + uJellyForce * 0.5;
          float noise1 = snoise(pos * 0.8 + uTime * 0.2 * wobbleSpeed) * 0.06;
          float noise2 = snoise(pos * 1.5 + uTime * 0.3 * wobbleSpeed) * 0.04;
          float noise3 = snoise(pos * 2.5 + uTime * 0.4 * wobbleSpeed) * 0.02;
          
          float jellyWobble = sin(uTime * 3.0 + dist * 5.0) * uJellyForce * 0.02;
          
          noise1 = smoothstep(-0.5, 0.5, noise1) - 0.25;
          noise2 = smoothstep(-0.3, 0.3, noise2) - 0.15;
          noise3 = smoothstep(-0.2, 0.2, noise3) - 0.1;
          
          float organicNoise = (noise1 + noise2 + noise3) * uNoiseAmp;
          float regularRipples = (ripple1 + ripple2 + ripple3) * 0.5;
          
          float totalDisplacement = regularRipples + organicNoise + jellyWobble;
          vRippleIntensity = totalDisplacement * 4.0;
          
          vec3 displaced = pos + normal * totalDisplacement;
          
          vNormal = normalize(normalMatrix * normal);
          vPosition = displaced;
          vWorldPosition = worldPos.xyz;
          vViewDirection = normalize(cameraPosition - worldPos.xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        }`,
      fragmentShader: `
        precision highp float;
        uniform float uTime;
        uniform float uColorShift;
        uniform float uBreathPhase;
        uniform float uFresnelPower;
        uniform float uFresnelIntensity;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vRippleIntensity;
        varying vec3 vWorldPosition;
        varying vec3 vViewDirection;

        void main(){
          vec3 color1 = vec3(0.4, 0.7, 1.0);
          vec3 color2 = vec3(0.7, 0.4, 1.0);
          vec3 color3 = vec3(0.4, 1.0, 0.7);
          
          float hueShift = sin(uTime * 0.3 + uColorShift) * 0.5 + 0.5;
          vec3 baseColor = mix(color1, color2, hueShift);
          baseColor = mix(baseColor, color3, sin(uTime * 0.2) * 0.3 + 0.3);
          
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewDirection);
          float fresnel = 1.0 - abs(dot(normal, viewDir));
          fresnel = pow(fresnel, uFresnelPower);
          
          vec3 fresnelColor = mix(baseColor, vec3(1.0, 0.9, 0.95), fresnel * 0.6);
          float edgeGlow = fresnel * uFresnelIntensity * 0.7;
          
          vec3 lightDir = normalize(vec3(0.5, 0.8, 1.0));
          float NdotL = dot(normal, lightDir) * 0.5 + 0.5;
          
          float breathGlow = sin(uBreathPhase * 3.14159) * 0.3 + 0.7;
          breathGlow += fresnel * 0.1;
          
          float rippleGlow = abs(vRippleIntensity) * 0.5;
          rippleGlow += fresnel * 0.15;
          
          vec3 finalColor = fresnelColor * (NdotL * 0.8 + 0.4) * breathGlow;
          finalColor += vec3(rippleGlow);
          finalColor += vec3(edgeGlow * 0.25);
          
          float alpha = 0.85 + fresnel * 0.15;
          
          gl_FragColor = vec4(finalColor, alpha);
        }`,
      transparent: true
    });

    const sphere = new THREE.Mesh(geo, mat);
    scene.add(sphere);

    // Cursor interaction
    let mouse = new THREE.Vector2();
    let smoothMouse = new THREE.Vector2();
    let isMouseDown = false;
    let targetCursorInfluence = 0.0;
    let currentCursorInfluence = 0.0;

    function updateCursor(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      smoothMouse.lerp(mouse, 0.15);
      uniforms.uCursorPos.value.set(smoothMouse.x * 1.5, smoothMouse.y * 1.5);
      
      if (isMouseDown) {
        jellySpring.target = 0.6;
        targetCursorInfluence = 0.5;
      } else {
        jellySpring.target = 0.15;
        targetCursorInfluence = 0.25;
      }
    }

    function handleMouseDown() {
      isMouseDown = true;
      jellySpring.target = 0.6;
      targetCursorInfluence = 0.5;
    }

    function handleMouseUp() {
      isMouseDown = false;
      jellySpring.target = 0.1;
      targetCursorInfluence = 0.2;
    }

    function handleTouchStart(e) {
      e.preventDefault();
      isMouseDown = true;
      updateCursor(e.touches[0]);
      jellySpring.target = 0.6;
      targetCursorInfluence = 0.5;
    }

    function handleTouchEnd(e) {
      e.preventDefault();
      isMouseDown = false;
      jellySpring.target = 0.1;
      targetCursorInfluence = 0.2;
    }

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('touchmove', (e) => {
      e.preventDefault();
      updateCursor(e.touches[0]);
    });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    // Background gradient
    function updateBackground(hue1, hue2, hue3) {
      document.body.style.background = `linear-gradient(135deg, hsl(${hue1}, 40%, 8%), hsl(${hue2}, 50%, 12%), hsl(${hue3}, 45%, 10%))`;
    }

    // Breathing cycle
    function breathingCycle() {
      const tl = gsap.timeline({ onComplete: breathingCycle });
      
      tl.to(scaleSpring, { target: 1.3, duration: 4, ease: 'sine.inOut' })
        .to(rippleSpring, { target: 0.08, duration: 4, ease: 'sine.inOut' }, 0)
        .to(uniforms.uBreathPhase, { value: 1.0, duration: 4, ease: 'none' }, 0)
        .to(uniforms.uFresnelIntensity, { value: 1.0, duration: 4, ease: 'sine.inOut' }, 0)
        .to({}, { duration: 4, onUpdate: function() {
          const progress = this.progress();
          updateBackground(220 - progress * 40, 240 - progress * 30, 260 - progress * 40);
        }}, 0)
        
        .to(scaleSpring, { target: 1.3, duration: 7 })
        .to(rippleSpring, { target: 0.08, duration: 7 }, "-=7")
        .to(uniforms.uBreathPhase, { value: 1.0, duration: 7, ease: 'none' }, "-=7")
        .to(uniforms.uFresnelIntensity, { value: 1.1, duration: 7, ease: 'sine.inOut' }, "-=7")
        .to({}, { duration: 7, onUpdate: function() {
          const progress = this.progress();
          updateBackground(180 - progress * 20, 200 + progress * 10, 220 - progress * 10);
        }}, "-=7")
        
        .to(scaleSpring, { target: 0.9, duration: 8, ease: 'sine.inOut' })
        .to(rippleSpring, { target: 0.03, duration: 8, ease: 'sine.inOut' }, "-=8")
        .to(uniforms.uBreathPhase, { value: 0.0, duration: 8, ease: 'none' }, "-=8")
        .to(uniforms.uFresnelIntensity, { value: 0.8, duration: 8, ease: 'sine.inOut' }, "-=8")
        .to({}, { duration: 8, onUpdate: function() {
          const progress = this.progress();
          updateBackground(160 + progress * 60, 210 + progress * 30, 210 + progress * 50);
        }}, "-=8");
    }

    updateBackground(220, 240, 260);
    breathingCycle();

    // Audio with tab visibility
    const audio = new Audio('/meditation-spiritual-music-330169.mp3');
    audio.loop = true;
    let audioStarted = false;

    function startAudio() {
      if (!audioStarted) {
        audio.play().catch(e => console.log('Audio play failed:', e));
        audioStarted = true;
        window.removeEventListener('click', startAudio);
        window.removeEventListener('touchstart', startAudio);
        window.removeEventListener('keydown', startAudio);
      }
    }

    function handleVisibilityChange() {
      if (audioStarted) {
        if (document.hidden) {
          audio.pause();
        } else {
          audio.play().catch(e => console.log('Audio resume failed:', e));
        }
      }
    }

    window.addEventListener('click', startAudio);
    window.addEventListener('touchstart', startAudio);
    window.addEventListener('keydown', startAudio);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Resize handler
    function handleResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', handleResize);

    // Animation loop
    function animate(t) {
      uniforms.uTime.value = t * 0.001;
      uniforms.uColorShift.value = t * 0.0001;

      const deltaTime = 0.016;
      springSystem.updateSpring(scaleSpring, deltaTime);
      springSystem.updateSpring(rippleSpring, deltaTime);
      springSystem.updateSpring(jellySpring, deltaTime);
      
      currentCursorInfluence += (targetCursorInfluence - currentCursorInfluence) * 0.08;
      
      uniforms.uScale.value = scaleSpring.value;
      uniforms.uRipple.value = rippleSpring.value;
      uniforms.uJellyForce.value = jellySpring.value;
      uniforms.uCursorInfluence.value = currentCursorInfluence;

      const jellyInfluence = 1.0 + jellySpring.value * 0.5;
      sphere.rotation.x += rotationSpeeds.x * jellyInfluence;
      sphere.rotation.y += rotationSpeeds.y * jellyInfluence;
      sphere.rotation.z += rotationSpeeds.z * jellyInfluence;
      
      const cameraOffset = jellySpring.value * 0.1;
      camera.position.x = Math.sin(t * 0.0005) * (0.2 + cameraOffset);
      camera.position.y = Math.cos(t * 0.0003) * (0.1 + cameraOffset);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    sceneRef.current = { renderer, scene, camera, audio };

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
      window.removeEventListener('keydown', startAudio);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (sceneRef.current?.audio) {
        sceneRef.current.audio.pause();
        sceneRef.current.audio.src = '';
      }
      
      if (sceneRef.current?.renderer) {
        sceneRef.current.renderer.dispose();
      }
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        html, body {
          margin: 0;
          height: 100%;
          overflow: hidden;
        }
        canvas {
          display: block;
        }
        body {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      <canvas ref={canvasRef} />
    </>
  );
}