'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class AuthController {
  async register({ request, response }) {
    const data = request.only(['username', 'email', 'password'])
    data.password = await Hash.make(data.password)
    try {
      await User.create(data)
      return response.status(201).send({ message: 'User registered successfully' })
    } catch (error) {
      return response.status(400).send({ error: 'Registration failed' })
    }
  }

  async login({ request, auth, response }) {
    const { username, password } = request.all()
    const user = await User.findBy('username', username)

    if (!user) {
      return response.status(400).send({ error: 'Invalid username or password' })
    }

    const passwordVerified = await Hash.verify(password, user.password)
    if (!passwordVerified) {
      return response.status(400).send({ error: 'Invalid username or password' })
    }

    const token = await auth.generate(user)
    return response.send({ token })
  }

  async logout({ auth, response }) {
  try {
    await auth.logout() // This works only if you're using sessions
    return response.json({ message: 'Logged out successfully' })
  } catch (error) {
    return response.status(400).json({ error: 'Logout failed' })
  }
}

}

module.exports = AuthController
