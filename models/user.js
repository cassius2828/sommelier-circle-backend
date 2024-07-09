const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
	username: {
	  type: String,
	  required: true
	},
	password: {
	  type: String,
	  required: true
	},
	email: {
	  type: String,
	  required: true
	},
	favorites: {
	  wines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wine' }],
	  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
	  critics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Critic' }],
	  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
	  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
	},
	following: [{
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'User'
	}],
	followers: [{
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'User'
	}],
	profileImg: String,
	rep: Number,
	socialMedia: {
	  twitter: String,
	  instagram: String,
	  facebook: String,
	  linkedIn: String
	},
	bio: String
  });

userSchema.set('toJSON', {
	transform: (doc, returnedObject) => {
		delete returnedObject.password
	}
})

// const UserModel = mongoose.model('User', userSchema)
// module.exports = UserModel

module.exports = mongoose.model('User', userSchema)