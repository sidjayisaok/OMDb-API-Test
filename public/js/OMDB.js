	$('#findMovie').on('click', function(){

			//our d3 pie chart
const pieGraph = (a)=>{
    //remove duplicates
    d3.select("svg").remove();
    //set up pie graph
    let w = 300,                        
        h = 300,
        r = 150

		console.log(a);

        color = d3.scale.category20c();
        //my data fields    
        data = [
                {"label":"IMDB rating", "value": (10*a)/100},
				{"label":"Unfavorables", "value": (100 - (10*a))/100 }
               ];

    //target the page with data
    let vis = d3.select("#piegraph")
                .append("svg:svg")             
                .data([data])
                .attr("width", w)           
                .attr("height", h)
                .attr("class", "myTarget")
                .append("svg:g")           
                .attr("transform", "translate(" + r + "," + r + ")")
                 
    let arc = d3.svg.arc()              
                .outerRadius(r);
    let pie = d3.layout.pie()           
                .value((d)=> { return d.value; }); 
    let arcs = vis.selectAll("g.slice")     
                  .data(pie)
                  .enter()                            
                  .append("svg:g")                
                  .attr("class", "slice"); 
        
        arcs.append("svg:path")
            .attr("fill", (d, i)=> { return color(i); } ) 
            .attr("d", arc);                                    
        
        arcs.append("svg:text")                                     
            .attr("transform", (d)=> {                   
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .style("fill", "#335533")
            .text((d, i)=> {return data[i].label + ": " + data[i].value.toFixed(2)*100;});
}  

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
			$("#movieTitle").html("<h4>" + response.Title + "</h4>");
			$("#movieActors").html("<h4>Starring " + response.Actors + "</h4>");
			$("#movieRated").html("<h4>Rated " + response.Rated + "</h4>");
			$("#movieRelease").html("<h4>" + response.Released + "</h4>");
			$("#movieRuntime").html("<h4>" + response.Runtime + "</h4>");
			$("#movieRating").html("<h4>IMDb rates this a " + response.imdbRating + "</h4>");
			$("#tomatoesRating").html("<h4>Rotten Tomatoes rates this a " + response.tomatoRating + "</h4>");
			$("#movieLanguage").html("<h4>Languages include: " + response.Language + "</h4>");
			$("#movieAwards").html("<h4>" + response.Awards + "</h4>");

			//piegraph attempt
			$("#piegraph").html(pieGraph(response.imdbRating));

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


