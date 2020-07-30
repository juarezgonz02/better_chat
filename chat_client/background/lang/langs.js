const es = {
    loading: "Cargando...",
    started: "Se ha iniciado...",
    reading: "LEYENDO...",
    noChat: "ABRE EL CHAT",
    waiting: "APAGADO...",
    rejected: "SERVIDOR OFFLINE",
    checkText: "CONTROL DE LECTURA DEL CHAT"
}
const en = {
    loading: "Loading...",
    started: "Working...",
    reading: "Reading chat...",
    noChat: "Open Meet chat",
    waiting: "OFFLINE",
    rejected: "SERVER OFFLINE",
    checkText: " CHAT READER"

}
////////////////////////////////////////
function txt () {
    let lang_es = "es";
    let lang_en = "en";
    let lang = window.navigator.language;
    if(lang.includes(lang_en)){
        return(en)
    }
    else if(lang.includes(lang_es)){
        return(es)

    }
}
