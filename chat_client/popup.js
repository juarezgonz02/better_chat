const langsAsker = browser.runtime.connect({name:"langsAsker"});
var langs;
langsAsker.onMessage.addListener(
    function(txts){//Function
        langs = txts;
    }
)

class Feed{
    constructor(){
        this.main  =  document.createElement("div");
        this.loader =  document.createElement("div");
        this.text_container = document.createElement("div");
        this.text  = document.createElement("p");


        ///////////////////////7777
        this.forms  = document.createElement("div");
        this.check  = document.createElement("input");
        this.span = document.createElement("span");
        this.label = document.createElement("label");
    }
    addAtributes(){
        this.forms.className = "forms";
        this.label.className = "switch"; 
        this.check.type = "checkbox"; 
        this.check.id = "isChecked"; 
        this.check.name   = "checkbox";
        this.span.className = "slider round";
        
    }
    crearCheck(){       
        this.addAtributes();         
        this.label.appendChild(this.check);
        this.label.appendChild(this.span);

        this.forms.appendChild(this.label);
        
    }
    crearAviso(message,checked){          
    try{       
        this.crearCheck()
        this.text.innerText = message;
        this.check.checked = checked;
        
        this.text.className = "alertText";
        this.text_container.className = "alertContainer";
        this.main.classList.add("alertMain");

        this.loader.classList.add("alertLoader");
        this.loader.classList.add(this.toogler(checked));

        this.text_container.appendChild(this.text);
        this.main.appendChild(this.text_container);
        this.main.appendChild(this.loader);  
        this.main.appendChild(this.forms);
        document.body.appendChild(this.main);
    }
    catch(e){
        console.log(e)
    }
    }   
    toogler(check){
        if(check){
            return "on"
        }else{
            return "off"
        }
    }
    cambiar(mess){
        this.text.innerText = mess;
        //this.loader.className = "alertLoader";
    }
    on(){
        this.loader.classList.remove("off")
        this.loader.classList.add("on")     
    }
    off(){
        this.loader.classList.remove("on")
        this.loader.classList.add("off")    
    }
    open(){
        this.main.classList.add("opened");
        this.main.style.animation = ""
    }
    close(){
        this.main.classList.add("close_a")
        this.main.classList.remove("opened");
        this.main.addEventListener("animationend",()=>{
            this.main.classList.remove("close_a")
        })
    }
}
