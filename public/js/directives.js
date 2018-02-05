movieApp.directive('omdbImage', function(){
    return {
        restrict : 'C',
        templateUrl : '../omdb-image.htm'
    };
})
.directive('omdbSummary', function(){
    return {
        restrict : 'C',
        templateUrl : '../omdb-summary.htm'
    };
});