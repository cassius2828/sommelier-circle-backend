const UserModel = require('../models/user')


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// ===== AWS STUFF
const S3 = require('aws-sdk/clients/s3')
// intialize the s3 constructor that will allow us to perform crud operations on the bucket on aws
const s3 = new S3()

// node's random id function, so we guarentee unique photo names for our fileuploads on our aws bucket
const { v4: uuidv4 } = require('uuid')


module.exports = {
	signup, 
	login 
}

async function login(req, res){
	try {
		console.log(req.body)
		// find the user in the database!
		// check their password
		// if we found a user and their passwords match, they are authorized
		const user = await UserModel.findOne({username: req.body.username})
		console.log(user, " <- user")
		if(user && bcrypt.compareSync(req.body.password, user.password)){
			// create our token aand store the users info in it!

			const token = jwt.sign({ user }, process.env.JWT_SECRET)

			res.status(200).json({token })
		} else {
			// 401 - means unauthorized
			res.status(401).json({error: 'invalid credentials'})
		}
		// if not invalid 

	} catch(err){
		res.status(400).json({error: err.message})
	}
}


async function signup(req, res){

	console.log(req.body, req.file, " < req.body, req.file")
	try {
		// check if the username already exists?
		const userDoc = await UserModel.findOne({username: req.body.username})
		// if true send back a response
		if(userDoc) {
			return res.status(400).json({error: "Username already taken."})
		}

		// Upload to AWS after your validation checks
		if(!req.file) return res.status(400).json({error: 'Please Submit a Photo!'})
		// ready to upload to aws!
		// create the filepate, the key name on our bucket where we will store the image on s3
		const filePath = `auth-template/${uuidv4()}-${req.file.originalname}`
		// the make our params object which has all the information that our s3 bucket/aws needs in order to process
		// our request
		const params = {Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer}

		s3.upload(params, async function(err, data){// err, data are the responses from aws
			if(err){
				console.log('=========================')
				console.log(err, ' <-- error from aws, probably wrong keys in your code ~/.aws/credentials file, or you have the wrong bucket name, are you sure you know what process.env.BUCKET_NAME is, did you log it out?')
				console.log('==========================')
				return res.status(500).json({error: 'Check back later, server issues with aws upload'})
			}

			req.body.password = bcrypt.hashSync(req.body.password, 10); // the result of this line is the hashed password
			const createdUser = await UserModel.create({...req.body, photoUrl: data.Location})
	
			// send the user info back to the client
			const token = jwt.sign({ user: createdUser }, process.env.JWT_SECRET)
			// 201 - means created
			res.status(201).json({ token })

		})



		// Create a new user 

		


	} catch(err){
		console.log(err)
		res.status(400).json({error: err.message})
	}
}