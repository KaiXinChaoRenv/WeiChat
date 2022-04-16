// pages/welcome/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '选择身份',
      },
      {
        text: '输入信息',
      },
      {
        text: '选择主题',
      }

    ],
    active: 0,
    radio: '1',
    chooseStatue: false,
    name: '',
    userInfo: null,
    theme: 0
  },


  onChange(event) {
    this.setData({
      radio: event.detail,
    })
  },

  onClick(event) {
    const {name} = event.currentTarget.dataset
    this.setData({
      radio: name,
    })
  },
  nextStep() {
    console.log(234, this.data.name, this.data.userInfo)
    if (this.data.active === 1) {
      if (this.data.name === '' || this.data.length > 4) {
        wx.showToast({
          title: '请输入合法真实姓名',
          icon: 'none',
          duration: 1000
        })
        return
      }
      if (this.data.userInfo === null) {
        wx.showToast({
          title: '请输入获取头像和昵称',
          icon: 'none',
          duration: 1000
        })
        return
      }
    }
    if (this.data.active === 2) {
      try {
        wx.setStorageSync('role', this.data.radio)
        wx.setStorageSync('userInfo', this.data.userInfo)
        wx.setStorageSync('name', this.data.name)
        wx.setStorageSync('themeIndex', this.data.theme)
        wx.setStorageSync('themeArray', [
          {
            colors: ['#F0ECEB80', '#F5F2BD80', '#DBC65980', '#8FA05980', '#A6BA4B80', '#D5E39480'],
            bg: 'http://www.chenxv.link/imgTemp/1_r.jpg'
          },
            {
              colors: ['#D0D9E880', '#E0D1D680', '#94B6C280', '#3A436280', '#92B1D080', '#25305E80'],
              bg: 'http://www.chenxv.link/imgTemp/2_r.jpg'
            },
            {
              colors: ['#D8D3D980', '#C0BBDB80', '#766BB080', '#4C417980', '#685C6080', '#C8A56380'],
              bg: 'http://www.chenxv.link/imgTemp/3_r.jpg'
            },
            {
              colors: ['#D1CDC480', '#987E6780', '#75533080', '#AF703B80', '#DCA82E80', '#E4CDA180'],
              bg: 'http://www.chenxv.link/imgTemp/4_r.jpg'
            },
            {
              colors: ['#D5CCC580', '#D66B7580', '#EDBFB280', '#91875480', '#E2D69C80', '#E0959280'],
              bg: 'http://www.chenxv.link/imgTemp/5_r.jpg'
            },
          ]
        )

        wx.reLaunch({
          url: '../front-page/front-page'
        })
      } catch (e) {
      }
    }
    this.setData({
      active: this.data.active + 1
    })

  },
  getUserData(e) {
    console.log(123)
    console.log(e.detail)
  },

  getUserIcon(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({
          userInfo: {
            avatarUrl: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName
          }
        })
      }
    })
  },

  chooseTheme(e) {
    const dataset = e.currentTarget.dataset
    const id = dataset.id
    this.setData({
      theme: id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try{
      const index  = wx.getStorageSync('themeIndex')
      if(index){
        wx.reLaunch({
          url: '../front-page/front-page'
        })
      }
    }catch (e){}
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
