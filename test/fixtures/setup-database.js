/* eslint-disable camelcase */
'use strict'

const path = require('path')
const database = require(path.resolve('database'))
const dbClient = database.factory.createClient()
const userFixtures = require('./employees.json')

function prepareEmployeeTable() {
  return new Promise((resolve, reject) => {
    dbClient
      .schema
      .createTableIfNotExists('employees', table => {
        table.increments('id').primary()
        table.string('first_name')
        table.string('last_name')
        table.string('email')
        table.double('salary')
      })
      .then(() => {
        return dbClient
          .insert(userFixtures)
          .into('employees')
      })
      .then(() => {
        return resolve()
      })
      .catch(e => {
        return reject(e)
      })
  })
}

module.exports = prepareEmployeeTable
