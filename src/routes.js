import accountsHandler from './controllers/accounts'

const accounts = [
  {
    method: 'GET',
    path: '/api/accounts',
    handler: accountsHandler.list
  },
  {
    method: 'GET',
    path: '/api/accounts/{id}',
    handler: accountsHandler.get
  },
  {
    method: 'POST',
    path: '/api/accounts',
    handler: accountsHandler.create
  },
  {
    method: 'PUT',
    path: '/api/accounts/{id}',
    handler: accountsHandler.update
  },
  {
    method: 'DELETE',
    path: '/api/accounts/{id}',
    handler: accountsHandler.remove
  }
]

export default [...accounts]
