// creer une scene
//
//
var scene = new THREE.Scene();

// creer camera
//
//
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// changer la postion de camera
//
//
camera.position.z = 5;

// ajouter de light
//
//
//---------------------------------------------
light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1);
scene.add(light);

light = new THREE.DirectionalLight(0x002288);
light.position.set(-1, -1, -1);
scene.add(light);

light = new THREE.AmbientLight(0x222222);
scene.add(light);
//---------------------------------------------

// creation de cube avec une couleur blue
//
//
var geometry = new THREE.BoxGeometry(2, 2, 2);
var material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// renderer
//
//
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e5e5e5");

// apend view to body
//
//
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// rendre le fenetere responsive
//
//
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// EventListeneer sur la souris
//
//
//-------------------------------------------------------------------
window.addEventListener("mousedown", onDocumentMouseDown, false);
//-------------------------------------------------------------------

// VARIBALES
//
//
var RotationX = 0;
var RotationOnMouseDownX = 0;

var RotationY = 0;
var RotationOnMouseDownY = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var mouseY = 0;
var mouseYOnMouseDown = 0;

var milieuFentereX = window.innerWidth / 2;
var milieuFentereY = window.innerHeight / 2;

// mouse mouvement
// *******************

renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);

  render();
  //cube.rotation.x += 0.01; //TEST
  //cube.rotation.y += 0.01; //TEST
  //renderer.render(scene, camera); //TEST
}

function onDocumentMouseDown() {
  event.preventDefault();

  // Creer des fonctions qui s'execute juste apres avoit cliquer sur la souris
  document.addEventListener("mousemove", onDocumentMouseMove, false);
  // fin de clique sur la souris
  document.addEventListener("mouseup", onDocumentMouseUp, false);

  //++++++++++++++++++++++++++++++++++++++++++++++++ sauvgarde de postion de la souris de debut
  // au moument de clique x et y
  mouseXOnMouseDown = event.clientX - milieuFentereX;
  RotationOnMouseDownX = RotationX;

  mouseYOnMouseDown = event.clientY - milieuFentereY;
  RotationOnMouseDownY = RotationY;
  //++++++++++++++++++++++++++++++++++++++++++++++++
}

function onDocumentMouseMove(event) {
  // recuperer la la derniere position de x et y la
  mouseX = event.clientX - milieuFentereX;
  mouseY = event.clientY - milieuFentereY;

  // +++++++
  // ajouter le mouvement de la souris a la rotation x de cube viitesse choisit est 0.01
  // pour un mouvment lent
  RotationX = RotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.01;
}

// fin de clique arret de mouvment
function onDocumentMouseUp(event) {
  document.removeEventListener("mousemove", onDocumentMouseMove, false);
  document.removeEventListener("mouseup", onDocumentMouseUp, false);
}

function render() {
  //rotation horizontale
  cube.rotation.y += (RotationX - cube.rotation.y) * 0.1;

  if (cube.rotation.x > 1) {
    cube.rotation.x = 1;
  }

  if (cube.rotation.x < -1) {
    cube.rotation.x = -1;
  }

  renderer.render(scene, camera);
}

animate();
