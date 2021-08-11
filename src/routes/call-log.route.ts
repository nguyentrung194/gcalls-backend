import { Router } from 'express';
import CallLogsController from '@controllers/call-log.controller';
import { EditCallLogDto } from '@dtos/callLogs.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class CallLogRoute implements Routes {
  public path = '/call-logs';
  public router = Router();
  public callLogsController = new CallLogsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.callLogsController.getCallLogs);
    this.router.get(`${this.path}/:id`, this.callLogsController.getCallLogById);
    this.router.get(`${this.path}/:duration`, this.callLogsController.getCallLogByDuration);
    this.router.post(`${this.path}/:isone`, this.callLogsController.createCallLog);
    this.router.put(`${this.path}/:id`, validationMiddleware(EditCallLogDto, 'body', true), this.callLogsController.updateCallLogById);
    this.router.put(`${this.path}/:query`, validationMiddleware(EditCallLogDto, 'body', true), this.callLogsController.updateCallLogs);
    this.router.delete(`${this.path}/:id`, this.callLogsController.deleteCallLogById);
    this.router.delete(`${this.path}/:query`, this.callLogsController.deleteCallLogs);
  }
}

export default CallLogRoute;
