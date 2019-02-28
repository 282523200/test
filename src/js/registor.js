; (function () {

  $(function () {
    $('#user_login').validate({


      rules: {
        username: {
          required: true,
          minlength: 2,
          maxlength: 20,

        },
        password: {
          required: true,
          minlength: 6
        },
        checkpassword: {
          required: true,
          equalTo: '#checkpassword' //id password
        },
        userphone: {
          required: true,
          isMobile: true,
          remote: {
            type: 'post',
            url: 'http://10.31.162.184/mll/src/php/registor.php'
          }
        }
      },

      messages: {
        username: {
          required: '用户名不能为空',
          minlength: '用户名不能小于2',
          maxlength: '用户名不能大于10'
        },
        password: {
          required: '密码不能为空',
          minlength: '密码不能小于6位'
        },
        checkpassword: {
          required: '密码重复不能为空',
          equalTo: '密码不匹配'
        },
        userphone: {
          required: '电子邮箱不能为空',
          isMobile: '你输入的格式有误',
          remote: '手机号码已经存在'
        }
      }


    });
  });

  $.validator.addMethod("isMobile", function (value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
  }, "请正确填写您的手机号码");

  $.validator.setDefaults({
    //添加校验成功后的执行函数--修改提示内容，并为正确提示信息添加新的样式(默认是valid)
    success: function (label) {
      console.log(1);
      label.text('√').css('color', 'green').addClass('valid');

    }
  });
  $('.regi_btn').on('click', function () {
    addcookie('phonenum', $('.userphone').val(), 10);
  });


  function addcookie(key, value, days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = `${key} = ${encodeURI(value)}; expires = ${date}`;
  }


})();
