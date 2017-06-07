var task = require('./controllers/taskController');

module.exports.initialize = function(app, router){
  router.get('/', task.index);
  router.post('/', task.create);
  router.put('/', task.update);
  router.delete('/', task.delete);

  app.use('/', router);
}
