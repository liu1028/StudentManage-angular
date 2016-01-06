/**************************** 学生 ********************************/

//选择年份
appControllers.controller('stuselectYearCtrl',['$scope','$timeout','$mdDialog','$location',function($scope,$timeout,$mdDialog,$location){
	
	$scope.cur_year=['2013-2-3','2013-4-12','2015-2-3','2013-5-3','2123-2-3'];//测试数据
	
	/**实际开发用的ajax，用于获得select的所有年份 */
	// $.ajax({
	// 	type:'get',
	// 	url:'/StudentManage/api/student/courses/year',
	// 	success:function(result){
	// 		var json=$.parseJSON(result);
	// 		if(result.status)
	// 			$scope.cur_year=json.years;
	// 	},
	// 	error:function(result){

	// 	}
	// });
	
	/***选好年份，点确定按钮，跳转 */
	$scope.stuselectYear=function(ev){
		if($scope.selectedYear==''||$scope.selectedYear==undefined){
			$mdDialog.show(
				$mdDialog.alert()
					.parent(angular.element(document.body))
					.clickOutsideToClose(true)
					.content('请先选择一个年份！')
					.ariaLabel('Alert Dialog Demo')
					.ok('确定')
					.targetEvent(ev));
			return;
		}
			
		$location.path('/querySubject/'+$scope.selectedYear);
	}

}]);


//选课、退课
appControllers.controller('chooseSubjectCtrl',['$scope','$timeout','$mdDialog',function($scope,$timeout,$mdDialog){
	
	  
// 学生功能放在`/api/student/[:id/]`下面
  
// * `/elective_courses` "学生查看选修课，选择选修课"
//   * GET -> {status, msg, isModifiable, courses: [{id, year, name, type, department, teacher,selectedNum}, ... ]}
//   * POST [{action, id}, ... ] -> {status, msg}

	$scope.isModifiable=true;
	$.ajax({
		type:'get',
		url:'/StudentManage/api/student/elective_courses',
		success:function(result){
			var j=$.parseJSON(result);
			if(j.status){
				$scope.isModifiable=j.isModifiable;//判断学生是否提交，已提交的话就隐藏按钮
				$scope.subs=j.courses;
				$scope.subs.forEach(function(tar,index){   //给数组的元素进行标号
					tar.index=index;
				});
				$scope.isSelected=$scope.subs.map(function(tar,index){
					return false;
				});
				$scope.selectedSub=[];
			}
		},
		error:function(result){
			
			/*** region 测试数据****/
			
			$scope.test=[
				{id:'1',name:'高等数学',teacher:'王三都',seletedNum:'4'},
				{id:'2',name:'计算机程序艺术',teacher:'李来华',seletedNum:'45'},
				{id:'3',name:'外国历史名城赏析',teacher:'廖国栋',seletedNum:'12'},
				{id:'4',name:'烹饪的艺术',teacher:'张金云',seletedNum:'23'},
				{id:'5',name:'哲学导论',teacher:'明廷分',seletedNum:'67'},
				{id:'6',name:'互联网+时代简要',teacher:'包兴哲',seletedNum:'87'},
				{id:'7',name:'日本文学',teacher:'贾乃亮',seletedNum:'36'},
				{id:'8',name:'园林艺术',teacher:'坡峰岭',seletedNum:'78'},
				{id:'9',name:'ps初级入门',teacher:'范围分',seletedNum:'89'},
				{id:'10',name:'旅行知识',teacher:'魏征',seletedNum:'99'}
			];
			$scope.subs=$scope.test;
			for(var i=0;i<10;i++){$scope.subs.push({name:'旅行知识',teacher:'魏征',seletedNum:i.toString()});}
			$scope.subs.forEach(function(tar,index){tar.index=index});
			$scope.isSelected=$scope.subs.map(function(tar,index){
				return false;
			});
			$scope.selectedSub=[];
			
			/*****endregion******/
		}
		
	});


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
	
	$scope.submit=function(ev){
		var confirm = $mdDialog.confirm()
				.title('提交操作')
				.content('<div style="color:blue;padding-top:15px;font:normal bold 18px/18px "宋体";">您确定要提交吗？一旦提交不再能修改！</div>')
				.ariaLabel('submit')
				.targetEvent(ev)
				.ok('确定')
				.cancel('取消');
			$mdDialog.show(confirm).then(function() {
				
				$.ajax({
					type:'post',
					url:'/StudentManage/api/student/elective_courses',
					data:{data:JSON.stringify($scope.selectedSub)},
					success:function(result){
						var j=$.parseJSON(result);
						if(j.status){
							openAlert(ev,'提交成功!');
							$scope.isModifiable=false;
						}else{
							openAlert(ev,'提交失败!');
						}
					},
					error:function(result){
						openAlert(ev,'系统忙，请稍后再试!');
						$scope.isModifiable=false;
					}
				});
			}, function() {

			});
	}
	
	function openAlert(ev,msg){
		$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.body))
				.clickOutsideToClose(true)
				.content(msg)
				.ariaLabel('Alert Dialog Demo')
				.ok('确定'));
	}
}]);

//查询选课情况
appControllers.controller('querySubjectCtrl',['$scope','$routeParams',function($scope,$routeParams){
	$scope.year=$routeParams.year;

// /api/student/	
// * `/courses` "查看课程"
//   * GET -> {status, msg, courses: [{id, year, name, type, department, major, teacher, class, regularGrade, finalExamGrade, finalGrade}, ...]}
	$scope.test=[
		{id:'1',year:'2014',name:'软件项目管理',type:'专业必修',department:'计算机与信息工程',teacher:'何伟',class:'软工1班',regularGrade:'23',finalExamGrade:'45',finalGrade:'69'},
		{id:'2',year:'2015',name:'计算机组成原理',type:'专业选修',department:'计算机与信息工程',teacher:'孙文和',class:'软工1班',regularGrade:'23',finalExamGrade:'45',finalGrade:'80'},
		{id:'3',year:'2013',name:'操作系统',type:'公共基础',department:'计算机与信息工程',teacher:'周双娥',class:'软工1班',regularGrade:'--',finalExamGrade:'--',finalGrade:'--'},
		{id:'4',year:'2012',name:'算法分析与设计',type:'专业必修',department:'计算机与信息工程',teacher:'马传香',class:'软工1班',regularGrade:'23',finalExamGrade:'45',finalGrade:'93'}
	];
	
	$scope.subs=$scope.test;
	
	//ajax所得信息
	$.ajax({
		type:'get',
		url:'/api/student/courses',
		success:function(result){
			var j=$.parseJSON(result);
			if(j.status){
				$scope.subs=j.courses;
			}
		}
	});
}]);


//查询湖大成绩和课程表
appControllers.controller('queryHubuScoreCtrl',['$scope','$mdDialog',function($scope,$mdDialog){
	
	$scope.IsLogin=true;
	$scope.IsScore=false;
	$scope.username='';
	
	// var url_getId='http://localhost:50504/Service1.asmx/GetSessionId?jsoncallback=?';
	// var url_login='http://localhost:50504/Service1.asmx/DoLogin?jsoncallback=?';
	// var url_getScore='http://localhost:50504/Service1.asmx/GetScore?jsoncallback=?';

	var url_getId='http://121.42.153.166:8001/Service1.asmx/GetSessionId?jsoncallback=?';
	var url_login='http://121.42.153.166:8001/Service1.asmx/DoLogin?jsoncallback=?';
	var url_getScore='http://121.42.153.166:8001/Service1.asmx/GetScore?jsoncallback=?';
	$scope.se_id='';
	$.ajax({
		type: "post",
		url:url_getId,
		dataType: "jsonp",
		data:{},
		success: function (result){
			$scope.se_id=result.id;
		}
	});
	
	$scope.login=function(ev){
		$.ajax({
			type: "post",
			url:url_login,
			dataType: "jsonp",
			data:{username:$scope.username,password:$scope.password,validate:$scope.validate},
			header:{Cookie:'ASP.NET_SessionId='+$scope.se_id},
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

	// var cur_url='http://localhost:50504/Service1.asmx/GetCur?jsoncallback=?';
	var cur_url='http://121.42.153.166:8001/Service1.asmx/GetCur?jsoncallback=?';
	
	$scope.getCur=function(){
		$.ajax({
			type: "post",
			url:cur_url,
			dataType: "jsonp",
			data:{username:$scope.username},
			header:{Cookie:'ASP.NET_SessionId='+$scope.se_id},
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
			header:{Cookie:'ASP.NET_SessionId='+$scope.se_id},
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
