import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import AirbnbModel from "./Data/AirbnbModel.js"
import ReviewsModel from "./Data/ReviewsModel.js"

dotenv.config();
const MongoClint = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClint.connect(process.env.AIRBNB_DB_URI, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
}).catch(err => {
    console.error(err.stack);
    process.exit(1);
}).then(async client => {
    await AirbnbModel.injectDB(client);
    await ReviewsModel.injectDB(client);
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
})