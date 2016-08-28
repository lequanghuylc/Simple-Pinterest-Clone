    function getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
            return (false);
    }
    var twToken = getQueryVariable("oauth_token");
$.get(window.location.href.substring(34).replace("callback", "access-token"), function(data){
    $(".container").html("<span style='color:#fff;'>You signed in, wait a second for redirect...</span>");
    window.history.pushState("Homepage", "Homepage", "/");
    // set cookie
    document.cookie = "user=" + data.name + "; path=/";
    document.cookie = "token=" + twToken + "; path=/" ;
    $.post("/registeruser", {
        name: data.name,
        token: twToken
    }, function(data2){
        window.location = "/";
    })
});