"use strict";

(function () {

    /* シーン作成 */
    var scene = new THREE.Scene();



    /* 物体を生成 */

    // マテリアルを作成する
    const material = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load('img/tree_01.png'),
    });

    const sprite = new THREE.Sprite(material);
    scene.add(sprite);

    /* 光を作成 */
    var light = new THREE.DirectionalLight(0xffffff, 1.5); // 光源の色, 強さ
    light.position.set(1, 1, 1);// 光源の位置
    scene.add(light);// シーンに追加



    /* カメラ作成 */
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // カメラ位置を設定
    camera.position.z = 5;


    /* レンダラー作成 */
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // サイズ
    renderer.setClearColor(0xcccccc, 1); // 背景色

    // DOMに追加
    document.body.appendChild(renderer.domElement);

    /* レンダリング */
    var render = function () {
        // 繰り返し実行
        requestAnimationFrame(render);

        // カメラで撮影したシーンを描画
        renderer.render(scene, camera);
    };

    // 実行
    render();

})();