import JuanConfirm from "./JuanConfirm";
import Vue from "vue";

export default function(message) {
    return new Promise((resolve, reject) =>{
        const JuanConfirmConstructor = Vue.extend(JuanConfirm);
        const instance = new JuanConfirmConstructor({data: {message, reject,resolve}}).$mount();
        document.body.appendChild(instance.$el)
    })
}
