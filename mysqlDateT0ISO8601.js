function mysqlDateToGSA(obj) {
    function format_date (d) {
        function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
        }
    
     return d.getUTCFullYear() +
        '-' + pad(d.getUTCMonth() + 1) +
        '-' + pad(d.getUTCDate()) +
        'T' + pad(d.getUTCHours()) +
        ':' + pad(d.getUTCMinutes()) +
        ':' + pad(d.getUTCSeconds()) +
        'Z';
    }
    for (var k in obj) {
        if( obj[k] instanceof Date) {
            obj[k] = format_date(obj[k]);
        }
    }
}

var d = new Date();
console.log(d.toJSON());

var data = {
 k1:    d,
 k2:    new Date()
}

mysqlDateToISO8601(data);
console.log(data);


function format_date (d) {
    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }
    
     return d.getUTCFullYear() +
        '-' + pad(d.getUTCMonth() + 1) +
        '-' + pad(d.getUTCDate()) +
        'T' + pad(d.getUTCHours()) +
        ':' + pad(d.getUTCMinutes()) +
        ':' + pad(d.getUTCSeconds()) +
        'Z';
}