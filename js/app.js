var routerApp = angular.module('routerApp', ['ui.router', 'ngAnimate']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'views/partial-home.html',
            controller: 'HomeController',
            controllerAs: 'home',
            onEnter: function (ApplicationState, NavBarService) {
                ApplicationState.navBar = NavBarService.home();
            }
        })
        .state('system', {
            url: '/rule-sets',
            templateUrl: 'views/systems.html'
        })
        .state('modal', {
            controller: function () {
                var vm = this;
                vm.openModal = function () {
                    console.log("clled controller")
                }
            },
            controllerAs: 'vm',
            url: '/modal',
            template: '<div data-modal-trigger ng-click="openModal()" url="views/settings.html">HEY</div>'
        })

        .state('view', {
            url: '/view',
            controller: "ArchetypeViewController",
            controllerAs: 'vm',
            templateUrl: 'views/archetypes/archetype-view.html'
        })
        .state('settings', {
            url: '/settings',
            controller: "SettingsController",
            controllerAs: "settings",
            templateUrl: 'views/settings.html',
            onEnter: function (ApplicationState, NavBarService) {
                ApplicationState.navBar = NavBarService.settings();
            }

        })
        .state('archetype', {
            url: '/archetypes',
            controller: 'ArchetypeController',
            controllerAs: 'vm',
            views: {
                '': {
                    templateUrl: 'views/archetypes/archetypes.html'
                },
                'new@archetype': {
                    templateUrl: 'views/archetypes/archetypes-new.html',
                    controller: 'ArchetypeNewController',
                    controllerAs: 'vm'
                },
                'one@archetype': {
                    templateUrl: 'views/archetypes/archetypes-one.html',
                    controller: 'ArchetypeOneController',
                    controllerAs: 'vm'
                }
            }
        });
}); // closes $routerApp.config()