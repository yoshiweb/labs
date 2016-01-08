(function () { 
    "use strict";

    /* シーン作成 */
    var scene = new THREE.Scene();


    /* 物体を生成 */

    // 立方体
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    /* 光を作成 */
    var light    = new THREE.DirectionalLight(0xffffff, 1.5); // 光源の色, 強さ
    light.position.set(1,1,1);// 光源の位置
    scene.add(light);// シーンに追加


    // 平面
    var geometry = new THREE.PlaneGeometry( 1000, 1000, 10, 10 );
    var material = new THREE.MeshBasicMaterial({
        wireframe:true
    });
    var _plane = new THREE.Mesh( geometry, material );
    scene.add(_plane);

    // 平面を倒す
    _plane.rotation.x = Math.PI * 0.5;
    _plane.position.y = -100;








    /* カメラ作成 */
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    // カメラ位置を設定
    camera.position.z = 5;


    // カメラオブジェクトを引数に生成
    var controls = new THREE.OrbitControls(camera);


    // AxisHelper
    var axisHelper = new THREE.AxisHelper( 5 );
    scene.add( axisHelper );





    /* レンダラー作成 */
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight ); // サイズ
    renderer.setClearColor(0xcccccc, 1); // 背景色

    // DOMに追加
    document.body.appendChild( renderer.domElement );

    /* レンダリング */
    var render = function () {
        // 繰り返し実行
        requestAnimationFrame( render );

        // 物体を回転
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // カメラで撮影したシーンを描画
        renderer.render(scene, camera);
    };

    // 実行
    render();

})();