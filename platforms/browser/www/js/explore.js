    $(document).ready(function(){

        var explore ={
	    	getFeeds: function(){
		        var settings = {
		            "async": true,
		            "crossDomain": true,
		            "url": api_url+"/search_data/",
		            "method": "GET",
		            "headers": {
		               
		            }
		        }

		        $( "#loading_screen_div" ).show();

		        $.ajax(settings).done(function (response) {
		            var out= response.message.items
		           	var explore_body= document.getElementById('explore_content');
		            if (response.status_code==500) {

		            	console.log('error');
		            	explore_body.innerHTML =  "error";  

		            	return;
		            }
		            for (var i = out.length - 1; i >= 0; i--) {

		            	var built='<a href="'+out[i].link+'" class="black-text">'+
		            				'<div class="row">'+
						            '<div class="col s12">'+
						              '<div class="card">'+
						                '<div class="card-image">'+
						                  //'<img src="http://placehold.it/200x100">'+
						                  //'<span class="card-title">'+out[i].tittle+'</span>'+
						                  //'<a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>'+
						                '</div>'+
						                '<div class="card-content">'+
						                	'<h3>'+out[i].title+'</h3>'+
						                  '<p>'+out[i].snippet+'</p>'+
						                '</div>'+
						              '</div>'+
						            '</div>'+
						          '</div>'+
						          '</a>';

						explore_body.innerHTML +=  built;       
			            
		            }
		           	$( "#loading_screen_div" ).hide();

		        });


		        $( document ).ajaxError(function( event, request, settings ) {
		           	var explore_body= document.getElementById('explore_content');
		        	console.log(request);

		        	explore_body.innerHTML =  "<center>error</center>"; 
		        	$( "#loading_screen_div" ).hide();
				});
  		  	}
		}

		explore.getFeeds();
        
    });    
        