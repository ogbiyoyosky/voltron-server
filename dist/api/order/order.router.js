"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var order_controller_1 = require("./order.controller");
var OrderRouter = /** @class */ (function () {
    /*--------  Constructor  --------*/
    function OrderRouter() {
        // 
        // Set router
        this.router = express_1.Router();
        this.init();
    }
    /*--------  Methods  --------*/
    /**
     * Init all routes in this router
     */
    OrderRouter.prototype.init = function () {
        this.router.put('/:_id', order_controller_1.default.updateOrder);
        this.router.get('/', order_controller_1.default.getAll);
        this.router.get('/:_id', order_controller_1.default.getOrder);
        this.router.post('/', order_controller_1.default.createOrder);
        this.router.delete('/:_id', order_controller_1.default.deleteOrder);
    };
    return OrderRouter;
}());
exports.OrderRouter = OrderRouter;
// 
// Create Router and export its configured Express.Router
// new UserRouter().init();
exports.default = new OrderRouter().router;
//# sourceMappingURL=order.router.js.map