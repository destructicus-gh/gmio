/**
 * Created by a689638 on 2/3/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('IndexController', ['DriveAuthenticationService', 'NavBarService', 'ApplicationState', 'FileStructureService', function (DriveAuthenticationService, NavBarService, ApplicationState, FileStructureService) {
        var vm = this;
        vm.authenticatedState = "loading";
        vm.navBar = NavBarService;
        vm.state = ApplicationState;

        var auth = false;

        if (auth) {
            setTimeout(function () {
                DriveAuthenticationService.checkAuthentication().then(function (result) {
                    vm.authenticatedState = "pass";
                }, function (result) {
                    vm.authenticatedState = "sucked";
                    DriveAuthenticationService.login().then(function (value) {
                        console.log("login generates", value);
                        vm.authenticatedState = "pass";
                    }, function (value) {
                        vm.authenticatedState = "sucked";
                    });

                }, function (result) {
                    console.log("check auth", result);
                }).then(function (ret) {
                    return FileStructureService.init();
                }).then(function (ret) {
                    console.log("return from fileinit", ret);
                });
            }, 1000); //just enough time for the page to load. it's dirty but it works.
        } else {
            vm.authenticatedState = "pass";
        }



        vm.files = [];
    }]);

})();