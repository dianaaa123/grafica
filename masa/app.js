import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';



let scene, camera, renderer, table, controls;

function init() {
    // Crearea unei scene
    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0xc8e0c8 );

    // Crearea unei camere : 75 grade, aspect ratio, nu afiseaza nimic mai aproape de 0.1 sau mai departe de 1000
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Crearea unui renderer
    renderer = new THREE.WebGLRenderer({ antialias: true }); //{antialias: true} o pun dupa afisarea cubului -> pentru a avea laturile mai bine definite sau ascutite

    renderer.setSize(window.innerWidth, window.innerHeight);

    // Randarea render-ului in documentul HTML
    document.body.appendChild(renderer.domElement); //Vanilla JavaScript

    //Crearea unei variabile OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);

    // Crearea unui cub cu textura
    const leg_geometry = new THREE.BoxGeometry(0.25, 4, 0.25);
    const top_geometry = new THREE.BoxGeometry(4, 0.2, 4);

    const texture = new THREE.TextureLoader().load('wood.jpg');

    const material = new THREE.MeshStandardMaterial({ map: texture });
    const leg1 = new THREE.Mesh(leg_geometry, material);
    const leg2 = new THREE.Mesh(leg_geometry, material);
    const leg3 = new THREE.Mesh(leg_geometry, material);
    const leg4 = new THREE.Mesh(leg_geometry, material);
    const top = new THREE.Mesh(top_geometry, material);

    table = new THREE.Object3D();

    table.add(leg1);     table.add(leg2);     table.add(leg3);     table.add(leg4);     table.add(top);

    top.translateY(2);
    leg1.position.set(1.75,0,1.75);
    leg2.position.set(1.75,0,-1.75);
    leg3.position.set(-1.75,0,1.75);
    leg4.position.set(-1.75,0,-1.75);

    const light = createLights();

    scene.add(table, light);

    camera.position.z = 5; // daca nu punem asta, camera va fi in cub

    controls.update();
}

function createLights() {
    // Create a directional light
    const light = new THREE.DirectionalLight('white', 2);

    // Move the light right, up, and towards us
    light.position.set(30, 30, 30);

    return light;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Fara aceasta functie nu va afisa nimic
function animate() {
    requestAnimationFrame(animate);

    //cube.rotation.x += 0.005; //viteza de rotatie
    //cube.rotation.y += 0.005;

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();


    renderer.render(scene, camera);
}

// se apeleaza functia onWindowResize() cand facem resize la pagina
window.addEventListener('resize', onWindowResize, false);

init();
animate();


