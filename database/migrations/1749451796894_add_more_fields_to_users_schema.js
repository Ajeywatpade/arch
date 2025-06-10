'use strict'

const Schema = use('Schema')

class AddMoreFieldsToUsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.date('birth_date').nullable()
      table.string('blood_group', 10).nullable()
      table.string('secondary_contact', 15).nullable()
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('birth_date')
      table.dropColumn('blood_group')
      table.dropColumn('secondary_contact')
    })
  }
}

module.exports = AddMoreFieldsToUsersSchema
