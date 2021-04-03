
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('participation').del()
    .then(function () {
      // Inserts seed entries
      var participations = [
        {attendee: 1, event: 4, comment: "Tıbbi malzemeler ile geliyorum."},
        {attendee: 3, event: 4, comment: "İhtiyaçlar konusunda not düşün."},
        {attendee: 4, event: 4},
        {attendee: 2, event: 5, comment: "Su/içecek takviyesi yapabilirim."},
        {attendee: 3, event: 5},
        {attendee: 4, event: 5, comment: "Çay kahve otomatı getirebilirim."},
        {attendee: 1, event: 12, comment: "$5 bağışlandı."},
        {attendee: 2, event: 12},
        {attendee: 3, event: 12, comment: "$5 bağışlandı."},
        {attendee: 4, event: 12},
        {attendee: 5, event: 12, comment: "$10 bağışlandı."},

      ]

      return knex('participation').insert(
        participations
      );
    });
};
