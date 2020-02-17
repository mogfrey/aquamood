
$(document).ready(function(){
    // Example
    (function() {
            // Initialize
      var bLazy = new Blazy({
        selector:'img',
      });
    })();





  //pull down refresh
  $("#deviceready").pullToRefresh({
      refresh:300,
  })
  .on("refresh.pulltorefresh", function (){
        //location.reload();
      story_loader();
  });
    //end of pull down refresh
    

	$('ul.tabs').tabs({
		swipeable:false,

	});

  $('.modal').modal();

	$('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
      onOpen: function(el) {  }, // A function to be called when sideNav is opened
      //onClose: function(el) { /* Do Stuff* / }, // A function to be called when sideNav is closed
    }
  );

  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );
        
});

