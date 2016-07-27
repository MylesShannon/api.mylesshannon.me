app.service('auth', function($rootScope, $auth, $location, $q, constants, toastr, $http) {
	var self = this;

	this.check = function(state) {
		var deffered = $q.defer();
		function requireIn(state) {
			for(var i = 0; i < constants.states.requireIn.length; i++) {
				if(constants.states.requireIn[0] === state) {
					return true;
				}
			}
			return false;

		}

		if(requireIn(state) ) {
			if($auth.isAuthenticated() ) {
				$rootScope.session.user = self.getUserData();
				$rootScope.session.loggedIn = true;
				deffered.resolve();
			} else {
				$rootScope.session.loggedIn = false;
				$location.path('/');
				deffered.resolve();
			}
		} else {
			if($auth.isAuthenticated() ) {
				$rootScope.session.user = self.getUserData();
				$rootScope.session.loggedIn = true;
				deffered.resolve();
			} else {
				$rootScope.session.loggedIn = false;
				deffered.resolve();
			}
		}

		return deffered.promise;
	};

	self.getUserData = function() {
		if($rootScope.session.loggedIn === false) {
			$http({url: $rootScope.session.api+'/user', method: 'GET'}).then(function(resp) {
				return resp.data;
			});
		} else {
			return $rootScope.session.user;
		}
	};

	this.successIn = function(where) {
		$rootScope.session.user = self.getUserData();
		$rootScope.session.transitioning = false;
		$rootScope.session.loggedIn = true;
		toastr.success('You were logged in!', 'Success');
		return $location.path('/'+where);
	};

	this.failedIn = function() {
		$rootScope.session.transitioning = false;
		$rootScope.session.loggedIn = false;
		toastr.error('Something went wrong logging you in!', 'Error');
		return;
	};

	this.successOut = function() {
		$rootScope.session.user = null;
		$rootScope.session.transitioning = false;
		$rootScope.session.loggedIn = false;
		toastr.success('You were logged out!', 'Success');
		return $location.path('/');
	};

	this.failedOut = function() {
		$rootScope.session.transitioning = false;
		$rootScope.session.loggedIn = true;
		toastr.error('Something went wrong logging you out!', 'Error');
		return;
	};
});