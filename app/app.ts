import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import {env} from "node:process";
import {Router} from "./config/router/router";

const PORT = env.PORT || 3300;

const app = express();

//allow cors
app.use(cors());

//use json form parser middlware
app.use(bodyParser.json({limit: "6mb"}));
//use query string parser middlware
app.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: true,
  })
);

//add static paths
// app.use(express.static(path.join(__dirname, "public")));

//catch 404 and forward to error handler
app.use(function (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  err.status = 404;
  next(err);
});

//Set here middlewares
// * method-override
// * error handling
// * tracing headers
// * logs
// * session
// * cache
// * interceptors
Router.setExpress(app);

app.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT} and Worker ${process.pid} started`
  );
});

export default app;
