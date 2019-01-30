import Boom from 'boom'
import db from '../db'

export const list = async (req, h) => {

  const results = await db.query('SELECT id, name, date_created FROM accounts')
  const rows = results[0]
  const accounts = rows.map(row => {
    return {
      id: row.id,
      name: row.name,
      date_created: row.date_created
    }
  })

  return { data: accounts }

}

export const get = async (req, h) => {

  const id = req.params.id

  const account = await getAccount(id)
  if(account == null) {
    return Boom.notFound()
  }
  return {
    data: {
      id: account.id,
      name: account.name,
      date_created: account.date_created
    }
  }

}

export const create = async (req, h) => {

  let payload = req.payload
  const { name } = payload
  const now = new Date()
  const newAccount = {
    name: name,
    date_created: now,
    date_modified: now
  }

  const id = await saveAccount(newAccount)
  return h.response()
    .header('location', `${req.path}/${id}`)
    .code(201)

}

export const update = async(req, h) => {

  let id = req.params.id
  let name = req.payload.name

  let account = await getAccount(id)
  if(account == null) {
    return Boom.notFound()
  }
  console.log(account)
  account.name = name
  account.date_modified = new Date()
  await saveAccount(account)
  return h.response().code(200)

}

export const remove = async (req, h) => {

  let id = req.params.id
  let account = await getAccount(id)
  if(account == null) {
    return Boom.notFound()
  }

  await deleteAccount(id)
  return h.response().code(200)

}

export default {
  list,
  get,
  create,
  update,
  remove
}

const getAccount = async (id) => {

  let results = await db.query('SELECT id, name, date_created FROM accounts WHERE id = ?', id)
  let rows = results[0]

  if(rows.length > 0) {
    return rows[0]
  }

  return null

}

const saveAccount = async(account) => {
  if(account.id) {
    return db.query('UPDATE accounts SET name = ?, date_modified = ? WHERE id = ?', [account.name, account.date_modified, account.id])
  }
  let results = await db.query('INSERT INTO accounts SET ?', account)
  return results[0].insertId
}

const deleteAccount = (id) => {
  return db.query('DELETE FROM accounts WHERE id = ?', id)
}
