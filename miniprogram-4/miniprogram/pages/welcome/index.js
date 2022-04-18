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
            colors: ['#F6F5CD80', '#FFD5C080', '#EE9BA680', '#6555A080', '#554D4B80', '#8F9E6680'],
            bg: 'http://www.huangjinyu.xyz/imgTemp/1_r.png'
          },
            {
              colors: ['#EEF3F980', '#DFEAF580', '#C5D9EF80', '#A69B9580', '#CD73B080', '#F6D3E980'],
              bg: 'http://www.huangjinyu.xyz/imgTemp/2_r.png'
            },
            {
              colors: ['#F7F6D380', '#ECE49F80', '#E0CE8680', '#C4B76880', '#635D5880', '#B1CAE680'],
              bg: 'http://www.huangjinyu.xyz/imgTemp/3_r.png'
            },
            {
              colors: ['#C9D7B980', '#84759480', '#8192B180', '#A0B6CF80', '#B7CAD980', '#D7DCE180'],
              bg: 'http://www.huangjinyu.xyz/imgTemp/4_r.png'
            },
            {
              colors: ['#E5E4DD80', '#CDD8D280', '#A7B18D80', '#79575980', '#F2949C80', '#F8E2DC80'],
              bg: 'http://www.huangjinyu.xyz/imgTemp/5_r.png'
            },
          {
            colors: ['#F8F8E680', '#E0DAF080', '#C4BFE380', '#9985B280', '#6D5B7480', '#97709580'],
            bg: 'http://www.huangjinyu.xyz/imgTemp/6_r.png'
          },
          {
            colors: ['#DEB6E480', '#C986C480', '#A0569280', '#873A7280', '#3A363680', '#53694A80'],
            bg: 'http://www.huangjinyu.xyz/imgTemp/7_r.png'
          },
          {
            colors: ['#E8EDEC80', '#D7D4F480', '#C5B5E480', '#8E6CA880', '#758C7180', '#F2D5A480'],
            bg: 'http://www.huangjinyu.xyz/imgTemp/8_r.png'
          },
          {
            colors: ['#A97DC580', '#8C5AA680', '#4E496480', '#D995D380', '#EEC0EC80', '#E7DEEB80'],
            bg: 'http://www.huangjinyu.xyz/imgTemp/9_r.png'
          },
          {
            colors: ['#FBEBEA80', '#FAE4D980', '#FBD7AC80', '#F1AF7980', '#48565080', '#ADBF7380'],
            bg: 'http://www.huangjinyu.xyz/imgTemp/10_r.png'
          },
          ]
        )
        const that = this
        wx.login({
          success (res) {
            console.log(res)
            wx.showLoading({
              title: '加载中',
            })
            if (res.code) {
              wx.request({
                url: `https://wx.request.huangjinyu.xyz:8100/wx_login/login?role=${that.data.radio}&name=${that.data.name}&themeIndex=${that.data.theme}&code=${res.code}`,
                success(res) {
                  try{
                    console.log(res.data.openid)
                    wx.setStorageSync('openid', res.data.openid)
                  }catch (err){}
                }
              })
              wx.reLaunch({
                url: '../front-page/front-page'
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })


      } catch (e) {}
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
