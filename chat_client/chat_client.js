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
browser.storage.sync.get()
    .then(
        function(item){
            parameters.default = item.default;
            parameters.control = item.control;
            parameters.notify = item.notify;
            //parameters.vol_down = [item.vol_down]
        },
        function(e){
            console.log(e)
        }
    ).then(
        ()=>{
           
            crearCheck(parameters.default);  
            popup = document.querySelector("input[name=checkbox]");
            Feedback.cambiar("SE HA INICIADO");
            detectarChat();
            
        }
    )
    .then(
        ()=>{
            popup.addEventListener("change",checking);
        }
    )
///////////////////////////////////////////////////////////////////////
function detectarChat(){
    chat = document.querySelector("div[jsname=xySENc]");
    allow = document.querySelector("input[name=checkbox]");
    if((String(chat) == "null") ){
        if(allow.checked==false){
            Feedback.cambiar("A la espera...");   
        }else{
            Feedback.cambiar("ABRE EL CHAT");   
        }
        setTimeout(detectarChat,2000);
    }
    else{
        if(allow.checked==false){
            Feedback.cambiar("A la espera...");   
        }else{
            Feedback.cambiar("LEYENDO...");   
        }
        chat.addEventListener("DOMNodeInserted",leerChat);
        close_b = document.querySelector("div[class=VUk8eb]");
        close_b.addEventListener("click",function(){
            Feedback.cambiar("ABRE EL CHAT");  
            setTimeout(detectarChat,700);
        })
    }
}
function checking(event){
    permitir = event.target.checked;
    console.log("permitir");
    if(!permitir){  
        Feedback.cambiar("A la espera...")
    }else{
        detectarChat();
    }

}
function leerChat (){
    const switched = document.querySelector("input[name=checkbox]");
    const allow = switched.checked;
    checking();
    console.log(allow);
    const chat = document.getElementsByClassName("oIy2qc");
    const tamano = chat.length-1;
    const message = chat[tamano].dataset.messageText;
    const ultimoMessage = message.toLowerCase();
    if(allow){
        Feedback.cambiar("LEYENDO...");  
        if(
        ultimoMessage == parameters.control ||
        ultimoMessage == "#pausa"  ||
        ultimoMessage == "#avanza" ||
        ultimoMessage == "#avanzar" )
        {
            console.log("Ultimo mensaje:  "+ message);              
            control();
            chat[tamano].dataset.messageText = "";
        }    
        else if(ultimoMessage.includes(parameters.notify)){
            console.log("SI SE LLEGO AQUI");
            var menss =  ultimoMessage.substring(parameters.notify.length);
            notifi_host(mess);
        }
        ///////////////*/
    }
    else{
        console.log("A la espera...");
    }


}
function notifi_host(message){
    var nombre = document.getElementsByClassName("YTbUzc");
    console.log("SI SE LLEGO AQUI");
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



