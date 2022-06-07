class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(res.json())
  }

  sendingFormMessage(formData) {
    return fetch(this._baseUrl, {
      method: 'POST',
      headers: this._headers,
      body: formData
    })
      .then(this._checkResponse)
  }

}
//! Указать сервер (baseUrl) для почты https://................./send.php
const api = new Api({
  baseUrl: '',
  headers: {
    'authorization': 'ef26a870-ce14-4ae0-b138-67948bcf24ea',
    'Content-Type': 'multipart/form-data'
  }
});

export default api;