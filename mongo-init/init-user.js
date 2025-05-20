const { randomUUID } = require('crypto')

db = db.getSiblingDB('auth-db')

db.user.insertOne({
  _id: ObjectId(),
  id: randomUUID(),
  username: 'admin',
  password: '$2a$12$DwZQwf1Kxd54kUq7q/kRquzODV7FIEujhyI8a8cwwbgCC9oiA6ZTy',
  role: 'ADMIN',
})
