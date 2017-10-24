/* eslint-disable camelcase */
'use strict'

function factory(dbConnection) {
  function getSalaryImplementation(employeeId) {
    return new Promise((resolve, reject) => {
      console.log('getting user...')
      try {
        dbConnection
          .select('salary')
          .from('employees')
          .where({id: employeeId})
          .limit(1)
          .then(result => {
            resolve(result[0].salary)
          })
      } catch (e) {
        console.log(e)
        reject(e)
      }
    })
  }

  async function getSalary(call, callback) {
    try {
      console.log('calling implementation...')
      const salary = await getSalaryImplementation(call.request.employee_id)
      console.log(salary)
      callback(null, salary)
    } catch (e) {
      console.log(e)
    }
  }

  return {
    getSalary: getSalary
  }
}

module.exports = {
  factory: factory
}
