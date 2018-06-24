import { Router, Request, Response, NextFunction } from 'express';
import ItemController from './item.controller';
import * as passport from 'passport';
let Passport = require('../../config/passport')(passport);

export class ItemRouter {

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
        this.router.put('/:_id', ItemController.updateItem);
        this.router.get('/', ItemController.getAll);
        this.router.get('/:_id', ItemController.getItem);
        this.router.post('/', ItemController.createItem);
        this.router.delete('/:_id', ItemController.deleteItem);
    }

}

// 
// Create Router and export its configured Express.Router
// new UserRouter().init();

export default new ItemRouter().router;