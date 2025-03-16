import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend';

i18n.use(initReactI18next)
.use(HttpApi)
.init({
    // resources:{},
    lng:"ar",
    fallbackLng:"ar",
    backend:{
        loadPath:"/locales/{{lng}}/translation.json"
    }
})

export default i18n;