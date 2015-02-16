// app.js

// window.app = {};

var App = function(){
  this.server = 'https://api.parse.com/1/classes/chatterbox';

};

App.prototype.init = function(){

};

App.prototype.fetch = function(){

  $.ajax({
    // always use this url
    url: this.server,
    type: 'GET',
    //data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {

      _.each(data.results, function(item){
        $('#main').append('<div>'+item.username +" : "+ item.text );
      });

    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};


var app = new App();

app.fetch();
