import { Router, Request, Response, NextFunction } from 'express';
import UserController from './user.controller';

export class UserRouter {

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
        this.router.put('/:username', UserController.update);
        this.router.get('/', UserController.getAll);
        this.router.get('/:username', UserController.getUser);
        this.router.post('/', UserController.create);
        this.router.post('/authenticate', UserController.authenticate);
    }

}

// 
// Create Router and export its configured Express.Router
// new UserRouter().init();

export default new UserRouter().router;