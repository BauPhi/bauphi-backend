
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 1, name: "Tunahan", surname: 'Ertekin', email: "tuna@gmail.com", phone: "+905056667788", password: "123"},
        {user_id: 2, name: "Gözde", surname: 'Önal', email: "gozde@gmail.com", phone: "+905056667788", password: "123"},
        {user_id: 3, name: "Nilay", surname: 'Yorgancılar', email: "nilay@gmail.com", phone: "+905056667788", password: "123"},
        {user_id: 4, name: "Öykü", surname: 'Şüyün', email: "oyku@gmail.com", phone: "+905056667788", password: "123"},
        {user_id: 5, name: "Teoman", surname: 'Kiraz', email: "teoman@gmail.com", phone: "+905056667788", password: "123"}
      ]);
    });
};
