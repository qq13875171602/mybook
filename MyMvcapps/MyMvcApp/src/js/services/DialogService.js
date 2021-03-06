/**
 * 对话框服务
 */
(function() {
    var services = angular.module("services");

    services.factory("DialogService", ["$rootScope", "$log", "$timeout", DialogService]);

    function DialogService($rootScope, $log, $timeout) {
        $log.info("DialogService init...");
        var service = {};

        // 通用标题设置
        var dialogTitle = "信息";

        service.setDialogTitle = function(title) {
            dialogTitle = title;
        };

        var tempDialogTitle = null;

        service.setTempDialogTitle = function(title) {
            tempDialogTitle = title;
        };

        /* 确定对话框 ========================================================== */
        var alertBtnOk = "确定";
        var tempAlertBtnOk = null;

        service.setAlertBtnOk = function(ok) {
            tempAlertBtnOk = ok;
        };

        var alertDialog = {
            "closefn": angular.noop,//
            "hasinit": false,
        };

        service.setAlertDialog = function(dialog) {
            $log.debug("DialogService.setAlertDialog==>", dialog);
            alertDialog.scope = dialog.scope;//检索当前元素或者父元素
            alertDialog.element = dialog.element;//把传进来的dom或者html元素转化为jquery对象
            alertDialog.element.on("hidden.bs.modal", function() {//然后为这个对象绑定事件
                // 执行并重置回调函数
                var cb = alertDialog.closefn;
                alertDialog.closefn = angular.noop;
                cb();
            });
            alertDialog.hasinit = true;

        };

        service.showAlertDialog = function(info, cb) {
            if (!alertDialog.hasinit) {
                $log.debug("DialogService.showAlertDialog not init...");
                return;
            }

            $timeout(function() {
                alertDialog.closefn = (cb || angular.noop);
                alertDialog.scope.alertInfo = info;
                alertDialog.scope.alertTitle = (tempDialogTitle || dialogTitle);
                alertDialog.scope.alertBtnOk = (tempAlertBtnOk || alertBtnOk);
                tempDialogTitle = null;
                tempAlertBtnOk = null;
                alertDialog.element.modal("show");
            });
        };

        service.hideAlertDialog = function() {
            alertDialog.element.modal("hide");
        };
        /* ========================================================== */

        /* 等待对话框 ========================================================== */
        var waitDialog = {
            "closefn": angular.noop,
            "hasinit": false,
        };

        service.setWaitDialog = function(dialog) {
            $log.debug("DialogService.setWaitDialog==>", dialog);
            waitDialog.scope = dialog.scope;
            waitDialog.element = dialog.element;
            waitDialog.element.on("hidden.bs.modal", function() {
                // 执行并重置回调函数
                var cb = waitDialog.closefn;
                waitDialog.closefn = angular.noop;
                cb();
            });
            waitDialog.hasinit = true;
        };

        service.showWaitDialog = function(info, cb) {
            if (!waitDialog.hasinit) {
                $log.debug("DialogService.showWaitDialog not init...");
                return;
            }

            $timeout(function() {
                waitDialog.closefn = (cb || angular.noop);
                waitDialog.scope.waitInfo = info;
                waitDialog.scope.waitTitle = (tempDialogTitle || dialogTitle);
                tempDialogTitle = null;
                waitDialog.element.modal("show");
            });
        };

        service.hideWaitDialog = function() {
            waitDialog.element.modal("hide");
        };
        /* ========================================================== */

        /* 自定义对话框 ========================================================== */

        var confirmBtnYes = "确定";
        var confirmBtnNo = "取消";

        var tempConfirmBtnYes = null;
        var tempConfirmBtnNo = null;

        service.setConfirmBtnYes = function(yes) {
            tempConfirmBtnYes = yes;
        };

        service.setConfirmBtnNo = function(no) {
            tempConfirmBtnNo = no;
        };

        var confirmDialog = {
            "yesfn": angular.noop,
            "nofn": angular.noop,
            "choose": "no",
            "hasinit": false
        };

        service.setConfirmDialog = function(dialog) {
            $log.debug("DialogService.setConfirmDialog==>", dialog);
            confirmDialog.scope = dialog.scope;
            confirmDialog.element = dialog.element;
            confirmDialog.hasinit = true;
        };

        service.showConfirmDialog = function(info, cby, cbn) {
            if (!confirmDialog.hasinit) {
                $log.debug("DialogService.showConfirmDialog not init...");
                return;
            }
            $timeout(function() {
                confirmDialog.yesfn = (cby || angular.noop);
                confirmDialog.nofn = (cbn || angular.noop);
                confirmDialog.scope.confirmInfo = info;
                confirmDialog.scope.confirmTitle = (tempDialogTitle || dialogTitle);
                tempDialogTitle = null;
                alertDialog.scope.confirmBtnYes = (tempConfirmBtnYes || confirmBtnYes);
                alertDialog.scope.confirmBtnNo = (tempConfirmBtnNo || confirmBtnNo);
                tempConfirmBtnYes = null;
                tempConfirmBtnNo = null;

                confirmDialog.element.on("hidden.bs.modal", function() {
                    // 执行并重置回调函数
                    var cb = (confirmDialog.choose == "no") ? confirmDialog.nofn : confirmDialog.yesfn;
                    confirmDialog.choose = "no";
                    confirmDialog.nofn = angular.noop;
                    confirmDialog.yesfn = angular.noop;
                    cb();
                });

                confirmDialog.element.modal("show");
            });
        };

        service.hideConfirmDialog = function() {
            confirmDialog.element.modal("hide");
        };

        service.confirmOk = function() {
            confirmDialog.choose = "yes";
            service.hideConfirmDialog();
        };
        service.confirmCancel = function() {
            confirmDialog.choose = "no";
            service.hideConfirmDialog();
        };

        /* ========================================================== */

        /* 自定义对话框 ========================================================== */
        var customDialog = {
            "closefn": angular.noop,
            "hasinit": false,
            "data": {}
        };

        service.setCustomDialog = function(dialog) {
            $log.debug("DialogService.setCustomDialog==>", dialog);
            customDialog.scope = dialog.scope;
            customDialog.element = dialog.element;
            customDialog.element.on("hidden.bs.modal", function() {
                var cb = customDialog.closefn;
                customDialog.closefn = angular.noop;
                cb();
            });
            customDialog.hasinit = true;
        };

        service.showCustomDialog = function(page, data, cb) {
            if (!customDialog.hasinit) {
                $log.debug("DialogService.showCustomDialog not init...");
                return;
            }
            $timeout(function() {
                customDialog.scope.customPage = page;
                page = "";
                customDialog.data = (data || {});
                customDialog.closefn = (cb || angular.noop);
                customDialog.scope.customTitle = (tempDialogTitle || dialogTitle);
                tempDialogTitle = null;
                customDialog.element.modal("show");
            });
        };

        service.hideCustomDialog = function() {
            customDialog.element.modal("hide");
        };

        service.getCustomData = function() {
            var data = customDialog.data;
            customDialog.data = {};
            return data;
        };
        /* ========================================================== */

        return service;
    }

})();