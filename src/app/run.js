app.run(function($rootScope, constants, $http, $cookies) {
	$rootScope.session = {host: constants.host, api: constants.api, transitioning: true, loggedIn: false};
	$http({url: constants.api, method: 'GET'});
});