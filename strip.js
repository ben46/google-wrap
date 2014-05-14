(function() {

    if (!/^https?:\/\/\w*.google.com(?:\.[a-z]+)?/.test(location.href)) {
        return
    }
    var search = document.getElementById('rso');

    if (!search) {
        return
    }
    var entries = search.getElementsByTagName('h3');
    var len = entries.length;

    for (var i = 0; i < len; i++) {
        var e = entries[i];
        var anchors = e.getElementsByTagName('a');
        anchors = Array.prototype.slice.call(anchors, 0);
        anchors.forEach(strip);
    }


    function strip(a, i) {
        var newlink = document.createElement('a');
        newlink.setAttribute('href', a.getAttribute('href'));
        newlink.innerHTML = ' 原链接';
        newlink.target = '_blank';
        newlink.style.cssText = 'margin-right: 5px; color : #fff; font-size : 14px; font-weight : bold; padding: 0 4px; border-radius : 4px; background-color : #333';
        a.parentNode.insertBefore(newlink, a);
    }
})()