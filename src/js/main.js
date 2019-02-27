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


; (function () {
  ////生成商品列表
  $.ajax({
    url: 'php/index.php',
    dataType: 'json'
  }).done(function (data) {
    var strhtml = '<ul class="goodslist-box">';
    $.each(data, function (index, value) {
      var url_sy = value.url.split(",")[0]; //多个地址去第一个
      console.log(url_sy)
      strhtml +=
        `<li>
           <a href="http://localhost/mll/src/detail.html?gid=${value.gid}">
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