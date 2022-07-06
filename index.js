const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

const authRoutes = require("./src/routes/auth.route");
const applicationRoutes = require("./src/routes/applications.route");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, './interface/build')));

app.use("/api", authRoutes);
app.use("/api/applictions", applicationRoutes);

app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./interface/build", "index.html"));
});

const listener = app.listen(process.env.PORT || 3001, () => {
    console.log(`Ouvindo requisições na porta ${listener.address().port}`);
});