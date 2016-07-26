app.service('auth', function($rootScope, $auth, $location, $q, constants, toastr, $http) {
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

		function getUserData() {
			$http({url: $rootScope.session.url+'/user', method: 'GET'}).then(function(resp) {
				$rootScope.session.user = resp.data;
			});
		}

		if(requireIn(state) ) {
			if($auth.isAuthenticated() ) {
				getUserData();
				$rootScope.session.loggedIn = true;
				deffered.resolve();
			} else {
				$rootScope.session.loggedIn = false;
				$location.path('/');
				deffered.resolve();
			}
		} else {
			if($auth.isAuthenticated() ) {
				getUserData();
				$rootScope.session.loggedIn = true;
				deffered.resolve();
			} else {
				$rootScope.session.loggedIn = false;
				deffered.resolve();
			}
		}

		return deffered.promise;
	}

	this.successIn = function(where) {
		getUserData();
		$rootScope.session.transitioning = false;
		$rootScope.session.loggedIn = true;
		toastr.success('You were logged in!', 'Success');
		return $location.path('/'+where);
	}

	this.failedIn = function() {
		$rootScope.session.transitioning = false;
		$rootScope.session.loggedIn = false;
		toastr.error('Something went wrong logging you in!', 'Error');
		return;
	}

	this.successOut = function() {
		$rootScope.session.user = null;
		$rootScope.session.transitioning = false;
		$rootScope.session.loggedIn = false;
		toastr.success('You were logged out!', 'Success');
		return $location.path('/');
	}

	this.failedOut = function() {
		$rootScope.session.transitioning = false;
		$rootScope.session.loggedIn = true;
		toastr.error('Something went wrong logging you out!', 'Error');
		return;
	}
});