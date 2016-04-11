/**
 * Created by a689638 on 2/3/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').service('ApplicationState', ['$q', 'DriveFileService', function ($q, DriveFileService) {
        this.authentiationState = "loading";
        this.isSetUp = false;
        this.hasRunTutorial = false;
        this.navBar = [];
    }]);

})();