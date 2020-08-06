const legacy_values = {
    control: "#pausa",
    display_notify: "#host",
    default: false
}
const config = {
    control: "",
    display_notify:"",
    default:""
}

const control_input = document.querySelector("#control")
const display_notify_input = document.querySelector("#display_notify")
const reset_buttom = document.querySelector("#reset_button")
const confirm_buttom = document.querySelector("#confirm_button")
const default_check = document.querySelector("#default_on")


function actual_config(){
    config["control"] = preferences("control");
    config["display_notify"] = preferences("display_notify");
    config["vol_down"] = preferences("vol_down");
    config["default"] = preferences("default");
}

function reset(){
    browser.storage.sync.clear();
    control_input.placeholder = legacy_values.control
    display_notify_input.placeholder = legacy_values.display_notify
    default_check.checked = legacy_values.default
    browser.storage.sync.set({
        control: legacy_values.control,
        display_notify: legacy_values.display_notify,
        default: legacy_values.default
    })
actual_config()
}

function confirm(){
    browser.storage.sync.clear();
    browser.storage.sync.set({
            control: control_input.value,
            display_notify: display_notify_input.value,
            default: default_check.checked
        })
    actual_config()
}

function preferences(conf){

    const onGet = (item) =>{
        change_config(conf,item)
    }

    const onErr = (e) => {
        console.log(e)
    }

    var getting = browser.storage.sync.get(null)
    getting.then(onGet,onErr)
    
}

const change_config = (conf, item)=>{
    config[conf] = item[conf]
    console.log("Se ha configurado la opcion: "+ conf)
}

/*document.addEventListener("load", (e)=>
{
    console.log(e)
    browser.storage.sync.get().then((items)=>
    {
        if (typeof(items.main)=="undefined")
        {
            
        }
    })
})*/
confirm_buttom.addEventListener('click',confirm)
reset_buttom.addEventListener('click',reset)
if(navigator.language.includes("es")){
    alert("Es importante configurar está pagína para establecer los comandos o usa el boton Reset para establecer los predeterminados ")
}
else if(navigator.language.includes("en")){
    alert("It´s important to config the commands or you can just use the 'Reset' button to add default them ")
    
}

