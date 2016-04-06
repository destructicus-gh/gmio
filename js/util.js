/**
 * Created by a689638 on 2/2/2016.
 */

(function () {
    'use strict';
    angular.module('routerApp').service('Utilities', [function () {
        return {
            //Utilities
            deepCopy: function (object, message) {
                if (object == null)
                    console.log(message, ": deep copy failed");
                return JSON.parse(JSON.stringify(object))
            },
            snap: function closest(input, snap) {
                return (((input % snap) < (snap / 2)) ? Math.floor(input / snap) : Math.ceil(input / snap)) * snap
            }
        }
    }]);

})();