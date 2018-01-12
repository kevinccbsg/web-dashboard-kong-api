import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const permissionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  redirect_uri: String,
}, { versionKey: false, collection: 'permissions' });

const Permission = mongoose.model('Api', permissionSchema);

export default Permission;
