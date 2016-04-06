var routerApp = angular.module('routerApp', ['ui.router', 'ngAnimate']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider

        .state('home', {
        url: '/home',
        templateUrl: 'views/partial-home.html',
        controller: 'HomeController',
        controllerAs: 'home'
    })

    .state('system', {
        url: '/rule-sets',
        templateUrl: 'views/systems.html'
    })

    .state('archetype', {
        url: '/archetypes',

        views: {
            '': {
                templateUrl: 'views/archetypes/archetypes.html',
                controller: 'ArchetypeController',
                controllerAs: 'archMain'
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
    })

    // nested list with just some random string data
    .state('home.paragraph', {
        url: '/paragraph',
        template: 'I could sure use a drink right now.'
    });

}); // closes $routerApp.config()