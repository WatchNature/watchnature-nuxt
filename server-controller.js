const axios = require('axios')

module.exports = {
  createSession: (req, res) => {
    let authReq = axios.post(`${process.env.API_AUTH_URL}`, req.body)

    authReq.then((authRes) => {
      req.session.currentUser = authRes.data.data
      req.session.authToken = authRes.data.meta.token
      res.json(authRes.data)
    })

    authReq.catch((err) => {
      res.status(err.response.status).json(err.response.data)
    })
  },
  deleteSession: (req, res) => {
    delete req.session.currentUser
    delete req.session.authToken
    res.json({ ok: true })
  }
}
