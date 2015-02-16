// app.js

// window.app = {};

var App = function(){
  this.server = 'https://api.parse.com/1/classes/chatterbox';
  this.init();
};

App.prototype.init = function(){
  var self = this;
  self.fetch();
  setInterval(function(){self.fetch();}, 3000);
};

App.prototype.fetch = function(){

  $.ajax({
    url: this.server,
    type: 'GET',
    // data: JSON.stringify({limit: 1000}),
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


