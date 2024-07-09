const jwt = require('jsonwebtoken')
// jwt module has two main jobs
// to Sign tokens
// to Verify tokens 


module.exports = {
	sign,
	verify
}

function verify(req, res){
	const token = req.headers.authorization.split(' ')[1];

	// verify our token (decode it!)eventually to add to req.user
	const decoded = jwt.verify(token, process.env.JWT_SECRET)

	res.json({token})
}


function sign(req, res){

	// simulating a created user from the db
	const user = {
		id: 1,
		username: 'test'
	}
	// after we create a user in the database or find a user in the database
	// (login/signup) we create our JWT TOKEN

	const token = jwt.sign({ user }, process.env.JWT_SECRET)



	res.json({ token })
}