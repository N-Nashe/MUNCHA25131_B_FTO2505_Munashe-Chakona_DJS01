import { podcasts, genres } from './data.js';
import { Modal } from './modal.js';

const grid = document.getElementById('podcastGrid');
const genreSelect = document.getElementById('genre');

const genreMap = {};
genres.forEach(g => {
  genreMap[g.id] = g.title;
});