const items = {};

module.exports = {
  AsyncStorage: {
    setItem: jest.fn((item, value) => {
      return new Promise(resolve => {
        items[item] = value;
        resolve(value);
      });
    }),
    multiSet: jest.fn((item, value) => {
      return new Promise(resolve => {
        items[item] = value;
        resolve(value);
      });
    }),
    getItem: jest.fn(item => {
      return new Promise(resolve => {
        resolve(items[item]);
      });
    }),
    multiGet: jest.fn(item => {
      return new Promise(resolve => {
        resolve(items[item]);
      });
    }),
    removeItem: jest.fn(item => {
      return new Promise(resolve => {
        resolve(delete items[item]);
      });
    }),
    getAllKeys: jest.fn(items => {
      return new Promise(resolve => {
        resolve(items.keys());
      });
    })
  }
};
