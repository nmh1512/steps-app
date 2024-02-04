import { createApp } from 'vue'
import App from './App.vue'
import * as dishes from './assets/dishes.json';
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()
const app = createApp(App);

app.config.globalProperties.$dishes = dishes.dishes;
app
  .use(vuetify)
  .mount('#app')
