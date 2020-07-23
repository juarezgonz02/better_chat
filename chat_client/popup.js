alert("Esto funciona")
var popup = document.createElement("iframe");
popup.src = "popup/activate.html";
document.querySelector("body").appendChild(popup);

function iniciar(){
    var check = document.getElementById("isActivaded").checked;
    if(check){
        continuar();
    }else{
        detener();
    }
}

