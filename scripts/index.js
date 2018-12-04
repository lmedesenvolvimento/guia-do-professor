var manifest = {};

// Get Manifest
bootstrapApplication();

var ApplicationConfig = function($stateProvider, $mdThemingProvider, $urlRouterProvider, $provide){
  // Configurando o comportamento das roteador
  View.configure($provide)
  // Configurando a aula de acordo com seus meta dados
  Loader.onLoadManifest($stateProvider, $mdThemingProvider, $urlRouterProvider, manifest);  
}

ApplicationConfig.$inject = ['$stateProvider', '$mdThemingProvider','$urlRouterProvider','$provide']

var ApplicationRun = function($rootScope, $http){
    // Configurando Impresso
    Impress.instance($http, manifest)

    $rootScope.$global = GLOBAL
    // Eventos de Rotas
    $rootScope.$on('$stateChangeStart', angular.bind(this, Router.onStateChangeStart, $rootScope));
    $rootScope.$on('$stateChangeSuccess', angular.bind(this, Router.onStateChangeSuccess, $rootScope));

    // Init Fancybox
    $().fancybox({
      selector: '[data-fancybox]',
      buttons: [
        'slideShow',
        'zoom',
        'close'
      ],
      touch: false,
      loop: false,
      hash: false,
      afterShow: function(){
        $('.main').scrollTop($rootScope.$fancyScrollTop)
      }
    });
}

ApplicationRun.$inject = ['$rootScope','$http'];

// Register templates module
angular.module('templates', []);

var app = angular.module('application', [
  'ngAnimate',
  'ngSanitize',
  'ngMessages',
  'ngMaterial',
  'angular-carousel',
  'ui.router',
  'ui.router.state.events',
  'textAngular',
  'cfp.hotkeys'  
])

app.config(ApplicationConfig).run(ApplicationRun)


function bootstrapApplication(response){
  angular.element(document).ready(function(){
    manifest = window.CONFIG;
    angular.bootstrap(document, ['templates','application']);
  })  
}


