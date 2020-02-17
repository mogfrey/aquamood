const google_key='AIzaSyDJsKwHikseUohUcvNu-CIJDIqA_yopnKo';
const api_url= 'http://192.168.43.14:8000/api'
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
    },
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


var pages={
    home: function(){

    },
    sendmoney: function(){

        window.location.href='../pages/money.html';
    },
    cards: function(){

        window.location.href='../pages/cards.html';
    },

    ledger: function(){

        window.location.href='../pages/ledger.html';
    },

    contacts: function(){

        window.location.href='../pages/contacts.html';
    },

    explore: function(){

        window.location.href='../pages/explore.html';
    },

    support: function(){

        window.location.href='../pages/support.html';
    },

    inbox: function(){

        window.location.href='../pages/inbox.html';
    },
    account: function(){

        window.location.href='../pages/account.html';
    },
    settings: function(){

        window.location.href='../pages/settings.html';
    },
    statistics: function(){

        window.location.href='../pages/statistics.html';
    },

};

var statistics ={
    getStats: function() {
        $( "#loading_screen_div" ).show();
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": api_url+"/fetch_values/",
          "method": "GET",
          "headers": {
            
          }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            var temperatures = [];
            for (var i = response.data.length - 1; i >= 0; i--) {
                //console.log(response.data[i]);
                var values = { hour: response.data[i].hour, value: response.data[i].value };
                temperatures.push(values);
            }

            new Morris.Bar({
              // ID of the element in which to draw the chart.
              element: 'myfirstchart',
              // Chart data records -- each entry in this array corresponds to a point on
              // the chart.
              barColors:['red'],
              data: temperatures,
              // The name of the data record attribute that contains x-values.
              xkey: 'hour',
              // A list of names of data record attributes that contain y-values.
              ykeys: ['value'],
              // Labels for the ykeys -- will be displayed when you hover over the
              // chart.
              labels: ['Value']
            });
            $( "#loading_screen_div" ).hide();
        });
        },

};


var authentication = {
    login:function (argument) {
        // body...
        var data = {
          "email": document.getElementById('email_val').value,
          "password": document.getElementById('password_val').value,
        };
        
        console.log(data); 
        var settings = {
        "async": true,
        "crossDomain": true,
        "url": api_url+"/create_session/",
        "method": "POST",
        
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
        },

        "data": data,
      }

      $.ajax(settings).done(function (response) {
        console.log(response);
        if (response.status_code==200) {
          localStorage.auth=JSON.stringify(response.session);
          Materialize.toast('Welcome!', 4000);
          window.location.href='pages/home.html';
        }
        Materialize.toast('Error!', 4000);
      });
    },

    register:function (argument) {
        // body...
        var data = {
          "fname": document.getElementById('first_name_val').value,
          "email": document.getElementById('email_val').value,
          "lname": document.getElementById('last_name_val').value,
          "password": document.getElementById('password_val').value,
          "phone": document.getElementById('phone_val').value
        };
        console.log(data); 
          var settings = {
          "async": true,
          "crossDomain": true,
          "url": api_url+"/new_user/",
          "method": "POST",
          "data": data,
          "headers": {
                "content-type": "application/x-www-form-urlencoded",

                },

      }

      $.ajax(settings).done(function (response) {
        console.log(response);
        if (response.status_code==200) {
          window.location.href='../index.html';
        }

        Materialize.toast('Error Creating Account!', 4000) 
      });
    },

    user:function (argument) {
        // body...
        if (localStorage.auth) {
            var info = JSON.parse(localStorage.getItem("auth"));

            var user_data='<a href="#!name"><span class="white-text name">'+info.fname+''+info.lname+'<br>'+info.email+'</span></a>';

            var user_field = document.getElementById('user_details_1');
                user_field.innerHTML=user_data;

        }
    },

    logout:function (argument) {
        // body...
        localStorage.removeItem("auth");
        window.location.href='../index.html';
    },

    data:function (argument) {
        
        if (localStorage.auth) {
            var info = JSON.parse(localStorage.getItem("auth"));
            return info;
        }
    },
};

var chat = {
    all_users:function(){
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": api_url+"/all_users/",
          "method": "GET",
          "headers": {
            
          }
        }

        $.ajax(settings).done(function (response) {
          console.log(response);
          var contact_out=document.getElementById('contact_out_id');
          for (var i = response.data.length - 1; i >= 0; i--) {
              
              var data = '<li class="collection-item avatar" style="margin:5px;" onclick="chat.load_chat('+response.data[i].id+');">'+
                          '<i class="material-icons circle grey darken-1">account_box</i>'+
                          '<span class="title">'+response.data[i].fname+''+response.data[i].lname+'</span>'+
                          '<p>'+response.data[i].phone+'<br>'+
                          '</p>'+
                          '<a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>'+
                        '</li>';
                 contact_out.innerHTML+=data;       
          }

        });
    },

    load_chat:function(id) {
        // body...
        window.location.href='support.html?id='+id;

    },

    send_message:function(id){
        $( "#chat_field_space_loader" ).show();
        var result = null,
        tmp = [];
        var items = window.location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            result = decodeURIComponent(tmp[1]);
        }

        var settings = {
          "async": true,
          "crossDomain": true,
          "url": api_url+"/send_message/",
          "method": "POST",
          "headers": {
            "content-type": "application/x-www-form-urlencoded",
          },
          "data": {
            "sender": authentication.data().id,
            "receiver": result,
            "chat_id":  chat.get_active_chat().chat_id,
            "message":document.getElementById('chat_send_message_id').value
          }
        }

        $.ajax(settings).done(function (response) {
          console.log(response);
          document.getElementById('chat_send_message_id').value='';
        });

    },
    get_active_chat:function (argument) {
        // body...
        if (localStorage.active_chat) {
            var info = JSON.parse(localStorage.getItem("active_chat"));
            return info;
        }
    }

};


 


