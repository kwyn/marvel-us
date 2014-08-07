angular.module('comics', [
    'ui.router',
    'ui.bootstrap' ])
.config(function($stateProvider, $urlRouterProvider) {
  console.log("comics config");
  $stateProvider
    .state('comics', {
      url: "/comics",
      templateUrl: "/public/app/comics/comics.tpl.html",
      controller: "ComicsController",
      data: { pageTitle : "Comics"}
    })
    .state('comicsID',{
      url: "/comics/:comicID/",
      templateUrl: "",
      controller: "ComicsController",
      data: {pageTitle: "Comics"}
    })
})

.controller('ComicsController', function ComicsController($scope, $location, $stateParams,MarvelService){
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle  ;
    }
  });
  var marvelAPI = MarvelService;
  var requestConfig = {}
  var path = ['comics'];
  requestConfig.path = path;
  $scope.comics = null;
  $scope.options = {
    limit: 10,
    offset: 0
  };
  marvelAPI.get(requestConfig)
    .success(function(response){
      $scope.comics = response.data.results
      console.log(response.data.results)
    })
    .error(function(response, status) {
      console.log("Error", response, status);
    });

  var loadMore = function(){
    var currentOffset = $scope.options.offset;
    var currentLimit = $scope.options.limit;
    $scope.option.offset = currentOffset + currentLimit;

    marvelAPI.get(requestConfig)
      .success(function(response){
        $scope.comics = response.data.results
        console.log(response.data.results)
      })
      .error(function(response, status) {
        console.log("Error", response, status);
      });
  };
})
;