"use strict";
const fs = require('fs');

let filePath = "Mstar_DVB.est";
let readOptions = "utf8";
let data = fs.readFileSync(filePath, readOptions);
console.log(data);