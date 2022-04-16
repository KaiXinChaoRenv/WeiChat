
// pages/curriculum/curriculum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:'',
    name:'',//姓名
    Remark:'',//备注
    office:'',//办公室
    job_title:'',//职务
    counselor:true
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
    const that = this
    wx.request({
      url: 'https://wx.request.huangjinyu.xyz:8100//wx_login/%E6%95%99%E5%B8%88%E4%BA%8C%E7%BB%B4%E7%A0%81?openid=o1zkW5DTS4s68Bgt3f0t1Tlgchu4&name=%E9%87%91%E5%85%B0',
      success(res){
        console.log(res)
        that.setData({
          image:res.data.data,
          name:res.data.info.姓名,
          office:res.data.info.办公室,
          Remark:res.data.info.备注,
          job_title:res.data.info.职务,
        })
        
      }
    })
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