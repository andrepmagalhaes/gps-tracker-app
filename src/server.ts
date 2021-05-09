import App from './App';
import AppRouter from './AppRouter';
import arduinoRoutes from './controllers/arduinoRoutes';
import dotenv from 'dotenv';
dotenv.config();

const app = new App(
    new AppRouter([
        arduinoRoutes
    ]),
    (Number(process.env.PORT) || 8000)
);

app.test();
