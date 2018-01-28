//An API key is needed for IMDb now :-/
const omdbButton = document.querySelector("#findMovie");
// console.log(omdbButton);

let movieInput = document.querySelector("#movie-input").attributes.value.textContent;

omdbButton.addEventListener('click', imdbGet(movieInput));

function imdbGet(movieInput){

    const xhr = new XMLHttpRequest();
    console.log(movieInput);
    let imdbURL = "https://www.omdbapi.com/?t=" + movieInput + "&y=&plot=long&r=json&tomatoes=true&apikey=a530764b";

    xhr.open('GET', imdbURL);

    xhr.onload = function() {

        if(xhr.status === 200) {
            let res = xhr.responseText;
            let results = JSON.parse(res);


            class omdbReturn {
                constructor(movieResults) {
                    this.movieResults = movieResults;
                }

                getResults() {
                    console.log(this.movieResults);            
                }

                getActors() {
                    console.log(this.movieResults.Title + " stars: " + this.movieResults.Actors);
                }

                getBoxOffice() {
                    console.log("Net gross ticket sales ($USD): " + this.movieResults.BoxOffice);
                }

                getMovieDirector() {
                    console.log(this.movieResults.Title + " was directed by: " + this.movieResults.Director);
                }

                getMovieAwards() {
                    if(this.movieResults.Awards.indexOf("N/A") !== -1){
                        console.log(this.movieResults.Title + " has won no awards.")
                    }
                    else {
                        console.log(this.movieResults.Title + " has " + this.movieResults.Awards);
                    }
                }

                getReleaseDate() {
                    console.log(this.movieResults.Title + " was released on " + this.movieResults.Released + ".");
                }

                getRunTime() {
                    console.log(this.movieResults.Title + " is approximately " + this.movieResults.Runtime + " long."); 
                }

                getMovieRating() {
                    console.log("Rated: " + this.movieResults.Rated);
                }

                getMovieProducers() {
                    console.log(this.movieResults.Title + " was produced by " + this.movieResults.Production + ".");
                }

                getMoviePlot() {
                    console.log("Synopsis: " + this.movieResults.Plot);
                }               

                getIMDBRatings() {
                    console.log(this.movieResults.Ratings[0].Source + " has it rated at " + this.movieResults.Ratings[0].Value + ".");
                }               

                getRottenTomatoesRating() {
                    var tomatoRatings = parseInt(this.movieResults.Ratings[1].Value);

                    if(tomatoRatings < 60) {
                        console.log(this.movieResults.Ratings[1].Source + " gives it a " + this.movieResults.Ratings[1].Value + " rotten rating.")
                    }
                    else {
                        console.log(this.movieResults.Ratings[1].Source + " gives it a " + this.movieResults.Ratings[1].Value + " fresh rating.");
                    }
                }

                getMetaScore() {
                    console.log(this.movieResults.Ratings[2].Source + " has it rated at " + this.movieResults.Ratings[2].Value + ".");
                }
                
                getIMDBVotes() {
                    console.log(this.movieResults.Title + " currently has " + this.movieResults.imdbVotes + " votes on Internet Movie Database.");
                }
            }

            let omdbResults = new omdbReturn(results);

            omdbResults.getResults(results);
            omdbResults.getActors(results);
            omdbResults.getBoxOffice(results);
            omdbResults.getMovieDirector(results);
            omdbResults.getMovieAwards(results);
            omdbResults.getReleaseDate(results);
            omdbResults.getRunTime(results);
            omdbResults.getMovieRating(results);
            omdbResults.getMovieProducers(results);
            omdbResults.getMoviePlot(results);
            omdbResults.getRottenTomatoesRating(results);
            omdbResults.getIMDBRatings(results);
            omdbResults.getMetaScore(results);
            omdbResults.getIMDBVotes(results);              

        }

        else {
            console.log('An error occured: ' + xhr.status);
        }

        return false;
    }

    xhr.send();

}




