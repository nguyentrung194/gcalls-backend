import { NextFunction, Request, Response } from 'express';
import { CreateCallLogDto, EditCallLogDto } from '@dtos/callLogs.dto';
import { CallLog } from '@interfaces/call-log.interface';
import callLogService from '@services/call-log.service';
import { UpdateWriteOpResult } from 'mongoose';

class CallLogsController {
  public callLogService = new callLogService();

  public getCallLogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCallLogsData: CallLog[] = await this.callLogService.findAllCallLog();

      res.status(200).json({ data: findAllCallLogsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCallLogById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const callLogId: string = req.params.id;
      const findOneCallLogData: CallLog = await this.callLogService.findCallLogById(callLogId);
      res.status(200).json({ data: findOneCallLogData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getCallLogByDuration = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const duration = req.params.duration;
      const findCallLogData: CallLog[] = await this.callLogService.findCallLogByDuration(duration);
      res.status(200).json({ data: findCallLogData, message: 'findByDuration' });
    } catch (error) {
      next(error);
    }
  };

  public createCallLog = async (req: Request, res: Response, next: NextFunction) => {
    const isone = req.params.isone;
    if (isone) {
      try {
        const callLogData: CreateCallLogDto = req.body;
        const createCallLogData: CallLog = await this.callLogService.createCallLog(callLogData);

        res.status(201).json({ data: createCallLogData, message: 'created' });
      } catch (error) {
        next(error);
      }
    } else {
      try {
        const callLogData: CreateCallLogDto[] = req.body;
        const createCallLogsData: CallLog[] = await this.callLogService.createCallLogs(callLogData);

        res.status(201).json({ data: createCallLogsData, message: 'created' });
      } catch (error) {
        next(error);
      }
    }
  };

  public updateCallLogById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const callLogData: EditCallLogDto = req.body;
      const id = req.params.id;

      const updateCallLogData: CallLog = await this.callLogService.editCallLogById(id, callLogData);

      res.status(201).json({ data: updateCallLogData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public updateCallLogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const callLogData: EditCallLogDto = req.body;
      const query = req.params.query;
      const updateCallLogsData: UpdateWriteOpResult = await this.callLogService.editCallLogs(query, callLogData);

      res.status(201).json({ data: updateCallLogsData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCallLogById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const callLogId: string = req.params.id;
      const deleteCallLogData: CallLog = await this.callLogService.deleteCallLogById(callLogId);

      res.status(200).json({ data: deleteCallLogData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCallLogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.params.query;
      const deleteCallLogsCount = await this.callLogService.deleteCallLogs(query);

      res.status(200).json({ data: deleteCallLogsCount, message: `deleted ${deleteCallLogsCount} records` });
    } catch (error) {
      next(error);
    }
  };
}

export default CallLogsController;
