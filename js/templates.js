angular.module('templates').run(['$templateCache', function($templateCache) {$templateCache.put('templates/uab-annotations.html','<md-sidenav\n    class="md-sidenav-right"\n    md-component-id="uab-annotations"\n    md-is-locked-open="$ctrl.$annotations.visible"\n    md-whiteframe="8">\n  <md-toolbar>\n    <div class="md-toolbar-tools">\n      <h4 flex>Coment\xE1rios</h4>\n      <md-button class="md-icon-button" ng-click="$ctrl.toggle()">\n        <md-icon md-font-icon="icon-close" class="icon-24"></md-icon>\n      </md-button>\n    </div>\n  </md-toolbar>\n  <!-- <md-content layout-padding flex>\n    <div class="comment">\n      <div ta-bind ng-model="$ctrl.comment"></div>\n    </div>\n  </md-content> -->\n  <footer layout="column" flex>\n      <md-input-container flex>\n        <text-angular ng-model="$ctrl.comment" ta-toolbar="$ctrl.taToolbar" aria-label="Inserir novo Coment\xE1rio"></text-angular>\n      </md-input-container>\n      <div layout="row" layout-align="end center">\n        <md-button ng-click="$ctrl.sendComment()">\n          Salvar Coment\xE1rio\n          <md-icon md-font-icon="icon-send icon-24 margin-left"></md-icon>\n        </md-button>\n      </div>\n  </footer>\n</md-sidenav>\n');
$templateCache.put('templates/uab-colors.html','<!-- Primary Colors -->\n<style>\n  .uab-md-primary {\n    background-color: {{$ctrl.colors.primary.hex}};\n  }\n  .uab-md-primary-light{\n    background-color: rgba({{$ctrl.colors.primary.value.concat(0.10).join(\',\')}});\n  }\n  .uab-md-accent {\n    background-color: {{$ctrl.colors.accent.hex}};\n  }\n  .uab-md-accent-light{\n    background-color: rgba({{$ctrl.colors.accent.value.concat(0.10).join(\',\')}});\n  }\n  .uab-box-primary{\n    border-color: {{$ctrl.colors.primary.hex}};\n  }\n  .uab-box-accent{\n    border-color: {{$ctrl.colors.accent.hex}};\n  }\n</style>\n\n<!-- Plyr -->\n\n<style>\n  .plyr__progress--played, .plyr__volume--display{\n    color: {{$ctrl.colors.accent.hex}};\n  }\n  .plyr--video .plyr__controls button.tab-focus:focus, .plyr--video .plyr__controls button:hover{\n    background: {{$ctrl.colors.accent.hex}};\n  }\n  .plyr--audio .plyr__controls button.tab-focus:focus, .plyr--audio .plyr__controls button:hover{\n    background: {{$ctrl.colors.accent.hex}};\n  }\n  .plyr__play-large{\n    background: {{$ctrl.colors.accent.hex}};\n  }\n  .plyr input[type="range"]:active::-webkit-slider-thumb{\n    background: {{$ctrl.colors.accent.hex}};\n  }\n\n  .plyr input[type="range"]:active::-moz-range-thumb{\n    background: {{$ctrl.colors.accent.hex}};\n  }\n\n  .plyr input[type="range"]:active::-ms-thumb{\n    background: {{$ctrl.colors.accent.hex}};\n  }\n</style>\n\n\n<!-- Table -->\n<style>\n  .table-hover > tbody > tr:hover{\n    background-color: rgba({{ $ctrl.colors.primary.value.concat(0.15).join(\',\') }});\n  }\n\n  .table thead.destacado > tr{\n    background-color: {{$ctrl.colors.primary.hex}};\n  }\n  .table thead.destacado > tr th, .table thead.destacado > tr th{\n    color: white;\n  }\n</style>');
$templateCache.put('templates/uab-footer.html','<md-toolbar>\n  <div class="md-toolbar-tools">\n    <div class="container-fluid" layout="row" layout-align="center center" flex>\n      <a md-button ng-click="$ctrl.toTop()" id="footer">Topo</a>\n      <uab-qr-code></uab-qr-code>\n      <uab-get-audio href="{{$root.$global.manifest.audio}}"></uab-get-audio>\n      <uab-pagination as-text="true"></uab-pagination>\n    </div>\n  </div>\n</md-toolbar>\n\n<div class="container" layout="row" layout-align="start center" flex>\n  <img ng-src="./layout/ufc.png" />\n  <!-- <span>Logo UFC</span> -->\n  <div class="academic" layout="column" layout-align="center center" flex>\n    <p class="text-center">\n      Respons\xE1vel: {{ $root.$global.manifest.academico.responsavel }} <br>\n      Universidade Federal do Cear\xE1 - Instituto UFC Virtual\n    </p>\n  </div>\n  <img ng-src="./layout/ufc-virtual.png" />\n  <!-- <span>Logo UFCVirtual</span> -->\n</div>\n\n<uab-colors></uab-colors>\n');
$templateCache.put('templates/uab-header.html','<md-toolbar>\n  <div class="container" layout="row" layout-align="start center" flex>\n    <uab-header-titles flex>\n      <md-icon class=\'uab-course-icon\' md-svg-src="{{$root.$global.manifest.academico.cursoIcone}}" ></md-icon>\n      <div class="subtitle">{{$root.$global.manifest.academico.disciplina}}</div>\n      <div class="titles">\n        <small class="caption">{{$root.$global.manifest.nome}}</small>\n      </div>\n    </uab-header-titles>\n  </div>\n\n  <div class="md-toolbar-tools">\n    <div class="container-fluid" flex>\n      <md-button class="md-icon-button" ng-click="$ctrl.toggleSidenav()" ng-if="!$root.$mdMedia(\'gt-sm\')">\n        <md-tooltip>T\xF3picos</md-tooltip>\n        <md-icon md-font-icon="icon-list"></md-icon>\n      </md-button>\n\n      <uab-pagination></uab-pagination>\n\n      <md-button class="md-icon-button" ng-click="$ctrl.increaseText()">\n        <md-tooltip>Aumentar Fonte</md-tooltip>\n        <md-icon md-font-icon="icon-increase"></md-icon>\n      </md-button>\n\n      <md-button class="md-icon-button" ng-click="$ctrl.decreaseText()">\n        <md-tooltip>Diminuir Fonte</md-tooltip>\n        <md-icon md-font-icon="icon-decrease"></md-icon>\n      </md-button>\n\n      <md-button class="md-icon-button" ng-click="$ctrl.toggleHightContrast()">\n        <md-tooltip>Inverter Cores</md-tooltip>\n        <md-icon md-font-icon="icon-invert_colors"></md-icon>\n      </md-button>\n\n      <md-button class="md-icon-button" ng-href="{{$root.$global.manifest.pdf}}" target="_blank">\n        <md-tooltip>Vers\xE3o Impressa</md-tooltip>\n        <md-icon md-font-icon="icon-print"></md-icon>\n      </md-button>\n\n      <md-button class="md-icon-button" ng-click="$ctrl.toggleAplayer()">\n        <md-tooltip>Audio Aula</md-tooltip>\n        <md-icon md-font-icon="" ng-class="$ctrl.AplayerPlaying ? \'icon-pause_circle_outline\' : \'icon-play_circle_outline\'"></md-icon>\n      </md-button>\n      <span flex></span>\n\n      <span class="md-toolbar-tools-text">{{($root.$global.current_topic.position + 1)}} de {{ $root.$global.manifest.topicos.length }} p\xE1ginas</span>\n\n      <span flex="5"></span>      \n    </div>\n  </div>\n</md-toolbar>');
$templateCache.put('templates/uab-hq.html','<div class="flipbook-viewport">\n\t<div class="flipbook-container">\n\t\t<div class="flipbook">\n      <div class="page"\n\t    \t\tng-repeat="image in $ctrl.images"\n\t    \t\tstyle="background-image: url(\'{{ image.original }}\')"\n\t    \t\tbig-picture="{{image.big}}"></div>\n    </div>\n\t\t<div class="flipbook-controls">\n\t\t\t<md-button class="md-icon-button" aria-label="Voltar P\xE1gina" ng-click="$ctrl.back($event)">\n        <md-icon md-font-icon="icon-arrow_back"></md-icon>\n\t\t\t\t<md-tooltip>Voltar P\xE1gina</md-tooltip>\n      </md-button>\n\t\t\t<md-button class="md-icon-button" aria-label="Avan\xE7ar P\xE1gina" ng-click="$ctrl.next($event)">\n        <md-icon md-font-icon="icon-arrow_forward"></md-icon>\n\t\t\t\t<md-tooltip>Avan\xE7ar P\xE1gina</md-tooltip>\n      </md-button>\n\t\t\t<!-- <span class="flex"/> -->\n\t\t\t<!-- <md-button class="md-icon-button" aria-label="Tela Cheia" ng-click="$ctrl.toogleFullscreen($event)">\n\t\t\t\t<md-icon md-font-icon="icon-fullscreen"></md-icon>\n\t\t\t\t<md-tooltip>Tela Cheia</md-tooltip>\n\t\t\t</md-button> -->\n\t\t</div>\n  </div>\n</div>\n');
$templateCache.put('templates/uab-pagination.html','<span ng-if="!$ctrl.asText">\n  <a md-button class="md-icon-button" ng-disabled="!$ctrl.prevTopic" ng-href="#!/{{$ctrl.prevTopic.slug}}">\n    <md-tooltip>T\xF3pico Anterior</md-tooltip>\n    <md-icon md-font-icon="icon-arrow_back"></md-icon>\n  </a>\n\n  <a md-button class="md-icon-button" ng-disabled="!$ctrl.nextTopic" ng-href="#!/{{$ctrl.nextTopic.slug}}">\n    <md-tooltip>Pr\xF3ximo T\xF3pico</md-tooltip>\n    <md-icon md-font-icon="icon-arrow_forward"></md-icon>\n  </a>\n</span>\n\n<span ng-if="$ctrl.asText">\n  <a md-button ng-show="$ctrl.prevTopic" ng-href="#!/{{$ctrl.prevTopic.slug}}" ng-if="$root.$mdMedia(\'gt-md\')">T\xF3pico Anterior</a>\n  <a md-button ng-show="$ctrl.nextTopic" ng-href="#!/{{$ctrl.nextTopic.slug}}" ng-if="$root.$mdMedia(\'gt-md\')">Pr\xF3ximo T\xF3pico</a>\n</span>\n');
$templateCache.put('templates/uab-qr-code.html','<div layout="row">\n  <md-button ng-click=\'$ctrl.trigger()\' ng-if="$root.$mdMedia(\'gt-sm\')">\n      <md-tooltip md-direction="top">QR Code \u2013 Vers\xE3o para Impress\xE3o</md-tooltip>\n    QR Code\n  </md-button>\n  <md-button class="md-icon-button" ng-click=\'$ctrl.trigger()\' ng-if="$root.$mdMedia(\'xs\')">\n    <md-tooltip md-direction="top">QR Code \u2013 Vers\xE3o para Impress\xE3o</md-tooltip>\n    <md-icon md-font-icon="icon-photo_camera" class="icon-24"></md-icon>\n  </md-button>\n</div>');
$templateCache.put('templates/uab-quadro.html','<div class="uab-quadro">\n  <div class="uab-quadro-icon uab-md-primary">\n    <md-icon md-font-icon="{{icon}}"></md-icon>\n  </div>\n  <div class="uab-quadro-body">\n    <md-card>\n      <md-card-title>\n        <md-card-title-text>{{title}}</md-card-title-text>\n      </md-card-title>\n      <md-card-content>\n        <ng-transclude></ng-transclude>\n      </md-card-content>\n    </md-card>\n  </div>\n</div>\n');
$templateCache.put('templates/uab-sidenav.html','<md-sidenav\n  class="md-sidenav-left"\n  ng-class="{ \'laptop\' : $root.$mdMedia(\'gt-sm\') }"\n  md-component-id="uab-sidenav"\n  md-is-locked-open="$root.$mdMedia(\'gt-sm\') ? true : false"\n  md-whiteframe="4">\n  <md-content layout-padding>\n    <p class="navigation-header" ng-if="!$root.$mdMedia(\'gt-sm\')">T\xF3picos</p>\n    <ul class="navigation">\n      <li ng-repeat="topico in $root.$global.manifest.topicos" md-trucante>\n        <a md-button ui-sref="{{topico.slug}}" ui-sref-active="active"> \n          <md-icon md-font-icon="{{topico.icon}}" /> \n          <div class="navigation-title">{{topico.nome}}</div>\n        </a>\n      </li>\n    </ul>\n  </md-content>\n</md-sidenav>\n');
$templateCache.put('templates/uab-slide-item.html','<div class="layer">\n  <img ng-src="{{uabSlideItem}}"/>\n  <legend ng-if="legend">{{legend}}</legend>\n</div>\n');
$templateCache.put('templates/dialogs/accessibility.html','<md-dialog class="qr-code-dialog">\n  <md-dialog-heading>    \n    <div class="md-title truncate" aria-label="{{title}}"><h2>{{title}}</h2></div>\n  </md-dialog-heading>\n  <md-dialog-content>\n      <div>Para utilizar as teclas de atalho, existem comandos espec\xEDficos de cada navegador:</div>\n      <div class="container">\n        <div class="row">\n          <div class="col-md-2 col-xs-4">\n            <ul class="list-unstyled">\n              <li>\n                <strong>Ir para o Conte\xFAdo</strong> <br>\n                Google Chrome: Alt + 1 <br>\n                Mozilla Firefox: Alt + Shift + 1 <br>\n              </li>\n              <li>\n                <strong>Ir para o menu</strong> <br>\n                Google Chrome: Alt + 2 <br>\n                Mozilla Firefox: Alt + Shift + 2 <br>\n              </li>\n              <li>\n                <strong>Ir para o Rodap\xE9</strong> <br>\n                Google Chrome: Alt + 4 <br>\n                Mozilla Firefox: Alt + Shift + 4 <br>\n              </li>\n            </ul>\n          </div>\n          <div class="col-md-2 col-xs-4">\n            <ul class="list-unstyled">\n              <li>\n                <strong>Ir para o Menu de Acessibilidade</strong> <br>\n                Google Chrome: Alt + 5 <br>\n                Mozilla Firefox: Alt + Shift + 5 <br>\n              </li>\n              <li>\n                <strong>Modo alto contraste</strong> <br>\n                Google Chrome: Alt + 8 <br>\n                Mozilla Firefox: Alt + Shift + 8 <br>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n      <md-dialog-actions>\n        <md-button ng-click="close()" class="md-primary">Fechar</md-button>\n      </md-dialog-actions>\n</md-dialog>');
$templateCache.put('templates/dialogs/markup.html','<md-dialog aria-label="simple dialog">\n  <md-dialog-content ng-init="dialog.$onInit()">\n    <h2 class="md-title">{{ title }}</h2>\n    <div id="markup"></div>\n  </md-dialog-content>\n  <md-dialog-actions>\n    <md-button ng-click="close()" class="md-primary">Fechar</md-button>\n  </md-dialog-actions>\n</md-dialog>');
$templateCache.put('templates/dialogs/qr-code.html','<md-dialog class="qr-code-dialog">\n  <md-dialog-heading>    \n    <div class="md-title truncate">QR Code \u2013 impressos das aulas UFC Virtual</div>\n  </md-dialog-heading>\n  <md-dialog-content ng-init="dialog.$onInit()">\n    <div class="linha" ng-class="$root.$mdMedia(\'xs\') ? \'column-reverse\' : \'\'">\n      <div class="col-md-2">\n        <p class="h3 cabecalho">Instru\xE7\xF5es</p>\n        <p>Siga as instru\xE7\xF5es abaixo para realizar o download dos impressos das aulas em seu celular.</p>\n        <p>Selecione o Sistema Operacional do seu celular, para instru\xE7\xF5es:</p>\n        \n        <uab-sanfonado>\n          <md-card class=\'sanfonado\'>\n            <md-card-title>\n              <md-card-title-text>\n                <a uab-sanfonado-toggle>\n                  <md-truncate>Android</md-truncate>\n                </a>\n              </md-card-title-text>\n\n              <button md-button class="md-icon-button" uab-sanfonado-toggle>\n                <md-icon md-font-icon="icon-keyboard_arrow_down"></md-icon>\n              </button>\n            </md-card-title>\n            <md-card-content class="uab-sanfonado-wrap">\n              <div class="uab-sanfonado-content">\n                <p class="sem-recuo">- baixe o aplicativo\n                  <a href="https://play.google.com/store/apps/details?id=la.droid.qr&hl=pt_BR" target="_blank">QR Droid</a> em seu celular;\n                  <br>- abra o aplicativo QR Droid do seu celular;\n                  <br>- na aula, clique no \xEDcone \u201CMobile - QR Code\u201D na barra inferior das aulas (qualquer t\xF3pico);\n                  <br>- posicione a c\xE2mera do seu celular em frente ao c\xF3digo (QR Code) da aula e espere o aplicativo reconhecer o\n                  c\xF3digo;\n                  <br>- na primeira vez que o aplicativo reconhecer o c\xF3digo ir\xE1 perguntar o que deve fazer. Toque em \u201CAbrir URL\u201D;\n                  <br>- abrir\xE1 a p\xE1gina de download do impresso da aula em seu navegador padr\xE3o. Caso n\xE3o tenha um navegador padr\xE3o,\n                  selecione um navegador de sua prefer\xEAncia;\n                  <br>- ap\xF3s a p\xE1gina abrir, seu navegador iniciar\xE1 o download automaticamente.(O arquivo ficar\xE1 salvo na pasta de\n                  download do seu celular);\n                  <br>- abra o arquivo com o aplicativo leitor de pdf padr\xE3o do seu celular.</p>\n              </div>\n            </md-card-content>\n          </md-card>\n        </uab-sanfonado>\n\n        <uab-sanfonado>\n          <md-card class=\'sanfonado\'>\n            <md-card-title>\n              <md-card-title-text>\n                <a uab-sanfonado-toggle>\n                  <md-truncate>IOS</md-truncate>\n                </a>\n              </md-card-title-text>\n\n              <button md-button class="md-icon-button" uab-sanfonado-toggle>\n                <md-icon md-font-icon="icon-keyboard_arrow_down"></md-icon>\n              </button>\n            </md-card-title>\n            <md-card-content class="uab-sanfonado-wrap">\n              <div class="uab-sanfonado-content">\n                <p class="sem-recuo">- baixe o aplicativo\n                <a href="https://itunes.apple.com/us/app/quick-scan-qr-code-reader/id483336864?mt=8" target="_blank">Quick Scan (Digitalizador de c\xF3digo de QR)</a> em seu celular;\n                <br>- abra o aplicativo Quick Scan do seu celular;\n                <br>- na aula, clique no \xEDcone \u201CMobile - QR Code\u201D na barra inferior das aulas (qualquer t\xF3pico);\n                <br>- posicione a c\xE2mera do seu celular em frente ao c\xF3digo (QR Code) da aula e espere o aplicativo reconhecer o\n                c\xF3digo;\n                <br>- ap\xF3s o aplicativo reconhecer o c\xF3digo, clique em "Open";\n                <br>- clique no \xFAltimo bot\xE3o inferior \xE0 direita;\n                <br>- clique em \u201COpen in Safari";\n                <br>- clique em abrir no "iBooks" para salvar o arquivo ou em \u201Cabrir com\u201D, para selecionar outra op\xE7\xE3o de armazenamento;\n                <br>- o arquivo ficar\xE1 armazenado na pasta selecionada.</p>\n              </div>\n            </md-card-content>\n          </md-card>\n        </uab-sanfonado>    \n      </div>\n      <div class="col-md-2">\n        <p class="text-center">\n          <div class="qr-code-wrap">\n            <img src="layout/qr-code-logo.png" width="{{ $root.$mdMedia(\'gt-sm\') ? \'72\' : \'48\' }}" height="{{ $root.$mdMedia(\'gt-sm\') ? \'72\' : \'48\' }} }}" class="qr-code-icon" />\n            <img src="https://api.qrserver.com/v1/create-qr-code/?size={{ $root.$mdMedia(\'gt-sm\') ? \'360x360\' : \'180x180\'}}&data={{text}}&ecc=M&charset-source=UTF-8" />\n          </div>\n        </p>\n      </div>\n    </div>\n  </md-dialog-content>\n  <md-dialog-actions>\n    <md-button ng-click="close()" class="md-primary">Fechar</md-button>\n  </md-dialog-actions>\n</md-dialog>');
$templateCache.put('templates/dialogs/simple-text.html','<md-dialog aria-label="simple dialog">\n  <md-dialog-content>\n    <h2 class="md-title">{{ title }}</h2>\n    <p>{{ text }}</p>\n  </md-dialog-content>\n  <md-dialog-actions>\n    <md-button ng-click="close()" class="md-primary">Fechar</md-button>\n  </md-dialog-actions>\n</md-dialog>');
$templateCache.put('templates/inputs/checkbox.html','<form name="form">\n  <div class="checkbox-group" layout="column"> </div>\n  <md-button class="md-raised" ng-class="" ng-click="$ctrl.onSubmit()" ng-disabled="$ctrl.correct">\n    {{ $ctrl.correct ? \'Resposta Correta!\' : $ctrl.submitText }}\n  </md-button>\n</form>');
$templateCache.put('templates/inputs/radio.html','<form name="form">\n  <md-radio-group name="radio" ng-model="$ctrl.value"> </md-radio-group>  \n  <md-button class="md-raised" ng-class="" ng-click="$ctrl.onSubmit()" ng-disabled="$ctrl.correct">\n    {{ $ctrl.correct ? \'Resposta Correta!\' : $ctrl.submitText }}\n  </md-button>\n</form>');
$templateCache.put('templates/inputs/text.html','<form name="form">\n  <md-input-container ng-class="{\n    \'md-block\': $ctrl.full,\n    \'md-input-invalid\': $ctrl.incorrect,\n  }">\n    <label>{{$ctrl.label}}</label>\n    <input name="input" ng-model="$ctrl.value" ng-disabled="$ctrl.correct" ng-if="!$ctrl.multiline" required>\n    <textarea name="textarea" ng-model="$ctrl.value" ng-disabled="$ctrl.correct" ng-if="$ctrl.multiline" rows="{{ $ctrl.rows || 3 }}" required></textarea>\n    <md-icon class="icon-24" md-font-icon="{{ $ctrl.correct ? \'icon-check\' : \'icon-cancel\' }}" ng-if="( $ctrl.incorrect || $ctrl.correct)"></md-icon>\n    <div ng-messages="form.input.$error">\n      <div ng-message="required">Sua resposta est\xE1 vazia</div>\n    </div>\n    <div ng-messages="form.textarea.$error">\n      <div ng-message="required">Sua resposta est\xE1 vazia</div>\n    </div>\n  </md-input-container>\n  <md-button class="md-raised" ng-class="" ng-click="$ctrl.onSubmit()" ng-disabled="$ctrl.correct" ng-show="$ctrl.sentence">\n    {{ $ctrl.correct ? \'Resposta Correta!\' : $ctrl.submitText }}\n  </md-button>\n</form>');}]);