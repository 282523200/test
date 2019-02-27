

//cookie存储
; (function () { //
  function addcookie(key, value, days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = `${key} = ${encodeURI(value)}; expires = ${date}`;
  }

  function getcookie(key) {
    var arr = decodeURI(document.cookie).split('; ');
    for (var i = 0; i < arr.length; i++) {
      arr1 = arr[i].split('=');
      if (arr1[0] == key) {
        return arr1[1];
      }
    }
  }
  function delcookie(key) {
    addCookie(key, '', -1);
  }

  if (getcookie('phonenum')) {
    var v = getcookie('phonenum') + "你好!";


    $(' #top .login-tip .log').html(v);
  }







})();

//生成商品列表
; (function () {

  $.ajax({
    url: 'php/index.php',
    dataType: 'json'
  }).done(function (data) {
    var strhtml = '<ul class="goodslist-box">';
    $.each(data, function (index, value) {
      var url_sy = value.url.split(",")[0]; //多个地址去第一个
      strhtml +=
     
        `<li>
           <a href="http://10.31.162.184/mll/src/detail.html?gid=${value.gid}">
            <img src="${url_sy}" alt="" index="${value.gid}" style="width:285px;height:285px"></a>
            <p class="name">
              <a href="#">${value.title}</a>
            </p>
            <p class="price">¥ <span class="JS_async_price">${value.price}</span>
            </p>
          </li>`;
    });
    strhtml += '</ul>';

    $('.goodslist').html(strhtml);







  })
})();

//商品列表弹框
; (function () {
  $('.cat-item').hover(function () {
    //显示
    $(this).find('.sub-cat').css("display", "block");
    //文字颜色
    $(this).find('.txt a').css("color", "white");
    //文字位置
    $(this).find('.txt').css("left", "52px");
    //图标
    $(this).find('i').css("left", "17px");
  }, function () {
    $(this).find('.sub-cat').css("display", "none");
    $(this).find('.txt a').css("color", "#c8c8c8");
    //图标
    $(this).find('i').css("left", "15px");
    //文字位置
    $(this).find('.txt').css("left", "50px");
  });
})();



//top下拉
; (function () {
  $('.a1').hover(function () {
    $('.drop-down-content1').show();
  }, function () {
    $('.drop-down-content1').hide();
  });

  $('.drop-down-content1').hover(function () {
    $('.drop-down-content1').show();
  }, function () {
    $('.drop-down-content1').hide();
  });
})();

