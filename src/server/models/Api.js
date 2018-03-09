import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const apiSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  uris: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  manualReference: {
    type: String,
    required: true,
  },
  createdUser: String,
  modifiedUser: String,
  modifiedDate: { type: Date, default: Date.now },
  createdDate: { type: Date, default: Date.now },
  strip_uri: Boolean,
  preserve_host: Boolean,
  global_credentials: Boolean,
  upstream_url: {
    type: String,
    required: true,
  },
}, { versionKey: false, collection: 'apis' });

const Api = mongoose.model('Apis', apiSchema);

export default Api;
