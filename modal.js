export class Modal {
  static SELECTORS = {
    modalCover: '#modalCover',
    modalTitle: '#modalTitle',
    modalDesc: '#modalDescription',
    modalGenres: '#modalGenres',
    modalUpdated: '#modalUpdated',
    modalSeasons: '#modalSeasons',
    closeBtn: '.close-btn',
    sectionTitle: '#modalSectionTitle',
  };

  /**
   * Creates a Modal instance for displaying podcast or genre details.
   * @param {string} modalId - The ID of the modal element.
   * @param {Object} [options] - Optional config.
   * @param {Object.<string, string>} [options.genreMap={}] - Map of genre IDs to names.
   * @param {Array<Object>} [options.podcasts=[]] - Array of podcast data.
   */

   /** Bind modal close event listeners. @private */
  _bindEvents() {
    this.closeBtn.addEventListener('click', () => this.close());
    window.addEventListener('click', e => {
      if (e.target === this.modal) this.close();
    });
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.close();
    });
  }

  /**
   * Open the modal to display a genre or podcast.
   * @param {Object} data - Genre or podcast data object.
   * @param {boolean} [isGenre=false] - True if `data` is a genre.
   */
  open(data, isGenre = false) {
    this.modalSeasons.innerHTML = '';
    this._setSectionTitle(isGenre ? 'Shows' : 'Seasons');

    if (isGenre) {
      this._openGenre(data);
    } else {
      this._openPodcast(data);
    }
  }

    close() {
    this.modal.classList.add('hidden');
  }

  /**
   * Show genre info and related shows.
   * @param {Object} genre - Genre data object.
   * @private
   */
  _openGenre(genre) {
    this._setCover('', '');
    this._setTitle(genre.title);
    this._setDescription(genre.description);
    this._setGenres([genre.id]);
    this._setUpdated('');
    this._setShowsForGenre(genre);
    this.modal.classList.remove('hidden');
  }

  /**
   * Show podcast info.
   * @param {Object} podcast - Podcast data object.
   * @private
   */
  _openPodcast(podcast) {
    this._setCover(podcast.image, podcast.title);
    this._setTitle(podcast.title);
    this._setDescription(podcast.description);
    this._setUpdated(podcast.updated);
    this._setGenres(podcast.genres);
    this._setSeasons(podcast.seasons);
    this.modal.classList.remove('hidden');
  }