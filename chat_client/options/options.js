const legacy_values = {
    control: "#pausa, #pausar, #avanzar, #avanza",
    vol_up: "#volUp",
    vol_down: "#volDown",
    default: true
}
const config = {
    control: "",
    vol_down:"",
    vol_up:"",
    default:""
}

const control_input = document.querySelector("#control")
const vol_up_input = document.querySelector("#vol_up")
const vol_down_input = document.querySelector("#vol_down")
const reset_buttom = document.querySelector("#reset_button")
const confirm_buttom = document.querySelector("#confirm_button")
const default_check = document.querySelector("#default_on")


function actual_config(){
    config["control"] = preferences("control");
    config["vol_up"] = preferences("vol_up");
    config["vol_down"] = preferences("vol_down");
    config["default"] = preferences("default");
}

function reset(){
    control_input.placeholder = legacy_values.control
    vol_down_input.placeholder = legacy_values.vol_down
    vol_up_input.placeholder = legacy_values.vol_up
    default_check.checked = legacy_values.default
}

function confirm(){
    browser.storage.sync.set({
            control: control_input.value,
            vol_up: vol_up_input.value,
            vol_down: vol_down_input.value,
            default: default_check.checked
        })
    actual_config()
}

function preferences(conf){

    const onGet = (item) =>{
        change_config(conf,item)
    }

    const onErr = (e) => {
        //error
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
