// const passport = require('passport');
const User = require('../models/User');
const multer = require('multer');
const bcrypt = require('bcrypt');
const express = require("express");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const authController = {};
const salt = 10;

authController.register = (req, res, next) => {
  // console.log("Register start ...");
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    avatar: {
      data: req.file.buffer,
      contentType: req.file.mimetype
    }
  }
  User.findOne({ username: userData.username })
    .then((userFound) =>  {
      if(userFound) {
        return res.status(400).json({ message: "username already taken" });
      }
      const hashedPassword = bcrypt.hashSync(userData.password, salt);
      const newUser = {
        email: userData.email,
        password: hashedPassword,
        username: userData.username,
        avatar: userData.avatar
      }
      User.create(newUser)
        .then((createdUser) => {
          req.session.currentUser = {
            _id: createdUser._id
          };
          res.redirect("/user/me")
        })
        .catch(next);
    })
    .catch(next);
};
authController.login = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username : username })
    .then((userFound) =>  {
      if(!userFound) {
        
        return res.status(400).json({ message: "Invalid user" });
      }

      const isValidPassword = bcrypt.compareSync(
        password,
        userFound.password
      );
      if(!isValidPassword) {
        return res.status(400).json({ message: "Invalid password lol" });
      }
      
      req.session.currentUser = {
        _id: userFound._id
      };
      res.redirect("/user/me");
    })
    .catch(next);
};

authController.logout = (req, res, next) => {
    req.session.destroy(function (error) {
      if (error) next(error);
      else res.status(200).json({ message: "Succesfully disconnected." });
    });
}
module.exports = authController;