import { app } from "./api";
import './config';

app.listen(process.env.APP_PORT, () => console.log('Listening on port ' + process.env.APP_PORT));