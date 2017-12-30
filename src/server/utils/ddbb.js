import mongoose from 'mongoose';

const connect = uri => (
  new Promise((resolve, reject) => {
    mongoose.connect(uri);
    const db = mongoose.connection;
    db.on('error', err => reject(err));
    db.once('open', () => resolve());
  })
);

export default connect;
