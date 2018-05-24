import requests
from bs4 import BeautifulSoup
import sys
from utils_lang import get_language_key_map
import re
sys.path.append("utils_lang.py") 

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

def google_translate_X(to_translate, from_language, to_language):
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

def get_translated_language_list(filename):
    language_list_result = []
    file_language_list = open(filename, "r")
    re_language = "#([A-Z|a-z]+)[\s]"
    re_language_pattern = re.compile(re_language)
    while 1:
        str_line = file_language_list.readline()
        if not str_line:
            break;
        re_language_match_obj = re_language_pattern.search(str_line)
        if re_language_match_obj:
            language_list_result.append(re_language_match_obj.group(1))
        else:
            print("nothing match")

    file_language_list.close()
    return language_list_result

def google_translate_enTomany(to_translate, from_language, lang_list):
    for to_lang in lang_list:
        print("--->>  " + to_lang)
        to_lang_code = get_language_key_map()[to_lang]
        print(google_translate_X(to_translate, from_language, to_lang_code))

# def main():
#     while True:
#         inp = int(input("Chinese to Englisth is 1, English to Chinese is 2:    "))
#         if inp == 1:
#             words = input("请输入中文:    ")
#             print(google_translate_CtoE(words))
#         else:
#             words = input("Please input English:    ")
#             print(google_translate_EtoC(words))
 
# main()

lang_list = get_translated_language_list("../translations/language_list.txt")
google_translate_enTomany("hello", "en", lang_list)

