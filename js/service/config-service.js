(function () {
    'use strict';
    angular.module('routerApp').service('ConfigurationService', ['$q', 'DriveFileService', function ($q, DriveFileService) {

        var fileMetadata = {
            'name': 'config.json',
            'parents': ['appDataFolder']
        };
        var media = {
            mimeType: 'application/json',
            body: "fs.createReadStream('files/config.json')"
        };
        return {
            listFiles: listFiles
        };

        function listFiles(callb) {
            return $q.when(gapi.client.request({
                'path': '/drive/v2/files',
                'method': 'GET',
                'params': {
                    'maxResults': '5'
                }
            }, callb));
        }

        function createConfig(callb) {
//            return DriveFileService.createFile(
        //                callb, fileMetadata, )
        }

    }]);

})();