"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var firebaseConfig_1 = __importDefault(require("./firebaseConfig"));
var App = /** @class */ (function () {
    function App(routes, port) {
        this.db = firebaseConfig_1.default.firestore();
        this.port = port;
        this.app = express_1.default();
        this.initMiddlewares();
        this.initRouter(routes);
        this.listen();
    }
    App.prototype.initRouter = function (routes) {
        this.app.use(routes.getRouter());
    };
    App.prototype.initMiddlewares = function () {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    };
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("listening @" + _this.port);
        });
    };
    App.prototype.test = function () {
        // const key:string = "hehehe";
        // const salt:number = 69420;
        // let encrypted:string = "";
        // console.log("key = " + key);
        // console.log("salt = " + salt);
        // encrypted = bcrypt.hashSync(key, salt);
        // console.log("encrypted = " + encrypted);
        // console.log(bcrypt.compare(key, encrypted));
        // console.log(bcrypt.hashSync("hehehe", 9));
        // bcrypt.genSalt(8, (err, salt) => {
        //     bcrypt.hash("hehehe", salt, (err, hash) => {
        //         this.db.collection('bus_0').add({
        //             key: hash,
        //             time: new Date()
        //           });
        //     });
        // });
        //$2b$08$32Q9FXtRl0MPs7wD4jxJ/.8.7VB741RcrB.aeg0vBo9HFVoVtAWzi
        // this.db.collection('bus_0').get().then((data) => {
        //     data.forEach((dat) => {
        //         console.log(dat.data());
        //     })
        // })
        //$2b$08$fPg5/wKtXajmahFccDFEdu // public key
        // this.db.collection("bus_0").doc("positions_1").get().then((snapshot) => {
        //     const dat = {...snapshot.data()};
        //     const newObj = {
        //         time: new Date(),
        //         position: new fireBase.firestore.GeoPoint(4, 4)
        //     }
        //     console.log(dat);
        //     dat.positions.unshift(newObj);
        //     console.log(dat);
        //     this.db.collection("bus_0").doc("positions_2").set(dat);
        //     const date = new Date();
        //     console.log(date);
        //     if(Object.keys(dat).length === 0)
        //     {
        //         console.log("hehehe");
        //     }
        //     else
        //     {
        //         console.log("OH!");
        //     }
        // });
        // const currentDate = new Date();
        // this.db.collection("bus_0").doc(`positions_${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`).set({
        //     date: currentDate,
        //     positions: [
        //         {
        //             position: new fireBase.firestore.GeoPoint(4, 4),
        //             time: currentDate
        //         }
        //     ]
        // });
    };
    return App;
}());
exports.default = App;
