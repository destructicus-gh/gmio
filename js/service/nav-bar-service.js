(function () {
    'use strict';
    angular.module('routerApp').service('NavBarService', ['$q', function ($q) {
        var home = {
            title: "Home",
            link: "home",
            needsLogin: false
        };
        var systems = {
            title: "Game Systems",
            link: "system",
            needsLogin: true,
            hideWhilePlay: true
        };
        var archetype = {
            title: "Archetypes",
            link: "archetype",
            needsLogin: false
        };
        var settings = {
            title: "Settings",
            link: "settings",
            needsLogin: false
        };
        this.home = function () {
            return [home, systems, settings];
        };

        this.settings = function () {
            return [home, systems, settings];
        };

        this.system = function () {
            return [home, systems, settings];
        };

        this.archetype = function () {
            return [home, systems, archetype, settings];
        };


    }]);

})();