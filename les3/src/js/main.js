
import "../css/style.scss";

import arrs from './arrs.js';

import { drawGalleryItem } from './galery.js';


const galleryRootElement = document.getElementById('galleryRoot');

arrs.map(item => galleryRootElement.appendChild(drawGalleryItem(item)))