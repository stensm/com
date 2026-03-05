function setCookie(name, value, days){
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    var expires = "; expires=" + date.toGMTString();
    document.cookie = name + "=" + value + expires;
}

function readCookie(name) {
    var n = name + "=";
    var cookie = document.cookie.split(';');
    for(var i=0;i < cookie.length;i++) {
        var c = cookie[i];
        while (c.charAt(0)==' '){c = c.substring(1,c.length);}
        if (c.indexOf(n) == 0){return c.substring(n.length,c.length);}
    }
    return null;
}

function redirectPage(page_id){
    $.getJSON('pages.json.js'/*tpa=/js/pages.json*/).done(function (pages) {
        var i = 0;
        for (; i < pages.length; i++) {
            if (pages[i].id == page_id)  {
                page = pages[i].page;
                break;
            }
        }
        window.location.href = page;
    }).fail(function (error) {
        console.log(error);
    });
}

function load() {
    page_id = document.getElementById('page_id').innerHTML;
    cookee_page_id = readCookie('page_id');
    if(cookee_page_id == null) {
        setCookie('page_id', page_id, 30);
    }
    // console.log(cookee_page_id);
}

function init() {
    if(cookee_page_id != null) {
        if(+page_id < +cookee_page_id) {
            redirectPage(cookee_page_id);
        }
        if(+page_id > +cookee_page_id) {
            setCookie('page_id', page_id, 30);
        }
    }
}

window.onload = function() {
    load(),
    init();
};