// pages/threeMap/index.js
// import { createScopedThreejs } from 'threejs-miniprogram'
import * as THREE from "../../libs/three.weapp"
import { OrbitControls } from '../../jsm/controls/OrbitControls'
// const imgLou = require()
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
          console.log(res,1213)
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
          const colors = [0xDAC6AB,0xD4C7C7,0xAEC3D6,0xc9c3bd,0x888888]
          // const colors = [0xCFFFFE ,0xF9F7D9 ,0xFCE2CE ,0xFFC1F3,0x888888]
          const group = new THREE.Group();

          // 创建函数
          var texture = new THREE.TextureLoader().load('../image/楼梯.png', function (res) {
            renderer.render(scene, camera);
            console.log('success', res);
          }, undefined, function (err) {
            console.log('err', err);
          });
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          function createCube (size, position, texture, colorIndex){
            const geometry = new THREE.BoxGeometry(...size);
            const material = new THREE.MeshPhongMaterial( {
              color: colors[colorIndex],
              // clipIntersection: true,
              map: texture,

              // clippingPlanes : clip,
              side: THREE.DoubleSide
            }  );
            const cube =  new THREE.Mesh( geometry, material );
            cube.position.set(...position)
            group.add( cube );
          }
          // 切割面
          const clipPlane = [
            // 延yoz平面切割 -2.2, 5 , 0.3
            new THREE.Plane(new THREE.Vector3(-1, 0, 0), -1.9),
            new THREE.Plane(new THREE.Vector3(0, 1, 0), -4.9),
            new THREE.Plane(new THREE.Vector3(0, 0, -1), 0),
          ];
          // 魏
          createCube([1.5, 1.5, 0.3],[-3.4, 5 , 0.3], null, 0)
          // 蔡
          createCube([1.1, 1.6, 0.3],[-3.6, 3.5 , 0.3], null, 2)
          // 203
          createCube([1.1, 1.6, 0.3],[-3.6, 1.9 , 0.3], null, 1)
          // 梁
          createCube([1.4, 2, 0.3],[-2.0, 4.75 , 0.3], null, 3)
          createCube([1.4, 1.2, 0.3],[-2.0, 3.15 , 0.3], null, 0)
          createCube([0.8, 3.2, 0.3],[-0.9, 4.15 , 0.3], null, 2)
          createCube([0.8, 3.2, 0.3],[-0.1, 4.15 , 0.3], null, 1)
          createCube([0.8, 3.2, 0.3],[0.7, 4.15 , 0.3], null, 2)
          createCube([0.8, 3.2, 0.3],[1.5, 4.15 , 0.3], null, 3)

          createCube([1.2, 2.2, 0.3],[2.5, 4.65 , 0.3], null, 1)
          createCube([1.2, 2.6, 0.3],[3.7, 4.45 , 0.3], null, 0)
          createCube([1.8, 1.2, 0.3],[3.4, 2.55 , 0.3], null, 2)
          createCube([1.8, 1.2, 0.3],[3.4, 1.35 , 0.3], null, 0)

          createCube([1.8, 1.6, 0.3],[3.4, -0.05 , 0.3], texture, 3)
          createCube([1.8, 1.1, 0.3],[3.4, -1.4 , 0.3], null, 2)
          createCube([1.8, 1.0, 0.3],[3.4, -2.45, 0.3], null, 1)
          // 厕所女
          createCube([1.8, 0.8, 0.3],[3.4, -3.35, 0.3], null, 0)
          createCube([1.8, 0.8, 0.3],[3.4, -4.15, 0.3], null, 3)
          // 4-203 / 4-204
          createCube([1.8, 1.2, 0.3],[3.4, -5.15, 0.3], null, 1)
          createCube([1.8, 1.2, 0.3],[3.4, -6.35, 0.3], null, 2)

          createCube([1.8, 0.8, 0.3],[3.4, -7.35, 0.3], null, 3)
          createCube([1.8, 0.8, 0.3],[3.4, -8.15, 0.3], null, 0)
          createCube([1.8, 0.8, 0.3],[3.4, -8.95, 0.3], null, 1)

          // 老师办公室 右
          createCube([2.6, 2.6, 0.3],[0.7, -3.35, 0.3], null, 0)
          createCube([2.6, 2.6, 0.3],[0.7, -5.95, 0.3], null, 2)
          // 老师办公室 左
          createCube([2.6, 1.8, 0.3],[-3.0, -2.85, 0.3], null, 3)
          createCube([2.6, 1.8, 0.3],[-3.0, -4.65, 0.3], null, 0)
          createCube([2.6, 1.8, 0.3],[-3.0, -6.45, 0.3], null, 1)
          //挡板
          createCube([0.6, 0.1, 0.3],[-0.9, -2.85, 0.3], null, 4)
          createCube([0.6, 0.1, 0.3],[-0.9, -6.45, 0.3], null, 4)
          // 桌子
          createCube([0.4, 0.6, 0.3],[-1, -3.85, 0.3], null, 3)
          createCube([0.4, 0.6, 0.3],[-1, -5.55, 0.3], null, 3)
          // 椅子

          function createChart(position){
            const geometry = new THREE.CylinderBufferGeometry( 0.1, 0.1, 0.2, 32 );
            const material = new THREE.MeshBasicMaterial( {color: 0x888888} );
            const cylinder = new THREE.Mesh( geometry, material );
            cylinder.position.set(...position)
            cylinder.rotation.x = Math.PI / 2
            group.add( cylinder );
          }

          createChart([-1.4, -3.75, 0.3])
          createChart([-1.4, -4.05, 0.3])
          createChart([-1.4, -5.45, 0.3])
          createChart([-1.4, -5.75, 0.3])

          // createCube([1.8, 1.6, 0.3],[3.3, 3.45 , 0.3], null, 1)
          // createCube(materialPink, [1, 1, 0.2],[0.2, 2, 0.2])
          // createCube(materialBlue, [1, 1, 0.2],[1.2, 2, 0.2])

          const controls = new OrbitControls(camera, renderer.domElement);
          controls.update();
          // 接受阴影的平面
          const planeGeometry = new THREE.PlaneBufferGeometry( 11, 19.5, 32, 32 );
          const planeMaterial = new THREE.MeshLambertMaterial( {
            color: 0xeeeeee,
            side: THREE.DoubleSide
          } )
          const plane = new THREE.Mesh( planeGeometry, planeMaterial );
          plane.receiveShadow = true;
          console.log(group)
          plane.position.set(0,-2,0)
          group.position.set(0,1.5,0)
          group.add( plane )

          // 平行光
          const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
          directionalLight.position.set(0, 3, 10);
          directionalLight.castShadow = true

          directionalLight.shadow.mapSize.width = 512; // default
          directionalLight.shadow.mapSize.height = 512; // default
          directionalLight.shadow.camera.near = 0.5; // default
          directionalLight.shadow.camera.far = 500; // default






          scene.add( directionalLight );
          scene.add(group);



          camera.position.z = 22;
          camera.lookAt( 0, -1, 0)
          // group.rotation.x +=  -Math.PI /3;
          // function animate() {
          //
          //   group.rotation.x += 0.001;
          //   group.rotation.y += 0.001;
          //   renderer.render(scene, camera);
          // }
          group.rotation.x += 0;
          // group.rotation.y += Math.PI / 6;
          // renderer.render(scene, camera);
          //
          // setInterval(()=>{
          //   animate()
          // }, 16/1000)
          function render() {
            canvas.requestAnimationFrame(render);
            // mesh.rotation.x += 0.005;
            // mesh.rotation.y += 0.01;
            controls.update();
            renderer.render(scene, camera);
          }

          render()
    })},

    /**
     * 生命周期函数--监听页面显示
     */
    touchStart(e) {
      THREE.global.touchEventHandlerFactory('canvas', 'touchstart1')(e)
    },
    touchMove(e) {
      THREE.global.touchEventHandlerFactory('canvas', 'touchmove1')(e)
    },
    touchEnd(e) {
      THREE.global.touchEventHandlerFactory('canvas', 'touchend1')(e)
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
