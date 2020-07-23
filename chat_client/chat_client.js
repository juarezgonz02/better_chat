var permitir = true;
var misCabeceras = new Headers();
var miInit = { method: 'GET',
               headers: misCabeceras,
               mode: 'no-cors',
               cache: 'default' };
try{
    var message = chat[tamano].dataset.messageText;
}
catch(e){
    console.log("SE HA DETENIDO LA LECTURA DEL CHAT");
}
function leerChat (){
    console.log("leyendoChat")
    var chat = document.getElementsByClassName("oIy2qc");
    var tamano = chat.length-1;
    var message = chat[tamano].dataset.messageText;
    var ultimoMessage = message.toLowerCase();
    if(permitir){
            if(ultimoMessage == "pausar"||ultimoMessage == "pausa" || ultimoMessage == "avanza"|| ultimoMessage == "avanzar"){
                    console.log("Ultimo mensaje:  "+ message);
                    control();
                    chat[tamano].dataset.messageText = "";
        }
    }
    else{
        console.log("SE HA DETENIDO LA LECTURA DEL CHAT");
    }


}function detener(){
    permitir = false;
}
function continuar(){
    permitir = true;
    leerChat();
}
function control(){
    fetch('http://localhost:5000/control',miInit)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          console.log(myJson[0]);
        })
    
}
alert("------SE HA INICIADO EL CHAT BOT-------- ");

