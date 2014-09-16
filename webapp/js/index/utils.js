(function() {
    var utils = {},
        defaultFormat = 'yyyy-MM-dd HH:mm:ss',
        oneDayTime = 24 * 60 * 60 * 1000;
    /* 获取format方法 */
    utils.getFormat = function(fmt) {
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

    /* 获取最近几周工作日*/
    utils.getRecentWeeks = function(num) {
        var d = new Date(),
            cd,
            weeks = [],
            i;
        for (i = 0; i < num; i++) {
            cd = i === 0 ? new Date() : new Date(d.getTime() - i * 7 * oneDayTime);
            weeks.push(utils.getWorkDays(cd));
        }
        return weeks;
    }

    /* 增加或减少天数*/
    utils.addDays = function(d, inc) {
        return new Date(d.getTime() + inc * oneDayTime);
    }

    /* 根据date对象获取所在周的工作日(周一至周五)日期*/
    utils.getWorkDays = function(d) {
        var dIndex = d.getDay(),
            format = utils.getFormat('MM,dd'),
            start, end, text;
        dIndex = dIndex === 0 ? 7 : dIndex;
        start = utils.addDays(d, -(dIndex - 1));
        end = utils.addDays(d, (5 - dIndex));
        text = format(start) + ' - ' + format(end);

        return {
            start: start,
            end: end,
            text: text
        }
    }
    window._utils = utils;
})()