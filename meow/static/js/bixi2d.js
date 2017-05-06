if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;
var camera, scene, renderer, controls;

init();
animate();

function init(){
    container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.set( 5, 7, 5 );

    scene = new THREE.Scene();

    // Load the Bixi909 Collada model
    console.log('meow1');
    var loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    console.log('meow2');
    loader.load(
        '/static/img/models/monster.dae',
        function ( collada ) {

            var object = collada.scene;

            object.scale.set( 0.0025, 0.0025, 0.0025 );
            object.position.set( - 2, 0.2, 0 );

            console.log("Adding object...");
            console.log(object);
            scene.add( object );

        }
    );

    // Add floor
    var gridHelper = new THREE.GridHelper( 10, 20 );
    scene.add( gridHelper );

    // Add lighting
    var ambientLight = new THREE.AmbientLight( 0xcccccc );
    scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 0, 1, -1 ).normalize();
    scene.add( directionalLight );

    // Add renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    // Add control
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    // Add stats tracking object
    stats = new Stats();
    container.appendChild( stats.dom );

    // Add resize callback
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate(){
    requestAnimationFrame( animate );

    render();
    stats.update();
}

function render() {
    renderer.render( scene, camera );
}

