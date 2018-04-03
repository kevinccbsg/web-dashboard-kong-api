import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const calendarDateSchema = new Schema({
  application: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  selectedDate: {
    type: Date,
    required: true,
  },
}, { versionKey: false, collection: 'calendar_dates' });

const CalendarDate = mongoose.model('CalendarDates', calendarDateSchema);

export default CalendarDate;
