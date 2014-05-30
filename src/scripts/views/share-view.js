module.exports = Backbone.View.extend({
    template: require('templates/share'),
    className: 'share-container',

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
        this.clipboard.setText(this.shareUrl());
    },

    render: function() {
        this.$el.html(this.template({
            url: this.shareUrl()
        }));

        // ZeroClipboard custom code
        ZeroClipboard.config({ moviePath: 'vendor/zeroclipboard/ZeroClipboard.swf' } );
        var client = new ZeroClipboard( this.$('#copy-icon'));
        client.on( "load", function( readyEvent ) {
            client.on( "complete", function( event ) {
                alert('The route URL has been saved to the clipboard!')   
            });
        });

        this.clipboard = client;

        return this;
    },

    facebookShare: function (e) {
        e.preventDefault();
        var baseUrl = e.target.href;
        var url = baseUrl + '?u=%url%'
            .replace('%url%', encodeURIComponent(this.shareUrl()));

        this.openPopup(url);
    },

    twitterShare: function (e) {
        e.preventDefault();
        var baseUrl = e.target.href;
        var url = baseUrl + '?text=%text%&url=%url%'
            .replace('%text%', encodeURIComponent('Check out my Optimized Travel Plan with Julia and Forio Epicenter'))
            .replace('%url%', encodeURIComponent(this.shareUrl()));

        this.openPopup(url);
    },

    openPopup: function (url) {
        window.open(url,'sharer','width=575,height=400');
    },

    shareUrl: function () {
        return window.location.href;
    }
});
