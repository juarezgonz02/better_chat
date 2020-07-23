function crearCheck(){
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
check.type = "checkbox"; 
label.className = "switch"; 
check.id = "isChecked"; 
check.name   = "checkbox"; 
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
