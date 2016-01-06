var appControllers=angular.module('appControllers',['ngMaterial','ngMessages']);

appControllers.provider('hubuIdProvider',function(){
	this.id='';
	var tar=this;
	this.$get=function(){
		return {
			getId:function(){
				return tar.id;
			},
			setId:function(str){
				tar.id=str;
			}
		}; 
	};
});

appControllers.controller('pageCtrl',['$scope','$mdSidenav','$mdDialog',function($scope,$mdSidenav,$mdDialog){
		$scope.username="liuhongsen";
		
		$scope.menu=[
			//学生部分
			{'href':'#/welcome','text':'首页'},
			{'href':'#/readnews','text':'查看新闻'},
			{'href':'#/chooseSubject','text':'选课与退课'},
			{'href':'#/stuselectYear','text':'查询课程信息'},
			{'href':'#/ext/queryHubuScore','text':'查询湖大成绩'},
			//教师部分(也包括首页和查看新闻)
			//{'href':'#/teachSubject','text':'公选课程选择'},
			{'href':'#/teachSubject','text':'公选课程选择'},
			{'href':'#/selectYear','text':'成绩结算'},
			//管理员部分
			{'href':'#/newsmanage','text':'新闻管理'}
		];

		$scope.openLeftMenu =function(){
			$mdSidenav('left').toggle();
		};
		$scope.close=function(){
			$mdSidenav('left').close();
		};
	
	//修改个人信息
	$scope.modifyInfo=function(ev){
		$mdDialog.show({
			controller: modifyInfoController,
			templateUrl: 'info/individualInfo.html',
			parent: angular.element(document.body),
			openFrom:{top: 200,width: 50,height: 100 }
			})
			.then(function(user) {
				/****post数据*****/
				$.ajax({
					type:'post',
					url:'fw.jsp',/*************暂未定论****/
					data:{data:JSON.stringify(user)},
					success:function(result){
						if($.parseJSON(result).status){
							 openDialog(ev,'修改成功！');
						}
					},
					error:function(r){
						openDialog(ev,'系统忙，请稍候再试！');
					}
				});
			}, function() {});
			
		/******对话框控制器******/	
		function modifyInfoController($scope, $mdDialog){
			/***实践数据****/
			$scope.user={
				name:'liuhongsenn',
				number:'2013221104220014',
				political:'共青团员',
				birthplace:'阳新',
				hobby:'打篮球',
				phone:'13971233334',
				email:'1225355917@qq.com'
			};
			
			/**********ajax发送请求获得初始化数据********/
			$.ajax({
				type:'get',
				url:'',/*************暂未定论****/
				success:function(result){
					var j=$.parseJSON(result);
					if(j.status){
						$scope.user=j.user;
					}
				}
			});
			
			
			$scope.hide = function() {
				$mdDialog.hide();
			};
			$scope.cancel = function(ev) {
				ev.preventDefault();
				$mdDialog.cancel();
			};
			$scope.answer = function(error) {
				if(!error)
					$mdDialog.hide($scope.user);
			};
		}
	}
	
	
	//修改密码
	$scope.modifyPwd=function(ev){
		$scope.isError=false;
		
		$mdDialog.show({
			controller: modifyPwdController,
			templateUrl: 'info/changpwd.html',
			parent: angular.element(document.body),
			openFrom:{top: -50,width: 30,height: 80 },
			closeTo:({  left: 1500  })
			})
			.then(function(tar) {
				/****post数据*****/
				$.ajax({
					type:'post',
					url:'fw.jsp',/*************暂未定论****/
					data:{oldpwd:tar.opwd,newpwd:tar.npwd},
					success:function(result){
						if($.parseJSON(result).status){
							 openDialog(ev,'修改成功！');
						}else{
							openDialog(ev,'旧密码输入错误');
						}
					},
					error:function(r){
						openDialog(ev,'系统忙，请稍候再试！');
					}
				});
			}, function() {});
			
		/******对话框控制器******/	
		function modifyPwdController($scope, $mdDialog){
			
			$scope.hide = function() {
				$mdDialog.hide();
			};
			$scope.cancel = function(ev) {
				ev.preventDefault();
				$mdDialog.cancel();
			};
			$scope.answer = function(ev) {
				if($scope.user.newpwd==$scope.user.sureNewpwd){
					var o={};
					o.opwd=$scope.user.oldpwd;
					o.npwd=$scope.user.newpwd;
					$mdDialog.hide(o);
				}
				else 
					$scope.isError=true;
			};
		}
	}
	
	//修改个性签名
	$scope.modifyMotto=function(ev){
		$mdDialog.show({
			controller: modifyMottoController,
			templateUrl: 'info/changmotto.html',
			parent: angular.element(document.body),
			openFrom:{top: 500,width: 30,height: 80}
			})
			.then(function(motto) {
				/****post数据*****/
				$.ajax({
					type:'post',
					url:'fw.jsp',/*************暂未定论****/
					data:{motto:motto},
					success:function(result){
						if($.parseJSON(result).status){
							 openDialog(ev,'签名成功！');
						}else{
							openDialog(ev,'签名失败！');
						}
					},
					error:function(r){
						openDialog(ev,'系统忙，请稍候再试！');
					}
				});
			}, function() {});
			
		/******对话框控制器******/	
		function modifyMottoController($scope, $mdDialog){
			
			$scope.hide = function() {
				$mdDialog.hide();
			};
			$scope.cancel = function(ev) {
				ev.preventDefault();
				$mdDialog.cancel();
			};
			$scope.answer = function(ev) {
				$mdDialog.hide($scope.motto);
			};
		}
	}
	
	//注销操作
	$scope.logout=function(ev){
		$.ajax({
			type:'get',
			url:'/StudentManage/sys/logout',
			success:function(result){
				var json=$.parseJSON(result);
				if(json.status)
					window.location.href="login.html";
				else{
					openDialog(ev,'系统忙，请稍后再试！');
				}
			},
			error:function(result){
				openDialog(ev,'系统忙，请稍后再试！');
			}			
		});
	}
	
	function openDialog(ev,msg){
		$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.body))
				.clickOutsideToClose(true)
				.content(msg)
				.ariaLabel('Alert Dialog Demo')
				.ok('确定')
				.targetEvent(ev))
	}
		
}]);

//欢迎界面
appControllers.controller('welcomeCtrl',['$scope','$mdSidenav','$log',function($scope,$mdSidenav,$log){
		$scope.imagePath='image/bkg1.jpg';
}]);

//看新闻
appControllers.controller('newsCtrl',['$scope','$mdSidenav','$log',function($scope,$mdSidenav,$log){

}]);
