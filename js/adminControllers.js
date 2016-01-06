/***************************管理员控制器**************************/

//管理新闻
appControllers.controller('newsmanageCtrl',['$scope','$mdDialog',function($scope,$mdDialog){
 var imagePath = 'front_frame/angular-material/img/list/60.jpeg';
 $scope.news = [
      {
        face : imagePath,
        title: '一拳超人的简介',
        year: '2014-5-9',
        when: '3:08PM',
        content: " 《一拳超人[1]  》（日语：ワンパンマン），又有译作《一击男》，是日本网络漫画家ONE的幽默格斗漫画，该作品以一个漫原稿软件ComicStudio PC 制作，于2009年7月3日在ONE的个人网站开始连载,虽然画功粗糙，但却于日本网络大热，根据日本NHK2012年9月2日播出的“网络漫画革命”调查，		《一拳超人》于该年观看总数超过1000万次，平均每天有高达20,000点击。现在持续于ONE的网站连载中"
      },
      {
        face : imagePath,
        title: 'Brunch this weekend?',
        year: '2014-5-9',
        when: '3:08PM',
        content: "《一拳超人[1]  》（日语：ワンパンマン），又有译作《一击男》，是日本网络漫画家ONE的幽默格斗漫画，该作品以一个漫原稿软件ComicStudio PC 制作，于2009年7月3日在ONE的个人网站开始连载,虽然画功粗糙，但却于日本网络大热，根据日本NHK2012年9月2日播出的“网络漫画革命”调查"
      },
      {
        face : imagePath,
        title: 'Brunch this weekend?',
        year: '2014-5-9',
        when: '3:08PM',
        content: "《一拳超人[1]  》（日语：ワンパンマン），又有译作《一击男》，是日本网络漫画家ONE的幽默格斗漫画，该作品以一个漫原稿软件ComicStudio PC 制作，于2009年7月3日在ONE的个人网站开始连载,虽然画功粗糙，但却于日本网络大热，根据日本NHK2012年9月2日播出的“网络漫画革命”调查，		《一拳超人》于该年观看总数超过1000万次，平均每天有高达20,000点击。现在持续于ONE的网站连载中"
      },
      {
        face : imagePath,
        title: 'Brunch this weekend?',
        year: '2014-5-9',
        when: '3:08PM',
        content: "《一拳超人[1]  》（日语：ワンパンマン），又有译作《一击男》，是日本网络漫画家ONE的幽默格斗漫画，该作品以一个漫原稿软件ComicStudio PC 制作，于2009年7月3日在ONE的个人网站开始连载,虽然画功粗糙，但却于日本网络大热，根据日本NHK2012年9月2日播出的“网络漫画革命”调查，		《一拳超人》于该年观看总数超过1000万次，平均每天有高达20,000点击。现在持续于ONE的网站连载中"
      },
      {
        face : imagePath,
        title: 'Brunch this weekend?',
        year: 'Min Li Chan',
        when: '3:08PM',
        content: "《一拳超人[1]  》（日语：ワンパンマン），又有译作《一击男》，是日本网络漫画家ONE的幽默格斗漫画，该作品以一"
      },
    ];
    
    /*****添加新闻******/
    $scope.addnews=function(ev){
		$mdDialog.show({
			controller: addnewsController,
			templateUrl: 'admin/addnew.html',
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
							 openAlert(ev,'修改成功！');
						}
					},
					error:function(r){
						openAlert(ev,'系统忙，请稍候再试！');
					}
				});
			}, function() {});
			
		/******对话框控制器******/	
		function addnewsController($scope, $mdDialog){
			$scope.myDate=new Date();
            
			$scope.cancel = function(ev) {
				ev.preventDefault();
				$mdDialog.cancel();
			};
			$scope.answer = function(ev) {

                if($scope.myDate==undefined){
                    openAlert(ev,'请选择一个日期');
                    return false;
                }
                
				//$mdDialog.hide($scope.user);
			};
		}
    }
    
    $scope.editnews=function(index){
        
    }
	
    $scope.deletenews=function(index){
        
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
	