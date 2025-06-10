'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    // Auto-hash password before saving
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }

      // Convert documents array to string if needed
      if (Array.isArray(userInstance.documents)) {
        userInstance.documents = userInstance.documents.join(',')
      }
    })
  }

  // Token relationship for authentication
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  // Optional: serialize documents back to array when retrieving
  getDocuments (value) {
    return value ? value.split(',') : []
  }

  // Optional: allow virtual fields or transformations if needed
  static get hidden () {
    return ['password'] // hide password when returning user data
  }
}

module.exports = User
