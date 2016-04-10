var pc;
var utpa;
var urtpa;
var powerBarChart;
var useTimePolarArea;
var useRangTimePolarArea;
var event_key;

$(document).ready(function() {
    pc = $("#powerChart").get(0).getContext("2d");
    utpa = $("#useTimePolarArea").get(0).getContext("2d");
    urtpa = $("#useRangeTimePolarArea").get(0).getContext("2d");
    
    /*event_key = { quantity: 100 };

    setInterval(function() {
        event(event_key);
    }, 3000);*/

    var data = [
        {
            value: 300,
            color: "#F7464A",
            highlight: "#FF5A5E",
            label: "Red"
        },
        {
            value: 50,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Green"
        },
        {
            value: 100,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Yellow"
        },
        {
            value: 40,
            color: "#949FB1",
            highlight: "#A8B3C5",
            label: "Grey"
        },
        {
            value: 120,
            color: "#4D5360",
            highlight: "#616774",
            label: "Dark Grey"
        }

    ];

    useTimePolarArea = new Chart(utpa).PolarArea(data);
});

function event(key) {
    $.post("/event", key, function(data) {
        var json = JSON.parse(data);
        $.each(json, function(i, item) {
            switch (item.type) {
                case "information":
                    $("#inforamtion-con").append('<div class="uk-panel uk-panel-box">'
                        + '<div class="uk-panel-badge uk-badge">INFORMATION</div>'
                        + '<h3 class="uk-panel-title" data-uk-toggle="{target:\'#my-id\', animation:\'uk-animation-slide-top, uk-animation-slide-top\'}">'
                        + item.title + '<i class="uk-icon-sort-desc"></i>'
                        + '</h3>'
                        + '<div>' + item.time + '</div>'
                        + '<div id="my-id" class="uk-hidden"><div>' + item.msg + '</div></div>'
                        + '</div>');
                    break;
                case "warning":
                    $("#warning-con").append('<div class="uk-panel uk-panel-box">'
                        + '<div class="uk-panel-badge uk-badge uk-badge-warning">WARNING</div>'
                        + '<h3 class="uk-panel-title" data-uk-toggle="{target:\'#my-id\', animation:\'uk-animation-slide-top, uk-animation-slide-top\'}">'
                        + item.title + '<i class="uk-icon-sort-desc"></i>'
                        + '</h3>'
                        + '<div>' + item.time + '</div>'
                        + '<div id="my-id" class="uk-hidden"><div>' + item.msg + '</div></div>'
                        + '</div>');
                    break;
                case "danger":
                    $("#danger-con").append('<div class="uk-panel uk-panel-box">'
                        + '<div class="uk-panel-badge uk-badge uk-badge-danger">DANGER</div>'
                        + '<h3 class="uk-panel-title" data-uk-toggle="{target:\'#my-id\', animation:\'uk-animation-slide-top, uk-animation-slide-top\'}">'
                        + item.title + '<i class="uk-icon-sort-desc"></i>'
                        + '</h3>'
                        + '<div>' + item.time + '</div>'
                        + '<div id="my-id" class="uk-hidden"><div>' + item.msg + '</div></div>'
                        + '</div>');
                    break;
            }
        });
    });
}