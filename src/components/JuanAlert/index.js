import Vue from "vue";
import JuanAlert from './JuanAlert'

export default function(message) {
    const JuanAlertConstructor = Vue.extend(JuanAlert);
    const instance = new JuanAlertConstructor({data: {message}}).$mount();
    document.body.appendChild(instance.$el);
}
