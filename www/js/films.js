var films = [
  { genreA:'Mystery', genreB:'Adventure', title: 'Todo list page', year: '2014', fave: 'on watch', info: 'todo.html' },
  { genreA:'Romance', genreB:'Comedy',title: 'Search page', year: '2014',fave: 'on watch', info: 'search.html' },
   { genreA:'Action', genreB:'Adventure',title: 'Harry Potter and the Philosophers Stone', year: '2001', fave: 'z', info: 'search.html'},
    { genreA:'Musical', genreB:'Thriller',title: 'Harry Potter and the Chamber of Secrets', year: '2002', fave: 'on watch', info: 'search.html'},
    { genreA:'Western', genreB:'Comedy',title: 'Harry Potter and the Prisoner of Azkaban', year: '2004',fave: 'z', info: 'search.html'},
    { genreA:'Science Fiction', genreB:'Musical',title: 'Harry Potter and the Goblet of Fire', year: '2005', fave: 'on watch', info: 'search.html'},
    { genreA:'Thriller', genreB:'Historical',title: 'Harry Potter and the Order of the Phoenix', year: '2007', fave: 'z', info: 'search.html'},
    { genreA:'Horror', genreB:'Fantasy',title: 'Harry Potter and the Half-Blood Prince', year: '2009', fave: 'on watch', info: 'search.html'},
    { genreA:'Western', genreB:'Action',title: 'Harry Potter and the Deathly Hallows – Part 1', year: '2010', fave: 'on watch', info: 'search.html'},
    { genreA:'Horror', genreB:'Mystery',title: 'Harry Potter and the Deathly Hallows – Part 2', year: '2011', fave: 'z', info: 'search.html'}
];

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	<!-----------------------------------Storage -------------------------------------------------------------->  
    Storage.prototype.setArray = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
	}
	Storage.prototype.getArray = function(key) {
    return JSON.parse(this.getItem(key))
	}

<!----------------------------------- first time running -------------------------------------------------->

// If app is being run for the first time, load the default list of films
if (window.localStorage.getItem("first") === null )
 {
	window.localStorage.setItem("first", "no");
	window.localStorage.setArray("filmstore", films);
	items = window.localStorage.getArray("filmstore");
}
else {
	items = window.localStorage.getArray("filmstore");
}

<!-----------------------------------digits only js ------------------------------------------------------->
$(document).ready(function () {
  //called when key is pressed in textbox
  $("#yearInput").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#errmsg").html("Numbers Only").show().fadeOut("slow");
               return false;
    }
   });
});
}




var filtered = items;
var selected;

<!----------------------------------- create main ractive(filmdb) View ---------------------------------->

var filmdb = new Ractive({
	
  el: 'output',
  template: '#appView',
  data: {
genre1: "select",
genre2: "select",
    filminfo: filtered,
	
    sort: function ( array, column ) {
      array = array.slice(); // clone, so we don't modify the underlying data
  
      return array.sort( function ( a, b ) {
        return a[ column ] < b[ column ] ? -1 : 1;
      });
    },
    sortColumn: 'title'
  }
  
});


var one = "select";
var two = "select";

<!----------------------------------- ractive(filmdb) events Model -------------------------------------->

filmdb.on( {
	
<!----------------------------------- genrePad select --------------------------------------------------->
	select: function (event, id){
		node = event.node.getAttribute( 'value' );
       // id = this.id;
		
		var $img = $(this);
   var id = $img.attr("id");


	if (one == node){one = "select"; this.set({genre1:one});$("#item").css("opacity", 1.0);} // unselect first
	else if (two == node){two = "select"; this.set({genre2:two});$("#item").css("opacity", 1.0);} // unselect second
	
	else if (one == "select" && two != "select"){
		one = node;
		this.set({genre1:one}); // first selected if second has a value and first does not
		$("#item").css("opacity", 0.3);	
		}
		else if (two == "select"){
		if (one == "select")
		{
		one = node;
		this.set({genre1:one}); // first selected
		$('#' + id).css("opacity", 0.3); 
			
		}
		else {
			two = node;
			this.set({genre2:two});  // second selected
			$("#item").css("opacity", 0.3);
			}
		}
			
		alert(one + '  ' + two + "  selected");		

		if (two != "select" && one != "select") // fix jquery mobile / ractive update problem
		{
		filtered = items.filter(function (el) {return (el.genreA === one || el.genreA === two || el.genreB === one || el.genreB === two);}); // filter item one or one and two
		this.set({filminfo: filtered}); // update ractive
		}

	},

<!----------------------------------- sort films -------------------------------------------------------->

	sort: function ( event, column ) { // sort column
 		this.set( 'sortColumn', column );
 	},

<!----------------------------------- add new film ------------------------------------------------------>
		 
	add: function ( event, fTitle, fYear ) {
 		 var newFilm = {
 		 title: fTitle,
 		 year: fYear,
 		 fave: 'z',
 		 info: 'search.html'
		};
		var arr = [1, 2, ['test', 'Action'], 5];

alert (arr[2][0] + ' film added'); //alerts "test"
		items.push( newFilm );
		window.localStorage.setArray("filmstore", items);
		
		
		
	},
	
<!----------------------------------- remove selected film -------------------------------------------->	
  
	remove: function ( event, title) { // Remove item
		var sortedTitle = title;
		var titleArrayPosition;

	   for (var i=0, iLen=items.length; i<iLen; i++) {  // loop through objects in items array
		if (items[i].title == sortedTitle) titleArrayPosition = items[i];  // search for title
	   }	
		var titleArrayIndex = items.indexOf(titleArrayPosition);
			alert(sortedTitle + '  is being removed at index position  ' + titleArrayIndex);
			
		items.splice(titleArrayIndex, 1);  // remove object (defined by index number) from items array
		window.localStorage.setArray("filmstore", items); // update changes
		if (two != "select" && one != "select") // fix jquery mobile / ractive update glitch
		{
		filtered = items.filter(function (el) {return (el.genreA === one || el.genreA === two || el.genreB === one || el.genreB === two);}); // filter item one or one and two
		this.set({filminfo: filtered}); // update ractive
		}
	},
	
<!----------------------------------- reset app ------------------------------------------------------->	

	 reset: function ( event ) {
	window.localStorage.removeItem('first');
	window.location.reload();
	}
	
	
});
	



