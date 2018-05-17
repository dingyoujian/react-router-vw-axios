import httpService from '../axios/httpService'

export const getQueryString = function (name) {
    var reg = new RegExp("[?&]" + name + "=([^&]+)","i");
    var r = window.location.hash.match(reg);
    if (r != null)return unescape(r[1]);
    return null;
}

/*
*    设置sessionStorage
**/
export const setSession = function (name, obj) {
    var _local = JSON.parse(sessionStorage.getItem(name)) || {};
    for (var key in obj) {
        _local[key] = obj[key];
    }
    if (!Object.keys(obj).length) {
        _local = obj;
    }
    sessionStorage.setItem(name, JSON.stringify(_local));
    return true;
}

/*
*    获取sessionStorage
**/
export const getSession = function (name) {
    return JSON.parse(sessionStorage.getItem(name)) || {};
}

/*
*    设置localStorage
**/
export const setlocal = function (name, obj) {
    var _local = JSON.parse(localStorage.getItem(name)) || {};
    for (var key in obj) {
        _local[key] = obj[key];
    }
    if (!Object.keys(obj).length) {
        _local = obj;
    }
    localStorage.setItem(name, JSON.stringify(_local));
    return true;
}

/*
*    获取localStorage
**/
export const getlocal = function (name) {
    return JSON.parse(localStorage.getItem(name)) || {};
}

/*
*    跳转处理
**/
export const hrefHandle = function (href) {
    var share_marketing = getlocal('share_marketing');
    var marketing = (share_marketing && share_marketing['marketing']) ? encodeURIComponent(share_marketing['marketing']) : null;
    if (marketing) {

        if (href.indexOf('?') === -1) {
            window.location.href = href + '?marketing=' + marketing;
        } else {
            window.location.href = href + '&marketing=' + marketing;
        }
    } else {
        window.location.href = href;
    }
}
export const marketing = function () {
    var marketing = getQueryString('marketing'),
        share_marketing = getlocal('share_marketing');
    if (marketing) {
        setlocal('share_marketing', {marketing: marketing});
    } else if (!marketing && !Object.keys(share_marketing).length){
        setlocal('share_marketing', {});
    }
};

export const updateMarketing = function () {
    var marketing = getlocal('share_marketing'),
    userInfo = getlocal('galaxyLocal.user'),
    marketingObj = {};

    if (marketing && marketing.marketing && Object.keys(userInfo).length) {
        marketingObj = JSON.parse(marketing.marketing);
        marketingObj.userId = userInfo.userId;
        marketingObj.sessionId = userInfo.sessionId;
        setlocal('share_marketing', {marketing: JSON.stringify(marketingObj)});
    }
};

let basicUrl = localStorage.getItem("galaxyLocal.basicUrl");

if (basicUrl) {
    basicUrl = JSON.parse(basicUrl);
}

export const closeAppView = function  () {
    var userInfo = getUserInfo();
    if (userInfo.client === 'android') {
        window.local_obj.goClose();
    } else if (userInfo.client === 'ios') {
        var url = "toapp:goBack";
        document.location = url;
    } else if (userInfo.client === 'h5') {
        window.location.href = basicUrl.backUrl;
    }
}

export const login = function () {
    var from = getQueryString("from");
    if (typeof (window.local_obj) !== 'undefined') {
        transferApp({
            "androidPageName": "goLoginReloade"
        });
    } else if (typeof (oc_objc) !== "undefined") {
        transferApp({
            "iosPageName": "goLoginReloade"
        });
    } else if (from === 'h5') {
        var href = encodeURIComponent(window.location.href + '&reload');
        window.location.href = getHrefRoot() + '/www/index.html#/login/multipleSignUp?redirect=' + href;
    }
}

export const getUserInfo = function () {
    //原生获取user sessionId
    var from = getQueryString("from");
    var common = {};
    if (typeof (window.local_obj) !== 'undefined') {
        common.client = 'android';
        common.userId = window.local_obj.getUserId();
        common.sessionId = window.local_obj.getSessionId();
        common.serverUrl = window.local_obj.getServiceUrl();
        common.version = window.local_obj.getAppVersion();
    } else if (typeof (oc_objc) !== "undefined") {
        common.client = 'ios';
        common.userId = window.userId;
        common.sessionId = window.sessionId;
        common.serverUrl = window.serviceUrl;
        common.version = window.appVersion;
    } else if (from === 'h5') {
        var userInfo = JSON.parse(localStorage.getItem("galaxyLocal.user"));
        if (!userInfo) {
            login();
        } else {
            common = userInfo;
            common.client = 'h5';
        }
    } else {
        common.client = 'h5';
    }
    return common;
}

export const transferApp = function (json) {
    var string = JSON.stringify(json);
    var url = "qgg://" + string;
    var str= navigator.userAgent.toLowerCase();
    var ver = str.match(/cpu iphone os (.*?) like mac os/);
    var version;
    //兼容ios 8.x.x版本
    if (ver) {
        version = ver[1].replace(/_/g,"");
        if (version < 100) {
            version = version * 10;
        }
        if (version < 900) {
            // window.webkit.messageHandlers.iosQgg.postMessage(string);
            url = "objc:qgg://" + string;
        }
    }
    document.location = url;
}

export const getClient = function () {
    var from = getQueryString("from");
    var client;
    if (typeof (window.local_obj) !== 'undefined') {
        client = 'android';
    } else if (typeof (oc_objc) !== "undefined") {
        client = 'ios';
    } else if (from === 'h5') {
        client = 'h5';
    } else {
        client = 'h5';
    }
    return client;
}
//去实名绑卡
export const toRealName = function (client) {
    var href = encodeURIComponent(window.location.href);
    if (client === 'ios') {
        transferApp({
            'iosPageName': 'QGGAddBankCardViewController'
        });
    } else if (client === 'android') {
        transferApp({
            'androidPageName': 'com.qiangungun.ui.other.AddBankCardActivity',
            'from': 'com.qiangungun.activity.main.HomeBannerCardActivity',
            'url': href
        })
    } else if (client === 'h5') {
        window.location.href = getHrefRoot() + '/www/index.html#/account/addBankCard?redirect=' + href;
    }
}
//去完善信息
export const toComplete = function (client) {
    var href = encodeURIComponent(window.location.href);
    if (client === 'ios') {
        transferApp({
            'iosPageName': 'QGGMyInformationViewController',
            'messageCodeSource' : 7,
            'controllerSource': 'QGGInpidualizationPortfolioGuideViewController'
        });
    } else if (client === 'android') {
        transferApp({
            'androidPageName': 'com.qiangungun.ui.user.SetUserInfoActivity',
            'from': 'com.qiangungun.activity.main.HomeBannerCardActivity',
            'url': href
        })
    } else if (client === 'h5') {
        window.location.href = getHrefRoot() + '/www/index.html#/account/myProfile?redirect=' + href;
    }
}
export const iosNativeJump = function  (type, controller, data) {
    var ctrlObj = {
        'product': jumpProduct,
        'allFund': jumpAllFund,
        'comb': jumpProduct
    }

    ctrlObj[type](controller, data);

    function jumpProduct(controller, data) {
        var client = getClient();
        var isAllow = decideVer(client, {
            ios: 310,
            android: 310
        });
        if (isAllow) {
            transferApp({
                'iosPageName': controller,
                'productId': data
            });
        } else {
            // window.webkit.messageHandlers.iosApp.postMessage({controller: 'QGGProductDetailViewController', productId: data});
            document.location = "toapp:QGGProductDetailViewController:" + data;
        }
    }

    function jumpAllFund(controller, data) {
        var client = getClient();
        var isAllow = decideVer(client, {
            ios: 310,
            android: 310
        });
        if (isAllow) {
            transferApp({
                'iosPageName': controller,
                ...data
            });
        } else {
            document.location = controller;
        }

    }
}
export const getHrefRoot = function () {

    var origin = window.location.origin;
    var locationHref = '';

    switch (origin) {
        case 'http://172.16.152.117':
            //test环境
            locationHref = '/galaxy';
            break;
        case 'http://172.16.151.159':
            //foftest环境
            locationHref = '/galaxy';
            break;
        case 'http://galaxysit.qiangungun.com':
            //sit环境
            locationHref = '/galaxy';
            break;
        case 'https://galaxypre.qiangungun.com':
            //预发环境
            locationHref = '/galaxy';
            break;
        case 'https://galaxy.qiangungun.com':
            //生产环境
            locationHref = '/galaxy';
            break;
        default:
            //默认开发环境
            locationHref = '';
        }

        return locationHref;
}
export const h5Jump = function (url) {
    window.location.href = getHrefRoot() + url;
}
export const androidNativeJump = function  (type, controller, data) {
    var ctrlObj = {
        'product': jumpProduct,//基金
        'allFund': jumpAllFund,//基金列表
        'comb': jumpComb//组合
    }

    ctrlObj[type](controller, data);
    function jumpComb(controller, data) {
        var client = getClient();
        var isAllow = decideVer(client, {
            ios: 310,
            android: 310
        });

        if (isAllow) {
            transferApp({
                'androidPageName': 'com.qiangungun.my.DingQiActivity',
                'productId': data.toString()
            });
        } else {
            window.local_obj.tryGet('com.qiangungun.my.DingQiActivity', data.toString());
        }

    }
    function jumpProduct(controller, data) {
        var client = getClient();
        var isAllow = decideVer(client, {
            ios: 310,
            android: 310
        });

        if (isAllow) {
            transferApp({
                'androidPageName': 'com.qiangungun.ui.fund.view.FundDetailActivity',
                'productId': data.toString()
            });
        } else {
            window.local_obj.tryGet('FundProductDetaicActivity', data.toString());
        }

    }
    function jumpAllFund(controller, data) {
        var client = getClient();
        var isAllow = decideVer(client, {
            ios: 310,
            android: 310
        });
        if (isAllow) {
            transferApp({
                'androidPageName': controller,
                ...data
            });
        }

    }
}

//判断版本
export const decideVer = function (client, ver) {
    var isAllow = true;
    var version = '';
    if (client === 'ios') {
        version = window.appVersion.replace(/\./g,"");
        if (version < ver.ios) {
            isAllow = false;
        }
    } else if (client === 'android') {
        version = window.local_obj.getAppVersion().replace(/\./g,"");
        if (version < ver.android) {
            isAllow = false;
        }
    }
    return isAllow;
}

//微信分享
export const wxShare = function (title, desc, link, imgUrl, success) {
    var _APP_ID = null;
    var shareObj = {
        startShare: function (title, desc, link, imgUrl, success) {
            var self = this;
            var url = window.location.href.split('#')[0];
            httpService.getWxShare().then((data) => {
                window.wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.data.appId, // 必填，公众号的唯一标识
                    timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                    signature: data.data.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                window.wx.ready(function() {
                    _APP_ID = data.data.appId;
                    self.share(title, desc, link, imgUrl, data.data.appId, url, success);
                });
            })
        },
        share: function (title, desc, link, imgUrl, appid, turl, success) {
            if (!appid) {
                appid = _APP_ID;
            }
            var temurl = link;
            if (!link) {
                temurl = turl;
            }

            var newLink = this.automaticLogic(temurl, appid);

            window.wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: newLink, // 分享链接
                imgUrl: imgUrl, // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if (typeof success === 'function') {
                        success();
                    }
                },
                cancel: function () {
                }
            });
            window.wx.onMenuShareTimeline({
                title: title, // 分享标题
                link: newLink, // 分享链接
                imgUrl: imgUrl, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    if (typeof success === 'function') {
                        success();
                    }
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

        },
        automaticLogic: function (url, appid) {
            var after = encodeURIComponent(url);
            var redirectUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid
                + "&redirect_uri=" + after + "&response_type=code&scope=snsapi_base&state=" + appid;
            return window.location.origin + "/galaxy/www/wechatJump.html?redirectUrl=" + redirectUrl;
        }
    }
    return shareObj.startShare(title, desc, link, imgUrl, success);
}
