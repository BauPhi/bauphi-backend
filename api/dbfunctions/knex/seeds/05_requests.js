
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('request').del()
    .then(function () {
      // Inserts seed entries
      
      var requests = [
        {victim: 3, home_owner: 2, home: 7, description: "Şehirdışından geliyorum ve haftasonu yasaklarına yakalandım. Haftasonu kalacak bir yer arıyorum. Ücret karşılığı kalmak istiyorum.", results: "Pending"},
        {victim: 4, home_owner: 1, home: 10, description: "3 gün kalacak bir yer arıyorum, sonrasında otele yerleştirileceğim. Tek kişiyim. İletişim: +905056667788", results: "Pending"},
        {victim: 1, home_owner: 3, home: 2, description: "Yangında evimi kaybettim, yakınlarda otel bulamadım. 1 gün konaklayacak yer arıyorum. Tel: +905056667788", results: "Accepted"},
        {victim: 3, home_owner: 1, home: 10, description: "Bir hafta konaklamak istiyoruz. 3 kişilik bir aileyiz ve çocuğumuz 4 yaşında. Deprem sonrası evimiz hasar gördü. İletişim: +905056667788", results: "Rejected"},
        {victim: 2, home_owner: 4, home: 6, description: "Selde evimiz su altında kaldı, iki kişilik bir aileyiz. 3 gün konaklayabileceğimiz evimize yakın bir yer arıyoruz.", results: "Accepted"},
      ]
      
      return knex('request').insert(
        requests
      );
    });
};
