import JuanNotice from "./JuanNotice";
import Vue from "vue";
export default function (message) {
    const JuanNoticeConstructor = Vue.extend(JuanNotice);
    const instance = new JuanNoticeConstructor({ data: {message} }).$mount();
    document.body.appendChild(instance.$el)
}
