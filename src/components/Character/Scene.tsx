// Ported from kavish3D-Portofolio (MIT, (c) Rajesh Chityal)
import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../utils/loadingProgress";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    const containerElement = canvasDiv.current;
    if (containerElement) {
      const rect = containerElement.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      let renderer: THREE.WebGLRenderer | undefined;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
        });
      } catch (error) {
        console.warn("WebGL not supported, skipping 3D character:", error);
        const progress = setProgress((value) => setLoading(value));
        progress.loaded();
        return;
      }
      if (!renderer) return;
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      const domElement = renderer.domElement;
      containerElement.appendChild(domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      type ScreenLight = THREE.Object3D & {
        material?: { opacity: number; emissiveIntensity: number };
      };
      let screenLight: ScreenLight | null = null;
      let mixer: THREE.AnimationMixer | undefined;
      let hoverCleanup: (() => void) | undefined;
      let introCleanup: (() => void) | undefined;
      let resizeHandler: (() => void) | undefined;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then((gltf) => {
        if (gltf) {
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) {
            hoverCleanup = animations.hover(gltf, hoverDivRef.current);
          }
          mixer = animations.mixer;
          const character = gltf.scene;
          scene.add(character);
          (window as any).__scene = scene;
          (window as any).__character = character;
          (window as any).__camera = camera;
          (window as any).__gltf = gltf;
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;
          console.log("[Scene] Character loaded into scene");
          progress.loaded().then(() => {
            console.log("[Scene] Progress loaded resolved, scheduling intro in 200ms");
            const introTimer = window.setTimeout(() => {
              console.log("[Scene] Turning on lights and starting intro");
              light.turnOnLights();
              animations.startIntro();
            }, 200);
            introCleanup = () => window.clearTimeout(introTimer);
          });
          resizeHandler = () => handleResize(renderer!, camera, canvasDiv, character);
          window.addEventListener("resize", resizeHandler);
        }
      });

      let mouse = { x: 0, y: 0 };
      let interpolation = { x: 0.1, y: 0.2 };
      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };

      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = window.setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      let isRunning = true;
      let rafId: number;
      const animate = () => {
        if (!isRunning) return;
        rafId = requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        isRunning = false;
        cancelAnimationFrame(rafId);
        window.clearTimeout(debounce);
        scene.clear();
        hoverCleanup?.();
        introCleanup?.();
        if (resizeHandler) {
          window.removeEventListener("resize", resizeHandler);
        }
        renderer?.dispose();
        if (containerElement.contains(domElement)) {
          containerElement.removeChild(domElement);
        }
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
