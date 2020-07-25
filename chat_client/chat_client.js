var permitir = true,popup;
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
            parameters.vol_up = item.vol_up
            parameters.vol_down = item.vol_down
        },
        function(e){
            console.log(e)
        }
    )
    .then(
        function(){
            console.log(parameters)
            crearCheck(parameters.default);  
            popup = document.querySelector("input[name=checkbox]");
            popup.addEventListener("change",checking)
        }
    )
///////////////////////////////////////////////////////////////////////

function checking(event){
    const status = event.target.checked;
    if(status){
        continuar();
        
    }
    else{
        detener();
    }
}

function leerChat (){
    
    const chat = document.getElementsByClassName("oIy2qc");
    const tamano = chat.length-1;
    const message = chat[tamano].dataset.messageText;
    const ultimoMessage = message.toLowerCase();
    if(permitir){
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
    }
    else{
        console.log("A la espera...");
    }


}

function detener(){
    permitir = false;
    const chat = document.getElementsByClassName("oIy2qc");
    const tamano = chat.length-1;
    chat[tamano].dataset.messageText = "";
    console.log("SE HA DETENIDO LA LECTURA DEL CHAT");

}

function continuar(){
    permitir = true;
    setInterval(leerChat,2000);
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

