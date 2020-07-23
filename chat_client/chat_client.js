var permitir = true;
var misCabeceras = new Headers();
crearCheck();
const popup = document.querySelector("input[name=checkbox]");
var miInit = { method: 'GET',
               headers: misCabeceras,
               mode: 'no-cors',
               cache: 'default' };

try{
    popup.addEventListener('change', checking)
    console.log(popup);
}
catch(e){
    console.log(e);
    console.log("No se ha detectado mensaje");
}

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
    console.log("Leyendo...")
    var chat = document.getElementsByClassName("oIy2qc");
    var tamano = chat.length-1;
    var message = chat[tamano].dataset.messageText;
    var ultimoMessage = message.toLowerCase();
    if(permitir){
        if(ultimoMessage == "pausar"||ultimoMessage == "pausa"||ultimoMessage == "avanza"|| ultimoMessage == "avanzar" ){
            console.log("Ultimo mensaje:  "+ message);
            control();
            chat[tamano].dataset.messageText = "";
        }
    }
    else{
        console.log("A la espera...");
    }


}function detener(){
    permitir = false;
    console.log("SE HA DETENIDO LA LECTURA DEL CHAT");

}
function continuar(){
    permitir = true;
    setInterval(leerChat,2000);
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

