'use strict'

const Schema = use('Schema')

class EmployeesSchema extends Schema {
  up () {
    this.create('employees', (table) => {
      table.increments()
      table.string('username').notNullable()
      table.string('email').notNullable().unique()
      table.string('profile').notNullable()
      table.string('contact').notNullable()
      table.text('notes').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('employees')
  }
}

module.exports = EmployeesSchema
