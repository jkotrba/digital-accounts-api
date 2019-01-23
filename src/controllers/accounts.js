import Boom from 'boom'

const fakeAccounts = [
  { id: 1, name: 'Account 1', balance: 12.00 },
  { id: 2, name: 'Account 2', balance: 1.00 },
  { id: 3, name: 'Account 3', balance: 18.00 },
  { id: 4, name: 'Account 4', balance: 13.00 },
  { id: 5, name: 'Account 5', balance: 9.00 },
]
export const list = () => {
  return Promise.resolve(fakeAccounts)
}

export const get = (req, h) => {
  const id = +req.params.id

  // TODO: add proper joi schema validation
  if(id == null || isNaN(id)) {
    return Boom.badRequest('Invalid id')
  }

  const account = fakeAccounts.find(a => a.id === id)

  if(account == null) {
    return Boom.notFound()
  }

  return Promise.resolve(account)
}

export const create = (req, h) => {

}

export const update = (req, h) => {

}

export const remove = (req, h) => {

}

export default {
  list,
  get,
  create,
  update,
  remove
}
