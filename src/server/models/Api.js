import mongoose from 'mongoose';

const apiSchema = mongoose.Schema({
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
  strip_uri: Boolean,
  preserve_host: Boolean,
  global_credentials: Boolean,
  upstream_url: {
    type: String,
    required: true,
  },
}, { versionKey: false, collection: 'apis' });

const Api = mongoose.model('Api', apiSchema);

export default Api;
