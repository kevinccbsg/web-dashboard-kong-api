import mongoose from 'mongoose';

const labSchema = mongoose.Schema({
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
  upstream_url: {
    type: String,
    required: true,
  },
}, { versionKey: false, collection: 'labs' });

const Lab = mongoose.model('Lab', labSchema);

export default Lab;
