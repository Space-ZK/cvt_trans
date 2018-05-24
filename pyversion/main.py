import requests
from bs4 import BeautifulSoup

languages_dictionary = {
	"English":"en",  	#英语
	"Albania":"sq",  	#阿尔巴尼亚语
	"Arabic":"ar",  	#阿拉伯语
	"Amharic":"am",  	#阿姆哈拉语
	"Azerbaijani":"az", #阿塞拜疆语
	"Irish":"ga",  		#爱尔兰语
	"Estonian":"et",  	#爱沙尼亚语
	"Basque":"eu",  	#巴斯克语
	"Belarusian":"be", 	#白俄罗斯语
	"Bulgarian":"bg", 	#保加利亚语
	"Icelandic":"is",  	#冰岛语


	"Polish":"pl",  	#波兰语
	"Bosnian":"bs",  	#波斯尼亚语
	"Persian":"fa",		#波斯语
	"Afrikaans":"af",  	#布尔语(南非荷兰语)
	"Danish":"da",  	#丹麦语
	"German":"de",  	#德语
	"Russian":"ru",  	#俄语
	"French":"fr",  	#法语
	"Filipino":"tl",  	#菲律宾语

	"Finnish":"fi",  	#芬兰语
	"Frisian ":"fy",  	#弗里西语
	"Khmer":"km",  		#高棉语
	"Georgian":"ka",  	#格鲁吉亚语
	"Gujarati":"gu",  	#古吉拉特语
	"Kazakh":"kk",  	#哈萨克语
	"Haitian Creole":"ht",  	#海地克里奥尔语
	"Korean":"ko",  	#韩语

	"Hausa":"ha",  		#豪萨语
	"Dutch":"nl",  		#荷兰语
	"Kyrgyz":"ky",  	#吉尔吉斯语
	"Galician":"gl",  	#加利西亚语
	"Catalan":"ca",  	#加泰罗尼亚语
	"Czech":"cs",  		#捷克语
	"Kannada":"kn",  	#卡纳达语
	"Corsican":"co",  	#科西嘉语
	"Croatian":"hr",  	#克罗地亚语

	"Kurdish":"ku",  	#库尔德语
	"Latin":"la",  		#拉丁语
	"Latvian":"lv",  	#拉脱维亚语
	"Lao":"lo",  		#老挝语
	"Lithuanian":"lt",  #立陶宛语
	"Luxembourgish":"lb",  		#卢森堡语
	"Romanian":"ro",  	#罗马尼亚语
	"Malagasy":"mg",  	#马尔加什语

	"Maltese":"mt",  	#马耳他语
	"Marathi":"mr",  	#马拉地语
	"Malayalam":"ml",  	#马拉雅拉姆语
	"Malay":"ms",  		#马来语
	"Macedonian":"mk",  	#马其顿语
	"Maori":"mi",  		#毛利语
	"Mongolian":"mn",  	#蒙古语

	"Bengali":"bn",  	#孟加拉语
	"Burmese":"my",  	#缅甸语
	"Miao":"hmn",  		#苗语
	"South African Xhosa":"xh",  	#南非科萨语
	"South African Zulu":"zu",  	#南非祖鲁语
	"Nepali":"ne",  	#尼泊尔语
	"Norwegian":"no",  	#挪威语
	"Punjabi":"pa",  	#旁遮普语
	"Portuguese":"pt",  #葡萄牙语
	"Pashto":"ps",  	#普什图语

	"Chichewa":"ny",  	#齐切瓦语
	"Japanese":"ja",  	#日语
	"Swedish":"sv",  	#瑞典语
	"Samoan":"sm",  	#萨摩语
	"Serbian":"sr",  	#塞尔维亚语
	"Sesotho":"st",  	#塞索托语
	"Sinhalese":"si",  	#僧伽罗语
	"Esperanto":"eo", 	#世界语
	"Slovak":"sk", 		#斯洛伐克语
	"Slovenian":"sl",  	#斯洛文尼亚语

	"Swahili":"sw",  	#斯瓦西里语
	"Scottish Gaelic":"gd",  	#苏格兰盖尔语
	"Cebu":"ceb",  		#宿务语
	"Somali":"so",  	#索马里语
	"Tajik":"tg",  		#塔吉克语
	"Telugu":"te",  	#泰卢固语
	"Tamil":"ta", 		#泰米尔语
	"Thai":"th",  		#泰语
	"Turkish":"tr",  	#土耳其语
	"Welsh":"cy",  		#威尔士语

	"Urdu":"ur",  		#乌尔都语
	"Ukrainian":"uk",  	#乌克兰语
	"Uzbek":"uz",  		#乌兹别克语
	"Spanish":"es",  	#西班牙语
	"Hebrew":"iw",  	#希伯来语
	"Greek":"el",  		#希腊语
	"Hawaiian":"haw",  	#夏威夷语
	"Sindhi":"sd",  	#信德语
	"Hungarian":"hu",  	#匈牙利语
	"Shinra":"sn", 		#修纳语

	"Armenian":"hy",  	#亚美尼亚语
	"Ibo":"ig",  		#伊博语
	"Italian":"it",  	#意大利语
	"Yiddish":"yi",  	#意第绪语
	"Hindi":"hi",  		#印地语
	"Indonesian Sundanese":"su",  		#印尼巽他语
	"Indonesian":"id",  	#印尼语
	"Javanese":"jw",  		#印尼爪哇语
	"English":"en",  	#英语
	"Yoruba":"yo",  	#约鲁巴语

	"Vietnamese":"vi",  	#越南语
	"Traditional Chinese":"zh-TW",  #中文繁体
	"Chinese Simplified":"zh-CN",  	#中文简体
}

def getHTMLText(url):
    try:
        r = requests.get(url, timeout=30)
        r.raise_for_status()
        return r.text
    except:
        print("Get HTML Text Failed!")
        return 0
  
def google_translate_EtoC(to_translate, from_language="en", to_language="ch-CN"):
    #根据参数生产提交的网址
    base_url = "https://translate.google.cn/m?hl={}&sl={}&ie=UTF-8&q={}"
    url = base_url.format(to_language, from_language, to_translate)
    print("fuckkkkkkkk-------->>  " + url)
    #获取网页
    html = getHTMLText(url)
    if html:
        soup = BeautifulSoup(html, "html.parser")
      
    #解析网页得到翻译结果   
    try:
        result = soup.find_all("div", {"class":"t0"})[0].text
    except:
        print("Translation Failed!")
        result = ""
          
    return result
 
def google_translate_CtoE(to_translate, from_language="ch-CN", to_language="en"):
    #根据参数生产提交的网址
    base_url = "https://translate.google.cn/m?hl={}&sl={}&ie=UTF-8&q={}"
    url = base_url.format(to_language, from_language, to_translate)
      
    #获取网页
    html = getHTMLText(url)
    if html:
        soup = BeautifulSoup(html, "html.parser")
      
    #解析网页得到翻译结果   
    try:
        result = soup.find_all("div", {"class":"t0"})[0].text
    except:
        print("Translation Failed!")
        result = ""
          
    return result
 
def main():
    while True:
        inp = int(input("Chinese to Englisth is 1, English to Chinese is 2:    "))
        if inp == 1:
            words = input("请输入中文:    ")
            print(google_translate_CtoE(words))
        else:
            words = input("Please input English:    ")
            print(google_translate_EtoC(words))
 
main()