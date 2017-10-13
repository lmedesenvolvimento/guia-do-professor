var GLOBAL = {
    manifest: null
}
var Loader = {
    onLoadManifest: function(stateProvider, urlRouterProvider, manifest){
        GLOBAL.manifest = manifest;
        
        manifest.topicos.forEach(function(t, position){
            t.slug = S(t.nome).slugify().s;
            t.position = position;
            
            stateProvider.state({
                name: t.slug,
                url: "/" + t.slug,
                templateUrl: t.local
            });
        });
    
        var defaultTopic = _.find(manifest.topicos, {default: true});
    
        urlRouterProvider.otherwise("/" + defaultTopic.slug );
    
        // Start Routes
        setTimeout(
            angular.bind(this, location.replace("#"))
        , 400)
    }
}
var Router = {
    onStateChangeStart: function(root, DrawerMenu, event, toState, toParams, fromState, fromParams){
        GLOBAL.current_topic = _.find(GLOBAL.manifest.topicos, {slug: toState.name})        
        return DrawerMenu.cancel();
    }
};