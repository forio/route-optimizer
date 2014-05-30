module.exports = Backbone.View.extend({
    template: require('templates/share'),

    events: {
        'click .facebook': 'facebookShare',
        'click .twitter': 'twitterShare'
    },

    initialize: function() {
        this.model.on('change:currentScenario', this.updateView, this);
    },

    isShareableRoute: function () {
        var currentScenario = this.model.get('currentScenario');
        // Just non-editing scenarios can be shared
        return currentScenario !== 'custom';
    },

    updateView: function () {
        this.isShareableRoute() ? this.$el.show() : this.$el.hide();
    },

    render: function() {
        this.$el.html(this.template({
            url: window.location.href
        }));

        // ZeroClipboard custom code
        ZeroClipboard.config({ moviePath: 'vendor/zeroclipboard/ZeroClipboard.swf' } );
        var client = new ZeroClipboard( this.$('#copy-icon'));
        client.on( "load", function( readyEvent ) {
            client.on( "complete", function( event ) {
                alert('The route URL has been saved to the clipboard!')   
            });
        });

        return this;
    },

    facebookShare: function (e) {
        e.preventDefault();
        var baseUrl = e.target.href;
        var url = baseUrl + '?u=%url%'
            .replace('%url%', encodeURIComponent(window.location.href));

        this.openPopup(url);
    },

    twitterShare: function (e) {
        e.preventDefault();
        var baseUrl = e.target.href;
        var url = baseUrl + '?text=%text%&url=%url%'
            .replace('%text%', encodeURIComponent('Check out my Optimized Travel Plan with Julia and Forio Epicenter'))
            .replace('%url%', encodeURIComponent(window.location.href));

        this.openPopup(url);
    },

    openPopup: function (url) {
        window.open(url,'sharer','width=575,height=400');
    } 
});
