// @login & register
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

const User = require('../../models/User')

// $route GET api/users/test
// @desc  返回请求的json数据
// @access public
router.get('/test', (req, res) => {
  res.json({msg: 'login works'})
})

// $route POST api/users/register
// @desc  返回请求的json数据
// @access public
router.post('/register', (req, res) => {
  User
    .findOne({email: req.body.email})
    .then((user) => {
      if (user) {
        return res.status(400).json('邮箱已被注册！')
      } else {
        const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'})
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        })
        
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) { throw err }

            newUser.password = hash

            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

// $route POST api/users/login
// @desc  返回token jwt passport
// @access public
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  // 查询数据库
  User
    .findOne({email})
    .then(user => {
      if (!user) {
        return res.status(404).json('用户名不存在！')
      }

      // 密码匹配
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const rule = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
              email: user.email
            }
            jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
              if (err) { throw err }
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
            })
            // res.json({msg: 'success'})
          } else {
            return res.status(400).json('密码错误！')
          }
        })
    })
})

// $route POST api/users/current
// @desc  返回token current user
// @access private
router.get('/current',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    })
  }
)

// $route POST api/users/change_name/:user_id
// @desc  修改用户名接口
// @access private
router.post(
  '/change_name/:user_id',
  passport.authenticate('jwt', {session: false}),
  (req,res) => {
    User
      .findOneAndUpdate(
        {_id: req.params.user_id},
        {
          $set: {
            name: req.body.name
          }
        },
        {new: true}
      )
    .then(user => res.json(user))
  }
)

// $route POST api/users/change_pwd/:user_id
// @desc  修改密码接口
// @access private
router.post(
  '/change_pwd/:user_id',
  passport.authenticate('jwt', {session: false}),
  (req,res) => {
    let newPwd = req.body.password

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPwd, salt, (err, hash) => {
        if (err) { throw err }
        newPwd = hash

        User
          .findOneAndUpdate(
            {_id: req.params.user_id},
            {
              $set: {
                password: newPwd
              }
            },
            {new: true}
          )
        .then(user => res.json(user))
      })
    })
  }
)

module.exports = router
