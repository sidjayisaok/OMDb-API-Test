document.addEventListener("DOMContentLoaded", function(){

        //An API key is needed for IMDb now :-/
    const omdbButton = document.querySelector("#findMovie");
    const getResults = document.querySelector("omdb-summary");
    const getImage = document.querySelector("omdb-image");
    let movieButton = document.querySelector("#movie-input");
    let movieInput = movieButton.attributes.value.textContent;

    function imdbGet(param){

        movieButton.setAttribute('value', param);
        console.log(movieButton.attributes);

        const xhr = new XMLHttpRequest();

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
                        let actorsResults = this.movieResults.Title + " stars: " + this.movieResults.Actors;
                        let div1 = document.createElement('div');
                        let actorsBox = document.createTextNode(actorsResults);
                        div1.appendChild(actorsBox);
                        getResults.appendChild(div1);   

                        console.log(this.movieResults.Title + " stars: " + this.movieResults.Actors);
                    }

                    getBoxOffice() {
                        let boxOfficeResults = "Net gross ticket sales ($USD): " + this.movieResults.BoxOffice;
                        let div2 = document.createElement('div');
                        let boxOfficeBox = document.createTextNode(boxOfficeResults);
                        div2.appendChild(boxOfficeBox);
                        getImage.appendChild(div2);

                        console.log("Net gross ticket sales ($USD): " + this.movieResults.BoxOffice);
                    }

                    getMovieDirector() {
                        let directorResults = this.movieResults.Title + " was directed by: " + this.movieResults.Director;
                        let div3 = document.createElement('div');
                        let directorBox = document.createTextNode(directorResults);
                        div3.appendChild(directorBox);
                        getResults.appendChild(div3);

                        console.log(this.movieResults.Title + " was directed by: " + this.movieResults.Director);
                    }

                    getMovieAwards() {

                        let awardsResults;

                        if(this.movieResults.Awards.indexOf("N/A") !== -1){
                            awardsResults = this.movieResults.Title + " has won no awards.";
                            console.log(this.movieResults.Title + " has won no awards.")
                        }
                        else {
                            awardsResults = this.movieResults.Title + " has " + this.movieResults.Awards;
                            console.log(this.movieResults.Title + " has " + this.movieResults.Awards);
                        }

                        let div4 = document.createElement('div');
                        let awardsBox = document.createTextNode(awardsResults);
                        div4.appendChild(awardsBox);
                        getResults.appendChild(div4);
                    }

                    getReleaseDate() {
                        let releaseDateResults = this.movieResults.Title + " was released on " + this.movieResults.Released + ".";
                        let div5 = document.createElement('div');
                        let releaseDateBox = document.createTextNode(releaseDateResults);
                        div5.appendChild(releaseDateBox);
                        getResults.appendChild(div5);

                        console.log(this.movieResults.Title + " was released on " + this.movieResults.Released + ".");
                    }

                    getRunTime() {
                        let runTimeResults = this.movieResults.Title + " is approximately " + this.movieResults.Runtime + " long.";
                        let div6 = document.createElement('div');
                        let runTimeBox = document.createTextNode(runTimeResults);
                        div6.appendChild(runTimeBox);
                        getResults.appendChild(div6);

                        console.log(this.movieResults.Title + " is approximately " + this.movieResults.Runtime + " long."); 
                    }

                    getMovieRating() {
                        let movieRatingResults = "Rated: " + this.movieResults.Rated;
                        let div7 = document.createElement('div');
                        let movieRatingsBox = document.createTextNode(movieRatingResults);
                        div7.appendChild(movieRatingsBox);
                        getImage.appendChild(div7);

                        console.log("Rated: " + this.movieResults.Rated);
                    }

                    getMovieProducers() {
                        let producerResults = this.movieResults.Title + " was produced by " + this.movieResults.Production + ".";
                        let div8 = document.createElement('div');
                        let producersBox = document.createTextNode(producerResults);
                        div8.appendChild(producersBox);
                        getResults.appendChild(div8);

                        console.log(this.movieResults.Title + " was produced by " + this.movieResults.Production + ".");
                    }

                    getMoviePlot() {
                        let plotResults = "Synopsis: " + this.movieResults.Plot;
                        let div9 = document.createElement('div');
                        let plotBox = document.createTextNode(plotResults);
                        div9.appendChild(plotBox);
                        getResults.appendChild(div9);

                        console.log("Synopsis: " + this.movieResults.Plot);
                    }               

                    getIMDBRatings() {
                        let imdbRatingsResults = this.movieResults.Ratings[0].Source + " has it rated at " + this.movieResults.Ratings[0].Value + ".";
                        let div10 = document.createElement('div');
                        let imdbRatingsBox = document.createTextNode(imdbRatingsResults);
                        div10.appendChild(imdbRatingsBox);
                        getResults.appendChild(div10); 

                        console.log(this.movieResults.Ratings[0].Source + " has it rated at " + this.movieResults.Ratings[0].Value + ".");
                    }               

                    getRottenTomatoesRating() {

                        let tomatoResults;
                        let tomatoRatings = parseInt(this.movieResults.Ratings[1].Value);

                        if(tomatoRatings < 60) {
                            tomatoResults = this.movieResults.Ratings[1].Source + " gives it a " + this.movieResults.Ratings[1].Value + " rotten rating.";
                            console.log(this.movieResults.Ratings[1].Source + " gives it a " + this.movieResults.Ratings[1].Value + " rotten rating.")
                        }
                        else {
                            tomatoResults = this.movieResults.Ratings[1].Source + " gives it a " + this.movieResults.Ratings[1].Value + " fresh rating."; 
                            console.log(this.movieResults.Ratings[1].Source + " gives it a " + this.movieResults.Ratings[1].Value + " fresh rating.");
                        }

                        let div11 = document.createElement('div');
                        let tomatoBox = document.createTextNode(tomatoResults);
                        div11.appendChild(tomatoBox);
                        getResults.appendChild(div11);

                    }

                    getMetaScore() {
                        let metaScoreResults = this.movieResults.Ratings[2].Source + " has it rated at " + this.movieResults.Ratings[2].Value + ".";
                        let div12 = document.createElement('div');
                        let metaScoreBox = document.createTextNode(metaScoreResults);
                        div12.appendChild(metaScoreBox);
                        getResults.appendChild(div12);

                        console.log(this.movieResults.Ratings[2].Source + " has it rated at " + this.movieResults.Ratings[2].Value + ".");
                    }
                    
                    getIMDBVotes() {
                        let imdbVotesResults = this.movieResults.Title + " currently has " + this.movieResults.imdbVotes + " votes on Internet Movie Database.";
                        let div13 = document.createElement('div');
                        let imdbVotesBox = document.createTextNode(imdbVotesResults);
                        div13.appendChild(imdbVotesBox);
                        getResults.appendChild(div13);

                        console.log(this.movieResults.Title + " currently has " + this.movieResults.imdbVotes + " votes on Internet Movie Database.");
                    }

                    getPhoto() {
                        let imdbPosterResults = this.movieResults.Poster;
                        let imdbWebsiteResults = this.movieResults.Website;
                        let div14 = document.createElement('div');
                        let posterImg = document.createElement('img');
                        let linkImg = document.createElement('a');
                        linkImg.setAttribute('href', imdbWebsiteResults);
                        posterImg.setAttribute("src", imdbPosterResults);
                        linkImg.appendChild(posterImg);
                        div14.appendChild(linkImg);
                        getImage.appendChild(div14);

                        console.log(this.movieResults.Poster);
                    }

                    getDVD() {
                        let dvdResults = "DVD release: " + this.movieResults.DVD;
                        let div15 = document.createElement('div');
                        let dvdResultsBox = document.createTextNode(dvdResults);
                        div15.appendChild(dvdResultsBox);
                        getImage.appendChild(div15);
                    }

                    getYear() {
                        let yearResults = "Year: " + this.movieResults.Year;
                        let div16 =document.createElement('div');
                        let yearResultsBox = document.createTextNode(yearResults);
                        div16.appendChild(yearResultsBox);
                        getImage.appendChild(div16);
                    }                    

                }

                let omdbResults = new omdbReturn(results);
                omdbResults.getResults(results);                
                omdbResults.getPhoto(results);
                omdbResults.getMoviePlot(results);
                omdbResults.getActors(results);
                omdbResults.getMovieDirector(results);
                omdbResults.getMovieAwards(results);
                omdbResults.getReleaseDate(results);
                omdbResults.getRunTime(results);              
                omdbResults.getMovieProducers(results);
                omdbResults.getRottenTomatoesRating(results);
                omdbResults.getIMDBRatings(results);
                omdbResults.getMetaScore(results);
                omdbResults.getIMDBVotes(results);
                omdbResults.getMovieRating(results);                
                omdbResults.getDVD(results);
                omdbResults.getYear(results);
                omdbResults.getBoxOffice(results);                

            }

            else {
                console.log('An error occured: ' + xhr.status);
            }

            return false;
        }

        xhr.send();

        return false;
    };

    let returnIMDB = imdbGet(movieInput);

    omdbButton.addEventListener('click', imdbGet);

    returnIMDB;
});






