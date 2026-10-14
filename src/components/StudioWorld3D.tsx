import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface StudioWorld3DProps {
  activeProjectIndex?: number;
}

export const StudioWorld3D: React.FC<StudioWorld3DProps> = ({ activeProjectIndex = 0 }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const activeProjectRef = useRef(activeProjectIndex);

  useEffect(() => {
    activeProjectRef.current = activeProjectIndex;
  }, [activeProjectIndex]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // SCENE & FOG (Clean studio on hero, obsidian atmosphere on scroll)
    const scene = new THREE.Scene();
    scene.fog = null;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);

    // RENDERER
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: 'high-performance',
      });
    } catch {
      console.warn('WebGL initialization fallback');
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // 1. CINEMATIC STUDIO LIGHTING (Charcoal & Warm Studio Rim)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Key Light (Clean Warm White Studio Light)
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    keyLight.position.set(8, 12, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Rim Light (Warm Peach/Amber Edge Rim for Avatar Silhouette)
    const rimLight = new THREE.DirectionalLight(0xfed7aa, 2.8);
    rimLight.position.set(-10, 8, -6);
    scene.add(rimLight);

    // Fill Light (Subtle Graphite/Slate Studio Fill)
    const fillLight = new THREE.PointLight(0x94a3b8, 1.2, 35);
    fillLight.position.set(0, -6, 8);
    scene.add(fillLight);

    // Dynamic Contextual Accent Light for Projects
    const projectAccentLight = new THREE.PointLight(0x10b981, 0, 35);
    projectAccentLight.position.set(4, 2, 6);
    scene.add(projectAccentLight);

    // 2. ROOT GROUPS
    // Dedicated CharacterScene manages the primary authentic 3D Hero avatar & workstation.
    // StudioWorld3D manages the ambient dust and interactive project worlds.
    const projectWorldsGroup = new THREE.Group();
    scene.add(projectWorldsGroup);

    // 5. THE 5 CINEMATIC PROJECT 3D ENVIRONMENTS
    // 5.1 KAVACH: Forensic Cyber-Graph
    const forensicGroup = new THREE.Group();
    projectWorldsGroup.add(forensicGroup);
    forensicGroup.visible = false;

    // Central Forensic Threat Node
    const threatCoreGeo = new THREE.IcosahedronGeometry(0.45, 1);
    const threatCoreMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xd97706,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      wireframe: true,
    });
    const threatCore = new THREE.Mesh(threatCoreGeo, threatCoreMat);
    forensicGroup.add(threatCore);

    // Forensic Evidence Satellite Nodes
    const nodeGeo = new THREE.SphereGeometry(0.14, 8, 8);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.6,
      roughness: 0.2,
    });

    const forensicNodes: THREE.Mesh[] = [];
    for (let i = 0; i < 28; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(
        (Math.random() - 0.5) * 8.5,
        (Math.random() - 0.5) * 5.5,
        (Math.random() - 0.5) * 4.5
      );
      forensicGroup.add(node);
      forensicNodes.push(node);
    }

    // Connect forensic lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.4,
    });
    const lineGeo = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    for (let i = 0; i < forensicNodes.length - 1; i += 2) {
      linePositions.push(
        forensicNodes[i].position.x,
        forensicNodes[i].position.y,
        forensicNodes[i].position.z,
        forensicNodes[i + 1].position.x,
        forensicNodes[i + 1].position.y,
        forensicNodes[i + 1].position.z
      );
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const forensicLines = new THREE.LineSegments(lineGeo, lineMat);
    forensicGroup.add(forensicLines);

    // Rotating Coordinate Radar Ring
    const radarRingGeo = new THREE.RingGeometry(3.2, 3.25, 32);
    const radarRingMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const radarRing = new THREE.Mesh(radarRingGeo, radarRingMat);
    forensicGroup.add(radarRing);

    // 5.2 Voice AI: 3D Acoustic Waveform & Particle Field (Violet)
    const voiceGroup = new THREE.Group();
    projectWorldsGroup.add(voiceGroup);
    voiceGroup.visible = false;

    const waveSegments = 48;
    const waveGeo = new THREE.BufferGeometry();
    const wavePos = new Float32Array(waveSegments * 3);
    for (let i = 0; i < waveSegments; i++) {
      const x = (i / waveSegments - 0.5) * 10;
      wavePos[i * 3] = x;
      wavePos[i * 3 + 1] = Math.sin(i * 0.4) * 0.9;
      wavePos[i * 3 + 2] = 0;
    }
    waveGeo.setAttribute('position', new THREE.BufferAttribute(wavePos, 3));
    const waveMat = new THREE.LineBasicMaterial({
      color: 0xa855f7,
      linewidth: 3,
    });
    const waveLine = new THREE.Line(waveGeo, waveMat);
    voiceGroup.add(waveLine);

    // 3D Studio Microphone representation
    const micCapsuleGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.9, 16);
    const micMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true,
    });
    const micMesh = new THREE.Mesh(micCapsuleGeo, micMat);
    micMesh.position.set(0, 0, 0);
    voiceGroup.add(micMesh);

    // Dynamic sonic rings
    const ringGeo = new THREE.TorusGeometry(1.9, 0.05, 8, 32);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 0.6,
    });
    const waveRing = new THREE.Mesh(ringGeo, ringMat);
    voiceGroup.add(waveRing);

    // 5.3 Emberhold: Dark-Fantasy Hearth & Relic Altar (Amber Flame)
    const emberGroup = new THREE.Group();
    projectWorldsGroup.add(emberGroup);
    emberGroup.visible = false;

    // Stone Relic Altar
    const altarGeo = new THREE.CylinderGeometry(1.4, 1.8, 0.6, 6);
    const altarMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.8,
      metalness: 0.3,
    });
    const altar = new THREE.Mesh(altarGeo, altarMat);
    altar.position.set(0, -1.8, 0);
    emberGroup.add(altar);

    // Floating Relic Polyhedron Crystal
    const relicGeo = new THREE.OctahedronGeometry(0.85, 0);
    const relicMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xea580c,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.8,
    });
    const relicCrystal = new THREE.Mesh(relicGeo, relicMat);
    relicCrystal.position.set(0, 0.2, 0);
    emberGroup.add(relicCrystal);

    // Rising Flame Sparks / Embers
    const emberCount = 80;
    const emberGeo = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 5;
      emberPositions[i * 3 + 1] = Math.random() * 5 - 2;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xf97316,
      size: 0.14,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const emberPoints = new THREE.Points(emberGeo, emberMat);
    emberGroup.add(emberPoints);

    // 5.4 RPM: Spatial Audio & Neural Core Sphere (Teal / Cyan)
    const rpmGroup = new THREE.Group();
    projectWorldsGroup.add(rpmGroup);
    rpmGroup.visible = false;

    // Neural Assistant Core Sphere
    const neuralGeo = new THREE.IcosahedronGeometry(0.9, 2);
    const neuralMat = new THREE.MeshStandardMaterial({
      color: 0x2dd4bf,
      emissive: 0x0f766e,
      emissiveIntensity: 0.7,
      wireframe: true,
    });
    const neuralCore = new THREE.Mesh(neuralGeo, neuralMat);
    rpmGroup.add(neuralCore);

    // Spatial sound wavefront orbital ring
    const spatialRingGeo = new THREE.TorusGeometry(2.2, 0.04, 8, 36);
    const spatialRingMat = new THREE.MeshBasicMaterial({ color: 0x5eead4 });
    const spatialRing1 = new THREE.Mesh(spatialRingGeo, spatialRingMat);
    spatialRing1.rotation.x = Math.PI / 3;
    rpmGroup.add(spatialRing1);

    const spatialRing2 = new THREE.Mesh(spatialRingGeo, spatialRingMat);
    spatialRing2.rotation.y = Math.PI / 3;
    rpmGroup.add(spatialRing2);

    // 5.5 BillShield AI: Holographic Fintech Shield & Radar (Teal / Platinum)
    const fintechGroup = new THREE.Group();
    projectWorldsGroup.add(fintechGroup);
    fintechGroup.visible = false;

    // Hexagonal Shield Plate
    const shieldGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.08, 6);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0x14b8a6,
      emissive: 0x0d9488,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: true,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.rotation.x = Math.PI / 2;
    fintechGroup.add(shieldMesh);

    // Translucent financial ledger grid plane
    const ledgerGeo = new THREE.PlaneGeometry(3.6, 2.4, 6, 4);
    const ledgerMat = new THREE.MeshBasicMaterial({
      color: 0x5eead4,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const ledgerPlane = new THREE.Mesh(ledgerGeo, ledgerMat);
    fintechGroup.add(ledgerPlane);

    // 6. VOLUMETRIC STUDIO DUST PARTICLES
    const dustCount = window.innerWidth < 768 ? 200 : 450;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 45;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

    const dustMat = new THREE.PointsMaterial({
      color: 0xe4e4e7,
      size: 0.045,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // 7. MOUSE & SCROLL STATE
    const targetMouse = { x: 0, y: 0 };
    const curMouse = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let scrollProgress = 0;
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 8. RESIZE LISTENER
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 9. ANIMATION LOOP
    let animationFrameId: number;
    const startTime = performance.now();


    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) * 0.001;

      // Smooth mouse lerp
      curMouse.x += (targetMouse.x - curMouse.x) * 0.05;
      curMouse.y += (targetMouse.y - curMouse.y) * 0.05;

      // SCROLL-DRIVEN CAMERA & SCENE CHOREOGRAPHY
      if (scrollProgress < 0.38) {
        if (scrollProgress >= 0.12) {
          if (!scene.fog) {
            scene.fog = new THREE.FogExp2(0x08080a, 0.02);
          }
          ambientLight.intensity = 0.7;
          keyLight.intensity = 2.2;
        } else {
          scene.fog = null;
          ambientLight.intensity = 0.5;
          keyLight.intensity = 1.0;
        }
        projectWorldsGroup.visible = false;
        camera.position.set(0, 0, 14);
      } else if (scrollProgress >= 0.38 && scrollProgress < 0.82) {
        // Projects Active Phase
        projectWorldsGroup.visible = true;

        // Position project world on right side of screen with depth
        projectWorldsGroup.position.set(3.4 + curMouse.x * 0.2, 0.2 + curMouse.y * 0.2, 2.5);

        // Switch based on activeProjectRef or scroll sub-range
        const pIdx = activeProjectRef.current;

        // Reset visibilities
        forensicGroup.visible = pIdx === 0;
        voiceGroup.visible = pIdx === 1;
        emberGroup.visible = pIdx === 2;
        rpmGroup.visible = pIdx === 3;
        fintechGroup.visible = pIdx === 4;

        if (pIdx === 0) {
          // KAVACH Forensic Cyber-Graph
          projectAccentLight.color.setHex(0x10b981);
          projectAccentLight.intensity = 2.2;
          forensicGroup.rotation.y = elapsed * 0.15 + curMouse.x * 0.35;
          forensicGroup.rotation.x = curMouse.y * 0.2;
          radarRing.rotation.z = -elapsed * 0.3;
        } else if (pIdx === 1) {
          // Voice AI Waveform & Mic
          projectAccentLight.color.setHex(0xa855f7);
          projectAccentLight.intensity = 2.2;
          waveRing.rotation.x = elapsed * 0.5;
          waveRing.rotation.y = elapsed * 0.35;
          micMesh.rotation.y = elapsed * 0.4;
          voiceGroup.rotation.z = Math.sin(elapsed * 0.8) * 0.1;
        } else if (pIdx === 2) {
          // Emberhold Dark-Fantasy Hearth
          projectAccentLight.color.setHex(0xf97316);
          projectAccentLight.intensity = 2.6;
          relicCrystal.rotation.y = elapsed * 0.6;
          relicCrystal.rotation.x = Math.sin(elapsed * 1.2) * 0.2;
          emberPoints.rotation.y = elapsed * 0.2;
        } else if (pIdx === 3) {
          // RPM AI Voice Assistant
          projectAccentLight.color.setHex(0x2dd4bf);
          projectAccentLight.intensity = 2.2;
          neuralCore.rotation.x = elapsed * 0.3;
          neuralCore.rotation.y = elapsed * 0.5;
          spatialRing1.rotation.z = elapsed * 0.4;
          spatialRing2.rotation.x = -elapsed * 0.4;
        } else if (pIdx === 4) {
          // BillShield AI Fintech Shield
          projectAccentLight.color.setHex(0x14b8a6);
          projectAccentLight.intensity = 2.2;
          shieldMesh.rotation.z = elapsed * 0.2;
          ledgerPlane.rotation.y = Math.sin(elapsed * 0.5) * 0.25;
        }

        camera.position.set(0, curMouse.y * 0.2, 14);
      } else {
        // Contact / Footer Finale
        projectWorldsGroup.visible = false;
        projectAccentLight.intensity = 0;
        camera.position.set(0, curMouse.y * 0.3, 14);
      }

      // Gentle Ambient Dust Drift
      dustParticles.rotation.y = elapsed * 0.015;
      dustParticles.rotation.x = elapsed * 0.008;

      if (!prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
};
