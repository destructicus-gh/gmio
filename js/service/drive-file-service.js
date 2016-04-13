/**
 * Created by a689638 on 2/3/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').service('DriveFileService', ['$q', function ($q) {
        var DEFAULT_FILE = {
            content: '',
            metadata: {
                id: null,
                title: 'untitled.txt',
                mimeType: 'text/plain',
                editable: true
            }
        };

        var DEFAULT_FIELDS = 'id,title,mimeType,userPermission,editable,copyable,shared,fileSize';


        return {
            listFiles: listFiles,
            loadFile: loadFile,
            saveFile: saveFile,
            newFolder: newFolder,
            searchFile: searchFile,
            searchInFolder: searchInFolder,
            getMetadata: getMetadata,
            justOne: justOne,
            trashFile: trashFile
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


        /**
         * Load a file from Drive. Fetches both the metadata & content in parallel.
         *
         * @param {String} fileID ID of the file to load
         * @return {Promise} promise that resolves to an object containing the file metadata & content
         */
        function loadFile(fileId) {
            console.log("service loadfile", fileId);
            return fileId ? $q.all([$q.when(gapi.client.drive.files.get({
                fileId: fileId,
                fields: DEFAULT_FIELDS
            })), $q.when(gapi.client.drive.files.get({
                fileId: fileId,
                alt: 'media'
            }))]).then(function (responses) {
                console.log("then b", responses);
                return combineAndStoreResults(responses[0].result, responses[1].body);
            }) : $q.when(DEFAULT_FILE);
        }


        /**
         * Save a file to Drive using the mutlipart upload protocol.
         *
         * @param {Object} metadata File metadata to save
         * @param {String} content File content
         * @return {Promise} promise that resolves to an object containing the current file metadata & content
         */
        function saveFile(metadata, content) {

            var path;
            var method;

            if (metadata.id) {
                path = '/upload/drive/v2/files/' + encodeURIComponent(metadata.id);
                method = 'PUT';
            } else {
                path = '/upload/drive/v2/files';
                method = 'POST';
            }

            var multipart = new MultiPartBuilder()
                .append('application/json', JSON.stringify(metadata))
                .append(metadata.mimeType, content)
                .finish();

            var uploadRequest = gapi.client.request({
                path: path,
                method: method,
                params: {
                    uploadType: 'multipart',
                    fields: DEFAULT_FIELDS
                },
                headers: {
                    'Content-Type': multipart.type
                },
                body: multipart.body
            }, function (response) {
                return combineAndStoreResults(response.result, content);
            });
            return $q.when(uploadRequest);
        }

        function justOne(searchResult) {
            if (searchResult.result.items.length > 0) {
                return searchResult.result.items[0];
            } else {
                return null;
            }
        }

        function searchFile(q) {
            var uploadRequest = gapi.client.request({
                path: '/drive/v2/files',
                method: 'GET',
                params: {
                    q: q
                }
            });
            return $q.when(uploadRequest);
        }

        function searchInFolder(q, folderId) {
            var uploadRequest = gapi.client.request({
                path: '/drive/v2/files/' + ((folderId) ? folderId : 'root') + '/children',
                method: 'GET',
                params: {
                    q: q
                }
            });
            return $q.when(uploadRequest);
        }

        function getMetadata(fileId) {
            var uploadRequest = gapi.client.request({
                path: '/drive/v2/files/' + fileId,
                method: 'GET',
                params: {

                }
            });
            return $q.when(uploadRequest);
        }


        function newFolder(folderName, parent, bypassCheck) {
            if (!bypassCheck) {
                searchInFolder("title contains '" + folderName + "'", parent).then(function (raw) {
                    if (raw.result.items.length > 0) {
                        return $q.when(raw.result.items[0]);
                    }
                });
            }
            var uploadRequest = gapi.client.request({
                path: '/drive/v2/files',
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: {
                    "title": folderName,
                    "parents": [{
                        "id": parent
                    }],
                    "mimeType": "application/vnd.google-apps.folder"
                }
            });
            return $q.when(uploadRequest);
        }

        function combineAndStoreResults(metadata, content) {
            console.log("comb n store");
            var file = {
                metadata: metadata,
                content: content
            };
            return file;
        }

        function trashFile(fileId) {
            return $q.when(gapi.client.drive.files.trash({
                'fileId': fileId
            }));
        }

                }]);

})();