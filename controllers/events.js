///////////////////////////
// AWS SDK and Event Model
///////////////////////////
const {  S3Client,PutObjectCommand } = require("@aws-sdk/client-s3");

const { v4: uuidv4 } = require("uuid");
const Event = require("../models/event");

// Initialize the S3 client with the region from environment variables
const s3Client = new S3Client({ region: process.env.AWS_REGION });

const postCreateEventPosting = async (req, res) => {
  console.log(req.body, " <-- req.body");
console.log(req, '<-- request')
  console.log(req.file, ' <-- req.file')
  try {
    // Create the file path and parameters for S3 upload
    const filePath = `sommelier-circle/event-imgs/${uuidv4()}-${
      req.file.originalname
    }`;
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: filePath,
      Body: req.file.buffer,
    };
    // Initialize the S3 PutObjectCommand
    const command = new PutObjectCommand(params);

    // Upload the file to S3
    const data = await s3Client.send(command);

    const newEvent = await Event.create({
      ...req.body,
      photo: `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`,
    });
    if (!newEvent) {
      return res.status(400).json({ error: "New event was cannot be found" });
    }
    // const duplicateEvent = await Event.findOne(req.body);
    // if (duplicateEvent) {
    //   return res.status(400).json({ error: "Event already exist" });
    // }
    res.status(200).json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "unable to create new event " });
  }
};

// const deleteAllEvents = async (req,res) => {
//   try {
//     await Event.deleteMany({})
//     console.log('deleted all events')
//   } catch (err) {
//     console.error(err);
//     console.log(`Unable to delete all events`)
//   }
// }
// deleteAllEvents()
module.exports = {
  postCreateEventPosting,
};
