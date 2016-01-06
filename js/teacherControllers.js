/****************************教师**************************/
appControllers.controller('teacheSubCtrl',['$scope','$mdSidenav','$log','$mdDialog',function($scope,$mdSidenav,$log,$mdDialog){
	
	/*****测试数据 */
	$scope.test ={
		status:true,IsSubmitted:false,msg:'',
		courses:
		[
			{ id:'1',name: 'Pepperoni',year:'2013-2014',type:'公共选修' },
			{ id:'2',name: 'Sausage',year:'2013-2014',type:'公共选修' },
			{ id:'3',name: 'Black Olives',year:'2013-2014',type:'公共选修'},
			{ id:'4',name: 'Green Peppers',year:'2013-2014',type:'公共选修' },
			{ id:'5',name: 'Pepperoni',year:'2013-2014',type:'公共选修' },
			{ id:'6',name: 'Sausage',year:'2013-2014',type:'公共选修' },
			{ id:'7',name: 'Black Olives',year:'2013-2014',type:'公共选修' },
			{ id:'8',name: 'Green Peppers',year:'2013-2014',type:'公共选修' },
			{ id:'9',name: 'Pepperoni',year:'2013-2014',type:'公共选修' },
			{ id:'10',name: 'Sausage',year:'2013-2014',type:'公共选修' },
			{ id:'11',name: 'Black Olives',year:'2013-2014',type:'公共选修' },
			{ id:'12',name: 'Green Peppers',year:'2013-2014',type:'公共选修' }
		]
	};
	$scope.teachSubs=$scope.test.courses.map(function(tar,index){
		 tar.wanted=false;
		 return tar;
	});
	$scope.IsSubmitted=$scope.test.IsSubmitted;
	
	
	/******get获取所有公共选修课信息 */
	$.ajax({
		type:'get',
		url:'/StudentManage/api/teacher/elective_courses',
		success:function(result){
			var j=$.parseJSON(result);
			if(j.status){
				$scope.IsSubmitted=j.IsSubmitted;
				$scope.teachSubs=j.courses.map(function(tar,index){
					tar.wanted=false;
					return tar;
				});
			}
		},
		error:function(result){
			/***测试所用 */
		}
	});
	
	/****提交老师所选的课程 */
	$scope.submitSub=function(ev){
		/****上传老师打钩的选择的课程 */
		var data=[];
		$scope.teachSubs.forEach(function(tar,index){
			if(tar.wanted)
				data.push(tar.id);
		});
		
		$.ajax({
			type:'post',
			url:'/StudentManage/api/teacher/elective_courses',
			data:{data:JSON.stringify(data)},
			success:function(result){
				var j=$.parseJSON(result);
				if(j.result){
					$mdDialog.show(
						$mdDialog.alert().content('提交成功！').ok('确定').targetEvent(ev)).finally(function(){
								$scope.IsSubmitted=true;});
				}
			},
			error:function(result){
				openAlert(ev,'系统忙，请稍后再试!');
			}
		});
	}
	
	function openAlert(ev,msg){
		$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.body))
				.clickOutsideToClose(true)
				.content(msg)
				.ariaLabel('Alert Dialog Demo')
				.ok('确定')
				.targetEvent(ev));
	}
	
}]);

appControllers.controller('selectYearCtrl',['$scope','$location','$mdDialog',function($scope,$location,$mdDialog){
	/***实验数据 */
	$scope.cur_year=['2013-2-3','2013-4-12','2015-2-3','2013-5-3','2123-2-3'];
	
	
	/**实际开发用的ajax，用于获得select的所有年份 */
	// $.ajax({
	// 	type:'get',
	// 	url:'/StudentManage/api/teacher/courses/year',
	// 	success:function(result){
	// 		var json=$.parseJSON(result);
	// 		if(result.status)
	// 			$scope.cur_year=json.years;
	// 	},
	// 	error:function(result){

	// 	}
	// });
	
	/***选好年份，点确定按钮，跳转 */
	$scope.selectYear=function(ev){
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
			
		$location.path('/assessScore/'+$scope.selectedYear);
	}
}]);

appControllers.controller('accessScoreCtrl',['$scope','$mdSidenav','$routeParams','$mdDialog','$location',function($scope,$mdSidenav,$routeParams,$mdDialog,$location){
	/**获取选定的年份 */
	$scope.year=$routeParams.year;
	
	/***实践数据****/
	$scope.subs=[
		{id:'20132211025',year:'2013-3-4',name:'计算机任务程序艺术',type:'公共选修',department:'计信',major:'软件工程',teacher:'付文文',class:'软工1班',isSubmitted:false},
		{id:'2013221102x',year:'2014-4-4',name:'操作系统',type:'公共选修',department:'计信',major:'计科1',teacher:'蜂窝网',class:'软工2班',isSubmitted:false},
		{id:'2013221102a',year:'2015-3-4',name:'算法设计艺术',type:'公共基础',department:'计信',major:'软件工程',teacher:'范文芳',class:'软工3班',isSubmitted:true},
		{id:'2013221102w',year:'2015-6-4',name:'计算机网络',type:'专业必修',department:'计信',major:'信息安全',teacher:'格格热',class:'软工4班',isSubmitted:false},
		{id:'2013221102v',year:'2013-8-4',name:'Spring揭秘',type:'公共选修',department:'计信',major:'计科1',teacher:'付文文',class:'计科1班',isSubmitted:false},
		{id:'2013221102d',year:'2013-12-4',name:'Web程序设计',type:'公共选修',department:'计信',major:'软件工程',teacher:'付文文',class:'计科1班',isSubmitted:true},
		{id:'2013221102b',year:'2013-11-4',name:'J2EE技术解析',type:'专业必修',department:'计信',major:'计科2',teacher:'付文文',class:'计科1班',isSubmitted:false}
	];
	$scope.courses=$scope.subs;

	/*****用作真实发送数据,获得某一年份的所有课程 */
	// $.ajax({
	// 	type:'get',
	// 	url:'/StudentManage/api/teacher/courses/year/'+$scope.year,
	// 	success:function(result){
	// 		var json=$.parseJSON(result);
	// 		if(result.status){
	// 			$scope.courses=json.courses;
	// 		}
	// 	},
	// 	error:function(result){
	// 		$scope.courses=$scope.subs;
	// 	}
	// });
	
	

	/****显示平时、考试比例设置对话框，并跳转 */
	$scope.showRate=function(ev,index){
		// ng-href="#/calculateScore/软件工程导论/公共选修/软件工程"
		$mdDialog.show({
			controller: selectRateController,
			templateUrl: 'teacher/selectRate.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true
			})
			.then(function(obj) {
				alert(obj.pRate+'  '+obj.jRate);
				
				//TODO:将pRate,jRate传回后台存储.........................
				
				var o=$scope.courses;
				$location.path('/calculateScore/'+o[index].name+'/'+o[index].type+'/'+o[index].class+'/'+o[index].id);
			}, function() {});
	}
	function selectRateController($scope, $mdDialog){   //selectRate Dialog 的控制器
		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(error,pRate,jRate) {
			if(!error){
				var o={};
				o.pRate=pRate;
				o.jRate=jRate;
				$mdDialog.hide(o);
			}
		};
	}
	
	
}]);


appControllers.controller('calScoreCtrl',['$scope','$routeParams','$mdSidenav','$mdDialog','$mdToast',function($scope,$routeParams,$mdSidenav,$mdDialog,$mdToast){
	
	/****通过参数传过来的课程名、课程性质、班级以及id信息 */
	$scope.sub=$routeParams.sub;
	$scope.pro=$routeParams.pro;
	$scope.major=$routeParams.major;
	$scope.id=$routeParams.id;
	
	$scope.isVisible=false; //用于标志是否可进行编辑
	
	/*****测试数据******* */
	$scope.test_stus={
			status:true,
			regularRate:50,finalExamRate:50,isSubmitted:false,
			students:
			[
				{id:'2013221104220014',name:'王五',regularGrade:'10',finalExamGrade:'30',finalGrade:'89'},
				{id:'2013221104220015',name:'张三',regularGrade:'16',finalExamGrade:'30',finalGrade:'89'},
				{id:'2013221104220016',name:'李四',regularGrade:'13',finalExamGrade:'30',finalGrade:'89'},
				{id:'2013221104220017',name:'服务范',regularGrade:'13',finalExamGrade:'30',finalGrade:'89'},
				{id:'2013221104220018',name:'国际微',regularGrade:'11',finalExamGrade:'30',finalGrade:'89'},
				{id:'2013221104220019',name:'北二外',regularGrade:'89',finalExamGrade:'30',finalGrade:'89'},
				{id:'2013221104220020',name:'阿尔法',regularGrade:'90',finalExamGrade:'30',finalGrade:'89'},
				{id:'2013221104220021',name:'钢铁人',regularGrade:'30',finalExamGrade:'30',finalGrade:'89'},
				{id:'2013221104220022',name:'和他如',regularGrade:'10',finalExamGrade:'30',finalGrade:'89'},
				{id:'2013221104220023',name:'分为各',regularGrade:'10',finalExamGrade:'30',finalGrade:'89'},
				{id:'2013221104220024',name:'王五访问',regularGrade:'10',finalExamGrade:'30',finalGrade:'89'},
				{id:'2013221104220025',name:'王五5余',regularGrade:'10',finalExamGrade:'30',finalGrade:'89'},
				{id:'2013221104220036',name:'rtwb',regularGrade:'10',finalExamGrade:'30',finalGrade:'89'},
				{id:'2013221104220037',name:'爱疯舞',regularGrade:'10',finalExamGrade:'30',finalGrade:'89'}
			]
	};
	
	
	/****远程获取该班级并且复制平时、考试成绩比例 */
	$.ajax({
		type:'get',
		url:'/StudentManage/api/teacher/courses/'+$scope.id,
		success:function(result){
			var json=$.parseJSON(result);
			if(json.status){
				$scope.regularRate=json.regularRate;
				$scope.examRate=json.finalExamRate;
				$scope.isSubmitted=json.isSubmitted;   //判断是否显示保存与提交按钮
				$scope.students=json.students;
				$scope.p=json.students.map(function(tar,index){
					return tar.regularGrade;
				});
				$scope.j=json.students.map(function(tar,index){
					return tar.finalExamGrade;
				});
				$scope.z=json.students.map(function(tar,index){
					return tar.finalGrade;
				});
				$scope.isNumError=json.students.map(function(tar,index){
					return false;
				});
				$scope.isOverRange=$scope.isNumError.slice(0);
			}
		},
		error:function(result){
			/***测试的初始化 */
			$scope.regularRate=$scope.test_stus.regularRate;
			$scope.examRate=$scope.test_stus.finalExamRate;
			$scope.isSubmitted=$scope.test_stus.isSubmitted;
			$scope.students=$scope.test_stus.students;
			$scope.p=$scope.test_stus.students.map(function(tar,index){
				return tar.regularGrade;
			});
			$scope.j=$scope.test_stus.students.map(function(tar,index){
				return tar.finalExamGrade;
			});
			$scope.z=$scope.test_stus.students.map(function(tar,index){
				return tar.finalGrade;
			});
			$scope.isNumError=$scope.test_stus.students.map(function(tar,index){
				return false;
			});
			$scope.isOverRange=$scope.isNumError.slice(0);
		}
	});

	
	/*****是否可以编辑 */
	$scope.canEdit=function(ev){
		if($scope.isSubmitted){
			$scope.isVisible=false;
			$mdToast.show($mdToast.simple().content('已经提交,不能修改！！！'));
		}
		else{
			$scope.isVisible?$scope.isVisible=false:$scope.isVisible=true;
		}
	}


	/***********对平时、卷面成绩、打分进行相关操作***********/
	$scope.calTotalScore=function(index){
		$scope.isNumError[index]=false;
		$scope.isOverRange[index]=false;
		if(($scope.p[index]!=''&&isNaN($scope.p[index]))||($scope.j[index]!=''&&isNaN($scope.j[index])))
		{
			$scope.isNumError[index]=true;
			$scope.z[index]='';
			return;
		}

		
		if(($scope.p[index]!=''&&(parseFloat($scope.p[index])>100||parseFloat($scope.p[index])<0))
			||($scope.j[index]!=''&&(parseFloat($scope.j[index])>100||parseFloat($scope.j[index])<0)))
		{
			$scope.isOverRange[index]=true;
			$scope.z[index]='';	
			return;
		}
		
		if($scope.p[index]!=''&&$scope.j[index]!='')
			$scope.z[index]=parseFloat($scope.p[index])*$scope.regularRate/100+parseFloat($scope.j[index])*$scope.examRate/100;
		else if($scope.p[index]!='')
			$scope.z[index]=parseFloat($scope.p[index])*$scope.regularRate/100;
		else if($scope.j[index]!='')
			$scope.z[index]=parseFloat($scope.j[index])*$scope.examRate/100;
		else 
			$scope.z[index]='';
			
	}
	
	/****生成要提交的数据的对象 */
	function postData(){
		var obj={};
		obj.student=$scope.students.map(function(tar,index){
			var o=new Object();
			o.id=tar.id;
			o.regularGrade=$scope.p[index];
			o.finalExamGrade=$scope.j[index];
			o.finalGrade=$scope.z[index];
			return o;
		});
		return obj;
	}

	/****提交数据 *****/
	$scope.submitData=function(ev){
		var post=postData();
		post.isSubmitted=true;
		
		$.ajax({
			type:'post',
			url:'/StudentManage/api/teacher/courses/'+$scope.id,
			data:{data:JSON.stringify(post)},
			success:function(result){
				var j=$.parseJSON(result);
				if(j.status){
					openAlert(ev,'提交成功！');
				}
			},
			error:function(result){
				openAlert(ev,'系统忙，请稍后再试！');
			}
		});
	}
	
	/****保存数据 *****/
	$scope.storeData=function(ev){
		var post=postData();
		post.isSubmitted=false;
		
		$.ajax({
			type:'post',
			url:'/StudentManage/api/teacher/courses/'+$scope.id,
			data:{data:JSON.stringify(post)},
			success:function(result){
				var j=$.parseJSON(result);
				if(j.status){
					openAlert(ev,'保存成功！');
				}
			},
			error:function(result){
				openAlert(ev,'系统忙，请稍后再试！');
			}
		});
	}
	
	function openAlert(ev,msg){
		$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.body))
				.clickOutsideToClose(true)
				.content(msg)
				.ariaLabel('Alert Dialog Demo')
				.ok('确定')
				.targetEvent(ev));
	}
}]);

