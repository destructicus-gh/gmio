/**
 * Created by a689638 on 2/3/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('IndexController', ['DriveAuthenticationService', 'NavBarService', 'ApplicationState', function (DriveAuthenticationService, NavBarService, ApplicationState) {
        var vm = this;
        vm.authenticatedState = "loading";
        vm.navBar = NavBarService;
        vm.state = ApplicationState;

        var prod = true;

        //        if (!prod) {
        //            setTimeout(function () {
        //                DriveAuthenticationService.checkAuthentication().then(function (result) {
        //                    vm.authenticatedState = "pass";
        //                }, function (result) {
        //                    vm.authenticatedState = "sucked";
        //                    DriveAuthenticationService.login().then(function (value) {
        //                        vm.authenticatedState = "pass";
        //                    }, function (value) {
        //                        vm.authenticatedState = "sucked";
        //                    });
        //
        //                });
        //            }, 500); //just enough time for the page to load. it's dirty but it works.
        //        } else {
        vm.authenticatedState = "pass";
        //        }


        vm.files = [];
    }]);

})();