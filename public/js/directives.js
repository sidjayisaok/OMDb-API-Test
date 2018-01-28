movieApp.directive('omdbImage', function(){
    return {
        restrict : 'E',
        templateUrl : '../omdb-image.htm'
    };
})
.directive('omdbSummary', function(){
    return {
        restrict : 'E',
        templateUrl : '../omdb-summary.htm'
    };
});