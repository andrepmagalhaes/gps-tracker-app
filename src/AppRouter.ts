import { Router } from 'express';
import {Controllers, methods} from './interfaces/controllers';

class AppRouter 
{
    private router:Router = Router();

    constructor(routes:Array<Array<Controllers>>)
    {
        this.initRoutes(routes);
    }

    public getRouter():Router
    {
        return this.router;
    }

    private initRoutes(routes:Array<Array<Controllers>>):void
    {
        routes.forEach((routes) => {
            routes.forEach((route) => {
                switch(route.type)
                {
                    case methods.GET :
                        {
                            this.router.get(route.path, route.controller);
                            break;
                        }
                    case methods.POST :
                        {
                            this.router.post(route.path, route.controller);
                            break;
                        }
                    case methods.PUT : 
                        {
                            this.router.put(route.path, route.controller);
                            break;
                        }
                    case methods.DELETE : 
                        {
                            this.router.delete(route.path, route.controller);
                            break;
                        }
                    default :
                        {
                            break;
                        }
                }
            });   
        });
    }
}

export default AppRouter;