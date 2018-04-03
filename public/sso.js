/**
 * @description sso鎷︽埅灏佽
 * @date 2018.03.26
 * @author xuzhaobin
 * @email zhbxu@abcft.com
 */
// jscookie
!function(e){var n=!1;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var o=window.Cookies,t=window.Cookies=e();t.noConflict=function(){return window.Cookies=o,t}}}(function(){function g(){for(var e=0,n={};e<arguments.length;e++){var o=arguments[e];for(var t in o)n[t]=o[t]}return n}return function e(l){function C(e,n,o){var t;if("undefined"!=typeof document){if(1<arguments.length){if("number"==typeof(o=g({path:"/"},C.defaults,o)).expires){var r=new Date;r.setMilliseconds(r.getMilliseconds()+864e5*o.expires),o.expires=r}o.expires=o.expires?o.expires.toUTCString():"";try{t=JSON.stringify(n),/^[\{\[]/.test(t)&&(n=t)}catch(e){}n=l.write?l.write(n,e):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=(e=(e=encodeURIComponent(String(e))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var i="";for(var c in o)o[c]&&(i+="; "+c,!0!==o[c]&&(i+="="+o[c]));return document.cookie=e+"="+n+i}e||(t={});for(var a=document.cookie?document.cookie.split("; "):[],s=/(%[0-9A-Z]{2})+/g,f=0;f<a.length;f++){var p=a[f].split("="),d=p.slice(1).join("=");this.json||'"'!==d.charAt(0)||(d=d.slice(1,-1));try{var u=p[0].replace(s,decodeURIComponent);if(d=l.read?l.read(d,u):l(d,u)||d.replace(s,decodeURIComponent),this.json)try{d=JSON.parse(d)}catch(e){}if(e===u){t=d;break}e||(t[u]=d)}catch(e){}}return t}}return(C.set=C).get=function(e){return C.call(C,e)},C.getJSON=function(){return C.apply({json:!0},[].slice.call(arguments))},C.defaults={},C.remove=function(e,n){C(e,"",g(n,{expires:-1}))},C.withConverter=e,C}(function(){})});
var sso_baseUrl = 'https://passport.abcfintech.com';
if(window.location.host.indexOf('-dev')!==-1 || window.location.host.indexOf('localhost')!==-1){
    // 娴嬭瘯鐜
    sso_baseUrl = 'https://passport-pre.abcfintech.com';
}else if(window.location.host.indexOf('-pre')!==-1){
    sso_baseUrl = 'https://passport-pre.abcfintech.com';
}
function sso_ajax(obj){
    // 榛樿鍙傛暟
    var defaults = {
        type : 'get',
        data : {},
        url : '#',
        dataType : 'text',
        async : true,
        success : function(data){console.log(data)},
        error: function(data){console.log(data)}
    }
    // 澶勭悊褰㈠弬锛屼紶閫掑弬鏁扮殑鏃跺€欏氨瑕嗙洊榛樿鍙傛暟锛屼笉浼犻€掑氨浣跨敤榛樿鍙傛暟
    for(var key in obj){//鎶婅緭鍏ョ殑鍙傛暟涓庤缃殑榛樿鏁版嵁杩涜瑕嗙洊鏇存柊
        defaults[key] = obj[key];
    }
    // 1銆佸垱寤篨MLHttpRequest瀵硅薄
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');// 鍏煎ie鐨勬棭鏈熺増鏈�
    }
    // 鎶婂璞″舰寮忕殑鍙傛暟杞寲涓哄瓧绗︿覆褰㈠紡鐨勫弬鏁�
    /* {username:'zhangsan','password':123} 杞崲涓� username=zhangsan&password=123 */
    var param = '';
    for(var attr in obj.data){
        param += attr + '=' + obj.data[attr] + '&';
    }
    if(param){//substring(start, end)鎴彇瀛楃涓插幓鎺夋渶鍚庣殑&绗﹀彿
        param = param.substring(0,param.length - 1);
    }
    // 澶勭悊get璇锋眰鍙傛暟骞朵笖澶勭悊涓枃涔辩爜闂
    if(defaults.type == 'get'){
        defaults.url += '?' + encodeURI(param);
    }
    // 2銆佸噯澶囧彂閫侊紙璁剧疆鍙戦€佺殑鍙傛暟锛�
    xhr.open(defaults.type,defaults.url,defaults.async); // 澶勭悊post璇锋眰鍙傛暟骞朵笖璁剧疆璇锋眰澶翠俊鎭紙蹇呴』璁剧疆锛�
    var data = null;
    if(defaults.type == 'post'){
        data = param;
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    //post妯″紡涓嬪繀椤诲姞鐨勮姹傚ご锛岃繖涓姹傚ご鏄憡璇夋湇鍔″櫒鎬庝箞鍘昏В鏋愯姹傜殑姝ｆ枃閮ㄥ垎銆�
    }
    // 3銆佹墽琛屽彂閫佸姩浣�
    xhr.send(data);
    // 澶勭悊鍚屾璇锋眰锛屼笉浼氳皟鐢ㄥ洖璋冨嚱鏁�
    if(!defaults.async){
        if(defaults.dataType == 'json'){
            return JSON.parse(xhr.responseText);
        }else{
            return xhr.responseText;
        }
    }
    // 4銆佹寚瀹氬洖璋冨嚱鏁帮紙澶勭悊鏈嶅姟鍣ㄥ搷搴旀暟鎹級
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            //4 鑾峰彇鏁版嵁鎴愬姛
            if(xhr.status == 200){
                //200 鑾峰彇鐨勬暟鎹牸寮忔纭�
                var data = xhr.responseText;
                if(defaults.dataType == 'json'){
                    // data = eval("("+ data +")");
                    data = JSON.parse(data);
                    //JSON.parse鎶婅幏鍙栧甫鐨刯son鏍煎紡鐨勬暟鎹浆鍖栦负js鐨勫璞″舰寮忓彲浠ヤ娇鐢�
                }
                defaults.success(data);//鍥炶皟鍑芥暟
            }else{
                defaults.error(xhr.status);
            }
        }else{
            defaults.error(xhr.readyState);
        }
    }
}
function sso_getQueryString(name) {
    // 鍙傛暟
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return undefined;
}
function sso_getTokenByTicket() {
    // 褰搕icket瀛樺湪鏃惰幏鍙杢oken
    var resData = sso_ajax({
        type: "get",
        url: sso_baseUrl + '/sso/getTokenByTicket',
        data: {
            ticket: sso_getQueryString('ticket'),
            userId: sso_getQueryString('userId')
        },
        // 鍚屾璇锋眰
        async: false,
        dataType: 'json'
    })
    // 鍐欏叆cookie
    if (resData.errorCode != 511 && resData.errorCode != 41) {
        Cookies.remove('token');
        Cookies.remove('user_id');
        Cookies.set('token', resData.data, { expires: 30 })
        Cookies.set('user_id', sso_getQueryString('userId'), { expires: 30 })
    }else{
        sso_checkToken();
    }
}
function sso_checkToken(){
    var local = window.location;
    var resData = sso_ajax({
        type: "post",
        url: sso_baseUrl + '/sso/verifyToken',
        data: {
            token: Cookies.get('token'),
            userId: Cookies.get('user_id')
        },
        // 鍚屾璇锋眰
        async: false,
        dataType: 'json'
    })
    // 鍐欏叆cookie
    if (resData.errorCode != 0) {
        // token鏃犳晥
        Cookies.remove('token');
        Cookies.remove('user_id');
        window.location.href = sso_baseUrl + '/sso-login.html?back=' + 
        local.protocol + '//' + local.host;
    }
}
function sso_logout() {
    // 閫€鍑虹櫥褰�
    var local = window.location;
    sso_ajax({
        type: "post",
        url: sso_baseUrl + '/sso/logout',
        data: {
            userId: Cookies.get('user_id')
        },
        dataType: 'json',
        success: function(){
            Cookies.remove('token');
            Cookies.remove('user_id');
            window.location.href = sso_baseUrl + '/sso-login.html?back=' + 
            local.protocol + '//' + local.host;
        }
    })
}
(function(){
    if(sso_getQueryString('ticket') && sso_getQueryString('userId')){
        // 鐧诲綍璺宠浆鍥炴潵
        sso_getTokenByTicket();
    }else{
        // 闈炵櫥褰曡烦杞洖鏉� 楠岃瘉token
        var local = window.location;
        if(!Cookies.get('token')){
            // cookie涓嶅瓨鏈塼oken
            window.location.href =  sso_baseUrl + '/sso-login.html?back=' + 
            local.protocol + '//' + local.host;
        }else{
            // cookie瀛樻湁token
            sso_checkToken();
        }
    }
})()