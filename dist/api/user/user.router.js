"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("./user.controller");
var UserRouter = /** @class */ (function () {
    /*--------  Constructor  --------*/
    function UserRouter() {
        // 
        // Set router
        this.router = express_1.Router();
        this.init();
    }
    /*--------  Methods  --------*/
    /**
     * Init all routes in this router
     */
    UserRouter.prototype.init = function () {
        this.router.put('/:username', user_controller_1.default.update);
        this.router.get('/', user_controller_1.default.getAll);
        this.router.get('/:username', user_controller_1.default.getUser);
        this.router.post('/', user_controller_1.default.create);
        this.router.post('/authenticate', user_controller_1.default.authenticate);
    };
    return UserRouter;
}());
exports.UserRouter = UserRouter;
// 
// Create Router and export its configured Express.Router
// new UserRouter().init();
exports.default = new UserRouter().router;
//# sourceMappingURL=user.router.js.map