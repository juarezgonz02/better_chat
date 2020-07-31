import os
import json
import wget
import errno
import regist_app
import time


#Este programa SERÁ SETUP.EXE
#DEBE EMPAQUETAR EL CHAT.JSON
#INTERFAS GRAFICA 
    #CREAR UN REGISTRO
    #PIDE UNA RUTA DE INSTALACION
    #AÑADE LOS ARCHIVOS A ESA RUTA
    #LINK HACIA JSON Y EXE

def resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    try:
        os.path.join(os.environ["_MEIPASS2"],relative_path)
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)
#Rutas iniciale
dir_home = os.path.expanduser('~') 
file_path  = "AppData\\Local\\Better_chat\\"

app_path = os.path.join(dir_home, file_path)
url = 'https://chat-bot.imfast.io/chat_server/better_chat.exe'
manifest_name = "better_chat.json"
manifest_path = os.path.join(app_path, manifest_name)

bat_name = "better_chat.bat"
bat_path = os.path.join(app_path, bat_name)

exe_name = "better_chat.exe"
from_exe_path = "\\lib\\better_chat.exe"
exe_path = os.path.join(app_path, exe_name)


#CREAR CARPETA 
try:
    os.mkdir(app_path)
except OSError as e:
    if e.errno != errno.EEXIST:
        raise


#INFORMACION DEL MANIFIESTO
manifest_info = {
    "name": "better_chat",
    "description": "Example host for native messaging",
    "type": "stdio",
    "allowed_extensions": [ "chatbot@addon.net" ]
    }


#ath_confirmation = input("La ruta de instalacion será: \n"+ app_path)
manifest_info["path"] = os.path.join(app_path, exe_name)

regist_app.registry(manifest_path)
wget.download(url, exe_path)
    

with open(manifest_path, 'w') as manifest:
    json.dump(manifest_info, manifest)
    print("El manifesto de la app se ha guardado: "+ app_path)




