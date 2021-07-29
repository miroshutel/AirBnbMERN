import AirbnbModel from '../Data/AirbnbModel.js';

export default class AirBnbController {
    static async apiGetAirBnb(req, res, next) {
        const airbnbPerPage = req.query.airbnbPerPage ? parseInt(req.query.airbnbPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {};
        if (req.query.bedtype)
            filters.bed_type = req.query.bedtype;
        else if (req.query.rooms)
            filters.accommodates = req.query.rooms;
        else if (req.query.name)
            filters.name = req.query.name;
        const {
            airbnbList,
            totalNumOfAirBnb
        } = await AirbnbModel.getAirBnb({
            filters,
            page,
            airbnbPerPage
        });
        let response = {
            airbnb: airbnbList,
            page: page,
            filters: filters,
            entries_per_page: airbnbPerPage,
            total_results: totalNumOfAirBnb,
        }
        res.json(response);
    }
    static async apiGetAirBnbById(req, res, next) {
        try {
            let id = req.query.id || {};
            let airbnb = AirbnbModel.getAirBnbByID(id);
            if (!airbnb) {
                res.status(404).json({
                    erorr: "Not Found"
                });
            }
            res.json(airbnb);
        } catch (e) {
            console.log(`api,${e}`);
            res.status(500).json({
                error: e
            });
        }
    }
    static async apiGetAirBnbByBedType(req, res, next) {
        try {
            let bedTypes = await AirbnbModel.getBedTypes();
            res.json(bedTypes);
        } catch (e) {
            console.log(`api,${e}`);
            res.status(500).json({
                error: e
            });
        }
    }
}