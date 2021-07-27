let airbnb;
export default class AirbnbModel {
    static async injectDB(conn) {
        if (airbnb) {
            return;
        }
        try {
            airbnb = await conn.db(process.env.AIRBNB_NS).collection("listingsAndReviews");
        } catch (e) {
            console.error(`unable to connect to db:${e}`);
        }
    }
    static async getAirBnb({
        filters = null,
        page = 0,
        airbnbPerPage = 20,
    } = {}) {

        let query;
        if (filters) {
            if ("name" in filters) {
                query = {
                    $text: {
                        $search: filters["name"]
                    }
                }
            } else if ("bed_type" in filters) {
                query = {
                    "bed_type": {
                        $eq: filters["bed_type"]
                    }
                }
            } else if ("accommodates" in filters) {
                query = {
                    "accommodates": {
                        $eq: parseInt(filters["accommodates"])
                    }
                }
            }
        }
        let cursor;
        try {
            cursor = await airbnb.find(query);
        } catch (e) {
            console.error(`Unable to issue find command,${e}`);
            return {
                airbnbList: [],
                totalNumOfAirBnb: 0
            };
        }
        const displayCursor = cursor.limit(airbnbPerPage).skip(airbnbPerPage * page);
        try {
            const airbnbList = await displayCursor.toArray();
            const totalNumOfAirBnb = await airbnb.countDocuments(query);
            return ({
                airbnbList,
                totalNumOfAirBnb
            });
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents,${e}`);
            return {
                airbnbList: [],
                totalNumOfAirBnb: 0
            };
        }
    }
}