// @profiles
const express = require('express')
const router = express.Router()
const passport = require('passport')

const Profile = require('../../models/Profile')

// $route GET api/profiles/test
// @desc  返回请求的json数据
// @access public
router.get('/test', (req, res) => {
  res.json({msg: 'profile works'})
})

// $route GET api/profiles/:user_id
// @desc  获取用户所有信息
// @access private
router.get(
  '/:user_id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Profile
      .find({user_id: req.params.user_id})
      .then(profile => {
        if (!profile) {
          return res.status(404).json('无数据')
        }

        res.json(profile)
      })
      .catch(err => res.status(404).json(err))
  }
)

// $route POST api/profiles/add
// @desc  创建信息接口
// @access private
router.post(
  '/add',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const profileFields = {}
    if (req.body.user_id) { profileFields.user_id = req.body.user_id }
    if (req.body.type) { profileFields.type = req.body.type }
    if (req.body.costType) { profileFields.costType = req.body.costType }
    if (req.body.describe) { profileFields.describe = req.body.describe }
    if (req.body.cost) { profileFields.cost = req.body.cost }
    if (req.body.remark) { profileFields.remark = req.body.remark }

    new Profile(profileFields).save().then(profile => {
      res.json(profile)
    })
  }
)

// $route POST api/profiles/edit/:id
// @desc  编辑信息接口
// @access private
router.post(
  '/edit/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const profileFields = {}
    if (req.body.user_id) { profileFields.user_id = req.body.user_id }
    if (req.body.type) { profileFields.type = req.body.type }
    if (req.body.costType) { profileFields.costType = req.body.costType }
    if (req.body.describe) { profileFields.describe = req.body.describe }
    if (req.body.cost) { profileFields.cost = req.body.cost }
    if (req.body.remark) { profileFields.remark = req.body.remark }

    Profile
      .findOneAndUpdate(
        {_id: req.params.id},
        {$set: profileFields},
        {new: true}
      )
      .then(profile => res.json(profile))
  }
)

// $route DELETE api/profiles/delete/:id
// @desc  删除信息接口
// @access private
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Profile
      .findOneAndRemove({_id: req.params.id})
      .then(profile => {
        res.json(profile)
      })
      // eslint-disable-next-line handle-callback-err
      .catch(err => res.status(404).json('删除失败！'))
  }
)

module.exports = router
