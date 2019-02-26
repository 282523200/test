<?php
	//引入数据库连接
	require "conn.php";
	//二.后端获取手机号码和数据库进行匹配 --sql语句
	
	
	
	
	//一.确认点击的是提交按钮
	if(isset($_POST['submit'])){

		if(isset($_POST['userphone'])){
			$userphone=$_POST['userphone'];
			$result=mysql_query("select * from person where phonenum=$userphone");//如果存在，返回结果。
			//如果$result存在值，tel已经存在
			if(mysql_fetch_array($result)){//存在
				echo false;
			}else{//不存在
				echo true;
				//1.接收前端表单提交过来的数据,加入数据库。
		$name=$_POST['user_name'];
		$userphone=$_POST['userphone'];
		$password=sha1($_POST['password']);
		

		//2.将数据通过insert语句插入数据库中
		$query="insert person values(default,'$name','$password','$userphone',NOW())";
		mysql_query($query);
			}
		}

		
		
		//3.跳转到登陆页面
		header('location:../index.html');
	}
	

?>