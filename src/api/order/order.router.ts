import { Router, Request, Response, NextFunction } from 'express';
import OrderController from './order.controller';

export class OrderRouter {

    public router: Router


    /*--------  Constructor  --------*/


    constructor() {

        // 
        // Set router
        this.router = Router();
        this.init();
    }


    /*--------  Methods  --------*/


    /**
     * Init all routes in this router
     */
    init () {
        this.router.put('/:_id', OrderController.updateOrder);
        this.router.get('/', OrderController.getAll);
        this.router.get('/:_id', OrderController.getOrder);
        this.router.post('/', OrderController.createOrder);
        this.router.delete('/:_id', OrderController.deleteOrder);
    }

}

// 
// Create Router and export its configured Express.Router
// new UserRouter().init();

export default new OrderRouter().router;