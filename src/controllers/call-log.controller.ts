import { NextFunction, Request, Response } from 'express';
import { CreateCallLogDto } from '@dtos/callLogs.dto';
import { CallLog } from '@interfaces/call-log.interface';
import callLogService from '@services/call-log.service';

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
      const findOneUserData: CallLog = await this.callLogService.findCallLogById(callLogId);
      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCallLog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const callLogData: CreateCallLogDto = req.body;
      const createUserData: CallLog = await this.callLogService.createCallLog(callLogData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCallLog = async (req: Request, res: Response) => {
    res.status(409).json({ data: 'null', message: 'Unaccept update callLog' });
  };

  public deleteCallLog = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const callLogId: string = req.params.id;
      const deleteCallLogData: CallLog = await this.callLogService.deleteCallLog(callLogId);

      res.status(200).json({ data: deleteCallLogData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CallLogsController;
