const express = require("express");
const bodyParser = require("body-parser");
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const v1MemberRouter = require("./v1/routes/memberRouter");

const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/workouts", v1WorkoutRouter);
app.use("/api/v1/members", v1MemberRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});