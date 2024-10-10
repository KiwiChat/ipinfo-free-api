import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker'

import 'bulma/css/bulma.min.css';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import {
    faUserSecret, faHouse, faGlobe, faNetworkWired, faInfoCircle, faSyncAlt,
    faMapMarkerAlt, faBuilding, faBroadcastTower, faUserShield, faExclamationTriangle,
    faCopy, faCalendarAlt, faDatabase, faGlobeAmericas, faServer, faQuestion
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
    faUserSecret, faHouse, faGlobe, faNetworkWired, faInfoCircle, faSyncAlt,
    faMapMarkerAlt, faBuilding, faBroadcastTower, faUserShield, faExclamationTriangle,
    faCopy, faCalendarAlt, faDatabase, faGlobeAmericas, faServer, faQuestion
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

// 在应用程序实例上使用路由器
app.use(router);

// 挂载应用程序实例到DOM元素
app.mount('#app');
