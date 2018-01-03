'use strict';
/*
const XLSX = require('xlsx');
var workbook = XLSX.readFile('Mstar_DVB.xls');
var sheet_name_list = workbook.SheetNames;

sheet_name_list.forEach(function(y) {
    var worksheet = workbook.Sheets[y];
    var headers = {};
    var data = [];
    for(let z in worksheet) {
        if(z[0] === '!') continue;
        //parse out the column, row, and value
        var tt = 0;
        for (var i = 0; i < z.length; i++) {
            if (!isNaN(z[i])) {
                tt = i;
                break;
            }
        };
        var col = z.substring(0,tt);
        var row = parseInt(z.substring(tt));
        var value = worksheet[z].v;

        //store header names
        if(row == 1 && value) {
            headers[col] = value;
            continue;
        }

        if(!data[row]) data[row]={};
        data[row][headers[col]] = value;
    }
    //drop those first two rows which are empty
    data.shift();
    data.shift();
    console.log(data);
});
*/
const XLSX = require('xlsx');
const translate = require('translate-api');

var workbook = XLSX.readFile('test_file_2.xls');
var sheet_name_list = workbook.SheetNames;

var worksheet = workbook.Sheets['word'];        //translations of the sheet 'word'


var langs = {
    'auto': 'Automatic',    'af': 'Afrikaans',    'sq': 'Albanian',    'ar': 'Arabic',    
    'hy': 'Armenian',    'az': 'Azerbaijani',    'eu': 'Basque',    'be': 'Belarusian',    
    'bn': 'Bengali',    'bs': 'Bosnian',    'bg': 'Bulgarian',    'ca': 'Catalan',    
    'ceb': 'Cebuano',    'ny': 'Chichewa',    'zh-cn': 'Chinese Simplified',    
    'zh-tw': 'Chinese Traditional',    'co': 'Corsican',    'hr': 'Croatian',    
    'cs': 'Czech',    'da': 'Danish',    'nl': 'Dutch',    'en': 'English',    
    'eo': 'Esperanto',    'et': 'Estonian',    'tl': 'Filipino',    'fi': 'Finnish',    
    'fr': 'French',    'fy': 'Frisian',    'gl': 'Galician',    'ka': 'Georgian',    
    'de': 'German',    'el': 'Greek',    'gu': 'Gujarati',    'ht': 'Haitian Creole',    
    'ha': 'Hausa',    'haw': 'Hawaiian',    'iw': 'Hebrew',    'hi': 'Hindi',    
    'hmn': 'Hmong',    'hu': 'Hungarian',    'is': 'Icelandic',    'ig': 'Igbo',    
    'id': 'Indonesian',    'ga': 'Irish',    'it': 'Italian',    'ja': 'Japanese',    
    'jw': 'Javanese',    'kn': 'Kannada',    'kk': 'Kazakh',    'km': 'Khmer',    
    'ko': 'Korean',    'ku': 'Kurdish (Kurmanji)',    'ky': 'Kyrgyz',    'lo': 'Lao',    
    'la': 'Latin',    'lv': 'Latvian',    'lt': 'Lithuanian',    'lb': 'Luxembourgish',    
    'mk': 'Macedonian',    'mg': 'Malagasy',    'ms': 'Malay',    'ml': 'Malayalam',    
    'mt': 'Maltese',    'mi': 'Maori',    'mr': 'Marathi',    'mn': 'Mongolian',    
    'my': 'Myanmar (Burmese)',    'ne': 'Nepali',    'no': 'Norwegian',    'ps': 'Pashto',    
    'fa': 'Persian',    'pl': 'Polish',    'pt': 'Portuguese',    'ma': 'Punjabi',    
    'ro': 'Romanian',    'ru': 'Russian',    'sm': 'Samoan',    'gd': 'Scots Gaelic',    
    'sr': 'Serbian',    'st': 'Sesotho',    'sn': 'Shona',    'sd': 'Sindhi',    
    'si': 'Sinhala',    'sk': 'Slovak',    'sl': 'Slovenian',    'so': 'Somali',    
    'es': 'Spanish',    'su': 'Sudanese',    'sw': 'Swahili',    'sv': 'Swedish',    
    'tg': 'Tajik',    'ta': 'Tamil',    'te': 'Telugu',    'th': 'Thai',    
    'tr': 'Turkish',    'uk': 'Ukrainian',    'ur': 'Urdu',    'uz': 'Uzbek',    
    'vi': 'Vietnamese',    'cy': 'Welsh',    'xh': 'Xhosa',    'yi': 'Yiddish',    
    'yo': 'Yoruba',    'zu': 'Zulu'
};

//console.log(worksheet);

function decTo26(dec) {

    const chStart = 'A'.charCodeAt();
    const chEnd = 'Z'.charCodeAt();
    const progressive = chEnd - chStart + 1;
    var ans = '';
    while(dec >= 1)
    {
        ans += String.fromCharCode(dec%26 + chStart);
        dec/=progressive;
    }
    //console.log(ans.split("").reverse().join(""));
    return ans.split("").reverse().join("");
}

function prog26ToDec(prog26) {
    //A-Z string to dec
    //waiting for complete
}

function getSrcText(data, lang) {
        for(let l in data) {
            if((l[0] == '#') && (l.substring(1) == lang))       //protocol, language start with charator '#'
            {
                console.log(data[l]);
                return data[l];
            }
        }
}

function getTargetLang(data, lang) {
    for (let s in data) {
        if(data[s] == lang)
        {
            console.log(s);
            return s;
        }
    }
}

/*first, scan the language types
//default langs = english, index = 1
*/
var strData=[];     //the excel data
let rowIdx = 1;
let languageData={};
for(let ColIdx = 1; typeof(worksheet[decTo26(ColIdx) + rowIdx]) != 'undefined'; ColIdx++)
{
    languageData[decTo26(ColIdx)] = worksheet[decTo26(ColIdx) + rowIdx].v;
    //console.log(worksheet[decTo26(ColIdx) + rowIdx].v);
}

for(let rowIdx = 2; typeof(worksheet['A' + rowIdx]) != 'undefined'; rowIdx++) {
    for(let ColIdx = 1; typeof(worksheet[decTo26(ColIdx) + rowIdx]) != 'undefined'; ColIdx++)
    {
        //console.log(decTo26(ColIdx) + '  ' + languageData[decTo26(ColIdx)]);
        //console.log(worksheet[decTo26(ColIdx) + rowIdx].v);
        let tempData = {};
        tempData[languageData[decTo26(ColIdx)]] = worksheet[decTo26(ColIdx) + rowIdx].v;
        if(!strData[worksheet['A' + rowIdx].v]) strData[worksheet['A' + rowIdx].v] = {};
        strData[worksheet['A' + rowIdx].v][languageData[decTo26(ColIdx)]] = worksheet[decTo26(ColIdx) + rowIdx] /*.v*/; 
    }
}

/*
for(let rowIdx = 2; typeof(worksheet['A' + rowIdx]) != 'undefined'; rowIdx++) {
    for(let ColIdx = 1; typeof(worksheet[decTo26(ColIdx) + rowIdx]) != 'undefined'; ColIdx++)
    {
        //console.log(decTo26(ColIdx) + '  ' + languageData[decTo26(ColIdx)]);
        //console.log(worksheet[decTo26(ColIdx) + rowIdx].v);
        let tempData = {};
        tempData[languageData[decTo26(ColIdx)]] = worksheet[decTo26(ColIdx) + rowIdx].v;
        if(!strData[worksheet['A' + rowIdx].v]) strData[worksheet['A' + rowIdx].v] = {};
        strData[worksheet['A' + rowIdx].v][languageData[decTo26(ColIdx)]] = worksheet[decTo26(ColIdx) + rowIdx]; 
    }
}
for(let s in strData) {
    for(let s2 in strData[s]) {
            translate.getText(getSrcText(strData[s], 'English'),{to: getTargetLang(langs, s2[1])}).then(function(text){
                console.log(s2[1] + " :  " + text['text']);
        });
    }
}
*/

console.log(strData);