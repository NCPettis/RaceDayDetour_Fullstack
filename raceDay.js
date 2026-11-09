// import ical, { ICalCalendarMethod } from 'ical-generator';
// import http from 'node:http';

fetch(`https://api.runsignup.com/rest/races?format=json&events=F&race_headings=F&race_links=F&include_waiver=F&include_multiple_waivers=F&include_event_days=F&include_extra_date_info=F&include_giveaway_details=F&page=1&results_per_page=50&sort=name+ASC&start_date=today&only_partner_races=F&search_start_date_only=F&only_races_with_results=F&city=Philadelphia&state=PA&country=US&distance_units=K`)
        .then(response => response.json())
        .then((hospitals) => {}


// fetch(`https://www3.septa.org/api/BusDetours/index.php`)
//         .then(response => response.json())
//         .then((hospitals) => {console.log(hospitals)})
        


// const http = require('node:http');
// const {ICalCalendarMethod } = require('ical-generator');
// const {ical} = require('ical-generator') 

const calendar = ical({ name: 'my first iCal' });

// A method is required for outlook to display event as an invitation
calendar.method(ICalCalendarMethod.REQUEST);

const startTime = new Date();
const endTime = new Date();
endTime.setHours(startTime.getHours() + 1);
calendar.createEvent({
    start: startTime,
    end: endTime,
    summary: 'Example Event',
    description: 'It works ;)',
    location: 'my room',
    url: 'http://sebbo.net/',
});

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': 'attachment; filename="calendar.ics"',
    });

    res.end(calendar.toString());
}).listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000/');
})
    