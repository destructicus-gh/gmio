/**
 * Created by a689638 on 2/3/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('IndexController', ['DriveAuthenticationService', function (DriveAuthenticationService) {
        var vm = this;
        vm.authenticatedState = "loading";


        var prod = true;

        if (!prod) {
            setTimeout(function () {
                DriveAuthenticationService.checkAuthentication().then(function (result) {
                    vm.authenticatedState = "pass";
                }, function (result) {
                    vm.authenticatedState = "sucked";
                    DriveAuthenticationService.login().then(function (value) {
                        vm.authenticatedState = "pass";
                    }, function (value) {
                        vm.authenticatedState = "sucked";
                    });

                });
            }, 500); //just enough time for the page to load. it's dirty but it works.
        } else {
            vm.authenticatedState = "pass";
        }


        vm.files = [];


        /**
         * Print files.
         */
        function listFiles() {
            var request = gapi.client.drive.files.list({
                'maxResults': 100
            }, function (data) {
                vm.files = data;
            });
        }
    }]);

})();