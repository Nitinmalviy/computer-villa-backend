import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.config";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import { clear, log } from "console";
import e from "express";

// Type declaration for import.meta
declare global {
  interface ImportMeta {
    url: string;
  }
}
clear;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// EJS configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Express layouts setup
app.use(expressLayouts);
app.set("layout", "layouts/main");

// Static files setup - points to public folder at project root
app.use(express.static(path.join(__dirname, "../public")));

console.log('public -- path', path.join(__dirname, "../public"));


log("import.meta.url", __dirname);

app.use(cors({ origin: true, credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.render("pages/index", {
    title: "Home Page", 
  });
});

app.get("/about", (req, res) => {
  res.render("pages/about", {
    title: "About Page", 
  });
});

app.get("/contact", (req, res) => {
  res.render("pages/contact", {
    title: "Contact Page", 
  });
});

app.get("/test-backend", (req, res) => {
  res.send("Hello Computer-villa!");
});

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
