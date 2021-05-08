import App from './App';
import AppRouter from './AppRouter';
import arduinoRoutes from './controllers/arduinoRoutes';

const app = new App(
    new AppRouter([
        arduinoRoutes
    ]),
    8000
);

app.test();
