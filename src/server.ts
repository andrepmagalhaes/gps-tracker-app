import App from './App';
import AppRouter from './AppRouter';
import arduinoRoutes from './controllers/arduinoRoutes';

const app = new App(
    new AppRouter([
        arduinoRoutes
    ]),
    5000
);

app.test();
