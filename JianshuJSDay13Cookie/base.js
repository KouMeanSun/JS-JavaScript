/*
 * instanceof: 判断是否属于某个类型
 */

//设置cookie
function setCookie(name, value, expires, path, domain, secure) {
    //name=value
    var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    //console.log("aaa: "+ cookieText);
    //失效时间
    if (expires instanceof Date) {
        cookieText += "; expires="+expires;
    }
    //path
    if (path) {
        cookieText += "; path="+path;
    }
    //domain
    if (domain) {
        cookieText += "; domain="+domain;
    }
    //secure
    if (secure) {
        cookieText += ";secure";
    }
    document.cookie = cookieText; //设置cookie
    return document.cookie;
}

//获取cookie
//name2=123; name5=456; name=789
function getCookie(name) {
    var cookie = decodeURIComponent(document.cookie);
    var arr = cookie.split("; ");
    for (var i=0; i<arr.length; i++) {
        //name5=456
        var arr2 = arr[i].split("=");
        if (arr2.length >= 2) {
            if (arr2[0] == name) {
                return arr2[1];
            }
        }
    }
    return "";
}

//删除cookie
function removeCookie(name) {
    var d = new Date();
    document.cookie = decodeURIComponent(name) + "=; expires=" + d;
    //console.log(name + "=; expires=" + d);
    return document.cookie;
}