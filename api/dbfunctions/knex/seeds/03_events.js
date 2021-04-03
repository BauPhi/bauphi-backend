const Generic = require('../../../models/generic.model')
const generic = new Generic()


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(async function () {
      // Inserts seed entries
      
      
      
      var events = [ { event_id: 1,
        type: 'Meeting',
        event_starter: 3,
        start_time: "2021-04-03T02:21:02.028Z",
        end_time: "2021-04-03T04:21:02.028Z",
        title: 'Event no. 1 Meeting',
        description:
         'Admonitus distincte jam est cogitatio succedens opinantem archetypi. Ita geometriam sub parentibus pensitatis pro. ',
        latitude: 38.432992986265184,
        longitude: 29.877667421610152,
        is_emergency: true,
        country: 'Türkiye',
        state: 'Denizli',
        city: 'Çivril',
        neighbourhood: 'Yukarı Çapak, ' },
      { event_id: 2,
        type: 'Meeting',
        event_starter: 1,
        start_time: "2021-04-01T03:21:02.527Z",
        end_time: "2021-04-01T04:21:02.527Z",
        title: 'Event no. 2 Meeting',
        description:
         'Admonitus distincte jam est cogitatio succedens opinantem archetypi. Ita geometriam sub parentibus pensitatis pro. ',
        latitude: 39.739050363869836,
        longitude: 29.326312602793468,
        is_emergency: true,
        country: 'Türkiye',
        state: 'Kütahya',
        city: 'Tavşanlı',
        neighbourhood: 'Eşen, ' },
      { event_id: 3,
        type: 'Meeting',
        event_starter: 3,
        start_time: "2021-04-06T01:21:03.107Z",
        end_time: "2021-04-06T04:21:03.107Z",
        title: 'Event no. 3 Meeting',
        description:
         'Admonitus distincte jam est cogitatio succedens opinantem archetypi. Ita geometriam sub parentibus pensitatis pro. ',
        latitude: 35.30832738168355,
        longitude: 31.65672370196109,
        is_emergency: true,
        country: '',
        state: '',
        city: '',
        neighbourhood: '' },
      { event_id: 4,
        type: 'Meeting',
        event_starter: 2,
        start_time: "2021-03-30T04:21:03.513Z",
        end_time: "2021-03-30T05:21:03.513Z",
        title: 'Event no. 4 Meeting',
        description:
         'Admonitus distincte jam est cogitatio succedens opinantem archetypi. Ita geometriam sub parentibus pensitatis pro. ',
        latitude: 36.85403945779394,
        longitude: 29.964995060646736,
        is_emergency: true,
        country: 'Türkiye',
        state: 'Antalya',
        city: '',
        neighbourhood: 'Gümüşyaka, ' },
      { event_id: 5,
        type: 'Donation/Supply',
        event_starter: 5,
        start_time: "2021-04-01T03:21:04.006Z",
        end_time: "2021-04-01T03:21:04.006Z",
        title: 'Event no. 5 Donation/Supply',
        description:
         'Admonitus distincte jam est cogitatio succedens opinantem archetypi. Ita geometriam sub parentibus pensitatis pro. ',
        latitude: 38.25113112865484,
        longitude: 32.18023801574995,
        country: 'Türkiye',
        state: 'Konya',
        city: 'Kadınhanı',
        neighbourhood: 'undefined, ' },
      { event_id: 6,
        type: 'Donation/Supply',
        event_starter: 1,
        start_time: "2021-04-04T03:21:04.516Z",
        end_time: "2021-04-04T06:21:04.516Z",
        title: 'Event no. 6 Donation/Supply',
        description:
         'Admonitus distincte jam est cogitatio succedens opinantem archetypi. Ita geometriam sub parentibus pensitatis pro. ',
        latitude: "38.49479641970245",
        longitude: "29.866048462539784",
        country: 'Türkiye',
        state: 'Afyonkarahisar',
        city: 'Hocalar',
        neighbourhood: 'Avgancık, ' },
      { event_id: 7,
        type: 'Donation/Supply',
        event_starter: 3,
        start_time: "2021-04-03T04:21:05.013Z",
        end_time: "2021-04-03T07:21:05.013Z",
        title: 'Event no. 7 Donation/Supply',
        description:
         'Admonitus distincte jam est cogitatio succedens opinantem archetypi. Ita geometriam sub parentibus pensitatis pro. ',
        latitude: 39.084060839308776,
        longitude: 32.57785558486158,
        country: 'Türkiye',
        state: 'Ankara',
        city: '',
        neighbourhood: 'Sinanlı, 06-59' },
      { event_id: 8,
        type: 'Donation/Supply',
        event_starter: 1,
        start_time: "2021-04-03T02:21:05.517Z",
        end_time: "2021-04-03T03:21:05.517Z",
        title: 'Event no. 8 Donation/Supply',
        description:
         'Admonitus distincte jam est cogitatio succedens opinantem archetypi. Ita geometriam sub parentibus pensitatis pro. ',
        latitude: 39.36844212650259,
        longitude: 30.362708036756413,
        country: 'Türkiye',
        state: 'Eskişehir',
        city: 'Seyitgazi',
        neighbourhood: 'Sandıközü, ' },
      { event_id: 9,
        type: 'Donation/Money',
        event_starter: 1,
        start_time: "2021-03-31T03:21:06.015Z",
        end_time: "2021-03-31T04:21:06.015Z",
        title: 'Event no. 9 Donation/Money',
        description:
         'Admonitus distincte jam est cogitatio succedens opinantem archetypi. Ita geometriam sub parentibus pensitatis pro. ',
        currency: '₺',
        amount: 5 },
      { event_id: 10,
        type: 'Donation/Money',
        event_starter: 2,
        start_time: "2021-04-01T01:21:06.015Z",
        end_time: "2021-04-01T05:21:06.015Z",
        title: 'Event no. 10 Donation/Money',
        description:
         'Admonitus distincte jam est cogitatio succedens opinantem archetypi. Ita geometriam sub parentibus pensitatis pro. ',
        currency: '$',
        amount: 10 },
      { event_id: 11,
        type: 'Donation/Money',
        event_starter: 3,
        start_time: "2021-04-06T02:21:06.015Z",
        end_time: "2021-04-06T06:21:06.015Z",
        title: 'Event no. 11 Donation/Money',
        description:
         'Admonitus distincte jam est cogitatio succedens opinantem archetypi. Ita geometriam sub parentibus pensitatis pro. ',
        currency: '₺',
        amount: 5 },
      { event_id: 12,
        type: 'Donation/Money',
        event_starter: 1,
        start_time: "2021-04-03T03:21:06.015Z",
        end_time: "2021-04-03T03:21:06.015Z",
        title: 'Event no. 12 Donation/Money',
        description:
         'Admonitus distincte jam est cogitatio succedens opinantem archetypi. Ita geometriam sub parentibus pensitatis pro. ',
        currency: '$',
        amount: 5 } ]

      

      /*

      for(var e in events){

        events[e].event_id = parseInt(e) + 1
        events[e].event_starter = Math.floor(Math.random() * 5) + 1 

        var time = new Date();
        var factor = Math.floor(Math.random() * 6) % 2 === 0 ? -1:1
        time.setDate(time.getDate()+Math.floor(Math.random() * 5)*factor);
        time.setTime(time.getTime() + (Math.floor(Math.random() * 5)*60*60*1000))
        events[e].start_time = time
        
        events[e].end_time = new Date(time.getTime() + (Math.floor(Math.random() * 5)*60*60*1000))

        events[e].title = "Event no. " + events[e].event_id + " " + events[e].type
        events[e].description = "Admonitus distincte jam est cogitatio succedens opinantem archetypi. Ita geometriam sub parentibus pensitatis pro. "

        if(events[e].type === "Meeting"){
          events[e].latitude = Math.random() * 5 + 35
          events[e].longitude = Math.random() * 5 + 28

          var res = await generic.autoLocation({latitude: events[e].latitude, longitude: events[e].longitude}, {})

          events[e].is_emergency = Math.floor(Math.random() * 6) % 2 === 0
          events[e].country = res.api_response.country || ""
          events[e].state = res.api_response.state || ""
          events[e].city = res.api_response.city || ""
          events[e].neighbourhood = res.api_response.neighbourhood || ""
        }
        else if(events[e].type === "Donation/Supply"){
          events[e].latitude = Math.random() * 5 + 35
          events[e].longitude = Math.random() * 5 + 28
          
          var res = await generic.autoLocation({latitude: events[e].latitude, longitude: events[e].longitude}, {})

          events[e].country = res.api_response.country || ""
          events[e].state = res.api_response.state || ""
          events[e].city = res.api_response.city || ""
          events[e].neighbourhood = res.api_response.neighbourhood || ""
        }
        else if(events[e].type === "Donation/Money"){
          events[e].currency = Math.floor(Math.random() * 6) % 2 === 0 ? "₺": "$"
          events[e].amount = Math.floor(Math.random() * 6) % 2 === 0 ? 5: 10
        }
        
      }
      
      */
      //console.log(events)
      

      knex('money').insert(
        events.filter(event => event.type === "Donation/Money")
      )
      .catch((err) => {
        console.log(err)
      })

      knex('supply').insert(
        events.filter(event => event.type === "Donation/Supply")
      )
      .catch((err) => {
        console.log(err)
      })

      return knex('meeting').insert(
        events.filter(event => event.type === "Meeting")
      )
      .catch((err) => {
        console.log(err)
      });
    });
};
