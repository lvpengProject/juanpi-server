import Vue from "vue";
import JuanLoginAlert from "./JuanLoginAlert";

export default function() {
    return new Promise((resolve, reject) => {
        const JuanLoginAlertConstructor = Vue.extend(JuanLoginAlert);
        const instance = new JuanLoginAlertConstructor({data: { resolve, reject }}).$mount();
        document.body.appendChild(instance.$el);
    })
}
