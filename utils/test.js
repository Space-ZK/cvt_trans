var XLSX = require('xlsx');
var workbook = XLSX.readFile('Mstar_DVB.xls');
var sheet_name_list = workbook.SheetNames;
//console.log(workbook.SheetNames);
var worksheet = workbook.Sheets['word'];

const translate = require('translate-api');

var transUrl = 'https://nodejs.org/en/';
translate.getPage(transUrl).then(function(htmlStr){
console.log(htmlStr.length)
});

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

function getSrcText(data, lang) {
		for(l in data) {
			if((l[0] == '#') && (l.substring(1) == lang))		//protocol, language start with charator '#'
			{
				console.log(data[l]);
				return data[l];
			}
		}
}

function getTargetLang(data, lang) {
	for (s in data) {
		if(data[s] == lang)
		{
			console.log(s);
			return s;
		}
	}
}
/*first, scan the language types*/
//default langs = english, index = 1
var rowIdx = 1;
var languageData={};
for(var ColIdx = 1; typeof(worksheet[decTo26(ColIdx) + rowIdx]) != 'undefined'; ColIdx++)
{
    languageData[decTo26(ColIdx)] = worksheet[decTo26(ColIdx) + rowIdx].v;
    //console.log(worksheet[decTo26(ColIdx) + rowIdx].v);
}



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

//debug
/*
for (s in strData) {
    for(s2 in strData[s]) {
        console.log(strData[s][s2]);
    }
    console.log('\n\n');
}
*/

for(s in strData) {
    for(s2 in strData[s]) {
            translate.getText(getSrcText(strData[s], 'English'),{to: getTargetLang(langs, s2[1])}).then(function(text){
                console.log(s2[1] + " :  " + text['text']);
        });
    }
}
/*
translate.getText(getSrcText(strData['en_str_Picture_Text'], 'English'),{to: getTargetLang(langs, 'Chinese Simplified')}).then(function(text){
console.log(langs["en"] + " :  " + text['text']);
});
*/
