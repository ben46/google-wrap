(function() {

    var domain = "";
    if (/^https?:\/\/\w*.google.com(?:\.[a-z]+)?/.test(location.href)) {
        domain = "google";
    }
    if(/^http?:\/\/\w*.baidu.com(?:\.[a-z]+)?/.test(location.href)){
        domain = "baidu";
    }

    switch (domain){
        case "google" :
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
            break;

        case "baidu" :
            var count = 50;
            loop();
            function loop () {
                var box = document.getElementById("content_left");
                console.log(box);
                count --;
                if(! box){
                    if(count > 0){
                        setTimeout(function () {
                            loop()
                        }, 200);
                        return;
                    }
                    else{
                        return;
                    }

                }
                var div = box.childNodes;
                var removeArr = [];
                for(var i = 0; i < div.length; i++){
                    var className = div[i].getAttribute("class");
                    if(className){
                        var classSp = className.split('result');
                        if(classSp.length < 2){
                            removeArr.push(div[i]);
                        }
                    }

                    var a = div[i].getElementsByClassName("m");

                    if(a.length > 0)
                    {
                        for(var k = 0; k < a.length; k++){
                            var text = a[k].innerHTML;
                            var textSp = text.split("推广");
                            if(textSp.length > 1){
                                removeArr.push(div[i]);
                            }
                        }
                    }
                }

                for(var j = 0; j < removeArr.length; j++){
                    removeArr[j].parentNode.removeChild(removeArr[j]);
                }
            }
            break;

        default :
            break;
    }




    function strip(a, i) {
        var newlink = document.createElement('a');
        newlink.setAttribute('href', a.getAttribute('href'));
        newlink.innerHTML = ' 原链接';
        newlink.target = '_blank';
        newlink.style.cssText = 'margin-right: 5px; color : #fff; font-size : 14px; font-weight : bold; padding: 0 4px; border-radius : 4px; background-color : #333';
        a.parentNode.insertBefore(newlink, a);
    }
})();