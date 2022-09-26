import JuanLoading from './JuanLoading'
import Vue from "vue";

export default {
    count: 0,
    instance: null,
    open() {
        this.count++;
        if(this.count === 1) {
            const JuanLoadingConstructor = Vue.extend(JuanLoading);
            this.instance = new JuanLoadingConstructor().$mount();
            document.body.appendChild(this.instance.$el);
        }
    },
    close() {
        this.count--;
        if(this.count === 0) {
            this.instance.$destroy(true);
            document.body.removeChild(this.instance.$el);
            this.instance = null;
        }
    }
}
