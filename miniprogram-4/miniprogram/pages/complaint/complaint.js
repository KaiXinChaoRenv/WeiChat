// pages/complaint/complaint.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      result: [],
      array:[{
        num:"功能建议",
        question1:"功能建议"
      },{
        num:"数据修正",
        question1:"数据修正"
      },{
        num:"问题补充",
        question1:"问题补充"
      }
      ],
      isDisabled: true,
      detail: '',
      connect: ''
    },

    onChange(event) {
      this.setData({
        result: event.detail,
      });
      this.judgeVail()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
  detailInput:function (e){
      if(e.detail.value.length > 0){
        this.setData({
          detail: e.detail.value
        })
      }
    this.judgeVail()
  },
  connectInput:function (e){
    if(e.detail.value.length > 0){
      this.setData({
        connect: e.detail.value
      })
    }
    this.judgeVail()
  },
  judgeVail(){
    if(this.data.detail.length >= 10 && this.data.result.length > 0 ){
        this.setData({
          isDisabled: false
        })
      }else {
        this.setData({
          isDisabled: true
        })
      }

  },
  onsubmit(){
      if(this.data.isDisabled){
        if (this.data.result.length === 0){
          wx.showToast({
            title: '请选择问题类型',
            icon: 'none',
            duration: 1000
          })
        }else if(this.data.detail.length < 10){
          wx.showToast({
            title: '请输入不少于十字的描述',
            icon: 'none',
            duration: 1000
          })
        }

        return
      }
      console.log({
        choose: this.data.result,
        detail: this.data.detail,
        connect: this.data.connect
      })
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 1000,

    })
    setTimeout(()=>{
        wx.reLaunch({
          url: "/pages/my/my"
        })
    },1000)

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
