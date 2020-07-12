const { client } = require('../utils/connect');

client.connect()
  .then(() => {
    return client.query(`
      CREATE TABLE character (
        id SERIAL UNIQUE,
        name TEXT UNIQUE,
        hair_color TEXT,
        eye_color TEXT,
        race TEXT,
        gender TEXT,
        titles TEXT,
        profession TEXT,
        affiliation TEXT,
        abilities TEXT,
        partners TEXT,
        children TEXT,
        actor TEXT,
        books TEXT,
        image TEXT,
        description TEXT,
        categories TEXT[],
        PRIMARY KEY (id)
      );` 
    )
      .then(() => console.log('create tables complete'), err => console.log(err))
      .then(() => {
        client.end();
      });
  });
