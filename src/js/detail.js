//根据传过来的gid渲染页面
//图片,价格,title,

; ! function () {
  //1.获取sid
  var picid = location.search.substring(1).split('=')[1];
  console.log(picid)


  //2.将当前的id传给后端获取对应的数据
  $.ajax({
    url: 'php/detail.php',
    data: {
      sid: picid
    },
    dataType: 'json'
  }).done(function (data) {//data:后端返回的和id对应的数据
    //console.log(data);

    //

    $('.title').html(data.title);  //商品title
    $('.gnum').html(data.price);  //商品价格
    var arr = data.url.split(','); //url组
    //console.log(arr);
    var str = '';
    $.each(arr, function (index, value) {
      str +=
        `<li class="album_item">
             <a href="javascript:;">
               <img src="${value}" alt="">
            </a>
           </li>`;
    });
    $('#JS_scale_src img').attr('src', arr[0]); //小图的url
    $('#bpic').attr('src', arr[0]);  //大图的url
    $('#JS_scale_src img').attr('sid', data.gid);  //商品id;


    $('#JS_goods_album_stage').html(str);

  });

  //3.放大镜效果


  //加减数量
  var $goods_number = $('#JS_goods_number')
  var $add = $('.JS_add');
  var $sub = $('.JS_minus');
  console.log($goods_number.val());
  $add.on('click', function () {
    $goods_number.val(parseInt($goods_number.val())+1);
  });
  $sub.on('click', function () {
    $goods_number.val(parseInt($goods_number.val())-1);
    if($goods_number.val()<1){
      $goods_number.val(1);
    }
  });


  //购物车的思路
  //存放商品的sid和商品的数量--数组实现。
  //如果商品第一次存购物车，存放的是商品的sid和商品的数量。
  //如果是第二次购买商品，从第二次开始改变数量。

  //疑问：判断商品是第一次存还是多次存储。

  //1.解决方式：提前获取cookie里面id和num
  //点击按钮将商品的数量和id存放cookie中
  var arrsid = []; //商品的sid
  var arrnum = []; //商品的数量
  function cookietoarray() {
    if (getcookie('cookiesid') && getcookie('cookienum')) {//判断商品是第一次存还是多次存储
      arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
      arrnum = getcookie('cookienum').split(','); //cookie商品的num
    }
  }

  //2.有了上面的方法，可以点击加入购物车按钮判断商品是否是第一次还是多次。

  $('#JS_goods_panel_add').on('click', function () { //点击加入购物车按钮。
    //location.reload(true);
    //判断当前的商品sid是否存在购物车(cookie)
    //判断当前的按钮对应的商品的sid和取出的cookie里面的sid进行比较

    //获取当前的按钮对应的商品的sid
    var $sid = $('#JS_scale_src img').attr('sid');
    cookietoarray();//获取已经存在的cookie值。

    if ($.inArray($sid, arrsid) != -1) { //商品存在，数量叠加 
      //先取出cookie中的对应的数量值+当前添加的数量值，添加到对应的cookie中。
      var num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('#JS_goods_number').val());
      arrnum[$.inArray($sid, arrsid)] = num;
      addcookie('cookienum', arrnum.toString(), 10); //数组存入cookie

    } else { //不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
      arrsid.push($sid); //将当前的id存入数组
      addcookie('cookiesid', arrsid.toString(), 10); //数组存入cookie
      arrnum.push($('#JS_goods_number').val());
      addcookie('cookienum', arrnum.toString(), 10); //数组存入cookie
    }
  });

}();



