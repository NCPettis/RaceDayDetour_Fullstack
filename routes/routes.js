module.exports = function (app, passport, db) {

    app.get('/findrace', (req, res) => {
        console.log('hello where are you')
        try {
            const response = fetch('https://api.runsignup.com/rest/races?format=json&events=F&race_headings=F&race_links=F&include_waiver=F&include_multiple_waivers=F&include_event_days=F&include_extra_date_info=F&include_giveaway_details=F&page=1&results_per_page=50&sort=name+ASC&start_date=today&only_partner_races=F&search_start_date_only=F&only_races_with_results=F&city=Philadelphia&state=PA&country=US&distance_units=K', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-rsu_api_reg': process.env.API_KEY,
                    'X-RSU-API-REG-SECRET': process.env.API_SECRET
                }
            });

            const data = response.json();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    });

}