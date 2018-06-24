"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var item_controller_1 = require("./item.controller");
var passport = require("passport");
var Passport = require('../../config/passport')(passport);
var ItemRouter = /** @class */ (function () {
    /*--------  Constructor  --------*/
    function ItemRouter() {
        // 
        // Set router
        this.router = express_1.Router();
        this.init();
    }
    /*--------  Methods  --------*/
    /**
     * Init all routes in this router
     */
    ItemRouter.prototype.init = function () {
        this.router.put('/:_id', item_controller_1.default.updateItem);
        this.router.get('/', item_controller_1.default.getAll);
        this.router.get('/:_id', item_controller_1.default.getItem);
        this.router.post('/', item_controller_1.default.createItem);
        this.router.delete('/:_id', item_controller_1.default.deleteItem);
    };
    return ItemRouter;
}());
exports.ItemRouter = ItemRouter;
// 
// Create Router and export its configured Express.Router
// new UserRouter().init();
exports.default = new ItemRouter().router;
//# sourceMappingURL=item.router.js.map