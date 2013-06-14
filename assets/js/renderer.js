// set the scene size
var WIDTH = 400,
  HEIGHT = 300;

// set some camera attributes
var VIEW_ANGLE = 45,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 10000;


var projector, mouse = { x: 0, y: 0 }, INTERSECTED;
var crossSprite;

// get the DOM element to attach to
// - assume we've got jQuery to hand
var $container = $('#container');

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
var camera =
  new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);
    //new THREE.OrthographicCamera(WIDTH / -2, WIDTH / 2, HEIGHT / 2, HEIGHT / -2, NEAR, FAR);

var scene = new THREE.Scene();

// add the camera to the scene
scene.add(camera);

// the camera starts at 0,0,0
// so pull it back
camera.position.z = 40;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
$container.append(renderer.domElement);


// set up the sphere vars
var radius = 50,
    segments = 16,
    rings = 16;

// create the sphere's material
var sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: 0xCC0000
    });

// create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
var sphere = new THREE.Mesh(

  new THREE.SphereGeometry(
    radius,
    segments,
    rings),
  sphereMaterial);

// add the sphere to the scene
//scene.add(sphere);


animate();

// SKYBOX/FOG
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0xaaaaaa, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    skyBox.flipSided = true; // render faces from inside of the cube, instead of from outside (default).
	scene.add(skyBox);

// create a point light
var pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);

// initialize object to perform world/screen calculations
projector = new THREE.Projector();

// when the mouse moves, call the given function
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

var crossTexture = THREE.ImageUtils.loadTexture( '../../img/cross_black.png' );

// crosshairish thingy
var crossMaterial = new THREE.SpriteMaterial( { map: crossTexture, useScreenCoordinates: true, alignment: THREE.SpriteAlignment.center } );
	crossSprite = new THREE.Sprite( crossMaterial );
	crossSprite.scale.set( 16, 16, 1.0 );
	crossSprite.position.set( 0, 0, 0 );
	scene.add( crossSprite );

var whiteCrossTexture = THREE.ImageUtils.loadTexture( '../../img/cross_white.png' );

// crosshairish thingy
var whiteCrossMaterial = new THREE.SpriteMaterial( { map: whiteCrossTexture, useScreenCoordinates: true, alignment: THREE.SpriteAlignment.center } );
	whiteCrossSprite = new THREE.Sprite( whiteCrossMaterial );
	whiteCrossSprite.scale.set( 16, 16, 1.0 );
	whiteCrossSprite.position.set( 0, 0, 0 );
	scene.add( whiteCrossSprite );


function onDocumentMouseMove( event )
{
	// the following line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
	// event.preventDefault();

	// update sprite position
	crossSprite.position.set( event.clientX, event.clientY-90, 0 );
}
// draw!


function animate()
{
    requestAnimationFrame( animate );
	render();
	//update();
}



function render()
{
	renderer.render( scene, camera );
}
