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
                ...req.body
            }

            const dbCollection = db.collection(`bus_${arduinoData.ID}`);

            dbCollection.doc("settings").get().then((snapshot) => {
                const data = {...snapshot.data()};
                if(Object.keys(data).length > 0)
                {
                    //auth
                    bcrypt.compare(arduinoData.key, data.privateKey, (err, result) => {
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
                                                position: new fireBase.firestore.GeoPoint(arduinoData.latitute, arduinoData.longitude),
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
                                                    position: new fireBase.firestore.GeoPoint(arduinoData.latitute, arduinoData.longitude),
                                                    time: currentDate
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
        },
        type: methods.POST
    }
]

export default arduinoRoutes;