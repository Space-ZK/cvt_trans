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
  
def google_translate(to_translate, from_language, to_language):

    base_url = "https://translate.google.cn/m?hl={}&sl={}&ie=UTF-8&q={}"
    url = base_url.format(to_language, from_language, to_translate)
      

    html = getHTMLText(url)
    if html:
        soup = BeautifulSoup(html, "html.parser")
    
    try:
        result = soup.find_all("div", {"class":"t0"})[0].text
    except:
        print("Translation Failed!")
        result = ""
          
    return result

def get_translated_language_list(filename):
    language_list_result = []
    file_language_list = open(filename, "r")
    re_language = "#([A-Z|a-z|_]+)"
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

def google_translate_enTomany(to_translate, from_language, lang_list, outputfilename):
    file_output = open(outputfilename, "w")
    for key in to_translate:
        i = 0
        for to_lang in lang_list:
            if to_lang in get_language_key_map():
                to_lang_code = get_language_key_map()[to_lang]
                print("%s.%d=%s" %(key, i, google_translate(to_translate[key], from_language, to_lang_code)))
                file_output.write("%s.%d=%s\n" %(key, i, google_translate(to_translate[key], from_language, to_lang_code)))
            else:
                print("nothing can be translated!")
                file_output.write("%s.%d=\n" % (key, i))
            i = i + 1
    file_output.write("\n\n")
    file_output.close()

def get_source_text(filename):
    src_text_dic = {}
    file_src_text_list = open(filename, "r")
    re_src_text = "(en_str[A-Z|a-z|0-9|_]+)[\s]+(.+)"
    re_src_text_pattern = re.compile(re_src_text)
    while 1:
        str_line = file_src_text_list.readline()
        if not str_line:
            break;
        re_src_text_match_obj = re_src_text_pattern.search(str_line)
        if re_src_text_match_obj:
            src_text_dic[re_src_text_match_obj.group(1)]=re_src_text_match_obj.group(2)
            #print(re_src_text_match_obj.group(1) + "|||||||||" + re_src_text_match_obj.group(2))
        else:
            print("nothing src text match")

    file_src_text_list.close()
    return src_text_dic


src_text_list = get_source_text("../translations/source_text.txt")
lang_list = get_translated_language_list("../translations/language_list.txt")
google_translate_enTomany(src_text_list, "en", lang_list, "result.txt")


