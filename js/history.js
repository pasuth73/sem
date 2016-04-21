var pc;
var utpa;
var urtpa;
var powerBarChart;
var useTimePolarArea;
var event_key;
var bar_key;

$(document).ready(function () {
    pc = $("#powerChart").get(0).getContext("2d");
    utpa = $("#useTimePolarArea").get(0).getContext("2d");

    event_key = 100;
    bar_key = "live";

    setInterval(function () {
        event(event_key);

        $.post("/bar", { range: bar_key }, function (data) {
            var json = JSON.parse(data);
            pg.refresh(json.label, json.val, json.limit);

        });
    }, 3000);

    $(".bar").click(function () {
        if (this.id === "bar_live") {
            bar_key = "live";
        } else if (this.id === "bar_12h") {
            bar_key = "12h";
        } else if (this.id === "bar_d") {
            bar_key = "24h";
        }else if (this.id === "bar_w") {
            bar_key = "week";
        } else if (this.id === "bar_m") {
            bar_key = "month";
        } else if (this.id === "bar_y") {
            bar_key = "year";
        }
    });

    $("#select-event").click(function () {
        if (this.value === "10") {
            event_key = "10";
        } else if (this.value === "50") {
            event_key = "50";
        } else if (this.value === "100") {
            event_key = "100";
        } else if (this.value === "500") {
            event_key = "500";
        } else if (this.value === "1000") {
            event_key = "1000";
        }
    });

    $(".polar").click(function () {
        if (this.id === "polar_w") {
            polar("week");
        } else if (this.id === "polar_m") {
            polar("month");
        } else if (this.id === "polar_y") {
            polar("year");
        }
    });

    polar("week");



});

function polar(key) {
    $.post("/usetimepolar", { type: key }, function (data) {
        var json = JSON.parse(data);
        var data;
        if (json.length === 7) {
            data = [
                {
                    value: json[0],
                    color: "#F7464A",
                    highlight: "#FF5A5E",
                    label: "Sunday"
                },
                {
                    value: json[1],
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "Monday"
                },
                {
                    value: json[2],
                    color: "#FF0889",
                    highlight: "#FF55AD",
                    label: "Tuesday"
                },
                {
                    value: json[3],
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "Wednesday"
                },
                {
                    value: json[4],
                    color: "#FF630A",
                    highlight: "#FF630A",
                    label: "Thursday"
                },
                {
                    value: json[5],
                    color: "#14DCFF",
                    highlight: "#61E8FF",
                    label: "Friday"
                },
                {
                    value: json[6],
                    color: "#8e44ad",
                    highlight: "#9b59b6",
                    label: "Saturday"
                }
            ];
        } else if (json.length == 4) {
            data = [
                {
                    value: json[0],
                    color: "#F7464A",
                    highlight: "#FF5A5E",
                    label: "1st Week"
                },
                {
                    value: json[1],
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "2nd Week"
                },
                {
                    value: json[2],
                    color: "#FF0889",
                    highlight: "#FF55AD",
                    label: "3rd Week"
                },
                {
                    value: json[3],
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "4th Week"
                }
            ];
        } else if (json.length === 12) {
            data = [
                {
                    value: json[0],
                    color: "#F7464A",
                    highlight: "#FF5A5E",
                    label: "January"
                },
                {
                    value: json[1],
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "Febuary"
                },
                {
                    value: json[2],
                    color: "#FF0889",
                    highlight: "#FF55AD",
                    label: "March"
                },
                {
                    value: json[3],
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "April"
                },
                {
                    value: json[4],
                    color: "#FF630A",
                    highlight: "#FF630A",
                    label: "May"
                },
                {
                    value: json[5],
                    color: "#14DCFF",
                    highlight: "#61E8FF",
                    label: "June"
                },
                {
                    value: json[6],
                    color: "#8e44ad",
                    highlight: "#9b59b6",
                    label: "July"
                },
                {
                    value: json[7],
                    color: "#795548",
                    highlight: "#8d6e63",
                    label: "August"
                },
                {
                    value: json[8],
                    color: "#9e9e9e",
                    highlight: "#bdbdbd",
                    label: "September"
                },
                {
                    value: json[9],
                    color: "#607d8b",
                    highlight: "#78909c",
                    label: "October"
                },
                {
                    value: json[10],
                    color: "#cddc39",
                    highlight: "#d4e157",
                    label: "November"
                },
                {
                    value: json[11],
                    color: "#009688",
                    highlight: "#26a69a",
                    label: "December"
                }
            ];
        }
        useTimePolarArea = new Chart(utpa).PolarArea(data);
    });
}

function event(key) {
    $.post("/event", { type: key }, function (data) {
        var json = JSON.parse(data);
        $.each(json, function (i, item) {
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


function powerChart(label, val, limit) {
    var data = {
        labels: label,
        datasets: [
            {
                label: "History (24 Hours)",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: val
            }

        ]
    };

    powerBarChart = new Chart(ctx).Bar(data);
    setColorBar(powerBarChart, val, limit);
}

function setColorBar(powerBarChart, data, limit) {
    for (i = 0; i < data.length; i++) {
        if (limit[1] < data[i]) {
            powerBarChart.datasets[0].bars[i].fillColor = "#e74c3c";
            powerBarChart.datasets[0].bars[i].strokeColor = "#c0392b";
        } else if (limit[0] < data[i]) {
            powerBarChart.datasets[0].bars[i].fillColor = "#f1c40f";
            powerBarChart.datasets[0].bars[i].strokeColor = "#f39c12";
        } else {
            powerBarChart.datasets[0].bars[i].fillColor = "#2ecc71";
            powerBarChart.datasets[0].bars[i].strokeColor = "#27ae60";
        }
    }
    powerBarChart.update();
}