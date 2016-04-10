var pg;
var ctx;
var powerBarChart;
var update;

$(document).ready(function() {
    ctx = $("#powerChart").get(0).getContext("2d");
    
    $.post("/sumary", { date: "today" }, function(data) {
        var json = JSON.parse(data);
        $("#wh-today-sammary").text(json.wh_today_sammary);
        $("#unit-today-sammary").text(json.unit_today_sammary);
        $("#amount-today-sammary").text(json.amount_today_sammary);
    });

    $.post("/event", { quantity: 3 }, function(data) {
        var json = JSON.parse(data);
        $.each(json, function(i, item) {
            switch (item.type) {
                case "information":
                    $(".event-con").append('<div class="uk-panel uk-panel-box">'
                        + '<div class="uk-panel-badge uk-badge">INFORMATION</div>'
                        + '<h3 class="uk-panel-title">' + item.title + '</h3>' 
                        + '<div>'+ item.time + '</div>'
                        + '<div>'+ item.msg + '</div>'
                        + '</div>');
                    break;
                case "warning":
                    $(".event-con").append('<div class="uk-panel uk-panel-box">'
                        + '<div class="uk-panel-badge uk-badge uk-badge-warning">WARNING</div>'
                        + '<h3 class="uk-panel-title">' + item.title + '</h3>' 
                        + '<div>'+ item.time + '</div>'
                        + '<div>'+ item.msg + '</div>'
                        + '</div>');
                    break;
                case "danger":
                    $(".event-con").append('<div class="uk-panel uk-panel-box">'
                        + '<div class="uk-panel-badge uk-badge">DANGER</div>'
                        + '<h3 class="uk-panel-title">' + item.title + '</h3>' 
                        + '<div>'+ item.time + '</div>'
                        + '<div>'+ item.msg + '</div>'
                        + '</div>');
                    break;
            }
        });

    });

    $.post("/sumary", { date: "curent-month" }, function(data) {
        var json = JSON.parse(data);
        $("#wh-month-sammary").text(json.wh_month_sammary);
        $("#unit-month-sammary").text(json.unit_month_sammary);
        $("#amount-month-sammary").text(json.amount_month_sammary);
    });

    $.post("/gague", function(data) {
        var json = JSON.parse(data);
        powerGague(json.val, json.mx, json.limit);
    });


    setInterval(function() {
        $.post("/gague", function(data) {
            var json = JSON.parse(data);
            pg.refresh(json.val);
        });
    }, 3000);

    $.post("/bar", { range: "24h" }, function(data) {
        var json = JSON.parse(data);
        powerChart(json.label, json.val, json.limit);
    });


    setInterval(function() {
        $.post("/bar", { range: "24h" }, function(data) {
            var now = new Date();
            if (now.getMinutes() === 0 && !update) {
                var json = JSON.parse(data);
                pg.refresh(json.label, json.val, json.limit);
                update = true;
            } else if (now.getMinutes() !== 0 && update) {
                update = false;
            }

        });
    }, 60000);

});

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

function powerGague(val, mx, limit) {
    pg = new JustGage({
        id: "gauge",
        value: val,
        min: 0,
        max: mx,
        decimals: 2,
        customSectors: [{
            color: "#2ecc71",
            lo: 0,
            hi: limit[0]
        }, {
                color: "#f1c40f",
                lo: limit[0] + 1,
                hi: limit[1]
            }, {
                color: "#e74c3c",
                lo: limit[1] + 1,
                hi: limit[2]
            }],
        title: "Power",
        label: "Watts"
    });
}