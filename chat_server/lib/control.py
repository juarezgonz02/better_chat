import win32api
import win32con
import time

class control():
    def push_button(self):
        win32api.keybd_event(0xB3, 0, 0, 0)
        time.sleep(.15)
        win32api.keybd_event(0xB3, 0, win32con.KEYEVENTF_KEYUP, 0)
        return 0

