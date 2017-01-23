function mysqlDateToISO8601(obj) {
    var ret = {};
    var mysqlDate = /(\d{4}-\d\d-\d\d)T\d\d:\d\d:\d\d\.\d{3}Z/;
    for (var k in obj) {
        var v = obj[k].replace(mysqlDate, '$1');
        ret[k] = v;
    }
    return ret;
}

var data = {
 k1:    'abc2015-09-30T00:00:00.000Zdef',
 k2:    '1232015-09-30T00:00:00.000Z456'
}

var n = mysqlDateToISO8601(data);
console.log(n);