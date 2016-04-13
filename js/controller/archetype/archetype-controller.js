/**
 * Created by a689638 on 2/3/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('ArchetypeController', ['DriveFileService', 'FileStructureService', 'CurrentEntity', '$state',
        function (DriveFileService, FileStructureService, CurrentEntity, $state) {
        var archMain = this;
        archMain.shareData = {name:"yup"};
        archMain.state =  $state;
        archMain.currentEntity = CurrentEntity.entity;
        }]);

})();