var _utils = {},
    defaultFormat = 'yyyy-MM-dd HH:mm:ss',
    SCC_FLAG = 'success',
    ERR_FLAG = 'error';

_utils.handleError = function(err) {
    console.trace(err);
};

_utils.is = function(obj, type) {
    return {}.toString.call(obj) == ('[object ' + type + ']')
};

_utils.callFn = function(fn, scope, args) {
    if (_utils.is(fn, 'Function'))
        fn.call(scope, args);
};

var returnData = function(type, msg, data, res) {
    res.send({
        type: type,
        msg: msg,
        data: data
    });
};

_utils.returner = function(res) {
    return {
        returnSuccess: function(msg, data) {
            returnData(SCC_FLAG, msg, data, res);
        },
        returnError: function(msg, data) {
            returnData(ERR_FLAG, msg, data, res);
        }

    }
};

/* 获取format方法 */
_utils.getFormat = function(fmt) {
    var format;
    format = fmt || defaultFormat;
    return function(date) {
        var str = format + '';
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "H+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        }
        if (/(y+)/.test(str)) {
            str = str.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(str)) {
                str = str.replace(RegExp.$1,
                    RegExp.$1.length == 1 ? o[k] : ("00" + o[k])
                    .substr(("" + o[k]).length));
            }
        }
        return str;
    }
}


module.exports = _utils;