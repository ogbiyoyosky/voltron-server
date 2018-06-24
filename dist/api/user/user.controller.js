"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = require("./user.model");
var isEmail = require("validator/lib/isEmail");
var jwt = require("jwt-simple");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    /**
     * Get all
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    UserController.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result, status_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, user_model_1.default.find().exec()];
                    case 1:
                        result = _a.sent();
                        status_1 = res.statusCode;
                        // 
                        // Response
                        res.send({
                            message: 'it works! We got all users',
                            result: result,
                            status: status_1
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        // 
                        // Error response
                        res.send({
                            message: 'Could not get Users',
                            err: err_1
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * getUser
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    UserController.getUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var username, result, status_2, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        username = req.params.username;
                        return [4 /*yield*/, user_model_1.default.findOne({ username: username }).exec()];
                    case 1:
                        result = _a.sent();
                        status_2 = res.statusCode;
                        // 
                        // Response
                        res.send({
                            message: 'Successfull got a user',
                            result: result,
                            status: status_2
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        // 
                        // Error response
                        res.send({
                            message: 'Could not get Examples',
                            err: err_2
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
   * Create an objet with user data to encode in the jwt token.
   * @param {IUser} user The user
   */
    UserController.userDataToPassInToken = function (user) {
        return {
            _id: user._id,
            email: user.email
        };
    };
    /**
     * Create
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    /** Create an user. */
    UserController.create = function (req, res, next) {
        // The attributes.
        var email = req.body.email;
        var password = req.body.password;
        var username = req.body.username;
        var name = req.body.name;
        console.log(email);
        // The errors object
        var errors = [];
        // Check email
        if (!email) {
            errors.push({
                title: "Attribute is missing",
                detail: "No email specified"
            });
        }
        else {
            // If email has not email format
            if (!isEmail(email)) {
                errors.push({
                    title: "Invalide attribute",
                    detail: "Email must have an email format"
                });
            }
            // If email doesn't have characters length requirments
            if (email.length < 5) {
                errors.push({
                    title: "Invalid attribute",
                    detail: "Email must contain at least five characters"
                });
            }
        }
        // Check password
        if (!password) {
            errors.push({
                title: "Attribute is missing",
                detail: "No password specified"
            });
        }
        else {
            if (password.length < 6) {
                errors.push({
                    title: "Invalid attribute",
                    detail: "Password must contain at least 6 characters"
                });
            }
        }
        // If a least one error
        if (errors.length > 0) {
            res.status(403).send({
                errors: errors
            });
        }
        else {
            user_model_1.default.create({ email: email, password: password, username: username, name: name })
                .then(function (user) {
                res.status(201).send({
                    data: {
                        type: "user",
                        user: user,
                        id: user._id,
                        token: "JWT " + jwt.encode(UserController.userDataToPassInToken(user), process.env.SECRET, "HS256", ""),
                        message: "Account successfully created"
                    }
                });
            })
                .catch(function (err) {
                res.status(400).send({
                    errors: [{
                            title: "Can't create the user",
                            detail: err.message
                        }]
                });
            });
        }
    };
    UserController.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var username, username_1, result, status_3, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = req.params;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        username_1 = req.params.username;
                        return [4 /*yield*/, user_model_1.default.findOneAndUpdate({ username: username_1 }, __assign({}, req.body, { updatedAt: new Date() })).exec()];
                    case 2:
                        result = _a.sent();
                        status_3 = res.statusCode;
                        // 
                        // Response
                        res.send({
                            message: 'Sucessfully updated a user',
                            result: result,
                            status: status_3
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        // 
                        // Error response
                        res.send({
                            message: 'Could not create the user',
                            err: err_3
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.authenticate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, errors;
            return __generator(this, function (_a) {
                email = req.body.email;
                password = req.body.password;
                errors = [];
                // Check email
                if (!email) {
                    errors.push({
                        title: "Attribute is missing",
                        detail: "No email specified"
                    });
                }
                else {
                    // If email has not email format
                    if (!isEmail(email)) {
                        errors.push({
                            title: "Invalide attribute",
                            detail: "Email must have an email format"
                        });
                    }
                    // If email doesn't have characters length requirments
                    if (email.length < 5) {
                        errors.push({
                            title: "Invalid attribute",
                            detail: "Email must contain at least five characters"
                        });
                    }
                }
                // Check password
                if (!password) {
                    errors.push({
                        title: "Attribute is missing",
                        detail: "No password specified"
                    });
                }
                else {
                    if (password.length < 6) {
                        errors.push({
                            title: "Invalid attribute",
                            detail: "Password must contain at least 6 characters"
                        });
                    }
                }
                // If a least one error
                if (errors.length > 0) {
                    res.status(403).send({
                        errors: errors
                    });
                }
                else {
                    user_model_1.default.findOne({ email: email }).then(function (user) {
                        if (user) {
                            user.comparePassword(password, function (err, isMatch) {
                                if (err) {
                                    errors.push({
                                        title: "Can't login user",
                                        detail: "Error comparing the password"
                                    });
                                }
                                if (!isMatch) {
                                    errors.push({
                                        title: "Can't login user",
                                        detail: "The password doesn't match"
                                    });
                                }
                                if (errors.length > 0) {
                                    res.status(400).send({
                                        errors: errors
                                    });
                                }
                                else {
                                    res.status(201).send({
                                        data: {
                                            type: "users",
                                            id: user._id,
                                            user: user,
                                            token: "JWT " + jwt.encode(UserController.userDataToPassInToken(user), process.env.SECRET, "HS256", "")
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            res.status(400).send({
                                errors: [{
                                        title: "Invalid attribute",
                                        detail: "The email does not exist"
                                    }]
                            });
                        }
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map