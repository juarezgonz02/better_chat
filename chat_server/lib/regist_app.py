from winreg import *

key_Path = 'Software\\Mozilla\\NativeMessagingHosts\\chat_bot'

class Reg():

    def registry(self):
        try:
            key = OpenKey(HKEY_CURRENT_USER, key_Path, 0, KEY_ALL_ACCESS)
            print("ALREADY")
        except:
            key = CreateKey(HKEY_CURRENT_USER, key_Path)
            print("Creating...")
        SetValueEx(key, "", 0, REG_SZ, "C:\\Users\\OSCAR\\Documents\\chat-bot\\chat_server\\chat_app.json")
        CloseKey(key)