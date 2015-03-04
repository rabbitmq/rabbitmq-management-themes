dispatcher_add(function(sammy) {
    sammy.put('#/themes-dummy', function() {
            // We need to add something to the disptcher so it knows
            // we've loaded :-/
            return false;
        });
});

$(document).ready(function() {
    var theme = get_theme();
    $('#login-details').append('<p id="curr-theme" style="cursor:pointer;">' +
                               'Theme: <b>' + theme +
                               '</b></p>');
    $('#curr-theme').click(change_theme);
    load_theme(theme.toLowerCase());
});

function get_theme() {
    var theme = get_pref('theme');
    return theme == null ? 'Default' : theme;
}

var THEMES = ['Default', 'Dark', 'Blue', 'Green'];

function change_theme() {
    var theme = get_theme();
    var ix = (jQuery.inArray(theme, THEMES) + 1) % THEMES.length;
    theme = THEMES[ix];
    store_pref('theme', theme);
    full_refresh();
}

function load_theme(name) {
    var url = 'css/' + name + '.css';

    if (document.createStyleSheet) {
        document.createStyleSheet(url);
    }
    else {
        $('<link rel="stylesheet" type="text/css" href="' + url +
          '" />').appendTo('head');
    }

    $('#logo img').attr('src', 'img/' + name + '-logo.png');
    $('link[rel="shortcut icon"]')
        .attr('href', 'img/' + name + '-favicon.png')
        .attr('type', 'image/png');

    var chart_chrome_themes = {
        light: {
            series: { lines: { show: true } },
            grid:   { borderWidth: 2, borderColor: "#aaa" },
            xaxis:  { tickColor: "#fff", mode: "time" },
            yaxis:  { tickColor: "#eee", min: 0 },
            legend: { show: false }
        },
        dark: {
            series: { lines: { show: true } },
            grid:   { borderWidth: 2, borderColor: "#666" },
            xaxis:  { tickColor: "#222", mode: "time" },
            yaxis:  { tickColor: "#333", min: 0 },
            legend: { show: false }
        }
    };

    if (this.chart_chrome != undefined) {
        chart_chrome = chart_chrome_themes[name];
    }
}
