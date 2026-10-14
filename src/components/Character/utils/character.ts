import * as THREE from "three";
import { DRACOLoader, GLTFLoader, type GLTF } from "three-stdlib";
import { setCharTimeline } from "../../utils/GsapScroll";

export const MODEL_URL = "/models/character.glb";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      loader.load(
        MODEL_URL,
        async (gltf) => {
          const character = gltf.scene;
          await renderer.compileAsync(character, camera, scene);

          // Skin material for hands matching face texture tone
          const handSkinMat = new THREE.MeshStandardMaterial({
            color: 0x9a6c56, // Warm natural skin tone matching face
            roughness: 0.52,
            metalness: 0.0,
            name: "Hand_Skin_Natural",
          });

          character.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              const mesh = child;

              // Apply Neeraj's identity styling
              if (mesh.name === "BODY.SHIRT" || mesh.name === "Cube006") {
                const newMat = (
                  mesh.material as THREE.Material
                ).clone() as THREE.MeshStandardMaterial;
                newMat.color = new THREE.Color(0xd93829); // Red hoodie
                newMat.roughness = 0.65;
                newMat.metalness = 0.04;
                mesh.material = newMat;
              } else if (mesh.name === "Cube006_1") {
                const newMat = (
                  mesh.material as THREE.Material
                ).clone() as THREE.MeshStandardMaterial;
                newMat.color = new THREE.Color(0x18181b); // Dark ribbed cuffs & collar
                newMat.roughness = 0.85;
                mesh.material = newMat;
              } else if (mesh.name === "Pant") {
                const newMat = (
                  mesh.material as THREE.Material
                ).clone() as THREE.MeshStandardMaterial;
                newMat.color = new THREE.Color(0x18181b); // Dark pants
                mesh.material = newMat;
              } else if (
                mesh.name === "CAP001" ||
                mesh.name === "CAP002" ||
                mesh.name === "CAP.001" ||
                mesh.name === "CAP.002"
              ) {
                const newMat = (
                  mesh.material as THREE.Material
                ).clone() as THREE.MeshStandardMaterial;
                newMat.color = new THREE.Color(0x18181b); // Black cap
                newMat.roughness = 0.85;
                mesh.material = newMat;
              } else if (mesh.name === "Teeth001" || mesh.name === "Teeth.001") {
                const newMat = (
                  mesh.material as THREE.Material
                ).clone() as THREE.MeshStandardMaterial;
                newMat.color = new THREE.Color(0xfdfdfd);
                mesh.material = newMat;
              } else if (mesh.name === "Shoe") {
                const newMat = (
                  mesh.material as THREE.Material
                ).clone() as THREE.MeshStandardMaterial;
                newMat.color = new THREE.Color(0xf8fafc); // White sneakers
                mesh.material = newMat;
              } else if (
                mesh.name === "Hand" ||
                mesh.name === "Mesh.001" ||
                mesh.name === "Mesh001" ||
                (mesh.material && (mesh.material as THREE.Material).name === "hand Material")
              ) {
                mesh.material = handSkinMat;
              }

              mesh.castShadow = true;
              mesh.receiveShadow = true;
              mesh.frustumCulled = true;
            }
          });

          resolve(gltf);
          setCharTimeline(character, camera);
          character.getObjectByName("footR")?.position.setY(3.36);
          character.getObjectByName("footL")?.position.setY(3.36);
          dracoLoader.dispose();
        },
        undefined,
        (error) => {
          console.error("Error loading GLTF model:", error);
          reject(error);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
