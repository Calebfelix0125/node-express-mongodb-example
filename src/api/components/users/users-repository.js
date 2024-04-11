const { database } = require('../../../core/config');
const { errorTypes } = require('../../../core/errors');
const { User } = require('../../../models');
const { name, password } = require('../../../models/users-schema');
const bcrypt = require('bcrypt');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @param {string} password_confirm
 * @returns {Promise}
 */
async function createUser(name, email, password, password_confirm) {
  return User.create({
    name,
    email,
    password,
    password_confirm,
  });
}

// mengecek apakah sudah ada user dengan email tertentu.
async function checkUser(email) {
  const userDitemukan = await User.findOne({ email }); // mencari apakah email yg diinput ada yg sama dengan yg tersimpan di database
  return !!userDitemukan; // mengkonversi ke boolean, yakni mengembalikan 'true' jika ada user yg punya email yg sama.
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

//change PW
async function updatePassword(id, newPW) {
  return User.updateOne({ _id: id }, { $set: { password: newPW } });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkUser, // baru
  updatePassword, // baru
};