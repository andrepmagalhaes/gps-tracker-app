import {Controllers, methods} from '../interfaces/controllers';
import bcrypt from 'bcrypt';
import fire from '../firebaseConfig';
import fireBase from 'firebase';

const db = fire.firestore();

const arduinoRoutes:Array<Controllers> = [
    {
        path: "/postData",
        async controller(req, res)
        {
            const arduinoData = {
                ...req.body,
            }

            console.log(arduinoData);
            
        
            const dbCollection = db.collection(`bus_${arduinoData.ID}`);
            dbCollection.doc("settings").get().then((snapshot) => {
                const data = {...snapshot.data()};

                if(data.isActive)
                {
                    if(Object.keys(data).length > 0)
                    {
                        //auth
                        bcrypt.compare(String(arduinoData.key), data.privateKey, (err, result) => {
                            if(err) throw err;
                            else
                            {
                                if(result)
                                {
                                    const currentDate = new Date();
                                    const dbCollectionDoc = dbCollection.doc(`positions_${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`);
                                    dbCollectionDoc.get().then((snapshot) => {
                                        const data = {...snapshot.data()};
                                        if(Object.keys(data).length > 0)
                                        {
                                            data.positions.unshift(
                                                {
                                                    position: {lat:Number(arduinoData.latitute), lng:Number(arduinoData.longitude)},
                                                    time: currentDate
                                                }
                                            );
                                            dbCollectionDoc.update(data);
                                        }
                                        else
                                        {
                                            dbCollectionDoc.set({
                                                date: currentDate,
                                                positions: [
                                                    {
                                                        position: {lat:Number(arduinoData.latitute), lng:Number(arduinoData.longitude)},
                                                        time: currentDate
                                                    }
                                                ]
                                            });
                                        }
                                        return res.status(200).send("POST successful");
                                    }); 
                                }
                                else
                                {
                                    return res.send("POST failed!")
                                }
                            }
                        });
                    }
                }
                else
                {
                    return res.send("POST failed!")
                }
                
            });
        },
        type: methods.POST
    },
    {
        path: "/hehehe",
        async controller(req, res){
            return res.send("OH!");
        },
        type: methods.GET
    },
    {
        path: "/postData",
        async controller(req, res){
            return res.send("");
        },
        type: methods.GET
    }
]

export default arduinoRoutes;