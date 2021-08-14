import { model, Schema, Document } from 'mongoose';
import { CallLog } from '@interfaces/call-log.interface';

const callLogSchema: Schema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  originator: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  from: {
    type: String,
    required: true,
  },
});

const callLogModel = model<CallLog & Document>('CallLog', callLogSchema);

export default callLogModel;
