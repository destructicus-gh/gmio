(function () {
    'use strict';
    angular.module('routerApp').controller('SettingsController', ['DriveFileService', 'FileStructureService', 'ConfigurationService', function (DriveFileService, FileStructureService, ConfigurationService) {
        var vm = this;
        vm.config = ConfigurationService;
        vm.config.readSettings().then(function (ret) {
            console.log("read returns ", ret)
        });
        vm.save = function () {
            vm.config.saveSettings().then(function (ret) {
                console.log("save returned", ret);
            }, function (err) {
                console.log(err)
            });
        }
        }]);

})();