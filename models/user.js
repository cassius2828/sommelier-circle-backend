const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	}, 
	password: String,
	photoUrl: String
})

userSchema.set('toJSON', {
	transform: (doc, returnedObject) => {
		delete returnedObject.password
	}
})

// const UserModel = mongoose.model('User', userSchema)
// module.exports = UserModel

module.exports = mongoose.model('User', userSchema)