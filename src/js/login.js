; (function () {

  var $login = $('#main .submit-btn');


  //如果有cookie,就读入cookie;
  if (getcookie('phonenum') && getcookie('password')) {
    $username = getcookie('phonenum');
    $password = getcookie('password');
  }



  //点击登陆,进行账号和密码的匹配
  $login.on('click', function () {
    $.ajax({
      type: 'post',
      url: 'http://10.31.162.184/mll/src/php/login.php',
      data: {
        phone: $('#phone').val(),
        password: $('#password').val()
      },
      datatype: 'json'
    })
      .done(function (data) {
        if (!data) { //返回false
          $('.error-date').css('display','block');
          $phone = '';
          $password = '';
        } else {
          addcookie('phonenum', $('#phone').val(), 30);
          location.href = 'http://10.31.162.184/mll/src/index.html';

        }

      });
  });

  //工具方法
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

})();