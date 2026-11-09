const express = require("express");
const app = express();
// const mongoose = require("mongoose");
// const passport = require("passport");
const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
// const methodOverride = require("method-override");
const flash = require("express-flash");
// const logger = require("morgan");
// const connectDB = require("./config/database");
// const mainRoutes = require("./routes/main");
// const postRoutes = require("./routes/posts");

//Use .env file in config folder
// require("dotenv").config({ path: "./config/.env" });

// Passport config
// require("./config/passport")(passport);

//Connect To Database
// connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
// app.use(logger("dev"));

//Use forms for put / delete
// app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
// app.use("/", mainRoutes);
// app.use("/post", postRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});


fetch(`https://www3.septa.org/api/BusDetours/23`)
        .then(response => response.json())
        .then((hospitals) => {console.log(hospitals)})

app.get('/api/data', async (req, res) => {
  try {
    const response = await fetch('https://api.runsignup.com/rest/races?format=json&events=F&race_headings=F&race_links=F&include_waiver=F&include_multiple_waivers=F&include_event_days=F&include_extra_date_info=F&include_giveaway_details=F&page=1&results_per_page=50&sort=name+ASC&start_date=today&only_partner_races=F&search_start_date_only=F&only_races_with_results=F&city=Philadelphia&state=PA&country=US&distance_units=K', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-rsu_api_reg': process.env.API_KEY,
        'X-RSU-API-REG-SECRET': process.env.API_SECRET
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});