// pages/exchangeImg/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      theme: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
  nextStep(){
    try{
      wx.setStorageSync('themeIndex', this.data.theme)
      wx.reLaunch({
        url: '../my/my'
      })
    }catch (err){}
  },
  chooseTheme(e) {
    const dataset = e.currentTarget.dataset
    const id = dataset.id
    this.setData({
      theme: id
    })
  },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      try{
        const active = wx.getStorageSync('themeIndex')
        this.setData({
          theme: active
        })
      }catch (e){}
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
