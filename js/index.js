(function () {
  var ww; //视口宽度
  //设置默认字体大小函数
  function setFont() {
    ww = document.documentElement.clientWidth; //获取视口宽度
    var designWidth = 750; //设计稿宽度
    document.documentElement.style.fontSize = (ww * 100) / designWidth + "px";
  }
  // 视频播放按钮
  var playBtn = document.getElementsByClassName("playBtn")[0];
  var zheping = document.getElementById("zheping");
  var closeBtn = document.getElementsByClassName("closeBtn")[0];
  //播放功能
  var video = document.getElementById("myvideo");
  function playBtnFn() {
    //显示遮屏并播放视频
    zheping.style.display = "block";
    video.play();
    playBtn.classList.remove("pl");
    playBtn.classList.add("cl");
  }
  //停止播放功能
  function closeBtnFn() {
    zheping.style.display = "none";
    video.pause();
    playBtn.classList.remove("cl");
    playBtn.classList.add("pl");
  }
  // 新闻区域图片轮播功能
  var timer = null; //这是一个定时器
  var currentIndex = 0; //当前下标
  var swiperImgItem = $(".swiperContain .swiperImg li");
  //console.log(swiperImgItem);
  //定义一个定时器启动函数
  function AutoSlider() {
    timer = setInterval(function () {
      currentIndex++;
      currentIndex = currentIndex % 4;
      changeImg();
    }, 5000);
  }
  //定义一个停止定时器的函数
  function stopSlider() {
    clearInterval(timer);
    timer = null;
  }
  var swiperDots = $(".swiperDots"); //获取小圆点对象
  var items = swiperDots.children;
  // 定义图片跳转函数
  function changeImg() {
    //console.log(currentIndex);
    var l = -(currentIndex * 6.4);
    //console.log(l);
    $(".swiperImg").style.marginLeft = l + "rem";
    //移除类样式并重新添加
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove("active");
    }
    items[currentIndex].classList.add("active");
  }
  swiperDots.onclick = function () {
    var e = e || event,
      tar = tar || event.target;
    //console.log(e.target);
    if (e.target.dataset.id) {
      //获取到对应的下标
      var num = e.target.dataset.id;
      stopSlider(); //停止定时器
      //移除类样式
      for (var i = 0; i < items.length; i++) {
        items[i].classList.remove("active");
      }
      currentIndex = num;
      //console.log(currentIndex);
      items[currentIndex].classList.add("active");
      changeImg();
      AutoSlider();
    }
  };
  //手指按下事件
  var swiperContain = $(".swiperContain");
  swiperContain.ontouchstart = function (ev) {
    stopSlider(); //停止定时器
    //获取手指按下时的第一次坐标
    var x = ev.touches[0].clientX;
    var y = ev.touches[0].clientY;
    //console.log(x, y);
    var chazhi;
    var newL;
    swiperContain.ontouchmove = function (ev) {
      //console.log('移动');
      //清除图片框的过度效果，不然会有延迟
      $(".swiperImg").style.transition = "none";
      chazhi = ev.touches[0].clientX - x; //移动的距离
      //console.log(ev.touches[0].clientX);
      var size = parseInt(document.documentElement.style.fontSize);
      l = -(currentIndex * 6.4) * size;
      newL = l + chazhi;
      //console.log(chazhi);
      if (newL > 0) {
        newL = 0;
      } else if (newL < -19.2 * size) {
        newL = -19.2 * size;
      } else {
        newL = newL;
      }
      $(".swiperImg").style.marginLeft = newL + "px";
      //定义手指松开时执行的函数
      swiperContain.ontouchend = function (ev) {
        if (chazhi > 30 || chazhi < -30) {
          if (chazhi > 0) {
            if (currentIndex <= 0) {
              currentIndex = currentIndex;
            } else {
              currentIndex = --currentIndex % 4;
            }
          } else {
            if (currentIndex >= 3) {
              currentIndex = currentIndex;
            } else {
              currentIndex = ++currentIndex % 4;
            }
          }
        } else {
          currentIndex = currentIndex;
        }
        //图片跳转  定时器开启 打开图片框的过渡效果
        changeImg();
        AutoSlider();
        $(".swiperImg").style.transition = "all 0.6s";
        //手指松开始把手指移动和手指松开事件清除
        swiperContain.ontouchmove = null;
        swiperContain.ontouchend = null;
      };
    };
  };
  //绑定新闻导航点击事件获取相应的数据
  function newsClick(data){
    switch(~~data){
      case 0:{
        ajax({
          type: "GET",
          url: "json/lastest.json",
          success: function (res) {
            rendList(JSON.parse(res));
          },
        })
        break;
      }
      case 1:{
        ajax({
          type: "GET",
          url: "json/news.json",
          success: function (res) {
            rendList(JSON.parse(res));
          },
        })
        break;
      }
      case 2:{
        ajax({
          type: "GET",
          url: "json/notice.json",
          success: function (res) {
            rendList(JSON.parse(res));
          },
        })
        break;
      }
      case 3:{
        ajax({
          type: "GET",
          url: "json/event.json",
          success: function (res) {
            rendList(JSON.parse(res));
          },
        })
        break;
      }
    }
  }
  //入口函数
  function init() {
    playBtn.addEventListener("click", playBtnFn);
    closeBtn.addEventListener("click", closeBtnFn);
    setFont();
    window.addEventListener("resize", setFont);
    AutoSlider();

    //菜单点击事件
    $('.menu').onclick=function(){
      $('.hanbaomenu').style.display="block";
    }
    $('.close .closeBtn').onclick=function(){
      $('.hanbaomenu').style.display="none";
    }
    //监听页面滚动事件,显示导航栏
    $('.main').onscroll=function(){
      var top=$('.main').scrollTop;
      if(top>30){
        $('.main .header').style.display="block";
        $('.main #firstScreen .logo').style.display="none";
      }else{
        $('.main .header').style.display="none";
        $('.main #firstScreen .logo').style.display="block";
      }
    }
    //新闻区域信息获取
    newsClick(0);
    // ajax({
    //   type: "GET",
    //   url: "json/event.json",
    //   success: function (res) {
    //     rendList(JSON.parse(res));
    //   },
    // });

    //新闻导航栏绑定点击事件
    $('.newsTable').onclick=function(e){
      var e=e||event,
          tar=tar||event.target;
      var index=tar.dataset.id;
      if(tar.dataset.id){
        $('.newsTable .active').classList.remove('active');
      $$('.newsTableItem')[index].classList.add('active');
      newsClick(index);
      }
      
    }

    //获取尾部数据
    ajax({
      type: "GET",
      url: "components/footer.html",
      success: function (res) {
        $("#footerScreen").innerHTML = res;
      },
    });
  }

  init();
})();
