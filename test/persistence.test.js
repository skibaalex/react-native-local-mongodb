import DataStore from '../index';

export const db = new DataStore();

describe('persistence', () => {
  it('should insert with promise', async () => {
    await db.insert({ name: 'Maggie' });
    const item = await db.find({ name: 'Maggie' });
    expect(item[0].name).toEqual('Maggie');
  });

  it('should insert with callback', async () => {
    return new Promise((resolve) => {
      db.insert({ name: 'Maggie' }, (err, res) => {
        expect(res.name).toEqual('Maggie')
        resolve()
      });
    })
  });
});
