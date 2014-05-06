$(function(){
  var filmlist = [
    { value: 'Harry Potter and the Philosophers Stone', data: '(2001)' },
    { value: 'Harry Potter and the Chamber of Secrets', data: '(2002)' },
    { value: 'Harry Potter and the Prisoner of Azkaban', data: '(2004)' },
    { value: 'Harry Potter and the Goblet of Fire', data: '(2005)' },
    { value: 'Harry Potter and the Order of the Phoenix', data: '(2007)' },
    { value: 'Harry Potter and the Half-Blood Prince', data: '(2009)' },
    { value: 'Harry Potter and the Deathly Hallows – Part 1', data: '(2010)' },
    { value: 'Harry Potter and the Deathly Hallows – Part 2', data: '(2011)' },
  ];
  
  // setup autocomplete function pulling from currencies[] array
$('#autocomplete').autocomplete({
    lookup: filmlist,
    onSelect: function (suggestion) {
		var index = filmlist.indexOf(suggestion);
       var thehtml = '<strong>Film Title:</strong> ' + suggestion.value + suggestion.index + ' <br> <strong>Year:</strong> ' + suggestion.data;
    $('#outputcontent').html(thehtml);
    }
});
  

});