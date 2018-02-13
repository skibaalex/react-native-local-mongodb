import DataStore from '../index';

export const db = new DataStore();

describe('persistence', () => {
  it('should insert with promise', async () => {
    await db.insert({ name: '0' });
    await db.insert({ name: 'A' });
    await db.insert({ name: 'B' });
    await db.remove({ name: 'C' });

    const item = await db.find({});
    expect(item.length).toEqual(3);
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
