app.config(function($provide, $routeProvider, $locationProvider, $httpProvider, $authProvider, toastrConfig, constants) {
	$provide.factory('XSRFInterceptor', function($cookies) {
		return {
			request: function(config) {
				var cookie = $cookies.get('XSRF-TOKEN');
				if(cookie) {
					config.headers['X-XSRF-TOKEN'] = cookie;
				}
				return config;
			}
		};
	});
	$httpProvider.interceptors.push('XSRFInterceptor');
	$httpProvider.defaults.withCredentials = true;

	$locationProvider.html5Mode(true);

	$authProvider.baseUrl = constants.api;
	$authProvider.withCredentials = true;
	$authProvider.google({
		clientId: '786999100982-9ugrvcg6gfh8412vjaqecj3c9i6376up.apps.googleusercontent.com'
	});

	$routeProvider.otherwise({
	    redirectTo: '/'
	});
	$routeProvider
	.when('/', {
		templateUrl: 'views/index.html',
		controller: 'IndexCtrl',
		controllerAs: 'index',
		resolve: {
			check: function(auth) {
				return auth.check('index');
			}
		}
	})
	.when('/notes', {
		templateUrl: 'views/notes.html',
		controller: 'NotesCtrl',
		controllerAs: 'notes',
		resolve: {
			check: function(auth) {
				return auth.check('notes');
			}
		}
	});

	angular.extend(toastrConfig, {
		positionClass: 'toast-top-center',
		timeOut: 3000,
		maxOpened: 1
	});
});