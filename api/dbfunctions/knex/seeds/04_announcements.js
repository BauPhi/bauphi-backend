
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('announcement').del()
    .then(function () {
      // Inserts seed entries


      var announcements = [ { announcement_id: 1,
        ann_starter: 1,
        isHuman: true,
        phone: '+908139205912',
        title: 'Et impellit synopsis in cognitio pluribus machinam.',
        description:
         'Cera ad unde co ipsa ideo eo spem prae mo. Memoriae fatendum reversus uno eos habeatur. Remanetne ad eversioni de scriptura considero procedere eo se. Ei id ea ingenio remotis co humanam. ' },
      { announcement_id: 2,
        ann_starter: 2,
        isHuman: false,
        phone: '+908139205912',
        title: 'Et impellit synopsis in cognitio pluribus machinam.',
        description:
         'Cera ad unde co ipsa ideo eo spem prae mo. Memoriae fatendum reversus uno eos habeatur. Remanetne ad eversioni de scriptura considero procedere eo se. Ei id ea ingenio remotis co humanam. ' },
      { announcement_id: 3,
        ann_starter: 4,
        isHuman: false,
        phone: '+908139205912',
        title: 'Et impellit synopsis in cognitio pluribus machinam.',
        description:
         'Cera ad unde co ipsa ideo eo spem prae mo. Memoriae fatendum reversus uno eos habeatur. Remanetne ad eversioni de scriptura considero procedere eo se. Ei id ea ingenio remotis co humanam. ' },
      { announcement_id: 4,
        ann_starter: 2,
        isHuman: true,
        phone: '+908139205912',
        title: 'Et impellit synopsis in cognitio pluribus machinam.',
        description:
         'Cera ad unde co ipsa ideo eo spem prae mo. Memoriae fatendum reversus uno eos habeatur. Remanetne ad eversioni de scriptura considero procedere eo se. Ei id ea ingenio remotis co humanam. ' },
      { announcement_id: 5,
        ann_starter: 4,
        isHuman: false,
        phone: '+908139205912',
        title: 'Et impellit synopsis in cognitio pluribus machinam.',
        description:
         'Cera ad unde co ipsa ideo eo spem prae mo. Memoriae fatendum reversus uno eos habeatur. Remanetne ad eversioni de scriptura considero procedere eo se. Ei id ea ingenio remotis co humanam. ' } ]

      /*

      for(var a in announcements){
        announcements[a].announcement_id = parseInt(a) + 1
        announcements[a].ann_starter = Math.floor(Math.random() * 5) + 1
        announcements[a].isHuman = Math.floor(Math.random() * 6) % 2 === 0
        announcements[a].phone = "+908139205912"
        announcements[a].title = "Et impellit synopsis in cognitio pluribus machinam."
        announcements[a].description = "Cera ad unde co ipsa ideo eo spem prae mo. Memoriae fatendum reversus uno eos habeatur. Remanetne ad eversioni de scriptura considero procedere eo se. Ei id ea ingenio remotis co humanam. "
      }

      */


      //console.log(announcements)

      return knex('announcement').insert(
        announcements
      );
    });
};
