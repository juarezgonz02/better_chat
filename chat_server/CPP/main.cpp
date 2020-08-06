#include <string>
#include <json.hpp>
#include <windows.h>
#include <iostream>
#include <unistd.h>

using namespace std;
using namespace nlohmann;

void key_event();
struct message_t {
    string content;
    uint32_t length;
};


// Read a message from stdin and decode it.
json get_message() {
    char raw_length[4];
    fread(raw_length, 4, sizeof(char), stdin);
    uint32_t message_length = *reinterpret_cast<uint32_t*>(raw_length);
    if(!message_length)
        exit(EXIT_SUCCESS);

    char message[message_length];
    fread(message, message_length, sizeof(char), stdin);
    string m( message, message + sizeof message / sizeof message[0] );
    return json::parse(m);
}

// Encode a message for transmission, given its content.
message_t encode_message(json content) {
    string encoded_content = content.dump();
    message_t m;
    m.content = encoded_content;
    m.length = (uint32_t) encoded_content.length();
    return m;
}

void key_event(){

    keybd_event(0xB3, 0, 0, 0);
    usleep(3000);
    keybd_event(0xB3, 0, KEYEVENTF_KEYUP, 0);

}
// Send an encoded message to stdout.
void send_message(message_t encoded_message) {
    char* raw_length = reinterpret_cast<char*>(&encoded_message.length);
    fwrite (raw_length , 4, sizeof(char), stdout);
    fwrite (encoded_message.content.c_str(), encoded_message.length, sizeof(char), stdout);
    fflush(stdout);
}

int main(int argc, char *argv[])
{

    cout<<"This file is made to be opened by Firefox´s addOn, 'Better Chat'"<<endl;
    cout<<"Opening this file manually may display errors and the app will not work"<<endl;

    while(true) {
        json message = get_message();
        if(message == "control"){
            key_event();
            send_message(encode_message("pong"));
        }


    }
}
