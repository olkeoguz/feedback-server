const path = require('path');

exports.indexPage = async (req, res, next) => {
   res.sendFile(path.join(__dirname, '../src', 'index.html'));
};
