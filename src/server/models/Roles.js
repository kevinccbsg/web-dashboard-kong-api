import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roleSchema = new Schema({
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
}, { versionKey: false, collection: 'roles' });

const Roles = mongoose.model('Roles', roleSchema);

export default Roles;
