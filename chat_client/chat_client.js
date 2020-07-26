var permitir = false,popup;
var close_b
var parameters = new Object()
const misCabeceras = new Headers();
const miInit = { method: 'GET',
               headers: misCabeceras,
               mode: 'no-cors',
               cache: 'default' };

///////////////////////////////////////////////////////////////////////
browser.storage.sync.get()
    .then(
        function(item){
            parameters.default = item.default
            parameters.control = item.control
            parameters.alert = item.vol_up
            parameters.vol_down = [item.vol_down]
        },
        function(e){
            console.log(e)
        }
    ).then(
        function(){
            crearCheck(parameters.default)  
            detectarChat()
            
        }
    )
    .then(
        function(){
            console.log(parameters)
            permitir = parameters.default;
            popup.addEventListener("change",checking)
        }
    )
///////////////////////////////////////////////////////////////////////
function detectarChat(){
    chat = document.querySelector("div[jsname=xySENc]")
    if((String(chat) == "null") ){
        console.log("Abre el chat plissss")     
        setTimeout(detectarChat,2000);
    }
    else{
        console.log("Se ha detectado el chat")
        chat.addEventListener("DOMNodeInserted",leerChat)

        close_b = document.querySelector("div[class=VUk8eb]")
        close_b.addEventListener("click",function(){
            setTimeout(detectarChat,700);
        })
    }
}

function checking(event){
    permitir = event.target.checked
    console.log("permitir")

}

function leerChat (){
    const switched = document.querySelector("input[name=checkbox]");
    const allow = switched.checked
    console.log(allow)
    const chat = document.getElementsByClassName("oIy2qc");
    const tamano = chat.length-1;
    const message = chat[tamano].dataset.messageText;
    const ultimoMessage = message.toLowerCase();
    if(allow){
        console.log("Leyendo...")
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
        else if(ultimoMessage.includes(parameters.alert)){
            console.log("SI SE LLEGO AQUI")
            //var command_pos = ultimoMessage.indexOf(parameters.alert)+parameters.alert.length
            var mess =  ultimoMessage.substring(parameters.alert.length)
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
    console.log("SI SE LLEGO AQUI")
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
 
function detener(){
    permitir = false;
    const chat = document.getElementsByClassName("oIy2qc");
    const tamano = chat.length-1;
    chat[tamano].dataset.messageText = "";
    console.log("SE HA DETENIDO LA LECTURA DEL CHAT");

}

function control(){
    try {
        fetch('http://localhost:5000/control',miInit)
        .then(function(response) {
        return response.json();
        })
        .then(function(myJson) {
        console.log(myJson);
        })
    } catch (error) {
        console.log("Por favor enciende el servidor de control")
    }
    
}

alert("------SE HA INICIADO EL CHAT BOT-------- ");

