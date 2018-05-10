(function() {
  var app = angular.module("directives");

  app.directive("formatDate", ["$log", "utilservice", function($log, utilservice) {
    $log.debug("format-date init....");
    return {
      scope: {
        formatDate: "@"//重复使用driective中的scope必须隔离,通过@来继承,formatDate是把指令里面所有的内容都给继承
      },
      link: function($scope, element, attr) {


        var watch = $scope.$watch("formatDate", function(nv, ov) {//nv是监测的值//ov是此次改变前的值
          $log.debug("format-date watch:", nv);
          var ts = parseInt(nv.replace(/\D/g, ""));//parseInt函数可解析一个字符串，并返回一个整数。\D匹配非数字的字符/g返回所有的匹配　
          $log.debug("format-date watch===>", ts);
          element.html(utilservice.formatDate(ts, "y-M-d h:m:s w"));
        });

        $scope.$on("$destroy", function() {
          $log.debug("dir-one destroy....");
          watch();
        });

      }
    };



  }]);
})();