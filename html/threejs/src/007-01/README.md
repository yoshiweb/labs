# three.js 実験

http://yoshiweb.github.io/labs/html/threejs/


画像を正面を向いて配置


- 素材

https://tsukatte.com/tree-01/


```
// マテリアルを作成する
const material = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load(/*画像パス*/),
});

const sprite = new THREE.Sprite(material);
scene.add(sprite);
```
