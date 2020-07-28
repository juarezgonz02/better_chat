///////////////////////////////////////////////////////////////////////     
var close_b,popup,permitir = false;
const Feedback = new Feed();
const parameters = new Object();
const misCabeceras = new Headers();
const miInit = { method: 'GET',
               headers: misCabeceras,
               mode: 'no-cors',         
               cache: 'default' };      
///////////////////////////////////////////////////////////////////////
Feedback.crearAviso("Loading...");
///////////////////////////////////////////////////////////////////////             
browser.storage.sync.get()
    .then(      
        function(item){

            console.log(item)
            parameters.default = item.default;
            parameters.control = item.control;
            parameters.notify = item.display_notify;
            parameters.texts = langs.txts;
            //parameters.vol_down = [item.vol_down]

        },
        function(e){
            console.log(e)
        })
    .then(
        ()=>{

            Feedback.cambiar(parameters.texts.started);
            crearCheck(parameters.default,parameters.texts.checkText);
            detectarChat();

            popup = document.querySelector("input[name=checkbox]");
           
        }
    )
    .then(
        ()=>{

            popup.addEventListener("change",checking);

        }
    )
///////////////////////////////////////////////////////////////////////
function detectarChat(){
try{

    let chat = document.querySelector("div[jsname=xySENc");
    let allow = document.querySelector("input[name=checkbox]").checked;

    if( String(chat) == "null"){

        if(allow==false){
            Feedback.cambiar(parameters.texts.waiting);
        }
        else{
            Feedback.cambiar(parameters.texts.noChat);
        }
        setTimeout(detectarChat,2000);

    }
    else{
        let chat = document.querySelector("div[jsname=xySENc");
        chat.addEventListener("DOMNodeInserted",leerChat);
        close_b = document.querySelector("div[class=VUk8eb]");
        
        close_b.addEventListener("click",function(){
            Feedback.cambiar(parameters.texts.noChat);
            setTimeout(detectarChat,700);
        })

        if(allow.checked==false){
            Feedback.cambiar(parameters.texts.waiting);
        }
        else{
            Feedback.cambiar(parameters.texts.reading);
        }

        close_b.addEventListener("click",function(){
            Feedback.cambiar(parameters.texts.noChat);
            setTimeout(detectarChat,700);
        })

    }
}catch(e){
    console.log(e)
}
}
function checking(event){
    
    permitir = event.target.checked;
    
    if(!permitir){
        Feedback.cambiar(parameters.texts.waiting)
    }else{
        detectarChat();
    }

}
function leerChat (){

    let switched = document.querySelector("input[name=checkbox]");
    let allow = switched.checked;
    let chat = document.getElementsByClassName("oIy2qc");
    let tamanio = chat.length-1;
    let message = chat[tamanio].dataset.messageText;
    let ultimoMessage = message.toLowerCase();

    if(allow){
        commandCheck(ultimoMessage);
        Feedback.cambiar(parameters.texts.reading);
    }    
    else{
        Feedback.cambiar(parameters.texts.waiting);
    }

}

function commandCheck(ultimoMessage){
    if(
        ultimoMessage == parameters.control ||
        ultimoMessage == "#pausa"  ||
        ultimoMessage == "#avanza" ||
        ultimoMessage == "#avanzar" )
        {
            control();
            chat[tamano].dataset.messageText = "";
        }
    //////////////////////////////////////////////////////////////
    else if(
        ultimoMessage.includes(parameters.notify))
        {
            let mess =  ultimoMessage.substring(parameters.notify.length);
            notifi_host(mess);
        }
}
function notifi_host(message){
    let nombre = document.getElementsByClassName("YTbUzc");
    try{
        browser.runtime.sendMessage({
        "name": nombre[nombre.length-1].innerHTML,
        "message": message
    });
    }
    catch(e){
        console.log(e);
    }
}
function control(){
    try {
        fetch('http://localhost:5000/control',miInit)
        .then(function(response) {
        return response.json();
        })
        .then(function(myJson) {
        console.log(myJson);
        });
    } catch (error) {
        console.log("Por favor enciende el servidor de control");
    }

}



