import * as THREE from "three";

export const calculateRepulsion = (
  particleX: number,
  particleY: number,
  particleZ: number,
  mouseX: number,
  mouseY: number,
  camera: THREE.PerspectiveCamera
): [number, number] => {
    const vector = new THREE.Vector3(
        (mouseX / window.innerWidth) * 2 - 1,
        -(mouseY / window.innerHeight) * 2 + 1,
        0.5
    );
    vector.unproject(camera);
    
    const zDistance = Math.abs(particleZ);
    const maxZDistance = 30;
    
    if (zDistance > maxZDistance) {
        return [0, 0];
    }
    
    const mousePos = new THREE.Vector2(vector.x * 25, vector.y * 25);
    const particlePos = new THREE.Vector2(particleX, particleY);
    
    const distance = mousePos.distanceTo(particlePos);
    
    const repulsionRadius = 6;
    const repulsionStrength = 0.1;
    
    const zFactor = 1 - (zDistance / maxZDistance);
    
    if (distance < repulsionRadius) {
        const force = (1 - distance / repulsionRadius) * repulsionStrength * zFactor;
        const angle = Math.atan2(
            particlePos.y - mousePos.y,
            particlePos.x - mousePos.x
        );
        
        return [
            Math.cos(angle) * force,
            Math.sin(angle) * force
        ];
    }
    
    return [0, 0];
};

export const calculateParticleCount = (width: number, height: number): number => {
    const screenArea = width * height;
    const baseArea = 1920 * 1080; // Base resolution
    const baseCount = 3200;

    const count = Math.floor((screenArea / baseArea) * baseCount);
    return Math.min(Math.max(count, 800), 3200);
};