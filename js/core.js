window.CONFIG = {
    "nome": "Aula 01: Contrato Psicológico",
    "academico":{
        "curso": "Licenciatura em Pedagogia",
        "cursoIcone": "layout/icones/admin_pub_tit.svg",
        "disciplina":"Psicologia do Desenvolvimento e da Aprendizagem na Adolescência",
        "responsavel": "Professora Nidia Barone"
    },
    "topicos": [
        {
            "nome": "Apresentação",
            "local": "topicos/apresentacao.html",
            "audio": "audios/Abstract - I Do This (ft. Roze) Prod By Drumma Battalion.mp3",
            "icon": "icon-account_balance",
            "default": true
        },
        {
            "nome": "Introdução",
            "local": "topicos/introducao.html",
            "audio": "audios/grid.mp3",
            "icon": "icon-arrow_forward"
        },
        {
            "nome": "Objetivos",
            "local": "topicos/objetivos.html",
            "audio": "https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3",
            "icon": "icon-check_circle"
        },
        {
            "nome": "Descrição do RED",
            "local": "topicos/descricao.html",
            "audio": "audios/Abstract - Neverland (ft. Ruth B) (Prod. Blulake).mp3",
            "icon": "icon-chrome_reader_mode"
        },
        {
            "nome": "Atividades Anteriores",
            "local": "topicos/atividades-anteriores.html",
            "audio": "audios/Abstract - Scars (ft. RoZe) (Prod. Drumma Battalion).mp3",
            "icon": "icon-cached"
        },
        {
            "nome": "Atividades com o RED",
            "local": "topicos/atividades-red.html",
            "audio": "audios/Abstract - Scars (ft. RoZe) (Prod. Drumma Battalion).mp3",
            "icon": "icon-laptop_windows"
        },
        {
            "nome": "Materiais Complementares",
            "local": "topicos/complementar.html",
            "audio": "audios/Abstract - Scars (ft. RoZe) (Prod. Drumma Battalion).mp3",
            "icon": "icon-get_app"
        }
    ],
    "pdf": "pdf/impresso.pdf",
    "audio": "audios/Abstract - Scars (ft. RoZe) (Prod. Drumma Battalion).mp3",
    "tema":{
      "primario": "blue-700",
      "contraste": "pink"
    },
    "imported_styles":[
        "custom.css"
    ]
};

var GLOBAL = {
    manifest: null,
    impress: null
}
var Impress = {
  _instance: {
    isPrinting: false,
    topicos: []
  },

  instance: function($http, manifest){
    GLOBAL.impress = Impress;

    manifest.topicos.forEach(function(t){
      $http.get(t.local).then(function(response){
        Impress._instance.topicos.push({
         nome: t.nome,
         data: response.data
        })
      });
    });
    // Bind print events
    window.onbeforeprint = Impress.onBeforePrint
    window.onafterprint = Impress.onAfterPrint
  },
  onBeforePrint: function(){
    $('#root').addClass('ng-hide')
    $('#impress').removeClass('ng-hide') 
    Impress.addLinkFonts()
    console.log("printing...")
  },
  onAfterPrint: function(){
    $('#impress').addClass('ng-hide')
    $('#root').removeClass('ng-hide')
    Impress.removeLinkFonts()
    console.log("exit print...")
  },
  addLinkFonts: function(){
    Impress.createListLinks();
    
    $('#impress').find("a[href^='http']").each(function(i){
			if ( $(this).attr('id') == 'logo-ufc' || $(this).attr('id') == 'logo-ufcv' ) {
				// evitando colocar os links dos logos de rodape na lista de links
			} else {
				var b = i+1;
        link = $(this).attr("href");
        // Create Link reference
        $(this).append("<span class='image-link'> ["+b+"]</span>");
        // Add link in list
				$("#links").append("<li>"+ b + " - " + link+"</li>");
			}
		});
  },
  removeLinkFonts: function(){
    Impress.destroyListLinks();
    
    $('#impress').find(".image-link").each(function(i){
			$(this).remove()
		});
  },
  createListLinks: function(){
    var list = "<ol id='links'></ol>"
    $('#impress').append(list)
  },
  destroyListLinks: function(){
    $('#impress #links').remove()
  }
}
var Loader = {
    onLoadManifest: function(stateProvider, mdThemingProvider, urlRouterProvider, manifest){
        GLOBAL.manifest = manifest;

        // Set document settings
        document.title = GLOBAL.manifest.academico.curso

        manifest.topicos.forEach(function(t, position){
          t.slug = S(t.nome).slugify().s;
          t.position = position;

          stateProvider.state({
              name: t.slug,
              url: "/" + t.slug,
              templateUrl: t.local,
              cache: false
          });
        });

        // Configurando Tema

        var primaryPalette = manifest.tema.primario.split('-')
        var accentPalette = manifest.tema.contraste.split('-')

        mdThemingProvider
          .theme('default')
          .primaryPalette(primaryPalette[0], {
            'default': primaryPalette.length > 1 ? primaryPalette[1] : '500'
          })
          .accentPalette(accentPalette[0], {
            'default': accentPalette.length > 1 ? accentPalette[1] : '500'
          });


        // Configurando o tópico inicial
        var defaultTopic = _.find(manifest.topicos, { default: true });

        urlRouterProvider.otherwise("/" + defaultTopic.slug );
    }
}

CHROME_MAX_LENGTH = 200

var Reader = {
  getCurrentTopicTexts: function(){
    var texts = []
    var mainContent = document.querySelector("main");

    var contentTags = $(mainContent).children()

    for (var i=0, max=contentTags.length; i < max; i++) {
      texts.push(contentTags[i].outerText || contentTags[i].textContent);
    }

    return texts
  },

  readTopicAsVoice: function(){
    var complete_sentence = Reader.getCurrentTopicTexts().join("");
    var queue_position = 0;

    var sentences = complete_sentence.split(/[\.\,\;\:\n\)\(]/);

    // removendo sentenças em branco
    sentences = _.remove(sentences, function(s){
      return s.length
    })

    _.each(sentences, function(s){
      console.log(s.length)
    })

    // @private
    function onspeakend(){
      queue_position++;

      var text = sentences[queue_position];

      return angular.isDefined(text) ? tts.speak(text, onspeakend) : false
    }

    tts.speak(sentences[queue_position], onspeakend);
  },
}

var Router = {
    onStateChangeStart: function(root, event, toState, toParams, fromState, fromParams){
      GLOBAL.current_topic = _.find(GLOBAL.manifest.topicos, {slug: toState.name})
      // Notify application
      root.$emit('topic:change', GLOBAL.current_topic)
      root.$emit('aplayer:update', GLOBAL.current_topic)
    },
    onStateChangeSuccess: function(root, event, toState, toParams, fromState, fromParams){
      // setTimeout(angular.bind(this, Reader.readTopicAsVoice), 500)
    }
};

var tts = {
  utterance: {},

  speak: function(text, onend){
    tts.utterance = new SpeechSynthesisUtterance(text);
    this.tts_config_defaults(tts.utterance, onend);
    this.play(tts.utterance);
  },

  clear: function(){
    tts.utterance.onend = null
    window.speechSynthesis.cancel();
  },

  play: function(speech){
    window.speechSynthesis.speak(speech);
  },

  tts_config_defaults: function(speech, onend){
    speech.lang = "pt-BR";
    speech.rate = 1;
    speech.onerror = function(){
      tts.clear();
    }
    speech.onend = onend;
  }
};

var View = {
  configure: function($provide){
    $provide.decorator('$uiViewScroll', function ($delegate) {
      return function (uiViewElement) {
        var content = $(uiViewElement).closest("md-content")
        // Return to top from md-content every change route
        $(content).scrollTop(0)
        // Focus in content
        $(content).focus()
      };
    });

    // Observe content scroll
    $('.main').on('scroll', function(e){
      var element = $(e.target);
      var body = $('body');
      
      $('.main').scrollTop() >= 320
        ? $('uab-header, body').addClass('animated') 
        : $('uab-header, body').removeClass('animated')
    })
  }
}
