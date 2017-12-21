var XLSX = require('xlsx');
var workbook = XLSX.readFile('Mstar_DVB_TCL_WP_QICAI_B.xls');
var sheet_name_list = workbook.SheetNames;
//console.log(workbook.SheetNames);
var worksheet = workbook.Sheets['word'];

//console.log(XLSX.utils.sheet_to_json(worksheet));

//console.log(String.fromCharCode({65, 66, 67}));

var langs = {
    'auto': 'Automatic',
    'af': 'Afrikaans',
    'sq': 'Albanian',
    'ar': 'Arabic',
    'hy': 'Armenian',
    'az': 'Azerbaijani',
    'eu': 'Basque',
    'be': 'Belarusian',
    'bn': 'Bengali',
    'bs': 'Bosnian',
    'bg': 'Bulgarian',
    'ca': 'Catalan',
    'ceb': 'Cebuano',
    'ny': 'Chichewa',
    'zh-cn': 'Chinese Simplified',
    'zh-tw': 'Chinese Traditional',
    'co': 'Corsican',
    'hr': 'Croatian',
    'cs': 'Czech',
    'da': 'Danish',
    'nl': 'Dutch',
    'en': 'English',
    'eo': 'Esperanto',
    'et': 'Estonian',
    'tl': 'Filipino',
    'fi': 'Finnish',
    'fr': 'French',
    'fy': 'Frisian',
    'gl': 'Galician',
    'ka': 'Georgian',
    'de': 'German',
    'el': 'Greek',
    'gu': 'Gujarati',
    'ht': 'Haitian Creole',
    'ha': 'Hausa',
    'haw': 'Hawaiian',
    'iw': 'Hebrew',
    'hi': 'Hindi',
    'hmn': 'Hmong',
    'hu': 'Hungarian',
    'is': 'Icelandic',
    'ig': 'Igbo',
    'id': 'Indonesian',
    'ga': 'Irish',
    'it': 'Italian',
    'ja': 'Japanese',
    'jw': 'Javanese',
    'kn': 'Kannada',
    'kk': 'Kazakh',
    'km': 'Khmer',
    'ko': 'Korean',
    'ku': 'Kurdish (Kurmanji)',
    'ky': 'Kyrgyz',
    'lo': 'Lao',
    'la': 'Latin',
    'lv': 'Latvian',
    'lt': 'Lithuanian',
    'lb': 'Luxembourgish',
    'mk': 'Macedonian',
    'mg': 'Malagasy',
    'ms': 'Malay',
    'ml': 'Malayalam',
    'mt': 'Maltese',
    'mi': 'Maori',
    'mr': 'Marathi',
    'mn': 'Mongolian',
    'my': 'Myanmar (Burmese)',
    'ne': 'Nepali',
    'no': 'Norwegian',
    'ps': 'Pashto',
    'fa': 'Persian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ma': 'Punjabi',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sm': 'Samoan',
    'gd': 'Scots Gaelic',
    'sr': 'Serbian',
    'st': 'Sesotho',
    'sn': 'Shona',
    'sd': 'Sindhi',
    'si': 'Sinhala',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'so': 'Somali',
    'es': 'Spanish',
    'su': 'Sudanese',
    'sw': 'Swahili',
    'sv': 'Swedish',
    'tg': 'Tajik',
    'ta': 'Tamil',
    'te': 'Telugu',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'uz': 'Uzbek',
    'vi': 'Vietnamese',
    'cy': 'Welsh',
    'xh': 'Xhosa',
    'yi': 'Yiddish',
    'yo': 'Yoruba',
    'zu': 'Zulu'
};


var strData=[];		//the excel data

var chStart = 'A'.charCodeAt();
var chEnd = 'Z'.charCodeAt();
var progressive = chEnd - chStart + 1;
//console.log(progressive);

function decTo26(dec) {
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

function getS(data) {
	for (s in data) {
		for(l in data[s]) {
			if(l[0] == '#')
				console.log(l.substring(1));
		}
	}
}

function getLangKey(lang, keys) {
	for (s in keys) {
		
	}
}

/*
for (z in worksheet) {
    console.log(z);
};
*/
/*
var Idx = 1;
console.log(worksheet['B1'].v);
while(typeof(worksheet[decTo26(Idx) + '1']) != 'undefined')
{
    console.log(decTo26(Idx) + '1');
    console.log(worksheet[decTo26(Idx) + '1'].v);
    Idx++;
}
*/

/*first, scan the language types*/
//default langs = english, index = 1
var rowIdx = 1;
var languageData={};
for(var ColIdx = 1; typeof(worksheet[decTo26(ColIdx) + rowIdx]) != 'undefined'; ColIdx++)
{
    languageData[decTo26(ColIdx)] = worksheet[decTo26(ColIdx) + rowIdx].v;
    //console.log(worksheet[decTo26(ColIdx) + rowIdx].v);
}

//console.log(languageData);

for(var rowIdx = 2; typeof(worksheet['A' + rowIdx]) != 'undefined'; rowIdx++)
{
    for(var ColIdx = 1; typeof(worksheet[decTo26(ColIdx) + rowIdx]) != 'undefined'; ColIdx++)
    {
        //console.log(decTo26(ColIdx) + '  ' + languageData[decTo26(ColIdx)]);
        //console.log(worksheet[decTo26(ColIdx) + rowIdx].v);
        var tempData = {};
        tempData[languageData[decTo26(ColIdx)]] = worksheet[decTo26(ColIdx) + rowIdx].v;
        if(!strData[worksheet['A' + rowIdx].v]) strData[worksheet['A' + rowIdx].v] = {};
        strData[worksheet['A' + rowIdx].v][languageData[decTo26(ColIdx)]] = worksheet[decTo26(ColIdx) + rowIdx].v; 
    }
}
//console.log(strData);
getS(strData);

