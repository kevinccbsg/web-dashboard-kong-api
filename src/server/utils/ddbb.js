import mongoose from 'mongoose';

// Set mongoose.Promise to any Promise implementation
mongoose.Promise = Promise;

const connect = uri => (
  new Promise((resolve, reject) => {
    mongoose.connect(uri);
    const db = mongoose.connection;
    db.on('error', err => reject(err));
    db.once('open', () => resolve());
  })
);

export default connect;
