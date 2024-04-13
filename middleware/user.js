// import jwt from 'jsonwebtoken'
// import User from '../models/User.js'

// export default async function (req, res, next) {
// 	if (!req.cookies.token) {
// 		next()
// 		return
// 	}

// 	const token = req.cookies.token
// 	const decode = jwt.verify(token, process.env.JWT_SECRET)
// 	const user = await User.findById(decode.userId)
// 	req.userId = user._id
// 	next()
// }

import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export default async function (req, res, next) {
  if (!req.cookies.token) {
    next()
    return
  }

  const token = req.cookies.token

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decode.userId)

    if (!user) {
      // User not found, handle the situation accordingly
      // For example, you might want to clear the invalid token from the client
      res.clearCookie('token')
      next()
      return
    }

    req.userId = user._id
    next()
  } catch (err) {
    // Handle JWT verification errors
    console.error('JWT verification error:', err)
    // You might want to clear the invalid token from the client here as well
    res.clearCookie('token')
    next()
  }
}
