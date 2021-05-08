"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controllers_1 = require("../interfaces/controllers");
var bcrypt_1 = __importDefault(require("bcrypt"));
var firebaseConfig_1 = __importDefault(require("../firebaseConfig"));
var firebase_1 = __importDefault(require("firebase"));
var db = firebaseConfig_1.default.firestore();
var arduinoRoutes = [
    {
        path: "/postData",
        controller: function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                var arduinoData, dbCollection;
                return __generator(this, function (_a) {
                    arduinoData = __assign({}, req.body);
                    dbCollection = db.collection("bus_" + arduinoData.ID);
                    dbCollection.doc("settings").get().then(function (snapshot) {
                        var data = __assign({}, snapshot.data());
                        if (Object.keys(data).length > 0) {
                            //auth
                            bcrypt_1.default.compare(arduinoData.key, data.privateKey, function (err, result) {
                                if (err)
                                    throw err;
                                else {
                                    if (result) {
                                        var currentDate_1 = new Date();
                                        var dbCollectionDoc_1 = dbCollection.doc("positions_" + currentDate_1.getDate() + "_" + (currentDate_1.getMonth() + 1) + "_" + currentDate_1.getFullYear());
                                        dbCollectionDoc_1.get().then(function (snapshot) {
                                            var data = __assign({}, snapshot.data());
                                            if (Object.keys(data).length > 0) {
                                                data.positions.unshift({
                                                    position: new firebase_1.default.firestore.GeoPoint(arduinoData.latitute, arduinoData.longitude),
                                                    time: currentDate_1
                                                });
                                                dbCollectionDoc_1.update(data);
                                            }
                                            else {
                                                dbCollectionDoc_1.set({
                                                    date: currentDate_1,
                                                    positions: [
                                                        {
                                                            position: new firebase_1.default.firestore.GeoPoint(arduinoData.latitute, arduinoData.longitude),
                                                            time: currentDate_1
                                                        }
                                                    ]
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                    return [2 /*return*/];
                });
            });
        },
        type: controllers_1.methods.POST
    },
    {
        path: "/hehehe",
        controller: function (req, res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, res.send("OH!")];
                });
            });
        },
        type: controllers_1.methods.GET
    }
];
exports.default = arduinoRoutes;
