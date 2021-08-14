import { NextFunction, Request, Response } from 'express';
import { CreateCallLogDto, EditCallLogDto } from '@dtos/callLogs.dto';
import { CallLog } from '@interfaces/call-log.interface';
import callLogService from '@services/call-log.service';
import { UpdateWriteOpResult } from 'mongoose';
import { isEmpty } from '@/utils/util';

class CallLogsController {
  public callLogService = new callLogService();

  public getCallLogs = async (req: Request, res: Response, next: NextFunction) => {
    if (!isEmpty(req.query)) {
      try {
        const callLogParams = { ...req.query };
        const findOneCallLogData = await this.callLogService.findCallLogByQuery(callLogParams);
        res.status(200).json({ data: findOneCallLogData, message: 'findQuery' });
      } catch (error) {
        next(error);
      }
    } else {
      try {
        const findAllCallLogsData: CallLog[] = await this.callLogService.findAllCallLog();
        res.status(200).json({ data: findAllCallLogsData, message: 'findAll' });
      } catch (error) {
        next(error);
      }
    }
  };

  public getOneCallLog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const callLogParams = { ...req.query };
      const findOneCallLogData = await this.callLogService.findOneCallLogByQuery(callLogParams);
      res.status(200).json({ data: findOneCallLogData, message: 'findOne' });
    } catch (error) {
      console.log('error there');
      next(error);
    }
  };

  public createCallLog = async (req: Request, res: Response, next: NextFunction) => {
    const isOne = req.query.isOne;
    if (isOne) {
      try {
        const callLogData: CreateCallLogDto = req.body;
        const createCallLogData: CallLog = await this.callLogService.createCallLog(callLogData);

        res.status(201).json({ data: createCallLogData, message: 'created one' });
      } catch (error) {
        next(error);
      }
    } else {
      try {
        const callLogData: CreateCallLogDto[] = req.body;
        const createCallLogsData: CallLog[] = await this.callLogService.createCallLogs(callLogData);

        res.status(201).json({ data: createCallLogsData, message: 'created many' });
      } catch (error) {
        next(error);
      }
    }
  };

  public updateCallLog = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body._id;
    const callLogData: EditCallLogDto = req.body;
    if (!isEmpty(id)) {
      try {
        const updateCallLogData: CallLog = await this.callLogService.editCallLogById(id as string, callLogData);
        res.status(201).json({ data: updateCallLogData, message: 'updated one' });
      } catch (error) {
        next(error);
      }
    } else {
      try {
        const query = { ...req.query };
        const updateCallLogsData: UpdateWriteOpResult = await this.callLogService.editCallLogs(query, callLogData);
        res.status(201).json({ data: updateCallLogsData, message: 'updated many' });
      } catch (error) {
        next(error);
      }
    }
  };

  public deleteCallLog = async (req: Request, res: Response, next: NextFunction) => {
    const callLogId = req.query._id;
    if (!isEmpty(callLogId)) {
      try {
        const deleteCallLogData: CallLog = await this.callLogService.deleteCallLogById(callLogId as string);
        res.status(200).json({ data: deleteCallLogData, message: 'deleted' });
      } catch (error) {
        next(error);
      }
    } else {
      try {
        const query = { ...req.query };
        const deleteCallLogsCount = await this.callLogService.deleteCallLogs(query);
        res.status(200).json({ data: deleteCallLogsCount, message: `deleted ${deleteCallLogsCount} records` });
      } catch (error) {
        next(error);
      }
    }
  };
}

export default CallLogsController;
