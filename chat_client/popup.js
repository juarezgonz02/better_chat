function crearCheck(checked){
var popup = document.createElement("div");
var main  = document.createElement("div");
var text  = document.createElement("div");
var forms  = document.createElement("div");
var check  = document.createElement("input");
var p = document.createElement("p");
var span = document.createElement("span");
var label = document.createElement("label");
p.className = "title";
popup.className = "root";               
popup.id = "popup";
main.className = "main";
text.className = "text";
forms.className = "forms";
label.className = "switch"; 
check.type = "checkbox"; 
check.id = "isChecked"; 
check.name   = "checkbox";
check.checked = checked; 
span.className = "slider round";

var textnode = document.createTextNode("Control de lectura de chat");    
p.appendChild(textnode); 
text.appendChild(p); 

label.appendChild(check);
label.appendChild(span);
forms.appendChild(label)
/////////////////
main.appendChild(text);
main.appendChild(forms);

popup.appendChild(main);

document.body.appendChild(popup);
}

class Feed{
    constructor(){
        this.main  =  document.createElement("div");
        this.loader =  document.createElement("div");
        this.text_container = document.createElement("div");
        this.text  = document.createElement("p");
    }
    crearAviso(message){
        this.text.innerText = message;
        this.text.className = "alertText";
        this.text_container.className = "alertContainer";
        this.main.className = "alertMain";
        this.loader.className = "alertLoader";

        this.text_container.appendChild(this.text);
        this.main.appendChild(this.text_container);
        this.main.appendChild(this.loader);  
        document.body.appendChild(this.main);
    }   
    cambiar(mess){
        this.text.innerText = mess;
        this.loader.className = "alertLoader";
        this.loader.classList.add("waiting");
        this.loader.style.visibility= "visible"
        this.text_container.style.visibility= "visible"
        /*this.main.addEventListener("animationend",()=>{
            this.text.style.visibility = "visible";
            this.main.classList.remove("loading")
         
        })*/
    }
    ocultar(){
        this.loader.classList.remove("waiting")
        this.text_container.classList.add("oculting");
        this.loader.classList.add("oculting");
        

        //this.loader.className = "alertLoaderFinish";
        //this.text.style.visibility = "hidden ";
        //this.alert.className = "alertFinish";
        
    }
}
try{
  

}
catch(e){
    console.log(e)
}