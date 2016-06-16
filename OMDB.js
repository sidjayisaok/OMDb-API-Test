	$('#findMovie').click(function(){

		var movie = $('#movie-input').val();

		var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
		$.ajax({
				url: queryURL,
				method: 'GET'
		})

	//look at the object to figure out the format
		.done(function(response) {
			$("#movieView1").html(response.Title);
			$("#movieView2").html(response.Actors);
			$("#movieView3").html(response.Rated);
			$("#movieView4").html(response.Released);
			$("#movieView5").html(response.Runtime);
			$("#movieView6").html(response.Plot);
			$("#movieView7").html(response.imdbRating);
			//grabbing pictures is a bit more complicated
			var imageUrl = response.Poster;
			var img = $("<img>");
			img.attr('src', imageUrl);
			img.attr('alt', 'poster');
			$("#movieView8").empty();
			$('#movieView8').prepend(img);
		});
		return false;
	})