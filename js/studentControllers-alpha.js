/**************************** 学生 ********************************/
//欢迎界面
appControllers.controller('welcomeCtrl',['$scope','$mdSidenav','$log',function($scope,$mdSidenav,$log){
		$scope.imagePath='image/bkg1.jpg';
}]);

//看新闻
appControllers.controller('newsCtrl',['$scope','$mdSidenav','$log',function($scope,$mdSidenav,$log){

}]);

//选课、退课
appControllers.controller('chooseSubjectCtrl',['$scope','$timeout',function($scope,$timeout){
	
	$scope.subs=[
		{subject:'高等数学',teacher:'王三都',num:'4'},
		{subject:'计算机程序艺术',teacher:'李来华',num:'45'},
		{subject:'外国历史名城赏析',teacher:'廖国栋',num:'12'},
		{subject:'烹饪的艺术',teacher:'张金云',num:'23'},
		{subject:'哲学导论',teacher:'明廷分',num:'67'},
		{subject:'互联网+时代简要',teacher:'包兴哲',num:'87'},
		{subject:'日本文学',teacher:'贾乃亮',num:'36'},
		{subject:'园林艺术',teacher:'坡峰岭',num:'78'},
		{subject:'ps初级入门',teacher:'范围分',num:'89'},
		{subject:'旅行知识',teacher:'魏征',num:'99'}
	];
	for(var i=0;i<10;i++){$scope.subs.push({subject:'旅行知识',teacher:'魏征',num:i.toString()});}
	$scope.subs.forEach(function(tar,index){tar.index=index});
	
	$scope.isSelected=$scope.subs.map(function(tar,index){
		return false;
	});
	
	$scope.selectedSub=[];
	
	$scope.addSubItem=function(index){
		$timeout(function(){
			var o=$scope.subs.splice(index,1)[0];
			$scope.selectedSub.push(o);
		},500,true);
	};
	
	$scope.removeFromSelected=function(index){
		var o=$scope.selectedSub.splice(index,1)[0];
		$scope.subs.splice(o.index,0,o);
	};
}]);

//查询选课情况
appControllers.controller('querySubjectCtrl',['$scope',function($scope){
	
}]);

//查询湖大成绩
appControllers.controller('queryHubuScoreCtrl',['$scope','$mdDialog',function($scope,$mdDialog){
	
	$scope.IsLogin=true;
	$scope.IsScore=false;
	$scope.username='';
	
	var url_getId='http://localhost:50504/Service1.asmx/GetSessionId?jsoncallback=?';
	var url_login='http://localhost:50504/Service1.asmx/DoLogin?jsoncallback=?';
	var url_getScore='http://localhost:50504/Service1.asmx/GetScore?jsoncallback=?';


	$.ajax({
		type: "post",
		url:url_getId,
		dataType: "jsonp",
		data:{},
		success: function (result){
		}
	});
	
	$scope.login=function(ev){
		$.ajax({
			type: "post",
			url:url_login,
			dataType: "jsonp",
			data:{username:$scope.username,password:$scope.password,validate:$scope.validate},
			success: function (result){
				if(result.status){
					$mdDialog.show(
						$mdDialog.alert()
							.parent(angular.element(document.body))
							.clickOutsideToClose(true)
							.content('恭喜您，已经登录成功!')
							.ariaLabel('Alert Dialog Demo')
							.ok('确定')
							.targetEvent(ev)
					)
					.then(function(){
						$scope.IsLogin=false;
						$scope.IsScore=true;
					});
				}else{
					$mdDialog.show(
						$mdDialog.alert()
							.parent(angular.element(document.body))
							.clickOutsideToClose(true)
							.title('警示')
							.content('用户名或密码、验证码错误！')
							.ariaLabel('Alert Dialog Demo')
							.ok('确定')
							.targetEvent(ev)
					);
					
					var src=$('#validation').attr('src');
					src+='?cod='+Math.random();
					$('#validation').attr('src',src);
				}
			}
		});
	};

	 var cur_url='http://localhost:50504/Service1.asmx/GetCur?jsoncallback=?';

	
	$scope.getCur=function(){
		$.ajax({
			type: "post",
			url:cur_url,
			dataType: "jsonp",
			data:{username:$scope.username},
			success: function (result){
				$('.score_list').html(result.status);
			},
			error:function(result){
				$scope.IsLogin=true;
				$scope.IsScore=false;
				$('.score_list').html('');
			}
		});
	};
	
	$scope.getScore=function(){
		$.ajax({
			type: "post",
			url:url_getScore,
			dataType: "jsonp",
			data:{},
			success: function (result){
				$('.score_list').html(result.status);
			},
			error:function(result){
				$scope.IsLogin=true;
				$scope.IsScore=false;
				$('.score_list').html('');
			}
		});
	};


}]);

//查询湖大课程表
// appControllers.controller('queryHubuCurCtrl',['$scope','$mdDialog','hubuIdProvider',function($scope,$mdDialog,hubuIdProvider){
	
// 	if(hubuIdProvider.getId()=='')
// 		$scope.IsLoged=false;
// 	else 
// 		$scope.IsLoged=true;
	
	
// 	var cur_url='http://localhost:50504/Service1.asmx/GetCur?jsoncallback=?';
// 	$scope.getCur=function(){
		
// 		$.ajax({
// 			type: "post",
// 			url:cur_url,
// 			dataType: "jsonp",
// 			data:{username:hubuIdProvider.getId()},
// 			success: function (result){
// 				$('.cur_list').html(result.status);
// 			}
// 		});
// 	};
// }]);