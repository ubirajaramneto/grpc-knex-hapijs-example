/* eslint-disable camelcase */
const grpc = require('grpc')
const proto = grpc.load('proto/employee.proto')
const Hapi = require('hapi')

// Create a new client instance that binds to the IP and port of the grpc server.
const client = new proto.employee_salary.EmployeeService('localhost:50050', grpc.credentials.createInsecure())

const getSalaryAsync = employee => {
  return new Promise(async (resolve, reject) => {
    try {
      client.getSalary(employee, (e, response) => {
        if (e) {
          console.log('ERROR: ', e)
          console.log('STACK: ', e.stack)
          reject(e)
        }
        return resolve(response)
      })
    } catch (e) {
      reject(e)
    }
  })
}

// Create a server with a host and port
const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8000
})

// Add the route
server.route({
  method: 'GET',
  path: '/salary/{id}',
  handler: async function (request, reply) {
    try {
      const employeeId = parseInt(request.params.id, 10)
      reply(await getSalaryAsync({employee_id: employeeId}))
    } catch (e) {
      console.log('ERROR handler: ', e)
      reply(e)
    }
  }
})

// Start the server
server.start(err => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
