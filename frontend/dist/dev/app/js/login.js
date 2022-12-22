/* CSS */
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '../css/login.css';
/* shoelace */
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
import './views/login';
// Set the base path to the folder you copied Shoelace's assets to
setBasePath('assets/shoelace');
