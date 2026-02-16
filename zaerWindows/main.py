import webview
import threading

def open_chat():
    webview.create_window(
        title='ZAER',
        url='https://zaerAI.github.io/chat',
        width=1200,
        height=800,
        resizable=True,
        fullscreen=False
    )
    webview.start(debug=False)

if __name__ == '__main__':
    open_chat()
