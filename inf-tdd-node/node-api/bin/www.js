const app = require('../index');
const syncDb = require('./sync-db');

syncDb().then( _ => {
  console.log('Sync database!');
  app.listen(3000, () => {
    console.log('Server is runnig on 3000 port');
  });
})
