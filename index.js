import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { dbConnection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import timelineRouter from "./routes/timelineRouter.js";
import messageRouter from "./routes/messageRouter.js";
import skillRouter from "./routes/skillRouter.js";
import softwareApplicationRouter from "./routes/softwareApplicationRouter.js";
import projectRouter from "./routes/projectRouter.js";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
// Emulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
dotenv.config();

// Serving static files (like audio)
app.use(express.static("public"));
const PORT = process.env.PORT || 4000

app.use(
  cors(
    // origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL,process.env.DUSHYANT_URL],
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
  )
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/audio/sample.mp3"));  // Update with your audio file
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/softwareapplication", softwareApplicationRouter);
app.use("/api/v1/project", projectRouter);

dbConnection();
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});


export default app;
