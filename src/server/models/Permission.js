import mongoose from 'mongoose';

const permissionSchema = mongoose.Schema({
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
