/**
 * 对话框自定义指令
 */
(function() {

    var app = angular.module("directives");

    var alertDialogTemplate = "<div class='modal' data-backdrop='static' data-keyboard='false' tabindex='-1' role='dialog' style='z-index: 1990;'>    <div class='modal-dialog modal-sm' role='document'>        <div class='modal-content'>            <div class='modal-header'>                <button type='button' class='close' data-dismiss='modal' aria-label='Close'>                    <span aria-hidden='true'>&times;</span>                </button>                <h4 class='modal-title' ng-bind='alertTitle'></h4>            </div>            <div class='modal-body'>                <div ng-bind-html='alertInfo'></div>            </div>            <div class='modal-footer'>                <button type='button' class='btn btn-default' data-dismiss='modal' ng-bind-html='alertBtnOk'></button>            </div>        </div>    </div></div>";

    app.directive("alertDialog", ["$log", "DialogService", function($log, DialogService) {
        $log.debug("directive alert-dialog...");

        return {
            "restrict": "AE",//指令类型//指令分为4个 E:元素 A:属性 C:样式类 M：注释
            "template": alertDialogTemplate,//指令生成的内容
            "replace": true,//使用模板替换原始标记
            "link": function($scope, element, attr) {//link函数主要用于操作dom元素,给dom元素绑定事件和监听.
                $scope.$on("$destroy", function() {//scope:指令所在的作用域   //element：指令元素的封装，可以调用angular封装的简装jq方法和属性
                    $log.debug("directive alert-dialog destroy...");//attr：指令元素的属性的集合  
    //ctrl：用于调用其他指令的方法,指令之间的互相通信使用，需要配合require  
    //linker:用于transClude里面嵌入的内容
                });

                $log.debug("directive alert-dialog init==>", element);
                DialogService.setAlertDialog({
                    "scope": $scope,
                    "element": element
                });
            }
        };
    }]);

    var waitDialogTemplate = "<div class='modal' data-backdrop='static' data-keyboard='false' tabindex='-1' role='dialog' style='z-index: 2000;'>    <div class='modal-dialog modal-sm' role='document'>        <div class='modal-content'>            <div class='modal-header'>                <div class='modal-title' ng-bind='waitTitle'></div>            </div>            <div class='modal-body'>                <div class='text-center'>                    <span ng-bind-html='waitInfo'></span>                </div>            </div>        </div>    </div></div>";

    app.directive("waitDialog", ["$log", "DialogService", function($log, DialogService) {
        $log.debug("directive wait-dialog...");

        return {
            "restrict": "AE",
            "template": waitDialogTemplate,
            "replace": true,
            "link": function($scope, element, attr) {
                $scope.$on("$destroy", function() {
                    $log.debug("directive wait-dialog destroy...");
                });

                $log.debug("directive wait-dialog init==>", element);
                DialogService.setWaitDialog({
                    "scope": $scope,
                    "element": element
                });
            }
        };
    }]);

    var customDialogTemplate = "<div class='modal' data-backdrop='static' data-keyboard='false' tabindex='-1' role='dialog' style='z-index: 1500;'>    <div class='modal-dialog' role='document'>        <div class='modal-content'>            <div class='modal-header'>                <div class='modal-title' ng-bind='customTitle'></div>            </div>            <div class='modal-body'>                <div ng-include='customPage'></div>            </div>        </div>    </div></div>";

    app.directive("waitDialog", ["$log", "DialogService", function($log, DialogService) {
        $log.debug("directive custom-dialog...");

        return {
            "restrict": "AE",
            "template": customDialogTemplate,
            "replace": true,
            "link": function($scope, element, attr) {
                $scope.$on("$destroy", function() {
                    $log.debug("directive custom-dialog destroy...");
                });

                $log.debug("directive custom-dialog init==>", element);
                DialogService.setCustomDialog({
                    "scope": $scope,
                    "element": element
                });
            }
        };
    }]);

    var confirmDialogTemplate = "<div class='modal' data-backdrop='static' data-keyboard='false' tabindex='-1' role='dialog' style='z-index: 1990;'>    <div class='modal-dialog modal-sm' role='document'>        <div class='modal-content'>            <div class='modal-header'>                <h4 class='modal-title' ng-bind='confirmTitle'></h4>            </div>            <div class='modal-body'>                <p ng-bind-html='confirmInfo'></p>            </div>            <div class='modal-footer'>                <button type='button' class='btn btn-default' ng-click='confirmOk()'  ng-bind-html='confirmBtnYes'></button>                <button type='button' class='btn btn-default' ng-click='confirmCancel()' ng-bind-html='confirmBtnNo'></button>            </div>        </div>    </div></div>";

    app.directive("confirmDialog", ["$log", "DialogService", function($log, DialogService) {
        $log.debug("directive confirm-dialog...");

        return {
            "restrict": "AE",
            "template": confirmDialogTemplate,
            "replace": true,
            "link": function($scope, element, attr) {
                $scope.$on("$destroy", function() {
                    $log.debug("directive confirm-dialog destroy...");
                });

                $log.debug("directive confirm-dialog init==>", element);

                DialogService.setConfirmDialog({
                    "scope": $scope,
                    "element": element
                });

                $scope.confirmOk = DialogService.confirmOk;
                $scope.confirmCancel = DialogService.confirmCancel;

            }
        };
    }]);

})();