import { Request, Response, NextFunction } from 'express';
import OrderModel from './order.model';
import UserModel from '../user/user.model';

export default class UserController {

    /**
     * Get all
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    public static async getAll(req: Request, res: Response, next: NextFunction) {

        try {

            // 
            // Get data
            let results = await OrderModel.find().exec();
            const status = res.statusCode;

            // 
            // Response
            res.send({
                results,
                status
            });
        } catch (err) {

            // 
            // Error response
            res.send({
                message: 'Could not get orders',
                err: err
            });
        }
    }

    /**
     * getUser
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */

    public static async getOrder(req: Request, res: Response, next: NextFunction) {

        try {

            // 
            // Get data
            const _id: String = req.params.id;
            let result = await OrderModel.findOne({ _id }).exec();
            const status = res.statusCode;

            // 
            // Response
            res.send({
                message: 'Successfull got an item',
                result: result,
                status: status
            });
        } catch (err) {

            // 
            // Error response
            res.send({
                message: 'Could not get Examples',
                err: err
            });
        }
    }

    /**
     * Create
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    public static async createOrder(req: Request, res: Response, next: NextFunction) {
        
        let { user, items } = req.body;
        
        // Create model
        let orderModel = new OrderModel({
            user,
            items
        });
        // 
        // Save
        await orderModel.save();

        res.send({
            message: `Created order with the id: ${orderModel._id}`,
            model: orderModel
        });
    }

    public static async deleteOrder(req: Request, res: Response, next: NextFunction) {
        const _id:String = req.params;
        
        try {

            // 
            // Get data
            const username: String = req.params._id;
            let result = await OrderModel.findOneAndRemove({ _id }, {
                ...req.body,
                deletedAt: new Date()
            }).exec();
            const status = res.statusCode;

            // 
            // Response
            res.send({
                message: 'Sucessfully deleted item',
                result: result,
                status: status
            });
        } catch (err) {

            // 
            // Error response
            res.send({
                message: 'Could not delete th item',
                err: err
            });
        }
    }

    public static async updateOrder(req: Request, res: Response, next: NextFunction) {
        const _id:String = req.params;
        
        try {

            // 
            // Get data
            const username: String = req.params._id;
            let result = await OrderModel.findOneAndUpdate({ _id }, {
                ...req.body,
                updatedAt: new Date()
            }).exec();
            const status = res.statusCode;

            // 
            // Response
            res.send({
                message: 'Sucessfully updated item',
                result: result,
                status: status
            });
        } catch (err) {

            // 
            // Error response
            res.send({
                message: 'Could not create the item',
                err: err
            });
        }
    }
}