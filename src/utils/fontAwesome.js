import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faSun, faCaretDown, faHeart, faTrash, faRotate } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter, faDiscord, faInstagram } from '@fortawesome/free-brands-svg-icons';

library.add(faBars, faGithub, faTwitter, faDiscord, faInstagram, faSun, faCaretDown, faHeart, faTrash, faRotate);

export { FontAwesomeIcon };
