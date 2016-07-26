app.controller('IndexCtrl', function($http, $rootScope) {
	$rootScope.session.transitioning = false;
})
.controller('AboutCtrl', function($rootScope) {
	$rootScope.session.transitioning = false;

})
.controller('NotesCtrl', function($http, $rootScope) {
	$rootScope.session.transitioning = false;
	self = this;
	$http({url: $rootScope.session.url+'/note', method: 'GET'}).then(function(resp) {
		self.notes = resp.data;
	}).catch(function() {
		self.notes = "AJAX error";
	});
})
.controller('NavCtrl', function($scope, $rootScope, $auth, auth) {
	var self = this;
	$scope.$on('$routeChangeSuccess', function(event, next, last) {
		self.active = next.$$route.controllerAs;
	});

	this.login = function(provider) {
		$rootScope.session.transitioning = true;
		$auth.authenticate(provider).then(function() {
			auth.successIn('notes');
		}).catch(function() {
			auth.failedIn();
		});
	};

	this.logout = function() {
		$rootScope.session.transitioning = true;
		$auth.logout().then(function() {
			auth.successOut();
		}).catch(function() {
			auth.failedIn();
		})
	};
})
.controller('FootCtrl', function() {

});