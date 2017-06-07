$(function(){
  var addNewToDo = function(){
    var newTask = $('input:first').val();

    if(newTask == ""){
      alert("You can't complete an empty task.");
      return;
    }

    $.post('/', {task: newTask}).done(function(data){
      if(data.result){
        $('input:first').val('');

        $('<div/>', {
          'class': 'list-group-item',
        }).prependTo('.list-group:eq(0)');
        $('<p/>').text(newTask).data('id', '' + data.id).appendTo('.list-group-item:first');

        var checkIcon = $('<i/>', {'class': 'fa fa-check'});
        var crossIcon = $('<i/>', {'class': 'fa fa-times'});
        $('<div/>', {
          "class": 'icon-container'
        }).append([checkIcon, crossIcon]).appendTo('.list-group-item:first');
      }
    });
  };

  $('#add-button').on('click', function(e){
    addNewToDo();
  });

  $('input:first').keydown(function(e){
    if(e.which == 13) addNewToDo();
  });

  $(document).on('click', 'i', function(e){
    var currIcon = $(this);
    var taskId = currIcon.parent().siblings('p').data('id');

    if(currIcon.attr('class') == 'fa fa-check'){
      var oldTask = currIcon.parent().siblings('p').text();
      $.ajax({
        url: '/',
        method: 'PUT',
        data: { id: taskId}
      }).done(function(result){
        if(result){
          currIcon.closest('.list-group-item').remove();
          $('<div/>', {
            'class': 'list-group-item disabled',
          }).append($('<p/>').text(oldTask).data('id', taskId)).prependTo('.list-group:eq(1)');
        }
      });
    } else if(currIcon.attr('class') == 'fa fa-times'){//delete task
      $.ajax({
        url: '/',
        method: 'DELETE',
        data: { id: taskId}
      }).done(function(result){
        console.log(result);
        if(result){
          currIcon.closest('.list-group-item').remove();
        }
      })
    }
  });
});
