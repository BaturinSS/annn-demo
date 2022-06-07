class Indicator {
  constructor(handleClickIndicator) {
    this._selectorTemplate = '#indicator-template';
    this._selectorContent = '.reviews__radio-label';
    this._handleClickIndicator = handleClickIndicator;
  };

  _getTemplate() {
    const elementIndicator = document
      .querySelector(this._selectorTemplate)
      .content
      .querySelector(this._selectorContent)
      .cloneNode(true);
    return elementIndicator;
  };

  generateIndicator() {
    this._element = this._getTemplate();
    this._setEventListeners();
    return this._element;
  };

  _setEventListeners() {
    this._element.addEventListener('mousedown', (evt) => this._handleClickIndicator(evt));
  };
}

export default Indicator;