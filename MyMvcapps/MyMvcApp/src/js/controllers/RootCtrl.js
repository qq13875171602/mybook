(function() {
    var ctrls = angular.module("controllers");
    ctrls.controller("RootCtrl", ["$rootScope", "$scope", "$log", "$location","DataService", RootCtrl]);

    function RootCtrl($rootScope, $scope, $log, $location,DataService) {
        $log.debug("RootCtrl init...", $location.path());
        //设置初始化后台服务器地址
        DataService.setServer("http://localhost:6286/");
        DataService.loadLocalUser();
        // 处理scope销毁
        $scope.$on("$destroy", function() {
            $log.debug("RootCtrl destroy...");
        });

        // 监听视图切换
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            $log.debug("route加载页面中：", next, "-", current, "[event]", event);
        });
        $rootScope.$on("$routeChangeSuccess", function(event, current, previous) {
            $log.debug("route加载完毕。。。", current, "-", previous, "[event]", event);
        });
        $rootScope.$on("$routeChangeError", function(event, current) {
            $log.debug("route加载错误。。。", current, "[event]", event);
        });
    }
})();