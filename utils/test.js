var XLSX = require('xlsx');
var workbook = XLSX.readFile('Mstar_DVB.xls');
var sheet_name_list = workbook.SheetNames;
//console.log(workbook.SheetNames);
var worksheet = workbook.Sheets[[workbook.SheetNames[0]]];

//console.log(XLSX.utils.sheet_to_json(worksheet));

//console.log(String.fromCharCode({65, 66, 67}));


var chStart = 'A'.charCodeAt();
var chEnd = 'Z'.charCodeAt();
var progressive = chEnd - chStart + 1;
console.log(progressive);

function decTo26(dec) {
    var ans = '';
    while(dec >= 1)
    {
        ans += String.fromCharCode(dec%26 + chStart);
        dec/=progressive;
    }
    console.log(ans.split("").reverse().join(""));
}

decTo26(52);
