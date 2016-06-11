/**
 * Created by a689638 on 2/3/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').controller('ArchetypeManyController', ['$q', 'DriveFileService', 'FileStructureService', 'ArchetypeService', function ($q, DriveFileService, FileStructureService, ArchetypeService) {
        var vm = this;

        vm.filter = "";
        vm.archetypes = [];

        var init = function () {
            ArchetypeService.readAll()
                .then(function (archetypes) {
                    console.log("all archetypes", archetypes);
                    return $q.all(_.map(archetypes, function (it) {
                        return DriveFileService.loadFile(it.id);
                    }));
                }).then(function (files) {
                    console.log("files", files);
                    vm.archetypes = files;
                });
        }

        init();


}]);

})();