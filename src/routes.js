import accountsHandler from './controllers/accounts'
import Joi from 'joi'

const accountSchema = {
  id: Joi.number()
    .integer()
    .min(1)
    .required(),
  name: Joi.string()
    .min(1)
    .max(100)
    .required()
}

const accounts = [
  {
    method: 'GET',
    path: '/api/accounts',
    handler: accountsHandler.list
  },
  {
    method: 'GET',
    path: '/api/accounts/{id}',
    handler: accountsHandler.get,
    options: {
      validate: {
        params: {
          id: accountSchema.id
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/api/accounts',
    handler: accountsHandler.create,
    options: {
      validate: {
        payload: {
          name: accountSchema.name
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/accounts/{id}',
    handler: accountsHandler.update,
    options: {
      validate: {
        params: {
          id: accountSchema.id
        },
        payload: {
          name: accountSchema.name
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/accounts/{id}',
    handler: accountsHandler.remove,
    options: {
      validate: {
        params: {
          id: accountSchema.id
        }
      }
    }
  }
]

export default [...accounts]
