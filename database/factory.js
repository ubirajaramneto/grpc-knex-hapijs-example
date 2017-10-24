/* eslint-disable no-warning-comments */
'use strict'

const knex = require('knex')
const path = require('path')

module.exports = {
  createClient: function () {
    return knex({
      client: 'sqlite3',
      connection: {
        filename: path.resolve('testdb.sqlite')
      },
      useNullAsDefault: true
    })
  }
}
