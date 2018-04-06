import { Express, Router, Request, Response, NextFunction } from 'express';
import UserRouter from '../api/user/user.router';
import ItemRouter from '../api/item/item.router';
import OrderRouter from '../api/order/order.router';

export default class Route {
    public router: Router;
    private app;

    constructor (app: Express) {
        // Set router
        this.router = Router();

        // 
        // Set app
        this.app = app;

        // 
        // Set all routes

        this.setAllRoutes();
    }

    private setAllRoutes() {
        this.app.use('/api/users', UserRouter);
        this.app.use('/api/items', ItemRouter);
        this.app.use('/api/orders', OrderRouter);
    }

}
