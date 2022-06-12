const Feedback = require('../models/mongoose/feedback');
const Userkey = require('../models/mongoose/userkey');
const path = require("path")

exports.getFeedbacks = async (req, res) => {
  const username = req.query.userkey;

  const user = await Userkey.findOne({userKey: username });

  if(!user){
    res.status(404).json({message:"User not found."})
    return
  }

  const feedbacks = await Feedback.find({userKey:user._id})

  res.json({feedbacks: feedbacks})
};

exports.postFeedback = async (req, res) => {

  const enteredUserKey = req.body.userkey;
  const enteredContent = req.body.content;

  if(!enteredUserKey){
    return res.status(401).json({message:"User key is required."})
  }

  if(!enteredContent){
    return res.status(401).json({message:"Content is required."})
  }

  if(enteredContent.length >2000) {
    return res.status(401).json({message:"Maximum length should be 2000."})
  }


  const savedUserKey = await Userkey.findOne({ userKey: enteredUserKey });
  let userkeyId = null;
  if (!savedUserKey) {
    const newUserKey = await Userkey.bulkWrite([
      {
        insertOne: {
          document: { userKey: enteredUserKey },
        },
      },
    ]);

    userkeyId = newUserKey.result.insertedIds[0]._id;
  }
  else{
    userkeyId = savedUserKey._id
  }

  await Feedback.bulkWrite([
    {
      insertOne: {
        document: { content: enteredContent,userKey:userkeyId },
      },
    },
  ]);
  res.status(200).json({status:"ok",message:"Feedback saved."});
};

exports.retunrHtml = async (req,res) =>{
  res.sendFile(path.resolve('src/index.html'));
}

