import express from 'express';
import AppRouter from './AppRouter';
import bcrypt from 'bcrypt';
import fire from './firebaseConfig'
import fireBase from 'firebase'

class App
{
    private app: express.Application;
    private port: number;
    private db = fire.firestore();

    constructor(routes:AppRouter, port:number)
    {
        this.port = port;
        this.app = express();
        this.initRouter(routes);
        this.listen()
    }

    private initRouter(routes:AppRouter)
    {
        this.app.use(routes.getRouter());
    }

    private listen():void
    {
        this.app.listen(this.port, () => {
            console.log(`listening @${this.port}`);
            
        });
    }



    test():void
    {
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


        
        
        
        
        
    }

}

export default App;