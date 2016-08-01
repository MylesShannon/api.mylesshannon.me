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

		if($auth.isAuthenticated() ) {
			if($rootScope.session.loggedIn === false) {
				self.getUserData().then(function(resp) {
					$rootScope.session.user = resp;
					$rootScope.session.loggedIn = true;
					deffered.resolve();
				});
			} else {
				$rootScope.session.loggedIn = true;
				deffered.resolve();
			}
		} else {
			$rootScope.session.loggedIn = false;
			if(requireIn(state)) { $location.path('/'); }
			deffered.resolve();
		}
		return deffered.promise;
	};

	self.login = function(provider) {
		$rootScope.session.transitioning = true;
		setTimeout(function() {toastr.info('Logging you in...');}, 600);
		$auth.authenticate(provider).then(function() {
			self.getUserData().then(function(resp) {
				$rootScope.session.user = resp;
				$rootScope.session.transitioning = false;
				$rootScope.session.loggedIn = true;
				toastr.success('You were logged in!', 'Success');
				return $location.path('/notes');
			});
		}).catch(function() {
			$rootScope.session.transitioning = false;
			$rootScope.session.loggedIn = false;
			toastr.error('Something went wrong logging you in!', 'Error');
			return;
		});
	};

	self.logout = function() {
		$rootScope.session.transitioning = true;
		$auth.logout().then(function() {
			$rootScope.session.user = null;
			$rootScope.session.transitioning = false;
			$rootScope.session.loggedIn = false;
			toastr.success('You were logged out!', 'Success');
			return $location.path('/');
		}).catch(function() {
			$rootScope.session.transitioning = false;
			$rootScope.session.loggedIn = true;
			toastr.error('Something went wrong logging you out!', 'Error');
			return;
		});
	};

	self.getUserData = function() {
		var deffered = $q.defer();
		$http({url: $rootScope.session.api+'/user', method: 'GET'}).then(function(resp) {
			deffered.resolve(resp.data);
		});
		return deffered.promise;
	};
});