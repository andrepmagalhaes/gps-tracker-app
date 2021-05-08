"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("./interfaces/controllers");
var AppRouter = /** @class */ (function () {
    function AppRouter(routes) {
        this.router = express_1.Router();
        this.initRoutes(routes);
    }
    AppRouter.prototype.getRouter = function () {
        return this.router;
    };
    AppRouter.prototype.initRoutes = function (routes) {
        var _this = this;
        routes.forEach(function (routes) {
            routes.forEach(function (route) {
                switch (route.type) {
                    case controllers_1.methods.GET:
                        {
                            _this.router.get(route.path, route.controller);
                            break;
                        }
                    case controllers_1.methods.POST:
                        {
                            _this.router.post(route.path, route.controller);
                            break;
                        }
                    case controllers_1.methods.PUT:
                        {
                            _this.router.put(route.path, route.controller);
                            break;
                        }
                    case controllers_1.methods.DELETE:
                        {
                            _this.router.delete(route.path, route.controller);
                            break;
                        }
                    default:
                        {
                            break;
                        }
                }
            });
        });
    };
    return AppRouter;
}());
exports.default = AppRouter;
