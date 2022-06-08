class Popup {
  constructor(selectorTemplate) {
    this._selectorTemplate = selectorTemplate;
    this._container = document.querySelector('.root')
    // this._popup = document.querySelector(popupSelector);

    this._handleEscClose = this._handleEscClose.bind(this);

  };

  _getTemplate() {
    const elementIndicator = document
      .querySelector(this._selectorTemplate)
      .content
      .querySelector('.popup')
      .cloneNode(true);
    return elementIndicator;
  };

  _generatePopup() {
    this._popup = this._getTemplate();
    this._setEventListeners();
    return this._popup;
  };

  setPopup() {
    this._container.append(this._generatePopup())
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    };
  };

  _setEventListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close') || event.target.classList.contains('popup__image-cross')) {
        this.close();
      };
    });
  };
};

export default Popup;