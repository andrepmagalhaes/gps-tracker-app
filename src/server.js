"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = __importDefault(require("./App"));
var AppRouter_1 = __importDefault(require("./AppRouter"));
var arduinoRoutes_1 = __importDefault(require("./controllers/arduinoRoutes"));
var app = new App_1.default(new AppRouter_1.default([
    arduinoRoutes_1.default
]), 5000);
app.test();
