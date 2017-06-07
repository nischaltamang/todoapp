var taskModel = require('../models/taskModel');

module.exports = {
  index: function(req, res){
    //TODO setup the home page with tasks
    var viewModel = {
      incompleteTasks: {},
      completeTasks: {}
    };
    //find incomplete tasks
    taskModel.find({isCompleted: false}, {}, {sort: {lastModified: -1}}, function(err, incompleteTasks){
      if(err) throw err;
      viewModel.incompleteTasks = incompleteTasks;

      //find completed tasks
      taskModel.find({isCompleted: true}, {}, {sort: {lastModified: -1}}, function(err, completeTasks){
        if(err) throw err;
        viewModel.completeTasks = completeTasks;
        res.render('todolist', viewModel);
      })
    });
  },
  create: function(req, res){
    //TODO create a new to do that was submitted
    var newTask = new taskModel({
      task: req.body.task
    });

    newTask.save(function(err){
      if(err){
        res.json(err);
      } else{
        res.json({
          result: true,
          id: newTask._id
        });
      }
    });
  },
  update: function(req, res){
    //TODO update a previous todo
    taskModel.update({ _id: req.body.id}, {
      isCompleted: true,
      lastModified: Date.now()
    }, {}, function(err2){
      if(err2){
        res.json(err2);
      } else{
        res.json(true);
      }
    });
  },
  delete: function(req, res){
    //TODO delete a todo from db
    taskModel.remove({_id: req.body.id}, function(err){
      if(err){
        res.json(err);
      } else{
        res.json(true);
      }
    })
  }
}
