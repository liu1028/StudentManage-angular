/*******AppModule.js*********/
var myIndexPage=angular.module('myIndexPage',['ngRoute','appControllers', 'ngAnimate']);

myIndexPage.config(['$routeProvider','$mdIconProvider',function($routeProvider,$mdIconProvider){
	$mdIconProvider
		.iconSet('social', 'front_frame/angular-material/img/icons/sets/social-icons.svg', 24)
		.defaultIconSet('front_frame/angular-material/img/icons/sets/core-icons.svg', 24);
	
	$routeProvider.
		/***学生路由*****/
		when('/welcome',{              //欢迎界面   
			templateUrl:'welcome/stu_welcome.html',
			controller:'welcomeCtrl'
		}).
		when('/readnews',{              //看新闻     
			templateUrl:'news/news.html',
			controller:'newsCtrl'
		}).
		when('/chooseSubject',{			//选课、退课
			templateUrl:'student/chooseSub.html',
			controller:'chooseSubjectCtrl'
		}).
		when('/stuselectYear',{			//查询选课先选择年份
			templateUrl:'student/stuselectYear.html',
			controller:'stuselectYearCtrl'
		}).
		when('/querySubject/:year',{			//查询选课情况
			templateUrl:'student/querySub.html',
			controller:'querySubjectCtrl'
		}).
		
		when('/ext/queryHubuScore',{      //查询湖大成绩
			templateUrl:'student/queryHubuScore.html',
			controller:'queryHubuScoreCtrl'
		}).
		when('/ext/queryHubuCurriculum',{    //查询湖大课程表
			templateUrl:'student/queryHubuCur.html',
			controller:'queryHubuCurCtrl'
		}).
		/****教师路由****/
		when('/teachSubject',{            //教师选课
			templateUrl:'teacher/teacheSub.html',
			controller:'teacheSubCtrl'
		}).
		when('/selectYear',{        	   //教师显示哪一年份的课程
			templateUrl:'teacher/selectYear.html',
			controller:'selectYearCtrl'
		}).
		when('/assessScore/:year',{        	   //教师打平时成绩与考试成绩总表
			templateUrl:'teacher/accessScore.html',
			controller:'accessScoreCtrl'
		}).
		when('/calculateScore/:sub/:pro/:major/:id',{        	   //教师打平时成绩与考试成绩
			templateUrl:'teacher/calculateScore.html',
			controller:'calScoreCtrl'
		}).
		/*****管理员******/
		when('/newsmanage',{        	   //管理员管理新闻
			templateUrl:'admin/newsmanage.html',
			controller:'newsmanageCtrl'
		}).
		otherwise({
			redirectTo:'/welcome'
		});			
}]);
