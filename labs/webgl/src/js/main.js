(function () { 
    "use strict";

    /* シーン作成 */
    var scene = new THREE.Scene();

    /* カメラ作成 */
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    // カメラ位置を設定
    camera.position.z = 5;

    /* レンダラー作成 */
    var renderer = new THREE.WebGLRenderer();
    // サイズ
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0xcccccc, 1);// 背景色
    // DOMに追加
    document.body.appendChild( renderer.domElement );


    /* 物体を生成 */

    // 形
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // 素材
    var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
    // 形と素材を組み合わせる
    var cube = new THREE.Mesh( geometry, material );
    // シーンに追加
    scene.add( cube );

    /* 光を作成 */
    var light    = new THREE.DirectionalLight(0xffffff, 1.5); // 光源の色, 強さ
    light.position.set(1,1,1);// 光源の位置
    scene.add(light);// シーンに追加



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