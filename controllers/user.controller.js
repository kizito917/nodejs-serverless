const User = require("../models/users");

module.exports.registerNewUser = (name, email) => {
    const userPayload = new User({
        name,
        email
    });
    const createdUser = User.create(userPayload)
    return createdUser;
}

module.exports.fetchUsers = () => {
    const allUsers = User.find({})
    return allUsers;
}

module.exports.fetchSingleUser = (userId) => {
    const allUsers = User.findOne({_id: userId})
    return allUsers;
}

module.exports.updateUser = (userId, payload) => {
    const userUpdated = User.findByIdAndUpdate({_id: userId}, payload, { new: true })
    return userUpdated
}

module.exports.deleteUser = (userId) => {
    const deletedUser = User.findByIdAndDelete(userId)
    return deletedUser
}