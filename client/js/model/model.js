import axios from 'axios';

export default {
  _state: 'coffee',
  menu: [],

  async getMenu(url) {
    try {
      
      const { data } = await axios.get(url);

      return data;
    } catch (e) {
      console.log(data)
      console.error(e);
    }
  },
  async setMenu(url, payload) {
    try {
      const { data } = await axios.post(url, payload);

      return data;
    } catch (e) {
      console.error(e);
    }
  },
  get state() {
    return this._state;
  },

  set state(value) {
    this._state = value;
  },
};
