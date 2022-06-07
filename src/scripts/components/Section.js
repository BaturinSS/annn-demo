class Section {
  constructor() {
    this._container = document.querySelector('#indicatorPageReviews');
  };

  setItem(element) {
    this._container.append(element)
  };
};

export default Section;