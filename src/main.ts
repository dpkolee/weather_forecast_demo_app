import './assets/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toasity, { toast, type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import './firebase/firebaseConfig'

const app = createApp(App)

app.use(router)
app.use(Vue3Toasity, {
  autoClose: 3000,
  position: toast.POSITION.TOP_RIGHT,
  transition: toast.TRANSITIONS.BOUNCE,
  limit: 5
} as ToastContainerOptions)

app.mount('#app')
