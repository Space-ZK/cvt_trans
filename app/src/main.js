const translate = require('translate-api');

var transUrl = 'https://nodejs.org/en/';
translate.getPage(transUrl).then(function(htmlStr){
console.log(htmlStr.length)
});

var transText = 'hello world!';
translate.getText(transText,{to: 'zh-CN'}).then(function(text){
console.log(text['text'])
});
var transText = 'hello world!';
translate.getText(transText,{to: 'ru'}).then(function(text){
console.log(text['text'])
});
