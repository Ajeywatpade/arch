'use strict'

const Schema = use('Schema')

class AddIsActiveToUsersSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.boolean('is_active').defaultTo(true)
    })
  }

  down () {
    this.alter('users', (table) => {
      table.dropColumn('is_active')
    })
  }
}

module.exports = AddIsActiveToUsersSchema
