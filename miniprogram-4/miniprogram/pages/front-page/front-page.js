// pages/front-page/front-page.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        message1:true,
        message2:false,
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
      url: "../../packageA/pages/vrPage/index"
    })
  },
  onLinkThreeD:function (){
    wx.navigateTo({
      url: "../../packageA/pages/threeMap/index"
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
