<?php
	//引入数据库连接
	require "conn.php";

	//1.获取前端传入的用户名和密码
	if(isset($_POST['phone']) && isset($_POST['password'])){ //确认存在；

		$phonenum=$_POST['phone'];
		$password=sha1($_POST['password']);

		//单引号确保是字符串类型；
		$result=mysql_query("select * from person where phonenum='$phonenum' and password='$password' ");
		if(mysql_fetch_array($result)){
			echo true;//登陆成功
		}else{
			echo false;//登陆失败
		}
	}
?>