from winreg import *

key_path =  'Software\\Mozilla\\NativeMessagingHosts\\better_chat'

def registry(pathToKey):
    try:
        key = OpenKey(HKEY_CURRENT_USER, key_Path, 0, KEY_ALL_ACCESS)
        print("ALREADY")
    except:
        key = CreateKey(HKEY_CURRENT_USER, 'Software\\Mozilla\\NativeMessagingHosts\\better_chat')
        print("Creating...")
    SetValueEx(key, "", 0, REG_SZ, pathToKey)
    CloseKey(key)