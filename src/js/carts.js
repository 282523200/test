!function () {
  //1.渲染商品列表, 传入两个参数，一个id和数量，根据id和数量渲染整个可见的列表.


  function goodslist(id, count) {
    $.ajax({
      url: 'php/carts.php',//引入的文件起点在html
      dataType: 'json'
    }).done(function (data) {
      //console.log(data);
      $.each(data, function (index, value) {
        if (id == value.gid) {//遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
          var $clonebox = $('.onelist:hidden').clone(true, true);
          

          $clonebox.find('.goods-pic').find('img').attr('src', value.url.split(',')[0].split(',')[0]); //图片
          $clonebox.find('.goods-pic').find('img').attr('sid', value.gid); //图片
          $clonebox.find('.goods_title').find('a').html(value.title); //标题
          $clonebox.find('.shop_price').find('strong').html(value.price); //单价
          
          $clonebox.find('.JS_cart_num').val(count);  //商品数量
          console.log(value.price * count);
          //计算每个商品的价格。
          $clonebox.find('.goods_subtotal1').find('.JS_goods_subtotal').html((value.price * count).toFixed(2));
          $clonebox.css('display', 'block');
          $('.activity-title-box').after($clonebox); //兄弟元素后面
          priceall();//计算总价的
        }
      });
    })
  }

  //2.获取cookie，执行渲染列表的函数
  if (getcookie('cookiesid') && getcookie('cookienum')) {

    var s = getcookie('cookiesid').split(',');//数组sid
    var n = getcookie('cookienum').split(',');//数组num
    $.each(s, function (i, value) {
      goodslist(s[i], n[i]);
    });
    //console.log(s)
  }




  //3.如果购物车为空，显示empty-cart盒子(购物车空空的)
  /* kong();
  function kong() {
    if (getcookie('cookiesid') && getcookie('cookienum')) {
      $('.empty-cart').hide();//cookie存在，购物车有商品，隐藏盒子。
    } else {

      $('.empty-cart').show();
    }
  } */

  //4.计算总价和总的商品件数，必须是选中的商品。
  function priceall() {
    var $sum = 0;
    var $count = 0;
    $('.onelist:visible').each(function (index, element) {
      if ($(element).find('.goods_select').prop('checked')) {
        //数量
        $sum += parseInt($(element).find('.m_goods_num').find('input').val());
        //总价 每个单价的相加
        $count += parseFloat($(element).find('.goods-money').find('.JS_goods_subtotal').html());
      }
    });
    //所有的总价
    $('.lbn').find('.selected-number').html($sum);
    $('.goods_price .f20').html($count.toFixed(2));
  }

  //5.全选操作
  $('.JS_checkall_cb').on('change', function () {
    $('.onelist:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
    $('.JS_checkall_cb').prop('checked', $(this).prop('checked'));
    priceall();//取消选项，重算总和。
  });

  var $inputs = $('.onelist:visible').find(':checkbox'); //所有的checkbox
  $('.JS_cart_body').on('change', $inputs, function () {//事件的委托的this指向被委托的元素
    if ($('.onelist:visible').find('input:checkbox').length == $('.onelist:visible').find('input:checked').size()) {
      $('.JS_checkall_cb').prop('checked', true);
    } else {
      $('.JS_checkall_cb').prop('checked', false);
    }
    priceall();//取消选项，重算总和。
  });

  //6.数量的改变
  //改变商品数量++
  $('.add').on('click', function () {
    var $count = $(this).parents('.onelist').find('.JS_cart_num').val();//值
    $count++;
    if ($count >= 99) {
      $count = 99;
    }
    $(this).parents('.onelist').find('.JS_cart_num').val($count);//赋值回去
    $(this).parents('.onelist').find('.goods_subtotal1').find('.JS_goods_subtotal').html(singlegoodsprice($(this)));//改变后的价格
    priceall();//重新计算总和。
    setcookie($(this));//将改变的数量重新添加到cookie

  });

  //改变商品数量--
  $('.sub').on('click', function () {
    var $count = $(this).parents('.onelist').find('.JS_cart_num').val();
    $count--;
    if ($count <= 1) {
      $count = 1;
    }
    $(this).parents('.onelist').find('.JS_cart_num').val($count);
    $(this).parents('.onelist').find('.goods_subtotal1').find('.JS_goods_subtotal').html(singlegoodsprice($(this)));//改变后的价格
    priceall();
    setcookie($(this));
  });

  //直接输入改变数量
  $('.JS_cart_num').on('input', function () {
    var $reg = /^\d+$/g; //只能输入数字
    var $value = parseInt($(this).val());
    if ($reg.test($value)) {//是数字
      if ($value >= 99) {//限定范围
        $(this).val(99);
      } else if ($value <= 0) {
        $(this).val(1);
      } else {
        $(this).val($value);
      }
    } else {//不是数字
      $(this).val(1);
    }
    $(this).parents('.onelist').find('.goods_subtotal1').find('.JS_goods_subtotal').html(singlegoodsprice($(this)));//改变后的价格
    priceall();
    setcookie($(this));
  });

  //7.计算数量改变后单个商品的价格
  function singlegoodsprice(obj) { //obj:当前元素
    var $dj = parseFloat(obj.parents('.onelist').find('.shop_price').find('strong').html());//单价
    var $cnum = parseInt(obj.parents('.onelist').find('.JS_cart_num').val());//数量
    return ($dj * $cnum).toFixed(2);//结果
  }

  //8.将改变后的数量的值存放到cookie
  //点击按钮将商品的数量和id存放cookie中
  var arrsid = []; //商品的id
  var arrnum = []; //商品的数量
  //提前获取cookie里面id和num
  function cookietoarray() {
    if (getcookie('cookiesid') && getcookie('cookienum')) {
      arrsid = getcookie('cookiesid').split(',');//cookie商品的sid  
      arrnum = getcookie('cookienum').split(',');//cookie商品的num
    }
  }
  function setcookie(obj) { //obj:当前操作的对象
    cookietoarray();//得到数组
    var $index = obj.parents('.onelist').find('img').attr('sid');//通过id找数量的位置
    arrnum[$.inArray($index, arrsid)] = obj.parents('.onelist').find('.JS_cart_num').val();
    addcookie('cookienum', arrnum.toString(), 7);
  }

  //9.删除操作
  //删除cookie
  function delgoodslist(sid, arrsid) {//sid：当前删除的sid，arrsid:cookie的sid的值
    var $index = -1;
    $.each(arrsid, function (index, value) {//删除的sid对应的索引位置。 index:数组项的索引
      if (sid == value) {
        $index = index;//如果传入的值和数组的值相同，返回值对应的索引。
      }
    });
    arrsid.splice($index, 1);//删除数组对应的值
    arrnum.splice($index, 1);//删除数组对应的值
    addcookie('cookiesid', arrsid.toString(), 7);//添加cookie
    addcookie('cookienum', arrnum.toString(), 7);//添加cookie
  }

  //删除单个商品的函数(委托)
  $('.JS_cart_body').on('click', '.color6', function (ev) {
    
    cookietoarray();//得到数组,上面的删除cookie需要。
    if (confirm('你确定要删除吗？')) {
      $(this).parents('.onelist').remove();//通过当前点击的元素找到整个一行列表，删除
    }
    delgoodslist($(this).parents('.onelist').find('img').attr('sid'), arrsid);
    priceall();
  });


 


}();
