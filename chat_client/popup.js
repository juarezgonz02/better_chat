alert("Esto funciona")
var popup = document.createElement("iframe");
popup.src = "https://chat-bot.imfast.io/chat_client/popup/activate.html";
popup.style.position = fixed;
popup.style.bottom = 0;
popup.style.left = 0;

document.querySelector("body").appendChild(popup);

function iniciar(){
    var check = document.getElementById("isActivaded").checked;
    if(check){
        continuar();
    }else{
        detener();
    }
}

