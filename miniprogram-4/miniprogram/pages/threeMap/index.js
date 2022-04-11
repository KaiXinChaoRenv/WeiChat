// pages/threeMap/index.js
// import { createScopedThreejs } from 'threejs-miniprogram'
import * as THREE from "../../libs/three.weapp"
import { OrbitControls } from '../../jsm/controls/OrbitControls'
const hardwood2_bump = 'http://www.chenxv.link/imgTemp//hardwood2_bump.jpg'
const hardwood2_diffuse = 'http://www.chenxv.link/imgTemp/hardwood2_diffuse.jpg'
const brick_roughness = 'http://www.chenxv.link/imgTemp//brick_roughness.jpg'
const window = 'http://www.chenxv.link/imgTemp//window2.png'
const alphaMap = 'http://www.chenxv.link/imgTemp//alphaMap.jpg'
const door = 'http://www.chenxv.link/imgTemp/door.png'
const tv = 'http://www.chenxv.link/imgTemp//tv.png'
const tvRight = 'http://www.chenxv.link/imgTemp//tv右.png'
const computer = 'http://www.chenxv.link/imgTemp/computer-2.png'
const computerRight = 'http://www.chenxv.link/imgTemp/computer-2right.png'
const plant = 'http://www.chenxv.link/imgTemp//plant.png'
const windowTransparent = 'http://www.chenxv.link/imgTemp//window.png'
const doorTransparent = 'http://www.chenxv.link/imgTemp//doorTransparent.png'

// const imgLou = require()
const ThreeBSP = require('../../jsm/utils/index')(THREE)
Page({

    /**
     * 页面的初始数据
     */
    data(){
      return {
        canvasId: ''
      }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.createSelectorQuery()
        .select('#can3D')
        .node()
        .exec((res) => {
          // const canvas = res[0].node
          // 创建一个与 canvas 绑定的 three.js
          // const THREE = createScopedThreejs(canvas)
          const canvas = THREE.global.registerCanvas(res[0].node)
          this.setData({ canvasId: canvas._canvasId })
          // 创建场景
          var scene = new THREE.Scene();
          // 创建相机   远景相机  和 正交相机
          var camera = new THREE.PerspectiveCamera(45, wx.getSystemInfoSync().windowWidth / wx.getSystemInfoSync().windowHeight, 1, 1000);
          // 渲染器
          var renderer = new THREE.WebGLRenderer({
            antialias: true,
            // alpha:true
          });
          renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
          renderer.setSize(wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().windowHeight);
          renderer.shadowMap.enabled = true;
          // 允许切割
          renderer.localClippingEnabled = true;
          // 背景颜色
          renderer.setClearColor(0xffffff);

          // 颜色数组CEC9C3
          const colors = [0xDAC6AB,0xD4C7C7,0xAEC3D6,0xc9c3bd,0x888888, null, 0xff4400, 0xffffff]
          // const colors = [0xCFFFFE ,0xF9F7D9 ,0xFCE2CE ,0xFFC1F3,0x888888]
          const group = new THREE.Group();

          // 创建纹理
          function createTexture(url){
            const t =  new THREE.TextureLoader().load(url, function (res) {
              renderer.render(scene, camera);
              console.log('success', res);
            }, undefined, function (err) {
              console.log('err', err);
            });
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
            return t
          }
          const texture = createTexture(hardwood2_bump)
          const textureBg = createTexture(hardwood2_diffuse)
          const textureWar = createTexture(brick_roughness)
          const textureWindow = createTexture(window)
          const textureFloor = createTexture(alphaMap)
          const textureDoor = createTexture(door)
          const textureTv = createTexture(tv)
          const textureTvRight = createTexture(tvRight)
          const textureComputer = createTexture(computer)
          const textureComputerRight = createTexture(computerRight)
          const texturePlant= createTexture(plant)
          const textureDoorTsp= createTexture(doorTransparent)
          const textureWindowTsp= createTexture(windowTransparent)


          const planeMaterial = new THREE.MeshToonMaterial( {
            color: 0xaaaaaa,
            side: THREE.DoubleSide,
            map: texture
          } )
          function createCube (size, position, texture, colorIndex){
            const geometry = new THREE.BoxGeometry(...size);
            const material = new THREE.MeshToonMaterial( {
              color: colors[colorIndex],
              // clipIntersection: true,
              map: texture,

              // transparent: true,
              // clippingPlanes : clip,
              side: THREE.DoubleSide
            }  );
            material.transparent = true
            const cube =  new THREE.Mesh( geometry, material );
            const [x,y,z] = position
            cube.position.set(x,y,z*1.5)
            group.add( cube );
          }
          function createCubeNotAdd (size, position, texture, colorIndex){
            const geometry = new THREE.BoxGeometry(...size);
            const material = new THREE.MeshToonMaterial( {
              color: colors[colorIndex],
              map: texture,
              side: THREE.DoubleSide
            }  );
            // material.transparent = true
            const cube =  new THREE.Mesh( geometry, material );
            const [x,y,z] = position
            cube.position.set(x,y,z*1.5)
            return cube
          }

          function createCubeLevel1 (size, position, texture, colorIndex){
            const geometry = new THREE.BoxGeometry(...size);
            const material = new THREE.MeshToonMaterial( {
              color: colors[colorIndex],
              // clipIntersection: true,
              map: texture,

              // clippingPlanes : clip,
              side: THREE.DoubleSide
            }  );
            const cube =  new THREE.Mesh( geometry, material );
            const [x,y,z] = position
            cube.position.set(x,y,z/2+0.01 )
            group.add( cube );
          }
          // 切割面
          // const clipPlane = [
          //   // 延yoz平面切割 -2.2, 5 , height
          //   new THREE.Plane(new THREE.Vector3(-1, 0, 0), -1.9),
          //   new THREE.Plane(new THREE.Vector3(0, 1, 0), -4.9),
          //   new THREE.Plane(new THREE.Vector3(0, 0, -1), 0),
          // ];
          const height = 1.3
          const heightLevel1 = 1.29
          createCubeLevel1([0.3, 0.3, 1.2],[0.1, 0.9 , 1.26],texture, 4)
          function createCircle(size,position,color){
            const geometry = new THREE.CylinderBufferGeometry(...size);
            const material = new THREE.MeshToonMaterial( {color:colors[color]} );
            const cylinder = new THREE.Mesh( geometry, material );
            cylinder.position.set(...position)
            cylinder.rotation.x = Math.PI / 2
            group.add( cylinder );
          }
          // level1
          createCubeLevel1([3.5, 5,heightLevel1],[-2.4, 3.25 , heightLevel1], texture, 4)
          createCubeLevel1([3.5, 5,heightLevel1],[2.55, 3.25 , heightLevel1], texture, 4)
          createCubeLevel1([1.45, 5,0.5],[0.075, 3.25 , 2.05], texture, 4)
          createCubeLevel1([1.5, 3,heightLevel1],[0.075, 4.25 , heightLevel1], texture, 4)

          // 窗户
          createCubeLevel1([1.2, 0.1,1.3],[-2.5, 0.7 , 2.00], textureWindow, 7)

          //柱子
          createCircle([ 0.2, 0.2, 2.2, 32 ],[-3.5,0.8,1.11],6)
          createCircle([ 0.2, 0.2, 2.2, 32 ],[-1.2,0.8,1.11],6)
          createCircle([ 0.2, 0.2, 2.2, 32 ],[1.3,0.8,1.11],6)
          //围栏 中间
          createCircle([0.1,0.1, 0.5,32],[-0.6,0.85,2.01],4)
          createCircle([0.1,0.1, 0.5,32],[-0.2,0.85,2.01],4)
          createCircle([0.1,0.1, 0.5,32],[0.2,0.85,2.01],4)
          createCircle([0.1,0.1, 0.5,32],[0.6,0.85,2.01],4)

          //围栏 左间
          createCircle([0.1,0.1, 0.5,32],[-1.8,0.85,2.01],4)
          createCircle([0.1,0.1, 0.5,32],[-2.2,0.85,2.01],4)
          createCircle([0.1,0.1, 0.5,32],[-2.6,0.85,2.01],4)
          createCircle([0.1,0.1, 0.5,32],[-3,0.85,2.01],4)
          //楼梯过道
          createCube([1.15, 2.5,0.1],[2.05, -0.5 , 0.85], texture, 4)
          //围栏 楼梯间
          createCircle([0.1,0.1, 0.5,32],[1.6,0.4,1.61],4)
          createCircle([0.1,0.1, 0.5,32],[1.6,0,1.61],4)
          createCircle([0.1,0.1, 0.5,32],[1.6,-0.4,1.61],4)
          createCircle([0.1,0.1, 0.5,32],[1.6,-0.8,1.61],4)
          createCircle([0.1,0.1, 0.5,32],[1.6,-1.2,1.61],4)

          createCube([5.75, 0.3,0.5],[-1.3, 0.85 , 1.0], texture, 4)
          createCube([5.75, 0.3,0.5],[-1.45, -1.70 , 1.0], texture, 4)

          // level 下半部
          // level1
          createCubeLevel1([8.65, 7.7,heightLevel1],[0, -5.45 , heightLevel1], texture, 4)
          // 门
          createCubeLevel1([1,0.1,1],[-0.5,-1.6,1],textureDoor,8)
          createCubeLevel1([1,0.1,1],[-3,-1.6,1.4],textureTv,8)
          createCubeLevel1([1,0.1,1],[-2,-1.6,1.4],textureTvRight,8)
          // createCubeLevel1([3.5, 5,heightLevel1],[2.55, 3.25 , heightLevel1], texture, 4)


          // 魏
          createCubeOutLine([1.5, 1.5,height],[-3.4, 5 , height], null, 0)
          // 蔡
          createCubeOutLine([1.1, 1.6, height],[-3.6, 3.5 , height], null, 2)
          // 203
          createCubeOutLine([1.1, 1.6, height],[-3.6, 1.9 , height], null, 1)
          // 梁
          createCubeOutLine([1.4, 2, height],[-2.0, 4.75 , height], null, 3)
          createCubeOutLine([1.4, 1.2, height],[-2.0, 3.15 , height], null, 0)
          createCubeOutLine([0.8, 3.2, height],[-0.9, 4.15 , height], null, 2)
          createCubeOutLine([0.8, 3.2, height],[-0.1, 4.15 , height], null, 1)
          createCubeOutLine([0.8, 3.2, height],[0.7, 4.15 , height], null, 2)
          createCubeOutLine([0.8, 3.2, height],[1.5, 4.15 , height], null, 3)

          createCubeOutLine([1.2, 2.2, height],[2.5, 4.65 , height], null, 1)
          createCubeOutLine([1.2, 2.6, height],[3.7, 4.45 , height], null, 0)
          createCubeOutLine([1.8, 1.2, height],[3.4, 2.55 , height], null, 2)
          createCubeOutLine([1.8, 1.2, height],[3.4, 1.35 , height], null, 0)
          // 楼梯
          createCubeLevel1([0.4, 0.8, 0.3],[2.8, 0.35 , 0.3], textureBg, 4)
          createCubeLevel1([0.4, 0.8, 0.3],[3.2, 0.35 , 0.6], textureBg, 4)
          createCubeLevel1([0.4, 0.8, 0.3],[3.6, 0.35 , 0.9], textureBg, 4)
          createCubeLevel1([0.5, 1.6, 0.3],[4, -0.05 , 1.2], textureBg, 4)

          createCubeLevel1([0.4, 0.8, 0.3],[3.6, -0.4 , 1.5], textureBg, 4)
          createCubeLevel1([0.4, 0.8, 0.3],[3.2, -0.4 , 1.8], textureBg, 4)
          createCubeLevel1([0.4, 0.8, 0.3],[2.8, -0.4 , 2.1], textureBg, 4)
          createCubeLevel1([0.4, 0.8, 0.3],[2.8, -0.4 , 2.4], textureBg, 4)



          // createCube([1.8, 1.6, height],[3.4, -0.05 , height], null, 3)
          // createCube([1.8, 1.6, height],[3.4, -0.05 , height], null, 3)




          createCubeOutLine([1.8, 1.1, height],[3.4, -1.4 , height], null, 2)
          createCubeOutLine([1.8, 1.0, height],[3.4, -2.45, height], null, 1)
          // 厕所女
          createCubeOutLine([1.8, 0.8, height],[3.4, -3.35, height], null, 0)
          createCubeOutLine([1.8, 0.8, height],[3.4, -4.15, height], null, 3)
          // 4-203 / 4-204
          createCubeOutLine([1.8, 1.2, height],[3.4, -5.15, height], null, 1)
          createCubeOutLine([1.8, 1.2, height],[3.4, -6.35, height], null, 2)

          createCubeOutLine([1.8, 0.8, height],[3.4, -7.35, height], null, 3)
          createCubeOutLine([1.8, 0.8, height],[3.4, -8.15, height], null, 0)
          createCubeOutLine([1.8, 0.8, height],[3.4, -8.95, height], null, 1)
          function useBSP(bigGeometries, smallGeometries){
            const bigGeometriesBSP = new ThreeBSP(bigGeometries)
            const smallGeometriesBSP = new ThreeBSP(smallGeometries)
            const resultBSP = bigGeometriesBSP.subtract(smallGeometriesBSP)
            const result = resultBSP.toMesh()
            result.geometry.computeFaceNormals()
            result.geometry.computeVertexNormals()
            return result
          }
          // 创建房间框的函数
          function createCubeOutLine(size,position, texture,colorIndex, doorSide){
            const [w,h,o] = size
            const [x,y,z] = position
            const up = y + h/2 - 0.05
            const down = y - h/2 + 0.05
            const left = x - w/2 + 0.05
            const right =  x + w/2 - 0.05

            if(doorSide === 'left'){
            // 左边开槽
            // 建糟
              //  左
              const bigCube = createCubeNotAdd([0.1, h, o],[left, y, z], texture, colorIndex)
              const smallCube =  createCubeNotAdd([0.1, h/3, o],[left, y, z], texture, colorIndex)
              console.log(bigCube)
              const res = useBSP(bigCube, smallCube)
              // group.add(res)
              // 上
              createCube([w, 0.1, o],[x, up, z], texture, colorIndex)
              // 下
              createCube([w, 0.1, o],[x, down, z], texture, colorIndex)
              // 右
              createCube([0.1, h, o],[right, y, z], texture, colorIndex)
            } else if (doorSide === 'right'){

            }
            //  地板
            createCube([w-0.2,h-0.2, 0.1],[x,y, 0.9], textureBg, 8)
          }
          // 以下都是装饰
          // 电脑屏
          createCubeLevel1([1,0.1,1],[0.15,-2.7,4.1],textureComputer,8)
          createCubeLevel1([1,0.1,1],[1.15,-2.7,4.1],textureComputerRight,8)
          // 电视屏
          createCubeLevel1([1,0.1,1],[0.15,-5.3,4.1],textureTv,8)
          createCubeLevel1([1,0.1,1],[1.15,-5.3,4.1],textureTvRight,8)
          // 花盆
          function createCubeTransparent (size, position, texture, colorIndex){
            const geometry = new THREE.BoxGeometry(...size);
            const material = new THREE.MeshToonMaterial( {
              color: colors[colorIndex],
              map: texture,
              transparent: true,
              depthTest: false,
              side: THREE.DoubleSide
            }  );
            const cube =  new THREE.Mesh( geometry, material );
            const [x,y,z] = position
            cube.position.set(x,y,z/2+0.01 )
            group.add( cube );
          }
          function createPlant(position){
            const geometry = new THREE.CylinderGeometry( 0.2, 0.15, 0.3, 32 );
            const material = new THREE.MeshToonMaterial( {color: 0xAAAAAA} );
            const cylinder = new THREE.Mesh( geometry, material );
            const [x,y,z] = position
            cylinder.position.set(x,y,1.5)
            cylinder.rotation.x = Math.PI / 2
            group.add( cylinder );
            createCubeTransparent([0.5,0.05,0.8],position,texturePlant,8)

          }
          createPlant([1.55,-3.0,4.1])
          createPlant([1.55,-5.8,4.1])
          createPlant([-2.30,-3.0,4.1])
          createPlant([-2.30,-6.5,4.1])
          //透明门的创建
          createCubeTransparent([1,0.05,2],[0,0,0],textureDoorTsp,8)
          //透明窗的创建
          createCubeTransparent([2,0.05,1],[1,1,4], textureWindowTsp,8)

          // 老师办公室 右
          createCubeOutLine([2.6, 2.6, height],[0.7, -6.45, height], null, 2,'left')
          createCubeOutLine([2.6, 2.6, height],[0.7, -3.85, height], null, 0,'left')

          // 老师办公室 左
          createCubeOutLine([2.6, 1.8, height],[-3.0, -3.35, height], null, 3,'right')
          createCubeOutLine([2.6, 1.8, height],[-3.0, -5.15, height], null, 0,'right')
          createCubeOutLine([2.6, 1.8, height],[-3.0, -6.95, height], null, 1,'right')
          //挡板
          createCube([0.6, 0.1, height],[-0.9, -3.35, height], null, 4)
          createCube([0.6, 0.1, height],[-0.9, -6.85, height], null, 4)
          // 桌子
          const heightTable = 0.9
          createCube([0.4, 0.6, heightTable],[-1, -4.35, heightTable], null, 3)
          createCube([0.4, 0.6, heightTable],[-1, -5.95, heightTable], null, 3)
          // 椅子

          function createChart(position){
            const geometry = new THREE.CylinderBufferGeometry( 0.1, 0.1, 0.6, 32 );
            const material = new THREE.MeshBasicMaterial( {color: 0x666666} );
            const cylinder = new THREE.Mesh( geometry, material );
            cylinder.position.set(...position)
            cylinder.rotation.x = Math.PI / 2

            group.add( cylinder );
          }


          createChart([-1.4, -4.25, height])
          createChart([-1.4, -4.55, height])
          createChart([-1.4, -5.95, height])
          createChart([-1.4, -6.25, height])

          // createCube([1.8, 1.6, height],[3.3, 3.45 , height], null, 1)
          // createCube(materialPink, [1, 1, 0.2],[0.2, 2, 0.2])
          // createCube(materialBlue, [1, 1, 0.2],[1.2, 2, 0.2])

          const controls = new OrbitControls(camera, renderer.domElement);
          controls.update();
          // 接受阴影的平面
          const planeGeometry = new THREE.PlaneBufferGeometry( 11, 19.5, 32, 32 );

          const plane = new THREE.Mesh( planeGeometry, planeMaterial );
          plane.receiveShadow = true;
          console.log(group)
          plane.position.set(0,-2,0)
          group.position.set(0,1.5,0)
          group.add( plane )

          // 平行光
          const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
          directionalLight.position.set(0, 0, 20);
          directionalLight.castShadow = true

          directionalLight.shadow.mapSize.width = 512; // default
          directionalLight.shadow.mapSize.height = 512; // default
          directionalLight.shadow.camera.near = 0.5; // default
          directionalLight.shadow.camera.far = 500; // default


          scene.add( directionalLight );
          scene.add(group);



          camera.position.z = 25
          camera.lookAt( 0, -1, 0)

          group.rotation.x += 0;

          function render() {
            canvas.requestAnimationFrame(render);
            // mesh.rotation.x += 0.005;
            // mesh.rotation.y += 0.01;
            controls.update();
            renderer.render(scene, camera);
          }

          render()
    })


  },

    /**
     * 生命周期函数--监听页面显示
     */
    touchStart(e) {
      THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
    },
    touchMove(e) {
      THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
    },
    touchEnd(e) {
      THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
    },
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */

  onUnload: function () {
    //  释放canvas
    THREE.global.unregisterCanvas(this.data.canvasId)
  },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
