const Generic = require('../../../models/generic.model')
const generic = new Generic()

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('home').del()
    .then(async function () {
      // Inserts seed entries
      const homes = [ { home_owner: 4,
        home_name: 'Gazi Mahallesi/Ankara',
        isVisible: false,
        country: 'Türkiye',
        state: 'Ankara',
        city: 'Yenimahalle',
        neighbourhood: 'Gazi Mahallesi, Tanaçan Sokak',
        latitude: '39.942699',
        longitude: '32.809981',
        home_id: 1 },
      { home_owner: 3,
        home_name: 'Naci Çakır Mahallesi/Ankara',
        isVisible: true,
        country: 'Türkiye',
        state: 'Ankara',
        city: 'Çankaya',
        neighbourhood: 'Naci Çakır Mahallesi, 766. Sokak',
        latitude: '39.875282',
        longitude: '32.844336',
        home_id: 2 },
      { home_owner: 5,
        home_name: 'Kemankeş Karamustafa Paşa/İstanbul',
        isVisible: false,
        country: 'Türkiye',
        state: 'İstanbul',
        city: 'Beyoğlu',
        neighbourhood: 'Kemankeş Karamustafa Paşa, Tophane İskele Caddesi',
        latitude: '41.025810',
        longitude: '28.981674',
        home_id: 3 },
      { home_owner: 5,
        home_name: 'Arifiye Mahallesi/Eskişehir',
        isVisible: false,
        country: 'Türkiye',
        state: 'Eskişehir',
        city: 'Odunpazarı',
        neighbourhood: 'Arifiye Mahallesi, Tanış Sokak',
        latitude: '39.768516',
        longitude: '30.521422',
        home_id: 4 },
      { home_owner: 5,
        home_name: 'undefined/Çanakkale',
        isVisible: true,
        country: 'Türkiye',
        state: 'Çanakkale',
        city: 'Yenice',
        neighbourhood: 'undefined, ',
        latitude: '39.901625',
        longitude: '27.112503',
        home_id: 5 },
      { home_owner: 4,
        home_name: 'Deliklitaş Mahallesi/Eskişehir',
        isVisible: true,
        country: 'Türkiye',
        state: 'Eskişehir',
        city: 'Odunpazarı',
        neighbourhood: 'Deliklitaş Mahallesi, Yunus Emre Caddesi',
        latitude: '39.772038',
        longitude: '30.524876',
        home_id: 6 },
      { home_owner: 2,
        home_name: 'Yunus Emre Mahallesi/Ankara',
        isVisible: true,
        country: 'Türkiye',
        state: 'Ankara',
        city: 'Pursaklar',
        neighbourhood: 'Yunus Emre Mahallesi, Sembol Sokak',
        latitude: '40.031085',
        longitude: '32.895181',
        home_id: 7 },
      { home_owner: 1,
        home_name: 'Başak Mahallesi/İstanbul',
        isVisible: false,
        country: 'Türkiye',
        state: 'İstanbul',
        city: 'Başakşehir',
        neighbourhood: 'Başak Mahallesi, Yaşar Doğu Bulvarı',
        latitude: '41.088978',
        longitude: '28.805778',
        home_id: 8 },
      { home_owner: 1,
        home_name: 'Hasanpaşa Mahallesi/İstanbul',
        isVisible: false,
        country: 'Türkiye',
        state: 'İstanbul',
        city: 'Kadıköy',
        neighbourhood: 'Hasanpaşa Mahallesi, Uzunçayır Caddesi',
        latitude: '40.995758',
        longitude: '29.046260',
        home_id: 9 },
      { home_owner: 1,
        home_name: 'Ostim Mahallesi/Ankara',
        isVisible: true,
        country: 'Türkiye',
        state: 'Ankara',
        city: 'Yenimahalle',
        neighbourhood: 'Ostim Mahallesi, ',
        latitude: '39.982697',
        longitude: '32.753177',
        home_id: 10 } ]

      /*
      for(var h in homes){
        var res = await generic.autoLocation({latitude: homes[h].latitude, longitude: homes[h].longitude}, {})

        homes[h].home_id = parseInt(h)+1
        homes[h].home_owner = Math.floor(Math.random() * 5) + 1  
        homes[h].isVisible = Math.floor(Math.random() * 6) % 2 === 0

        homes[h].home_name = res.api_response.home_name || "unknown"
        homes[h].country = res.api_response.country || "unknown"
        homes[h].state = res.api_response.state || "unknown"
        homes[h].city = res.api_response.city || "unknown"
        homes[h].neighbourhood = res.api_response.neighbourhood || "unknown"
      }

      console.log(homes)
      */

      return knex('home').insert(
        homes  
      )
      .catch((err) => {
        console.log(err)
      });
    });
};
