const legacy_values = {
    control: "#pausa, #pausar, #avanzar, #avanza",
    display_notify: "#host",
    vol_down: "#volDown",
    default: true
}
const config = {
    control: "",
    vol_down:"",
    display_notify:"",
    default:""
}

const control_input = document.querySelector("#control")
const display_notify_input = document.querySelector("#display_notify")
const vol_down_input = document.querySelector("#vol_down")
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
    vol_down_input.placeholder = legacy_values.vol_down
    display_notify_input.placeholder = legacy_values.display_notify
    default_check.checked = legacy_values.default
}

function confirm(){
    browser.storage.sync.clear();
    browser.storage.sync.set({
            control: control_input.value,
            display_notify: display_notify_input.value,
            //vol_down: vol_down_input.value,
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

actual_config();
confirm_buttom.addEventListener('click',confirm)
reset_buttom.addEventListener('click',reset)
