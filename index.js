require("dotenv").config();
const colors = require("colors");
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5001;

//! Middleware......
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dewgdxt.mongodb.net/?retryWrites=true&w=majority`;

//* Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dbConnect = async () => {
  try {
    client.connect();
    console.log(" Thrill Database Connected Successfully!".yellow.bold);
  } catch (error) {
    console.log(error.name, error.message);
  }
};
dbConnect();



//!FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:
//todo = = = = = = ALL Data Collections = = = = = = = = = = =

const db = client.db("Smart-Thrill");

// //! User Collection
const usersCollection = db.collection("All-users");

// //! Added Products Collection
const allPostCollection = db.collection("All-posts");

// //! Added Products Collection
const addedAdCollection = db.collection("All-advertisements");

// //! Added Chat Collection
const addedChatCollection = db.collection("All-chats");

// //! Added friend-request Collection
const friendRequestCollection = db.collection("friend-requests");

// //! Added friend-request-accept Collection
const friendListCollection = db.collection("friend-List");

// //!!!!https:///smart-thrill-social-media-server.vercel.app
// //!!!!https:///smart-thrill-server.vercel.app

// //!FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:
// //todo = = = = = = ALL get APIs = = = = = = = = = = =



// //! < Start >  get admin ======>
app.get("/admin", async (req, res) => {
  const query = { role: "admin" };
  console.log(query)
  const result = await usersCollection.findOne(query);
  console.log(result)
  res.send(result);
});

// //!======END======>

// //! < Start >  get Reels ======>
app.get("/reels", async (req, res) => {
  const query = { category: "reels" };
  const result = await allPostCollection.find(query).toArray();
  res.send(result);
});

// //!======END======>

// //! < Start >  get messages ======>
app.get("/api/messages", async (req, res) => {
  const query = {};
  const result = await addedChatCollection.find(query).toArray();
  res.send(result);
});

// //!======END======>

// //! < Start >  get All Data by pagination ======>
// app.get('/allData', async (req, res) => {
// 	const page = parseInt(req.query.page);
// 	const dataSize = parseInt(req.query.dataSize);
// 	const query = {};
// 	const result = await (await allPostCollection.find(query).skip(page*dataSize).limit(dataSize).toArray());
// 	const count = await allPostCollection.estimatedDocumentCount();
// 	 //TODO: koto gulo data ase seita count korar jonno...
// 	res.send({ count, result })
// })

// //!======END======>

// //! < Start >  get All Data ======>
app.get("/all-posts", async (req, res) => {
  const query = {};
  const result = await allPostCollection.find(query).toArray();
  console.log('Data', result)
  res.send(result);
});

// //!======END======>

// //! < Start >  get all status ======>
// // app.get('/status', async (req, res) => {
// // 	const page = parseInt(req.query.page);
// // 	const dataSize = parseInt(req.query.dataSize);
// // 	const query = {};
// // 	const result = await (await allPostCollection.find(query).skip(page*dataSize).limit(dataSize).toArray());
// // 	const count = await allPostCollection.estimatedDocumentCount();
// // 	//TODO: koto gulo data ase seita count korar jonno...
// // 	res.send({ count, result })
// // })

// //!======END======>

//! < Start >  get ads ======>
app.get("/ad-center", async (req, res) => {
  const query = {};
  const result = await addedAdCollection.find(query).toArray();
  res.send(result);
});

//!======END======>

//! < Start >  get all user ======>
// app.get("/my-friends", async (req, res) => {
//   const query = {};
//   const result = await usersCollection.find(query).toArray();
//   res.send(result);
// });

//!======END======>

//! < Start >  get all user ======>
app.get("/all-users", async (req, res) => {
  const query = {};
  const result = await usersCollection.find(query).toArray();
  res.send(result);
});

//!======END======>

//! < Start >  get all users without current user ======>
app.get("/contact-friend/:email", async (req, res) => {
  const email = req.params.email;
  // console.log(email)
  const query = { email: { $ne: email } }; // find all users except current user
  const result = await usersCollection.find(query).toArray();
  res.send(result);
});

//!======END======>

//! < Start >  get last updated photos by specific email ======>
app.get("/photos/:email", async (req, res) => {
  const email = req.params.email;
  const query = { authorEmail: email, category: "photos" };

  //TODO: first query {authorEmail: email} is for finding user
  //TODO: And second query {category:"photos"} is for finding category

  const result = await allPostCollection.find(query).toArray();
  res.send(result);
});

//!======END======>

//! < Start >  get last updated status by specific email ======>
app.get("/status/:email", async (req, res) => {
  const email = req.params.email;
  const query = { authorEmail: email, category: "status" };

  //TODO: first query {authorEmail: email} is for finding user
  //TODO: And second query {category:"status"} is for finding category

  const result = await allPostCollection.find(query).toArray();
  res.send(result);
});

//!======END======>

//! < Start >  get last updated feelings by specific email ======>
app.get("/feelings/:email", async (req, res) => {
  const email = req.params.email;
  const query = { authorEmail: email, category: "feelings" };

  //TODO: first query {authorEmail: email} is for finding user
  //TODO: And second query {category:"feelings"} is for finding category

  const result = await allPostCollection.find(query).toArray();
  res.send(result);
});

//!======END======>

//!======START <- get user posted data  by user email ======>
app.get("/data/:email", async (req, res) => {
  const email = req.params.email;
  const data = { authorEmail: email };
  const result = await allPostCollection.find(data).toArray();
  res.send(result);
});

app.get("/like/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const result = await allPostCollection.findOne(filter);
  res.send(result);
});

app.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const result = await allPostCollection.findOne(filter);
  res.send(result);
});

// !======START <- get message For sender email ======>
app.get("/chat/receiverEmail/:email", async (req, res) => {
  const receiver = req.params.email;
  // console.log('receiver',req.params)
  const user = { receiverEmail: receiver };

  app.get("/chat/senderEmail/:email", async (req, res) => {
    const sender = req.params.email;
    // console.log('sender',req.params)
    const user = { senderEmail: sender };
  });

  if (" sender && receiver") {
    const result = await (
      await addedChatCollection.find(user).toArray()
    ).reverse();
    res.send(result);
    // console.log('msg',result)
  } else {
    res.status(400).json({ errors: [{ msg: "message not available" }] });
  }
});

// !============>

//!======START <- get message For receiver email ======>
app.get("/chatCome/receiverEmail/:email", async (req, res) => {
  const sender = req.params.email;
  console.log("senderCome", req.params);
  const user = { senderEmail: sender };

  app.get("/chatCome/senderEmail/:email", async (req, res) => {
    const receiver = req.params.email;
    console.log("receiverCome", req.params);
    const user = { receiverEmail: receiver };
  });

  if ("receiver && sender") {
    const result = await (
      await addedChatCollection.find(user).toArray()
    ).reverse();
    res.send(result);
    console.log("msgCome", result);
  } else {
    res.status(400).json({ errors: [{ msg: "message not available" }] });
  }
});

// !======END======>

//!======START <- get user for AuthContext by user email ======>
app.get("/dynamic/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const result = await usersCollection.findOne(user);
  res.send(result);
});

// !======END======>

//!======START <- get Dynamic-Friend-Request-List by user email ======>
app.get("/Dynamic-Friend-Request-List/:email", async (req, res) => {
  const email = req.params.email;
  // console.log(email)
  const user = { frndRqstReceiverEmail: email };
  const result = await friendRequestCollection.find(user).toArray();
  res.send(result);
});

// !======END======>

//!======START <- get Dynamic-Friend-List  by user email ======>
app.get("/Dynamic-Friend-List/:email", async (req, res) => {
  const email = req.params.email;
  const user = { frndRqstReceiverEmail: email };
  // console.log(user)
  const result = await friendListCollection.find(user).toArray();
  res.send(result);
});

// !======END======>

//!======START <- get user for AuthContext by user email ======>
app.get("/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const result = await usersCollection.findOne(user);
  res.send(result);
});

// !======END======>

//!FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:
//todo = = = = = = ALL post APIs = = = = = = = = = = =

//! < Start >  add a new user ======>
app.post("/users", async (req, res) => {
  const user = req.body;
  console.log(user)
  const email = user.email;
  const filter = await usersCollection.findOne({ email: email });
  if (filter === null) {
    const result = await usersCollection.insertOne(user);
    res.send(result);
  } else {
    res.status(400).json({ errors: [{ msg: "User already exists" }] });
  }

  //TODO: Jodi user already data base a store thake taholy 400 message ta dekhabe.... R jodi user already data base a store na thake taholy data ta insert hobe.
});

//!======END======>

//! < Start >  add a new status ======>
app.post("/status", async (req, res) => {
  const status = req.body;
  const result = await allPostCollection.insertOne(status);
  res.send(result);
});

//!======END======>

//! < Start >  add a new message ======>
app.post("/api/messages", async (req, res) => {
  const message = req.body;
  const result = await addedChatCollection.insertOne(message);
  res.send(result);
});

//!======END======>

//! < Start >  add a new status ======>
app.post("/reels", async (req, res) => {
  const reel = req.body;
  const result = await allPostCollection.insertOne(reel);
  res.send(result);
});

//!======END======>

//! < Start >  add a new status ======>
app.post("/message", async (req, res) => {
  const message = req.body;
  const result = await addedChatCollection.insertOne(message);
  res.send(result);
});

//!======END======>

//! < Start >  send friend-request ======>
app.post("/friend-request", async (req, res) => {
  const send = req.body;
  const result = await friendRequestCollection.insertOne(send);
  res.send(result);
});

//!======END======>

//! < Start >  send friend-request-accept ======>
app.post("/friend-request-accept", async (req, res) => {
  const send = req.body;
  const result = await friendListCollection.insertOne(send);
  res.send(result);
});

//!======END======>

//! < Start >  add a new Advertise ======>
app.post("/ad-center", async (req, res) => {
  const query = req.body;
  const result = await addedAdCollection.insertOne(query);
  res.send(result);
});

//!======END======>

//!FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:
//todo = = = = = = ALL Update APIs = = = = = = = = =

//! update an user friend-request by using it's email

app.put("/update-friend-request/:email", async (req, res) => {
  const email = req.params.email;
  // console.log(email)
  const user = { email: email };
  const data = req.body;
  const option = { upsert: true };
  const updatedData = {
    $set: {
      friendRequestedBy: data.friendRequestedBy,
    },
  };
  const result = await usersCollection.updateOne(user, updatedData, option);

  res.send(result);
  console.log(result);
});

//! update an like by clicking home page like button using it's ID

app.put("/like/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const data = req.body;
  // console.log('filter', filter);
  const option = { upsert: true };
  const updatedData = {
    $set: {
      likerName: data.likerName,
      likerEmail: data.likerEmail,
      LikerImage: data.LikerImage,
      likes: data.likes,
    },
  };
  const result = await allPostCollection.updateOne(filter, updatedData, option);
  // console.log(result);
  res.send(result);
});

app.put("/unlike/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const data = req.body;
  // console.log('filter', filter);
  const option = { upsert: true };
  const updatedData = {
    $set: {
      likerName: data.likerName,
      likerEmail: data.likerEmail,
      LikerImage: data.LikerImage,
      likes: data.likes,
    },
  };
  const result = await allPostCollection.updateOne(filter, updatedData, option);
  // console.log(result);
  res.send(result);
});

//! update an post by clicking profile page update button using it's ID

app.put("/description/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const data = req.body;
  const option = { upsert: true };
  const updatedData = {
    $set: {
      updaterName: data.updaterName,
      updaterImage: data.updaterImage,
      updaterEmail: data.updaterEmail,
      description: data.description,
    },
  };
  const result = await allPostCollection.updateOne(filter, updatedData, option);

  res.send(result);
});

//! update an post by clicking profile page update button using it's ID

app.put("/update-cover-photo/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const data = req.body;
  const option = { upsert: true };
  const updatedData = {
    $set: {
      updaterName: data.updaterName,
      updaterImage: data.updaterImage,
      updaterEmail: data.updaterEmail,
      coverPhoto: data.coverPhoto,
    },
  };
  const result = await usersCollection.updateOne(user, updatedData, option);

  res.send(result);
});

//! Update User Social Medial in profile page using it's ID

app.put("/update-social-media/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const data = req.body;
  const option = { upsert: true };
  const updatedData = {
    $set: {
      facebookURL: data.facebookURL,
      githubURL: data.githubURL,
      linkedinURL: data.linkedinURL,
      twitterURL: data.twitterURL,
    },
  };
  const result = await usersCollection.updateOne(user, updatedData, option);

  res.send(result);
});

//! update an post by clicking profile page update button using it's ID

app.put("/update-intro/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const data = req.body;
  const option = { upsert: true };
  const updatedData = {
    $set: {
      updaterName: data.updaterName,
      updaterImage: data.updaterImage,
      updaterEmail: data.updaterEmail,
      intro: data.intro,
    },
  };
  const result = await usersCollection.updateOne(user, updatedData, option);

  res.send(result);
});

//! update User profile photo in profile page  using user email

app.put("/update-profile/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const data = req.body;
  // console.log('first')
  const option = { upsert: true };
  const updatedData = {
    $set: {
      image: data.image,
    },
  };
  const result = await usersCollection.updateOne(user, updatedData, option);

  res.send(result);
});

//! update User profile photo in every post  using user email

app.put("/update-authorProfile/:email", async (req, res) => {
  const email = req.params.email;
  const user = { authorEmail: email };
  const data = req.body;

  const option = { upsert: true };
  const updatedData = {
    $set: {
      authorImage: data.image,
    },
  };
  const result = await allPostCollection.updateMany(user, updatedData, option);

  res.send(result);
  // console.log(result)
});

//! update User name in profile page  using user email

app.put("/update-name/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const data = req.body;
  const option = { upsert: true };
  const updatedData = {
    $set: {
      name: data.name,
    },
  };
  const result = await usersCollection.updateOne(user, updatedData, option);
  // console.log(result)
  res.send(result);
});

//! update author name in every post  using user email

app.put("/update-authorName/:email", async (req, res) => {
  const email = req.params.email;
  const user = { authorEmail: email };
  const data = req.body;

  const option = { upsert: true };
  const updatedData = {
    $set: {
      authorName: data.authorName,
    },
  };
  const result = await allPostCollection.updateMany(user, updatedData, option);

  res.send(result);
  console.log(result);
});

//! update User email in profile page  using user email

app.put("/update-email/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const data = req.body;
  const option = { upsert: true };
  const updatedData = {
    $set: {
      email: data.email,
    },
  };
  const result = await usersCollection.updateOne(user, updatedData, option);
  console.log(result);
  res.send(result);
});

//! update User phone number in profile page  using user email

app.put("/update-phoneNumber/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const data = req.body;
  const option = { upsert: true };
  const updatedData = {
    $set: {
      phoneNumber: data.phoneNumber,
    },
  };
  const result = await usersCollection.updateOne(user, updatedData, option);

  res.send(result);
});

//!FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:
//todo = = = = = = ALL Delete APIs = = = = = = = = = = =

//! < Start >  Delete status by its ID ======>
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await allPostCollection.deleteOne(query);
  res.send(result);
});

//!======END======>

//! < Start >  Delete friend request by its ID ======>
app.delete("/post/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await friendRequestCollection.deleteOne(query);
  res.send(result);
});

//!======END======>

//!^ ===================< THE END >===================
//!&& ===================< *** *** >===================

app.get("/", (req, res) => {
  res.send("Thrill Server is running");
});

// app.get("/", (req, res) => {
//   res.send("Study Zone Server Is Running");
// });

// app.listen(port, () => {
//   console.log(`Study Zone Server Is Running on port ${port}`);
// });

app.listen(port, () => {
  console.log(`Thrill Server is running on port ${port}`);
});




