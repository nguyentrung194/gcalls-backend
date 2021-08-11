import { CreateCallLogDto, EditCallLogDto } from '@dtos/callLogs.dto';
import { HttpException } from '@exceptions/HttpException';
import { CallLog } from '@interfaces/call-log.interface';
import callLogModel from '@models/call-log.model';
import { isEmpty } from '@utils/util';
import { UpdateWriteOpResult } from 'mongoose';

class CallLogService {
  public callLogs = callLogModel;

  public async findAllCallLog(): Promise<CallLog[]> {
    const callLogs: CallLog[] = await this.callLogs.find();
    return callLogs;
  }

  public async findCallLogById(callLogId: string): Promise<CallLog> {
    if (isEmpty(callLogId)) throw new HttpException(400, 'id is empty');

    const findCallLog: CallLog = await this.callLogs.findOne({ _id: callLogId });
    if (!findCallLog) throw new HttpException(409, 'Not found');

    return findCallLog;
  }

  public async findCallLogByDuration(duration: string): Promise<CallLog[]> {
    if (isEmpty(duration)) throw new HttpException(400, 'duration is empty');
    const value = parseInt(duration);
    const findCallLogs: CallLog[] = await this.callLogs.find({ duration: value });
    if (!findCallLogs.length) throw new HttpException(409, 'Not found');

    return findCallLogs;
  }

  public async createCallLog(callLogData: CreateCallLogDto): Promise<CallLog> {
    if (isEmpty(callLogData)) throw new HttpException(400, 'input is invalid');
    const createCallLogData: CallLog = await this.callLogs.create(callLogData);

    return createCallLogData;
  }

  public async createCallLogs(callLogDatas: CreateCallLogDto[]): Promise<CallLog[]> {
    if (isEmpty(callLogDatas)) throw new HttpException(400, 'input is invalid');
    const createCallLogsData: CallLog[] = await this.callLogs.insertMany(callLogDatas);

    return createCallLogsData;
  }

  public async editCallLogById(id: string, callLogData: EditCallLogDto): Promise<CallLog> {
    if (isEmpty(callLogData)) throw new HttpException(400, 'input is invalid');
    const editCallLogById: CallLog = await this.callLogs.findByIdAndUpdate(id, { ...callLogData });
    if (!editCallLogById) throw new HttpException(409, 'callLog not found');
    return editCallLogById;
  }

  public async editCallLogs(query: string, callLogData: EditCallLogDto): Promise<UpdateWriteOpResult> {
    if (isEmpty(callLogData) || isEmpty(query)) throw new HttpException(400, 'Invalid');
    const editCallLogs: UpdateWriteOpResult = await this.callLogs.updateMany(JSON.parse(query), { ...callLogData });
    if (!editCallLogs.upserted) throw new HttpException(409, 'Not matches');
    return editCallLogs;
  }

  public async deleteCallLogById(callLogId: string): Promise<CallLog> {
    const deleteCallLogById: CallLog = await this.callLogs.findByIdAndDelete(callLogId);
    if (!deleteCallLogById) throw new HttpException(409, 'Not found id');

    return deleteCallLogById;
  }

  public async deleteCallLogs(query: string): Promise<number> {
    const deleteCallLogs = await this.callLogs.deleteMany(JSON.parse(query));
    if (!deleteCallLogs.deletedCount) throw new HttpException(409, 'not found any records matches');

    return deleteCallLogs.deletedCount;
  }
}

export default CallLogService;
