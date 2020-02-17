		
localStorage.setItem('page', 0);
$(document).ready(function () {

	 
});  



var explore = {
				
	getFeeds: function () {
		var page = parseInt(localStorage.page) + 1;
		console.log(page);
		localStorage.setItem('page', page);
			var settings = {
					"async": true,
					"crossDomain": true,
					"url": api_url+"/search_data/?page="+page,
					"method": "GET",
					"headers": {
						 
					}
			}

			$( "#loading_screen_div" ).show();

			$.ajax(settings).done(function (response) {
					var out = response.message
					localStorage.setItem('tots', parseInt(localStorage.tots) + parseInt(out.length));
					var explore_body= document.getElementById('explore_content');
					if (response.status_code==500) {
						console.log('error');
						explore_body.innerHTML =  "error";  

							return;
					}
					
					if (parseInt(localStorage.tots) == response.total) {
						return;
					}
				
					console.log(out);

					for (var i = out.length - 1; i >= 0; i--) {

						var built ='<a href="'+out[i].link+'" class="black-text">'+
							'<div class="row">'+
							'<div class="col s12">'+
							'<div class="card">'+
							'<div class="card-image">'+
							'<img src="'+out[i].image+'">'+
										
		
							'</div>'+
							'<div class="card-content">' +
							'<span class="card-title">'+out[i].title+'</span>'+
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

					explore_body.innerHTML +=  ""; 
					$( "#loading_screen_div" ).hide();
			});
		}
}

explore.getFeeds();  
        