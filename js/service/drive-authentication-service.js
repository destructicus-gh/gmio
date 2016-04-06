/**
 * Created by a689638 on 2/3/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').service('DriveAuthenticationService', ['$q', function ($q) {
        var CLIENT_ID = '767540668141-eem9dgcurlgd2c4irnplufsm76cr2s9q.apps.googleusercontent.com';
        this.client_id = CLIENT_ID;

        var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly', 'https://www.googleapis.com/auth/drive', "https://www.googleapis.com/auth/drive.appdata"
                     , "https://www.googleapis.com/auth/drive.appfolder"];
        this.scopes = SCOPES;
        return {
            client_id: CLIENT_ID
            , scopes: SCOPES
            , checkAuthentication: checkAuthentication
            , login: loginPopup
        };

        function loadDriveApi() {
            gapi.client.load('drive', 'v2', function (ret) {
                console.log("loadDriveApi Done", ret);
            });
        }

        function checkAuthentication() {
            console.log("checking authentication");

            return $q.when(
                gapi.auth.authorize({
                    'client_id': CLIENT_ID
                    , 'scope': SCOPES.join(' ')
                    , 'immediate': true
                }, function handleAuthResult(authResult) {
                    console.log("handling result")
                    var authorizeDiv = document.getElementById('authorize-div');
                    if (authResult && !authResult.error) {
                        console.log("it was good");
                        // Hide auth UI, then load client library.
                        loadDriveApi();
                        return authResult;

                    } else {
                        console.log("it was bad");
                        return authResult;

                    }
                }));
        }

        function loginPopup() {
            return $q.when(
                gapi.auth.authorize({
                        client_id: CLIENT_ID
                        , scope: SCOPES
                        , immediate: false
                    }
                    , function (result) {
                        console.log(result);
                    }));
        }

                }]);

})();