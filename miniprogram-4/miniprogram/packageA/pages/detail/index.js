// pages/detail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [],
    array: []
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    const roomId = options.key
    wx.setNavigationBarTitle({
      title: roomId  //修改title
    })
    wx.request({
      url: `https://wx.request.chenxv.link:8002/学院信息查询/办公室查询/${roomId}`, //仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data[0])
        const data  = res.data[0]
        that.setData({
          array: data.教师信息
        })
      }
    })
  }
  ,

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
  ,

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
  ,

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  }
  ,

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  }
  ,

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
  ,

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
  ,

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
