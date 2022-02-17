"use strict";

(function () {

    /* シーン作成 */
    const scene = new THREE.Scene();


    const axes = new THREE.AxisHelper(100);
    scene.add(axes);

    /* 物体を生成 */


    /* 空 */
    // 形
    const geometrySky = new THREE.PlaneGeometry(1500, 1500, 64, 64);
    // 素材
    const materialSky = new THREE.MeshLambertMaterial({ color: 0x00ffff });
    // 形と素材を組み合わせる
    const sky = new THREE.Mesh(geometrySky, materialSky);

    // シーンに追加
    scene.add(sky);
    sky.position.z = -200; // 少し後ろにさげる


    // 地面

    // 形
    const geometryGround = new THREE.PlaneGeometry(150, 150, 64, 64);
    // 素材
    const materialGround = new THREE.MeshLambertMaterial({ color: 0xE69138 });
    // 形と素材を組み合わせる
    const ground = new THREE.Mesh(geometryGround, materialGround);

    // シーンに追加
    scene.add(ground);
    ground.rotation.x = -0.5 * Math.PI;


    // 太陽
    const materialSun = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load('img/sunny.png'),
    });
    const sun = new THREE.Sprite(materialSun);
    scene.add(sun);

    sun.position.x = -10;
    sun.position.y = 10;
    sun.position.z = -10;



    // 木
    const materialThree = new THREE.SpriteMaterial({
        map: new THREE.TextureLoader().load('img/tree_01.png'),
    });
    const three = new THREE.Sprite(materialThree);
    scene.add(three);

    // three.position.x = -3; //横
    three.position.y = 0.5; // 高さ
    // three.position.z = -1; //奥行き


    const three2 = new THREE.Sprite(materialThree);
    scene.add(three2);

    three2.position.x = -0.1; //横
    three2.position.y = 0.5; // 高さ
    three2.position.z = 3; //奥行き






    /* 光を作成 */
    const light = new THREE.DirectionalLight(0xffffff, 1.5); // 光源の色, 強さ
    light.position.set(1, 1, 1);// 光源の位置
    scene.add(light);// シーンに追加



    /* カメラ作成 */
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // カメラ位置を設定
    // camera.position.x = -1; // 横移動
    camera.position.y = 1;// 斜め上から
    camera.position.z = 5; // 少し下がる
    // camera.lookAt(scene.position); // 常に中心


    // サイズを取得
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    /* レンダラー作成 */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(windowWidth, windowHeight); // サイズ
    renderer.setClearColor(0xcccccc, 1); // 背景色

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(windowWidth, windowHeight);

    camera.aspect = windowWidth / windowHeight;
    camera.updateProjectionMatrix();

    // DOMに追加
    document.body.appendChild(renderer.domElement);

    let isMoveL = false;
    const cameraSpeed = 0.005
    const cameraRange = 1

    /* レンダリング */
    const render = function () {
        // 繰り返し実行
        requestAnimationFrame(render);

        // ground.rotation.x -= 0.001
        // console.log(ground.rotation.x)

        if (isMoveL) {
            camera.position.x += cameraSpeed
            if (camera.position.x > cameraRange) {
                isMoveL = false
            }

        } else {
            camera.position.x -= cameraSpeed
            if (camera.position.x < -cameraRange) {
                isMoveL = true
            }
        }
        console.log(camera.position.x)

        // カメラで撮影したシーンを描画
        renderer.render(scene, camera);
    };

    // 実行
    render();

})();