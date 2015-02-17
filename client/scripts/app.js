// app.js

// window.app = {};

var App = function(){
  this.server = 'https://api.parse.com/1/classes/chatterbox';
  this.server = 'https://api.parse.com/1/classes/chatterbox?order=-createdAt';
  this.init();
  this.name = location.search.split('=')[1];
  this.rooms = {};
  this.currentRoom = 'all';
  this.friends = {};
};

App.prototype.init = function(){
  var self = this;
  self.fetch();
  setInterval(function(){self.fetch(self.currentRoom);}, 3000);

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

App.prototype.fetch = function(roomname){
  var self = this;
  var url = this.server;
  var data = {limit: 1000};

  if (roomname !== 'all' && roomname != undefined) {
    // url += '?where={"roomname":"' + roomname + '"}';
    data.where = {roomname: roomname};
  }

  $.ajax({
    url: url,
    type: 'GET',
    data: data,
    contentType: 'application/json',
    success: function (data) {
      // console.dir(data);
      $('.messages div').remove();

      _.each(data.  results, function(item){
        var $usr = $('<div></div>');
        var $msg = $('<div></div>');
        var $room = $('<div></div>');
        var $output;

        $usr.text(item.username);
        $msg.text(item.text);
        $room.text(item.roomname);
        $output = $('<div><a>' + $usr.html() + '</a> : ' + $msg.html() + '</div>');

        if (self.friends.hasOwnProperty(item.username)) {
          $output.addClass('friends');
        }

        $('.messages').append($output);

        if (!self.rooms.hasOwnProperty(item.roomname) && item.roomname !== 'undefined') {
          self.rooms[item.roomname] = item.roomname;
          $('.rooms').append('<div><a href = #' + item.roomname + '>' + $room.html() + '</a></div>');
        }
      });
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });

  $('a').on('click', function() {
    // console.log(this.text);
    self.addFriend(this.text);
    console.log("added friend: " + this.text);
  });
};

App.prototype.addFriend = function(friend) {
  if (!this.friends.hasOwnProperty(friend)) {
    $('.friends-list').append('<div><a>' + friend + '</a></div>');
  }
  this.friends[friend] = friend;
  console.log('added friend');
  // $('.no-friends').remove();


};

window.onhashchange = function() {
  app.currentRoom = location.hash.slice(1);
  console.log(app.currentRoom);
  app.fetch(app.currentRoom);
};

var app = new App();
