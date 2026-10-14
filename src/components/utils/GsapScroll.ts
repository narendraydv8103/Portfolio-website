// Ported from kavish3D-Portofolio (MIT, (c) Rajesh Chityal)
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Namaste blend function kept as a safe no-op if referenced
export function applyNamasteStandingBlend(
  _character: THREE.Object3D,
  _standingWeight?: number,
  _relaxBlend?: number
) {}


export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  let intensity = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);

  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".studio-lead",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".studio-hold",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  type MaterialNode = THREE.Object3D & {
    material?: THREE.MeshStandardMaterial & {
      transparent?: boolean;
      opacity: number;
      emissive?: THREE.Color;
      color?: THREE.Color;
      name?: string;
    };
    children: MaterialNode[];
    position: THREE.Vector3;
  };

  let screenLight: MaterialNode | null = null;
  let monitor: MaterialNode | null = null;

  character?.children.forEach((object) => {
    const typedObject = object as MaterialNode;
    if (typedObject.name === "Plane004" || typedObject.name === "Plane.004") {
      typedObject.children.forEach((child) => {
        const typedChild = child as MaterialNode;
        if (typedChild.material) {
          typedChild.material.transparent = true;
          typedChild.material.opacity = 0;
          if (typedChild.material.name === "Material.018") {
            monitor = typedChild;
            if (typedChild.material.color) typedChild.material.color.set("#FFFFFF");
          }
        }
      });
    }
    if (typedObject.name === "screenlight") {
      if (typedObject.material) {
        typedObject.material.transparent = true;
        typedObject.material.opacity = 0;
        if (typedObject.material.emissive)
          typedObject.material.emissive.set("#B0F5EA");
        gsap.timeline({ repeat: -1, repeatRefresh: true }).to(typedObject.material, {
          emissiveIntensity: () => intensity * 8,
          duration: () => Math.random() * 0.6,
          delay: () => Math.random() * 0.1,
        });
      }
      screenLight = typedObject;
    }
  });

  const neckBone = character?.getObjectByName("spine005");
  const monitorMaterial = (monitor as unknown as
    | { material?: THREE.MeshStandardMaterial }
    | null)?.material;
  const monitorPosition = (monitor as unknown as
    | { position?: THREE.Vector3 }
    | null)?.position;
  const screenLightMaterial = (screenLight as unknown as
    | { material?: THREE.MeshStandardMaterial }
    | null)?.material;

  if (window.innerWidth > 1024) {
    if (character) {
      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 22 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0);

      tl2
        .to(
          camera.position,
          { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
          0
        )
        .to(".studio-lead", { y: "30%", duration: 6 }, 0)
        .to(".studio-lead", { opacity: 0, delay: 3, duration: 2 }, 0)
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit" },
          { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 },
          0
        )
        .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
        .to(neckBone ? neckBone.rotation : {}, { x: 0.6, delay: 2, duration: 3 }, 0)
        .to(monitorMaterial ?? {}, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
        .to(screenLightMaterial ?? {}, { opacity: 1, duration: 0.8, delay: 4.5 }, 0)
        .fromTo(
          monitorPosition ?? {},
          { y: -10, z: 2 },
          { y: 0, z: 0, delay: 1.5, duration: 3 },
          0
        )
        .fromTo(
          ".character-rim",
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
          0.3
        )
        .fromTo(
          ".what-i-do-desktop",
          { autoAlpha: 0, y: 50 },
          { autoAlpha: 1, y: 0, duration: 1.4, delay: 5.4, ease: "power2.out" },
          0
        );

      tl3
        .fromTo(
          ".character-model",
          { y: "0%" },
          { y: "-100%", duration: 4, ease: "none", delay: 1 },
          0
        )
        .to(
          ".what-i-do-desktop",
          { yPercent: -120, autoAlpha: 0, duration: 3, ease: "none", delay: 1.2 },
          0
        )
        .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
    }
  }
}
