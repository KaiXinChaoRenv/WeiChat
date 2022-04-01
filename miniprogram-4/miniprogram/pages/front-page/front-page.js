// pages/front-page/front-page.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        message1:true,
        message2:false,
        timer: '',
        timerMessage: '',
        array:[
            {
                question:'亲们质量怎么样 是棉的吗?',
                answer:'是的'
            },
            {
                question:'会起球吗？',
                answer:'不会'
            },
            {
                question:'我想买厚一点的会不会薄',
                answer:'不会呀'
            },
        ]
    },
    Liu1:function(){
        this.setData({
            message1:true,
            message2:false
        })

    },
    Read:function(){
        this.setData({
            message1:false,
            message2:true
        })

    },
  onLinkIndex:function (){
    wx.navigateTo({
      url: "../../packageA/pages/index/index"
    })
  },
  onLinkVr:function (){
    wx.navigateTo({
      url: "/pages/vrPage/index"
    })
  },
  onLinkThreeD:function (){
    wx.navigateTo({
      url: "/pages/threeMap/index"
    })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      const now = Date.now()
      const Hours = new Date().getHours(now)
      console.log(typeof Hours,Hours)
      if( Hours >=18 ||( 4 > Hours && Hours>=0)){
        this.setData({
          timer: '晚上好',
          timerMessage: '今天学习任务完成的怎么样了？'
        })
      }else if(11>Hours && Hours>=4){
        this.setData({
          timer: '早上好',
          timerMessage: '一日之计在于晨，让我们一起学习吧。'
        })
      }else if(2>Hours && Hours>=11){
        this.setData({
          timer: '中午好',
          timerMessage: '午后时光，需要脑休，看看视频，洗洗眼睛，来点放松。'
        })
      }else {
        this.setData({
          timer: '下午好',
          timerMessage: '下午好下午好下午好'
        })
      }


    },

    /**
     * 生命周期函数--监听页面显示
     */
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
