import DataStore from '../index';

export const db = new DataStore();

describe('persistence', () => {
  it('should insert with promise', async () => {
    await db.insert({ name: 'Maggie' });
    const item = await db.find({ name: 'Maggie' });
    expect(item.name).toEqual('Maggie');
  });
});
