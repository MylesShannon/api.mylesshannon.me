app.run(function($rootScope, constants) {
	$rootScope.session = {url: constants.host, transitioning: true};
});