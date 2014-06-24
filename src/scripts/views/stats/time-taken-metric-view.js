var BaseView = require('views/metric-view');


module.exports = BaseView.extend({
    caption: 'Travel Time',
    unit: 'Mins',
    metric: 'timeTaken',

    formatData: function (seconds) {
        var hours = Math.floor(seconds / 3600);
        var minutes =  d3.format("02d")(Math.floor( (seconds % 3600) / 60));

        var suffix = (hours > 1) ? 's' : '';
        return _.template('<%= hours %> <span class="unit"> Hr<%=suffix%> </span> <%= minutes %>', {hours: hours, suffix:suffix, minutes: minutes});
    }
});
