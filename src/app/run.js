app.run(function($rootScope, constants) {
	$rootScope.session = {host: constants.host, api: constants.api, transitioning: true};
});