var filmdb;

<!----------------------------------- first time running -------------------------------------------------->

var items = new Array();


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
	alert("page loaded");
	<!-----------------------------------Storage -------------------------------------------------------------->  
    // If app is being run for the first time, load the default list of films
if (window.localStorage.getItem("first") === null )
 {
	window.localStorage.setItem("first", "no");
	window.localStorage.setItem("filmstore",JSON.stringify(films));
	items = JSON.parse(window.localStorage.getItem("filmstore"));
}
else {
	items = JSON.parse(window.localStorage.getItem("filmstore"));
	
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

setUpRactive();
}







