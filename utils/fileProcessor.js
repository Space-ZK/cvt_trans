const xlsx = require("node-xlsx");
var list = xlsx.parse("Mstar_DVB.xls");
console.log(list);