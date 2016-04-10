var pg;
var ctx = $("#powerChart").get(0).getContext("2d");
var powerBarChart;
var update;

$(document).ready(function() {
    $.post("/event", { quantity: 100 }, function(data) {
        var json = JSON.parse(data);
        $.each(json, function(i, item) {
            switch (item.type) {
                case "information":
                    $("event-con").append('<div class="uk-panel uk-panel-box">'
                        + '<div class="uk-panel-badge uk-badge">INFORMATION</div>'
                        + '<h3 class="uk-panel-title">' + item.title + '</h3>'
                        + '<div>' + item.time + '</div>'
                        + '<div>' + item.msg + '</div>'
                        + '</div>');
                    break;
                case "warning":
                    $("event-con").append('<div class="uk-panel uk-panel-box">'
                        + '<div class="uk-panel-badge uk-badge uk-badge-warning">WARNING</div>'
                        + '<h3 class="uk-panel-title">' + item.title + '</h3>'
                        + '<div>' + item.time + '</div>'
                        + '<div>' + item.msg + '</div>'
                        + '</div>');
                    break;
                case "danger":
                    $("event-con").append('<div class="uk-panel uk-panel-box">'
                        + '<div class="uk-panel-badge uk-badge">DANGER</div>'
                        + '<h3 class="uk-panel-title">' + item.title + '</h3>'
                        + '<div>' + item.time + '</div>'
                        + '<div>' + item.msg + '</div>'
                        + '</div>');
                    break;
            }
        });

    });
});