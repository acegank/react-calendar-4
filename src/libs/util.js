module.exports = {
    fillZero: function (num){
        return num < 10 ? '0' + num : '' + num
    },
    pad: function (string, length, pad) {
        var len = length - String(string).length
        if (len < 0) {
            return string;
        }
        var arr = new Array(length - String(string).length || 0)
        arr.push(string);
        return arr.join(pad || '0');
    },
    dateFormat: function (source, pattern) {
        // Jun.com.format(new Date(),"yyyy-MM-dd hh:mm:ss");
        //Jun.com.format(new Date(),"yyyy年MM月dd日 hh时:mm分:ss秒");
        if (!source) {
            return "";
        }

        source = new Date(source);
        var pad = this.pad,
            date = {
                yy: String(source.getFullYear()).slice(-2),
                yyyy: source.getFullYear(),
                M: source.getMonth() + 1,
                MM: pad(source.getMonth() + 1, 2, '0'),
                d: source.getDate(),
                dd: pad(source.getDate(), 2, '0'),
                h: source.getHours(),
                hh: pad(source.getHours(), 2, '0'),
                m: source.getMinutes(),
                mm: pad(source.getMinutes(), 2, '0'),
                s: source.getSeconds(),
                ss: pad(source.getSeconds(), 2, '0')
            };
        return (pattern || "yyyy-MM-dd hh:mm:ss").replace(/yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s/g, function (v) {
            return date[v];
        });

    }
}