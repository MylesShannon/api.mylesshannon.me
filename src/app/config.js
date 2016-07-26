app.config(function($routeProvider, $locationProvider, $authProvider, toastrConfig) {

	$locationProvider.html5Mode(true);

	$authProvider.baseUrl = '/';
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
	.when('/about', {
		templateUrl: 'views/about.html',
		controller: 'AboutCtrl',
		controllerAs: 'about',
		resolve: {
			check: function(auth) {
				return auth.check('about');
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
		timeOut: 3000
	});
});