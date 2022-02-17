"use strict";

(function () {




    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    let radius = 10
    let scaleSpeed = 0.5
    let isZoom = true


    function renderCanvas() {
        window.requestAnimationFrame(renderCanvas);

        // 描画前にクリア
        ctx.clearRect(0, 0, 128, 128);

        const x = 64
        const y = 64

        if (isZoom) {
            radius += scaleSpeed
        } else {
            radius -= scaleSpeed
        }
        if (radius > 40) {
            isZoom = false
        } else if (radius < 10) {
            isZoom = true
        }


        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        // ctx.fillStyle = "green";
        ctx.fillStyle = "rgba(0, 0, 255)";
        ctx.fill();
        ctx.closePath();
    }
    renderCanvas()

    // サイズを取得
    const stageWidth = 800;
    const stageHeight = 600;


    /* レンダラー作成 */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(stageWidth, stageHeight); // サイズ
    renderer.setClearColor(0xcccccc, 1); // 背景色

    // レンダラーのサイズを調整する
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(stageWidth, stageHeight);


    // DOMに追加
    // document.body.appendChild(renderer.domElement);
    const game = document.getElementById('game')
    game.appendChild(renderer.domElement)






    /* シーン作成 */
    const scene = new THREE.Scene();


    const axes = new THREE.AxisHelper(100);
    scene.add(axes);



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

    // アスペクト比
    camera.aspect = stageWidth / stageHeight;
    camera.updateProjectionMatrix();









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







    var canvasTexture = new THREE.Texture(canvas);
    canvasTexture.premultiplyAlpha = true;
    canvasTexture.needsUpdate = true;


    var geometryCanvas = new THREE.PlaneGeometry(canvas.width / 100, canvas.height / 100);

    var materialCanvas = new THREE.MeshBasicMaterial({
        map: canvasTexture,
        alphaTest: 0.5,
        transparent: true,
    });

    materialCanvas.blending = THREE.CustomBlending;
    materialCanvas.blendSrc = THREE.OneFactor;
    materialCanvas.blendDst = THREE.OneMinusSrcAlphaFactor;
    materialCanvas.blendEquation = THREE.AddEquation;

    const player = new THREE.Mesh(geometryCanvas, materialCanvas);
    player.material.map.needsUpdate = true;

    // player.position.x = -0.7;
    player.position.y = 0.64;
    player.position.z = 2;
    // player.doubleSided = true;

    scene.add(player);











    let isMoveL = false;
    const playerSpeed = 0.01
    const playerRange = 2

    /* レンダリング */
    const render = function () {
        // 繰り返し実行
        requestAnimationFrame(render);

        // ground.rotation.x -= 0.001
        // console.log(ground.rotation.x)

        player.material.map.needsUpdate = true;

        if (isMoveL) {
            player.position.x += playerSpeed
            if (player.position.x > playerRange) {
                isMoveL = false
            }

        } else {
            player.position.x -= playerSpeed
            if (player.position.x < -playerRange) {
                isMoveL = true
            }
        }
        // console.log(camera.position.x)

        // カメラをplayerに追従
        camera.position.x = player.position.x;


        // カメラで撮影したシーンを描画
        renderer.render(scene, camera);
    };

    // 実行
    render();

})();