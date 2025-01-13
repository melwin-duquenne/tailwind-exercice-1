// Initialiser la scène Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 25); // Placer la caméra au-dessus et en arrière
camera.lookAt(0, 0, 0); // Faire regarder la caméra vers le centre de la grille

// Rendu
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.domElement.id = "bgCanvas"; // Ajoute un ID pour gérer le canvas facilement

// Créer des particules sur une grille régulière
const gridSize = 500; // Taille de la grille
const spacing = 0.4; // Espacement entre les particules
const particleCount = gridSize * gridSize;
const particlePositions = new Float32Array(particleCount * 3); // x, y, z pour chaque particule
const particleColors = new Float32Array(particleCount * 3); // r, g, b pour chaque particule

let index = 0;
for (let i = 0; i < gridSize; i++) {
  for (let j = 0; j < gridSize; j++) {
    const x = (i - gridSize / 2) * spacing; // Position x centrée
    const z = (j - gridSize / 2) * spacing; // Position z centrée
    const y = 0; // Initialement plat

    particlePositions.set([x, y, z], index * 3);

    // Couleur initiale (gradient selon z pour commencer)
    const color = z / (gridSize * spacing) + 0.5; // Normaliser entre 0 et 1
    particleColors.set([color, color * 0.2, 1 - color], index * 3); // r (rose), g (faible), b (bleu)
    index++;
  }
}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3)); // Ajout des couleurs

const particleMaterial = new THREE.PointsMaterial({
  size: 0.1, // Taille des particules
  vertexColors: true, // Utiliser les couleurs des sommets
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Animation
function animate() {
  requestAnimationFrame(animate);

  // Déplacer les particules en vague
  const positions = particleGeometry.attributes.position.array;
  const colors = particleGeometry.attributes.color.array;
  const time = Date.now() * 0.002; // Ajuster la vitesse avec ce facteur

  for (let i = 0; i < particleCount; i++) {
    const x = positions[i * 3];
    const z = positions[i * 3 + 2];

    // Appliquer une vague sinusoïdale sur l'axe Y
    const y = Math.sin(x * 0.5 + time) * Math.cos(z * 0.5 + time);
    positions[i * 3 + 1] = y;

    // Mettre à jour la couleur en fonction de la hauteur Y
    const normalizedY = (y + 1) / 2; // Normaliser Y entre 0 et 1
    colors[i * 3] = normalizedY * 0.6; // Rouge atténué
    colors[i * 3 + 1] = normalizedY * 0.3; // Vert faible
    colors[i * 3 + 2] = 1 - normalizedY * 0.8; // Bleu dominant
  }

  particleGeometry.attributes.position.needsUpdate = true;
  particleGeometry.attributes.color.needsUpdate = true;

  renderer.render(scene, camera);
}
animate();

// Gérer le redimensionnement de la fenêtre
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
