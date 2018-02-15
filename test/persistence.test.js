import { getDb } from '../config/jest/helper'

it('update with promise', async () => {
  const db = await getDb()
  const items0 = await db.find({})

  await db.insert({ name: 'Maggie' })
  await db.insert({ name: 'Bob' })

  const items = await db.find({})

  const maggie1 = await db.findOne({name: 'Maggie'})
  const bob1 = await db.findOne({name: 'Bob'})

  await db.update({ name: {$in: ['Maggie', 'Bob']} }, { $set: { age: 1 }}, {multi: true})

  const maggie2 = await db.findOne({name: 'Maggie'})
  const bob2 = await db.findOne({name: 'Bob'})

  expect(items0).toHaveLength(0)
  expect(items).toHaveLength(2)
  expect(maggie1.age).toBeUndefined()
  expect(bob1.age).toBeUndefined()
  expect(bob2.age).toEqual(1)
  expect(maggie2.age).toEqual(1)
})


it('update with callback', async done => {
  const db = await getDb()
  const items0 = await db.find({})

  await db.insert({ name: 'Maggie' })
  await db.insert({ name: 'Bob' })

  const items = await db.find({})

  const maggie1 = await db.findOne({ name: 'Maggie' })
  const bob1 = await db.findOne({ name: 'Bob' })

  db.update({ name: { $in: ['Maggie', 'Bob'] } }, { $set: { age: 1 } }, { multi: true }, async function(err, res) {
    const maggie2 = await db.findOne({ name: 'Maggie' })
    const bob2 = await db.findOne({ name: 'Bob' })

    expect(res).toEqual(2)
    expect(items0).toHaveLength(0)
    expect(items).toHaveLength(2)
    expect(maggie1.age).toBeUndefined()
    expect(bob1.age).toBeUndefined()
    expect(bob2.age).toEqual(1)
    expect(maggie2.age).toEqual(1)
    done()
  })
})


it('remove with callback', async done => {
  const db = await getDb()
  const items0 = await db.find({})

  await db.insert({ name: 'Maggie' })
  await db.insert({ name: 'Bob' })

  const items = await db.find({})

  db.remove({ name: { $in: ['Bob'] } }, {multi: true}, async function(err, res) {
    const bob2 = await db.findOne({ name: 'Bob' })

    expect(res).toEqual(1)
    expect(items0).toHaveLength(0)
    expect(items).toHaveLength(2)
    expect(bob2).toBeNull()
    done()
  })
})
