import { app } from "./api";

app.listen(process.env.PORT, () => console.log('Listening on port ' + process.env.PORT));