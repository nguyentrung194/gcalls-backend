import { Router } from 'express';
import CallLogsController from '@controllers/call-log.controller';
import { CreateCallLogDto } from '@dtos/callLogs.dto';
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
    this.router.post(`${this.path}`, validationMiddleware(CreateCallLogDto, 'body'), this.callLogsController.createCallLog);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateCallLogDto, 'body', true), this.callLogsController.updateCallLog);
    this.router.delete(`${this.path}/:id`, this.callLogsController.deleteCallLog);
  }
}

export default CallLogRoute;
