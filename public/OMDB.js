	$('#findMovie').on('click', function(){

		//animate.css logic for poster
		var bounceClass ='animated zoomIn';
		var flipClass ='animated flip';
		var endClass ='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		//error handler
		var errorPic = "https://i.imgur.com/McrUIih.png";

		//search variable
		var movieOriginal = $('#movie-input').val();

		//lodash fix for search results
		var movie = _.startCase(movieOriginal);

		//added rotten tomatoes API
		var imdbURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=long&r=json&tomatoes=true";

		//IMDB API call
		$.ajax({
			url: imdbURL,
			method: 'GET'
		})
		.done(function(response) {
			$("#movieTitle").html(response.Title);
			$("#movieActors").html("Starring " + response.Actors);
			$("#movieRated").html("Rated " + response.Rated);
			$("#movieRelease").html(response.Released);
			$("#movieRuntime").html(response.Runtime);
			$("#movieRating").html("IMDb rates this a " + response.imdbRating);
			$("#tomatoesRating").html("Rotten Tomatoes rates this a " + response.tomatoRating);
			$("#movieLanguage").html("Languages include: " + response.Language);
			$("#movieAwards").html(response.Awards);
			//grabbing pictures is a bit more complicated
			var imageUrl = response.Poster;
			var img = $("<img>");
			//this makes the poster image animate when clicked
			$(img).on({
					'click': function(){
							$(img).addClass(bounceClass).one(endClass, function(){
									$(this).removeClass(bounceClass);
							})
					},
			//this makes the poster image animate when hovering over them via the mouse
					'mouseover': function(){
							$(img).addClass(flipClass).one(endClass, function(){
									$(this).removeClass(flipClass);
							})
					}
			});
			//error handling and poster logic
			img.error(function(){
				img.attr('src', errorPic);
			})
			.attr('src', imageUrl);
			img.attr('alt', 'poster');
			$("#moviePoster").empty();
			$('#moviePoster').prepend(img);
			});

		//wikipedia API implementation
		var wikiURL ="https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + movie + "&callback=?";

        $.ajax({
      	    method: "GET",
      	    url: wikiURL,
      	    contentType: "application/json; charset=utf-8",
      	    async: false,
      	    dataType: "jsonp",
      	    success: function (data, textStatus, jqXHR) {
							$("#movieWiki").empty();
		            var markup = data.parse.text["*"];
		        		var div = $("<div>").html(markup);
		        		// remove links as they will not work
		        		div.find('a').each(function() {
							 $(this).replaceWith($(this).html());
						 });
        		// remove any references
        		div.find('sup').remove();
        		// remove cite error
        		div.find('.mw-ext-cite-error').remove();
						//final wiki data scrape
        		$("#movieWiki").html($(div).find('p'));
						//in case wikipedia returns too little info, default to IMDB
						if($("#movieWiki").text().length <= 100) {
							$("#movieWiki").empty();
							$.ajax({
								url: imdbURL,
								method: 'GET'
							})
							.done(function(response){
								$("#movieWiki").html(response.Plot);
							});
						}
					},
					error: function (errorMessage) {
						}
					});

  return false;

	})
