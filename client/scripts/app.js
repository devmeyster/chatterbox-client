// app.js

// window.app = {};

var App = function(){
  this.server = 'https://api.parse.com/1/classes/chatterbox';
  this.init();
  this.name = location.search.split("=")[1];
};

App.prototype.init = function(){
  var self = this;
  self.fetch();
  setInterval(function(){self.fetch();}, 3000);

  $('.send-input').on('click', function(){
    var input = $('.user-input').val();
    $('.user-input').val('');
    var msg = {
      username: this.name,
      text: input
    };
    this.send(msg);
  }.bind(this));
};

App.prototype.send = function(msg){
  $.ajax({
    url: this.server,
    type: 'POST',
    data: JSON.stringify(msg),
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });

};

App.prototype.fetch = function(){

  $.ajax({
    url: this.server,
    type: 'GET',
    data: {
      limit: 100
    },
    contentType: 'application/json',
    success: function (data) {
      $('.messages div').remove();
      _.each(data.results, function(item){
        var $usr = $('<div></div>');
        var $msg = $('<div></div>');

        $usr.text(item.username);
        $msg.text(item.text);

        $('.messages').append('<div>' + $usr.html() + ' : ' + $msg.html() + '</div>');
      });
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};


var app = new App();
