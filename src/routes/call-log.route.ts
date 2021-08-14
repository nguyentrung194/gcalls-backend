import { Router } from 'express';
import CallLogsController from '@controllers/call-log.controller';
import { Routes } from '@interfaces/routes.interface';

class CallLogRoute implements Routes {
  public path = '/call-logs';
  public router = Router();
  public callLogsController = new CallLogsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.callLogsController.getCallLogs);
    this.router.get(`${this.path}/one`, this.callLogsController.getOneCallLog);
    this.router.post(`${this.path}`, this.callLogsController.createCallLog);
    this.router.put(`${this.path}`, this.callLogsController.updateCallLog);
    this.router.delete(`${this.path}`, this.callLogsController.deleteCallLog);
  }
}

export default CallLogRoute;
