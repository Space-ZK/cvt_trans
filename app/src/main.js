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

/*
#English 0
#French 1
#Spanish 2
#Russian 3
#Arabic 4
#Farsi 5
#Hebrew 6
#Thai 7
#Vietnamese 8
#Chinese 9
#Indonesia 10
#Uzbekistan 11
#Malaysia 12
#MONGOLIAN 13
#Chinese_TW 14
*/

var transText = 'Panama';
translate.getText(transText,{to: 'en'}).then(function(text){
console.log(langs["en"] + " :  " + text['text']);
});

translate.getText(transText,{to: 'fr'}).then(function(text){
console.log(langs["fr"] + " :  " + text['text']);
});

translate.getText(transText,{to: 'es'}).then(function(text){
console.log(langs["es"] + " :  " + text['text'])
});

translate.getText(transText,{to: 'ru'}).then(function(text){
console.log(langs["ru"] + " :  " + text['text'])
});

translate.getText(transText,{to: 'ar'}).then(function(text){
console.log(langs["ar"] + " :  " + text['text'])
});

translate.getText(transText,{to: 'fa'}).then(function(text){
console.log(langs["fa"] + " :  " + text['text'])
});

translate.getText(transText,{to: 'iw'}).then(function(text){
console.log(langs["iw"] + " :  " + text['text'])
});

translate.getText(transText,{to: 'th'}).then(function(text){
console.log(langs["th"] + " :  " + text['text'])
});

translate.getText(transText,{to: 'vi'}).then(function(text){
console.log(langs["vi"] + " :  " + text['text'])
});

translate.getText(transText,{to: 'zh-cn'}).then(function(text){
console.log(langs["zh-cn"] + " :  " + text['text'])
});

translate.getText(transText,{to: 'id'}).then(function(text){
console.log(langs["id"] + " :  " + text['text'])
});

translate.getText(transText,{to: 'uz'}).then(function(text){
console.log(langs["uz"] + " :  " + text['text'])
});

translate.getText(transText,{to: 'ms'}).then(function(text){
console.log(langs["ms"] + " :  " + text['text'])
});

translate.getText(transText,{to: 'mn'}).then(function(text){
console.log(langs["mn"] + " :  " + text['text'])
});

translate.getText(transText,{to: 'zh-tw'}).then(function(text){
console.log(langs["zh-tw"] + " :  " + text['text'])
});


