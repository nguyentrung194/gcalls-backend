import { CreateCallLogDto } from '@dtos/callLogs.dto';
import { HttpException } from '@exceptions/HttpException';
import { CallLog } from '@interfaces/call-log.interface';
import callLogModel from '@models/call-log.model';
import { isEmpty } from '@utils/util';

class CallLogService {
  public callLogs = callLogModel;

  public async findAllCallLog(): Promise<CallLog[]> {
    const callLogs: CallLog[] = await this.callLogs.find();
    return callLogs;
  }

  public async findCallLogById(callLogId: string): Promise<CallLog> {
    if (isEmpty(callLogId)) throw new HttpException(400, "Don't got callLogId");

    const findCallLog: CallLog = await this.callLogs.findOne({ _id: callLogId });
    if (!findCallLog) throw new HttpException(409, "Can't find callLogId match any record!");

    return findCallLog;
  }

  public async createCallLog(callLogData: CreateCallLogDto): Promise<CallLog> {
    if (isEmpty(callLogData)) throw new HttpException(400, "You're not callLogData");
    const createCallLogData: CallLog = await this.callLogs.create(callLogData);

    return createCallLogData;
  }

  public async deleteCallLog(callLogId: string): Promise<CallLog> {
    const deleteCallLogById: CallLog = await this.callLogs.findByIdAndDelete(callLogId);
    if (!deleteCallLogById) throw new HttpException(409, "It's not callLog");

    return deleteCallLogById;
  }
}

export default CallLogService;
