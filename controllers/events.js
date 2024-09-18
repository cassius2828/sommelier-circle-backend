///////////////////////////
// AWS SDK and Event Model
///////////////////////////
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const Event = require("../models/event");

// Initialize the S3 client with the region from environment variables
const s3Client = new S3Client({ region: process.env.AWS_REGION });

///////////////////////////
// ? POST | Create Event Posting
///////////////////////////
const postCreateEventPosting = async (req, res) => {
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

    res.status(200).json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "unable to create new event " });
  }
};

///////////////////////////
// GET | Explore Events
///////////////////////////
const getExploreEvents = async (req, res) => {
  const { userId, searchQuery } = req.query;

  try {
    // allows non signed in users to see all events
    // signed in users will not see their events in the explore page
    let query;
    if (userId !== "undefined") {
      query = { owner: { $ne: userId } };
    } else {
      query = {};
    }

    if (searchQuery) {
      // Normalize the event names in the database query
      const normalizedSearchQuery = searchQuery.toLowerCase();

      query.eventName = {
        $regex: normalizedSearchQuery.replace(/and/g, "&"),
        $options: "i",
      };
    }
    const exploreEvents = await Event.find(query);

    if (exploreEvents.length === 0) {
      return res.status(400).json({
        message:
          "No events were found. Encourage your peers to create an event for the community!",
      });
    }
    res.status(200).json(exploreEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "unable to get all non-user events " });
  }
};

///////////////////////////
// GET | Filter Explore Events by City
///////////////////////////
const getFilterExploreEvents = async (req, res) => {
  const { userId, city } = req.query;

  try {
    const filteredByCityExploreEvents = await Event.find({
      owner: { $ne: userId },
      city,
    });
    if (filteredByCityExploreEvents.length === 0) {
      return res.status(400).json({
        message:
          "No events were found. Encourage your peers to create an event for the community!",
      });
    }
    res.status(200).json(filteredByCityExploreEvents);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: `unable to get filtered events by ${city} ` });
  }
};

///////////////////////////
// GET | User Events
///////////////////////////
const getUserEvents = async (req, res) => {
  const { userId, searchQuery } = req.query;

  try {
    let query = { owner: userId };
    if (searchQuery) {
      // Normalize the event names in the database query
      const normalizedSearchQuery = searchQuery.toLowerCase();

      query.eventName = {
        $regex: normalizedSearchQuery.replace(/and/g, "&"),
        $options: "i",
      };
    }

    const userEvents = await Event.find(query);
    if (userEvents.length === 0) {
      return res.status(400).json({
        message: "No events were found. Create your first event now!",
      });
    }
    res.status(200).json(userEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "unable to get all user events " });
  }
};

///////////////////////////
// GET | Event Details
///////////////////////////
const getEventDetails = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(400).json({
        message: "Could not find the event specified in the params",
      });
    }
    res.status(200).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "unable to get all user events " });
  }
};

///////////////////////////
// * PUT | Edit Event
///////////////////////////
const putEditEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check if a new file is uploaded and no existing photo is present
    let photoUrl = event.photo; // Default to existing photo

    if (req.file && !event.photo) {
      const filePath = `sommelier-circle/event-imgs/${uuidv4()}-${
        req.file.originalname
      }`;
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: filePath,
        Body: req.file.buffer,
      };

      // Upload the file to S3
      const command = new PutObjectCommand(params);
      await s3Client.send(command);

      // Construct the photo URL
      photoUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`;
    }

    // Update the event with new data
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        ...req.body,
        photo: photoUrl, // Use the new photo URL or the existing one
      },
      { new: true } // Return the updated document
    );

    // Respond with the updated event
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to edit event" });
  }
};

module.exports = {
  postCreateEventPosting,
  getUserEvents,
  getExploreEvents,
  getEventDetails,
  putEditEvent,
  getFilterExploreEvents,
};
