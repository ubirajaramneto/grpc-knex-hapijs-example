/* eslint-disable camelcase */
const grpc = require('grpc')
const database = require('../database')
const employee = require('../proto-implementations/employee')
const dbClient = database.factory.createClient()
const employeeImplementation = employee.factory(dbClient)
const databaseSetup = require('../test/fixtures/setup-database')

const proto = grpc.load('proto/employee.proto')
const server = new grpc.Server()

const BIND_ADDRESS = '0.0.0.0:50050'

async function startServer() {
  try {
    await databaseSetup()
  } catch (e) {
    console.log('error when starting the server...')
    console.log(e)
  }
  console.log(employeeImplementation.getSalary)
  server.addService(proto.employee_salary.EmployeeService.service, {
    getSalary: employeeImplementation.getSalary
  })

  server.bind(BIND_ADDRESS, grpc.ServerCredentials.createInsecure())

  server.start()
  console.log('grpc server running on port:', BIND_ADDRESS)
}

startServer()

