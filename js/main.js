var manifest = {};

// Get Manifest
$.get("config.json").then(bootstrapApplication)

var ApplicationConfig = function($stateProvider, $mdThemingProvider, $urlRouterProvider, $provide){
  // Configurando o comportamento das roteador
  View.configure($provide)
  // Configurando a aula de acordo com seus meta dados
  Loader.onLoadManifest($stateProvider, $mdThemingProvider, $urlRouterProvider, manifest)
}

ApplicationConfig.$inject = ['$stateProvider', '$mdThemingProvider','$urlRouterProvider','$provide']

var ApplicationRun = function($rootScope){
    $rootScope.$global = GLOBAL
    // Limpando fila leitor de aulas
    tts.clear();
    // Eventos de Rotas
    $rootScope.$on('$stateChangeStart', angular.bind(this, Router.onStateChangeStart, $rootScope));
    $rootScope.$on('$stateChangeSuccess', angular.bind(this, Router.onStateChangeSuccess, $rootScope));
}

ApplicationRun.$inject = ['$rootScope']

var app = angular.module('application', [
  'ngAnimate',
  'ngMaterial',
  'angular-carousel',
  'ui.router',
  'ui.router.state.events'
])

app.config(ApplicationConfig).run(ApplicationRun)

function bootstrapApplication(response){
  angular.element(document).ready(function(){
    manifest = response;
    angular.bootstrap(document, ['application']);
  })
}

var lazyImgDirective = function(){
  return {
    restrict: "A",
    link: function(scope, element, attrs){
      var img = element.get(0)

      img.setAttribute('src', img.getAttribute('data-src'));

      img.onload = function() {
        img.removeAttribute('data-src');
      };
    }
  }
}

angular.module("application").directive("lazyImg", lazyImgDirective)

var uabColorsCtrl = function($rootScope, $mdColorPalette){
  var self = this
  var tema = $rootScope.$global.manifest.tema

  self.colors = {
    primary: $mdColorPalette[tema.primario]["500"],
    accent: $mdColorPalette[tema.contraste]["500"]
  }

  return self
}

uabColorsCtrl.$inject = ['$rootScope','$mdColorPalette']

var uabColors = {
  controller: uabColorsCtrl,
  templateUrl: "templates/uab-colors.html"
};

angular.module('application').component('uabColors', uabColors)

var uabDialog = function($mdDialog){
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      uabDialogTitle: "@"
    },
    template: "<ng-transclude></ng-transclude>",
    compile: function(scope, element, attrs){
      $(element)
        .find('[uab-dialog-trigger]')
        .on('click', angular.bind(scope, triggerDialog, $mdDialog))
      console.log(element)
    }
  }
}

uabDialog.$inject = ['$mdDialog']

angular.module('application').directive('uabDialog', uabDialog)


// @private
function triggerDialog(event, mdDialog){  
  mdDialog.showSimpleText(this.uabDialogTitle)
}
var uabFooterCtrl = function($element){
  var self = this;

  self.toTop = function(){
    $($element).closest("md-content").scrollTop(0)
    return false
  }

  return self;
}

uabFooterCtrl.$inject = ['$element']

var uabFooter = {
  controller: uabFooterCtrl,
  templateUrl: "templates/uab-footer.html"
}

angular.module('application').component('uabFooter', uabFooter)

// Constantes
MAX_FONT_SIZE = 20.5; // 22px
MIN_FONT_SIZE = 8.5; // 14px
DEFAULT_FONT_SIZE = 12.5; // 18.5px

var uabHeaderCtrl = function($rootScope, Sidenav, Annotations){
  var self = this;

  self.toggleSidenav = function(){
    Sidenav.open()
  };

  self.toggleAnnotations = function(){
    Annotations.toggle()
  };

  self.increaseText = function(){
    var font_size = $("body").css("font-size").replace('px','');
    var increment = parseFloat(font_size) + 2;
    increment <= MAX_FONT_SIZE ? $("body, html").css("font-size", floatToPx(increment)) : false
  }

  self.decreaseText = function(){
    var font_size = $("body").css("font-size").replace('px','');
    var increment = parseFloat(font_size) - 2;
    increment >= MIN_FONT_SIZE ? $("body, html").css("font-size", floatToPx(increment)) : false
  }

  // @private
  floatToPx = function(number){
    console.log(number);
    return number + "px";
  }

  $rootScope.$on("$stateChangeSuccess", function(){
    Sidenav.close()
  })

  return self;
}

uabHeaderCtrl.$inject = ['$rootScope','Sidenav','Annotations']

var uabHeader = {
  controller: uabHeaderCtrl,
  templateUrl: "templates/uab-header.html"
}

angular.module('application').component('uabHeader', uabHeader)

var uabHqCtrl = function($element, $timeout){
  var self = this;

  self.$onInit = function(){
    $timeout(angular.bind(self, loadFlipbook, $element), 600);
  }

  self.next = function(e){
    e.preventDefault()
    $($element).find('.flipbook').turn("next")
    return false
  }

  self.back = function(e){
    e.preventDefault()
    $($element).find('.flipbook').turn("previous")
    return false
  }

  self.toogleFullscreen = function(e){
    e.preventDefault()

    var element = $element[0]

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }

    return false
  }

  self.enableZoom = function(){
    $($element).find('.page').each(function(index, page){
      $(page).zoom({
         url: $(page).attr('big-picture'),
         on: 'click',
         touch: true,
         magnify: 0.3
      })
    })
  }

  function loadFlipbook(element){
    $(element).find('.flipbook').turn({
      // Width
      width:922,
      // Height
      height:600,
      // Elevation
      elevation: 50,
      // Enable gradients
      gradients: true,
      // Auto center this flipbook
      autoCenter: true,
      // Hardware acceleration
      acceleration: !isChrome(),
    });

    $(element).find('.flipbook').bind('turn.turning', function(e){
      $($element).find('.page').each(function(index, page){
        $(page).trigger('zoom.destroy')
      });
    });

    $(element).find('.flipbook').bind('turn.turned', function(e){
      self.enableZoom()
    });

    self.enableZoom()
  }

  return self;
}

uabHqCtrl.$inject = ['$element', '$timeout']

angular.module("application").component("uabHq",{
    controller: uabHqCtrl,
    bindings:{
      images: "="
    },
    templateUrl: "templates/uab-hq.html"
});


function isChrome() {
   return navigator.userAgent.indexOf('Chrome')!=-1;
}

var uabPaginationCtrl = function($rootScope, $timeout){
    var self = this;


    self.next = function(){
        var currentPosition  = $rootScope.$global.current_topic.position + 1;
        var hasIndex = $rootScope.$global.manifest.topicos[currentPosition];

        self.nextTopic = hasIndex;

        return angular.isDefined(hasIndex) ? true : false;
    }

    self.prev = function(){
        var currentPosition  = $rootScope.$global.current_topic.position - 1;
        var hasIndex = $rootScope.$global.manifest.topicos[currentPosition];

        self.prevTopic = hasIndex;

        return angular.isDefined(hasIndex) ? true : false;
    }

    self.reset = function(){
        self.nextTopic = null;
        self.prevTopic = null;
    }

    self.$onInit = function(){
        self.reset();
        $timeout(angular.bind(this, self.next));
        $timeout(angular.bind(this, self.prev));
    }

    $rootScope.$on("$stateChangeStart", function(event){
        self.reset();
        $timeout(angular.bind(this, self.next));
        $timeout(angular.bind(this, self.prev));
    });

    return self;
}

uabPaginationCtrl.$inject = ['$rootScope','$timeout']

angular.module("application").component("uabPagination",{
    controller: uabPaginationCtrl,
    templateUrl: "templates/uab-pagination.html",
    bindings:{
      asText: "="
    }
})

var uabQuadro = function(){
  return {
    scope: {
      icon: "@",
      title: "@"
    },
    transclude: true,
    templateUrl: "templates/uab-quadro.html"
  }
};

angular.module('application').directive('uabQuadro', uabQuadro)

var SanfonadoCtrl = function($element){
  var self = this

  self.$onInit = function(){
    self.element = $element

    $(self.element).find('[uab-sanfonado-toggle]').on('click', self.toggle)
  }

  self.toggle = function(){
    $(self.element).toggleClass('active')
    $(self.element).find('.uab-sanfonado-wrap').toggleClass('active')
  }

  return self
}

SanfonadoCtrl.$inject = ['$element']

var SanfonadoComponent = {
  controller: SanfonadoCtrl
}

angular.module('application').component('uabSanfonado', SanfonadoComponent)

var Annotations = function($mdSidenav){
  var self = this

  self.visible = false
  self.data = []

  self.toggle = function(){
    self.visible = !self.visible
  }

  return self
}

Annotations.$inject = ['$mdSidenav']

angular.module('application').factory('Annotations',  Annotations)

var uabAnnotationsCtrl = function($rootScope, Annotations){
  var self = this

  self.$annotations = Annotations

  self.$newComment = {
    text: ''
  }

  self.comments = []

  self.$onInit = function(){
    self.topic = $rootScope.$global.current_topic
  }

  self.toggle = function(){
    Annotations.toggle()
  }

  self.sendComment = function(){
    self.comments.push({
      text: self.$newComment.text,
      created_at: new Date()
    })

    console.log(self.comments)

    self.$newComment.text = ''
  }

  $rootScope.$on('topic:change', function(event, topic){
    self.topic = topic
  })

  return self
}

uabAnnotationsCtrl.$inject = ['$rootScope','Annotations']

var uabAnnotations = {
  controller: uabAnnotationsCtrl,
  templateUrl: "templates/uab-annotations.html"
}

angular.module('application').component('uabAnnotations', uabAnnotations)

var uabSidenavCtrl = function(Sidenav){
  var self = this

  self.close = function(){
    Sidenav.close()
  }

  return self
}

uabSidenavCtrl.$inject = ['Sidenav']

var uabSidenav = {
  controller: uabSidenavCtrl,
  templateUrl: "templates/uab-sidenav.html"
}

angular.module('application').component('uabSidenav', uabSidenav)

var Sidenav = function($mdSidenav){
  return {
    $id: "uab-sidenav",
    open: function(){
      return $mdSidenav(this.$id).open()
    },
    close: function(){
      return $mdSidenav(this.$id).close()
    },
    toggle: function(){
      return $mdSidenav(this.$id).toggle()
    },
  }
}

Sidenav.$inject = ['$mdSidenav']

angular.module('application').factory('Sidenav', Sidenav)

var uabMedia = function(){
  return {
    restrict: 'A',
    scope: {
      type: "@"
    },
    link: function(scope, element, attr){
      var media = element.get(0)
      plyr.setup(media);
    }
  }
};

angular.module('application').directive('uabMedia', uabMedia);

var uabSlideItem = function(){
  return {
    restrict: "A",
    scope: {
      uabSlideItem: "@"
    },
    templateUrl: "templates/uab-slide-item.html"
  }
}

angular.module("application").directive("uabSlideItem", uabSlideItem)

var TIMEOUT = 2000;

var uabSvgAnimation = function($timeout){
  return {
    restrict: "E",
    scope: true,
    link: function(scope, element, attrs){
      $(element).find('iframe').on('load', function(e){
        $timeout(angular.bind(this, onIframeLoad, element), TIMEOUT)
      })
    }
  }
}

uabSvgAnimation.$inject = ['$timeout']

angular.module("application").directive("uabSvgAnimation", uabSvgAnimation)


var onIframeLoad = function(element){
  var body = $(element).find('iframe').contents().find('body')
  var canvas_container = $(body).find('#animation_container')

  // Update canvas container view
  $(canvas_container).css('margin','auto')

  if($(window).width() < 600){
    $(element).css('height','')
    
    $(canvas_container).css('max-width','100%')
    $(canvas_container).css('height','')
    $(canvas_container).css('height','auto')
    
    // Update canvas view
    $(canvas_container).children('#canvas').css('max-width','100%')
    $(canvas_container).children('#canvas').css('height','')
    $(canvas_container).css('height','auto')
  }

  $(window).resize(angular.bind(this, onIframeLoad, element))
}
var ApplicationCtrl = function ($rootScope, $mdMedia, $mdToast, Sidenav) {
  var self = this;

  $rootScope.$mdMedia = $mdMedia;

  // Audio Button API
  self.listen = function (location, msg) {
    var sound = document.createElement('audio')

    sound.addEventListener('play', function (e) {
      $mdToast.showSimple( msg || 'Executando Faixa')
    })

    sound.src = location
    sound.play();
  }

  return self;
};

ApplicationCtrl.$inject = ['$rootScope', '$mdMedia', '$mdToast', 'Sidenav']

angular.module("application").controller("ApplicationCtrl", ApplicationCtrl);
