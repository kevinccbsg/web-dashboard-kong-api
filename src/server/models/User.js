import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  grade: String,
  faculty: String,
  roles: [{
    name: String,
    description: String,
  }],
  permissions: [{
    name: String,
    description: String,
  }],
}, { versionKey: false, collection: 'users' });

const User = mongoose.model('User', userSchema);

export default User;
