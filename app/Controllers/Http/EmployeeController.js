'use strict'

const Employee = use('App/Models/Employee')

class EmployeeController {
  async index({ response }) {
    const employees = await Employee.all()
    return response.json(employees)
  }

  async store({ request, response }) {
    const data = request.only(['username', 'email', 'profile', 'contact', 'notes'])
    try {
      const employee = await Employee.create(data)
      return response.status(201).json({ success: true, employee })
    } catch (error) {
      return response.status(400).json({ success: false, message: error.message })
    }
  }
}

module.exports = EmployeeController
