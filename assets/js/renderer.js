// set the scene size
// var WIDTH = 400,
//   HEIGHT = 300;
var WIDTH = $(window).width();
var HEIGHT = $(window).height();

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
camera.position.z = 140;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
$container.append(renderer.domElement);


// set up the sphere vars
var radius = 2,
    segments = 16,
    rings = 16;


// create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
var viz = function (x, y ,offset) {
    console.log("viz called " + " with " + "x: " + x + " y: " + y);
    // create the sphere's material
    clickTraceMaterial =
        new THREE.MeshLambertMaterial(
            {
                color: 0xCC0000,
                transparent: true,
                opacity: 0.6,
                side: THREE.DoubleSide
            });

    clickTrace = new THREE.Mesh(

        // new THREE.SphereGeometry(
        //     radius,
        //     segments,
        //     rings),
        // clickTraceMaterial);
        new THREE.CubeGeometry(0.1, x/100, y/100, 1, 1, 1), 
        clickTraceMaterial);
    
    // console.log("Mouse: " + event.clientX + "x" + event.clientY)
    // sphere.position.set(event.clientX, event.clientY-90, 0);
    clickTrace.position.set(-40 + offset , 0, -25);
    // clickTrace.position.x = x ;
    // clickTrace.position.y = (-y + 80);
    // clickTrace.position.z = z;
    // add the clickTrace to the scene
    //clickTrace.rotation.x = Math.PI / 2;
    scene.add(clickTrace);
    return(clickTrace);
}

var material = new THREE.MeshFaceMaterial( [ 
    //new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } ), // front
    new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.SmoothShading, side: THREE.DoubleSide } ) // side
] );

var textGeo, textMesh1;

var createText = function() {
    textGeo = new THREE.TextGeometry ("Hello, where are you?", {
	size: 10,
	height: 24,
	weight: "normal",
	style: "normal",
	curveSegments: 4,
	font: "gentilis",
	bevelEnabled: true,
	bevelSize: 0.5

    });
    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();
//    textMesh1 = new THREE.Mesh(textGeo, clickTraceMaterial);
    textMesh1 = new THREE.Mesh( textGeo, material );
    var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
    textMesh1.position.x = centerOffset;
    textMesh1.position.y = 10;
    textMesh1.position.z = 0;
    
    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI * 2;
    scene.add(textMesh1);
}
createText();
animate();

// SKYBOX/FOG
var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
//var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x444444, side: THREE.BackSide } );
var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x2040600, side: THREE.BackSide } );
var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
skyBox.flipSided = true; // render faces from inside of the cube, instead of from outside (default).
scene.add(skyBox);


// LIGHTS
var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
dirLight.position.set( 0, 0, 1 ).normalize();
scene.add( dirLight );

// create a point light
var pointLight = new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 0;
pointLight.position.y = 100;
pointLight.position.z = 90;

// add to the scene
scene.add(pointLight);

// var pointLight2 =
//   new THREE.PointLight(0xFFFFFF);

// // set its position
// pointLight2.position.x = -10;
// pointLight2.position.y = -50;
// pointLight2.position.z = -130;

// add to the scene
//scene.add(pointLight2);

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
