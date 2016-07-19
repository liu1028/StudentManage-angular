# StudentManage-angular
this is a test project for angular

####这个项目仅仅是为了练习angular.js，只有前端的静态效果，后台没有集成进来

###值得一提的是：技术方面有用到**身份模拟登录和WebServices**

  大致描述一下该项目身份模拟登录和WebService的通信。
首先这个项目是模拟登录的笔者的大学教务处系统（湖北大学）,基础的网络结构涉及到：
 **客户端-浏览器(学生)**，**外网租用的ECS服务器(WebServices的宿主)**，**湖大教务处web服务器**以及**湖大数据库**
  
*** 

客户端与ECS的WebServices通过JSONP来通信，并且客户端利用JS手动保存sessionID来保持会话，WebSerives与大学服务器间
也利用存在在cookie中的sessionID来维持会话，之后就可以通过客户端输入的用户名、密码和验证码，利用WebServices来模 拟http的Post请求发送数据到大学服务器，若认证成功，这必定302跳转，可以利用这个来判断是否登录成功，然后就是去解
析Html代码来抓取想要的片段，整理一下，发给客户端显示就OK了。

***

####介绍的比较简略，提供的浏览网址为：[http://121.42.153.166/StudentManage/layout.html#/ext/queryHubuScore](http://121.42.153.166/StudentManage/layout.html#/ext/queryHubuScore)

####WebService的XML文档网址为：[http://121.42.153.166:8001/?wsdl](http://121.42.153.166:8001/?wsdl)
    
