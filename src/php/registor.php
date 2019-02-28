<?php

require "conn.php";

if (isset($_POST['userphone'])) {
  $phonenum = $_POST['userphone'];
  $result = mysql_query("select * from person where phonenum=$phonenum");
  if (mysql_fetch_array($result)) {
    echo 'false'; // validate这里要写
  } else { //不存在
    echo 'true';
  }
}

if (isset($_POST['submit'])) {

  $username = $_POST['username'];
  $phonenum = $_POST['userphone'];
  $password = sha1($_POST['password']);

  $query = "insert person values(NULL,'$username','$password','$phonenum',NOW())";
  mysql_query($query);

  //3.跳转到登陆页面
  header('location:http://10.31.162.184/mll/src/index.html');
}





 