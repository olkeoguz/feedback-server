const Feedback = require('../models/mongoose/feedback');
const Userkey = require('../models/mongoose/userkey');
const path = require("path")

exports.getFeedbacks = async (req, res, next) => {
  console.log('foo')
  const username = req.query.userkey;

  const user = await Userkey.findOne({userKey: username });

  if(!user){
    res.status(401).json({message:"User not found."})
    return
  }

  const feedbacks = await Feedback.find({userKey:user._id})

  res.json({feedbacks: feedbacks})
};

exports.postFeedback = async (req, res, next) => {

  if(!req.body.userkey){
    res.status(401).json({message:"Please enter a userkey"})
    return
  }

  const userkeyInfo = await Userkey.findOne({ userKey: req.body.userkey });
  console.log('isUserExist :>> ', userkeyInfo);
  let userkeyId = null;
  if (!userkeyInfo) {
    const createUserkey = await Userkey.bulkWrite([
      {
        insertOne: {
          document: { userKey: req.body.userkey },
        },
      },
    ]);

    userkeyId = createUserkey.result.insertedIds[0]._id;
    console.log('createdUserkey :>> ', createUserkey, createUserkey.result.insertedIds[0]._id);
  }
  else{
    userkeyId = userkeyInfo._id
  }

  await Feedback.bulkWrite([
    {
      insertOne: {
        document: { content: req.body.content,userKey:userkeyId },
      },
    },
  ]);
  res.status(200).json({status:"ok",message:"Feedback saved."});
};

exports.retunrHtml = async (req,res) =>{
  res.sendFile(path.resolve('src/index.html'));
}

