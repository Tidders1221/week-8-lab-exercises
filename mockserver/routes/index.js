const express = require('express');
const router = express.Router();
const { faker } = require('@faker-js/faker');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./allData', (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  } else {
    console.log('Connected to the SQLite database.')
  }
});

/* GET home page. */
router.get('/', (request, response) => {
  response.json({ title: "our cool content api", status: "all ok" });
});

/**
 * Get an article based on a random ID
 */
router.get('/article/:id', (request, response) => {
  const articleId = parseInt(request.params?.id);
  // let output = {
  //   articleId,
  //   title: faker.animal.cat(),
  //   subHeading: faker.animal.cat(),
  //   content: faker.lorem.paragraph(10),
  //   headerImage: faker.image.cats(),
  //   datePublished: faker.date.recent()
  // };
  console.log('wassup 26');

  db.all('SELECT * FROM pages WHERE articleId=22', function (err, rows) {
    
    if (err) {
      console.log(err);
      response.status(400).json({ "error": err.message });
      return;
    }
    console.log({rows});
    console.log('wassup 29');
    response.json({ rows });
    console.log('wassup 243');
  });

  // // db.run(`INSERT INTO pages(articleId title subHeading content headerImage datePublished) VALUES(${JSON.stringify(title)})`, ['C'], function(err) {
  // db.run('INSERT INTO pages (articleId) VALUES (?)', [output.articleId]), function (err) {
  //   if (err) {
  //     return console.log(err.message);
  //   }
  //   response.json(output);
  // 
  // db.close();


});


/**
 * Create a new article
 */
router.post('/article', (request, response) => {
  response.statusCode = 201;
  response.json({ status: "Thanks for the new article" });
});

module.exports = router;
