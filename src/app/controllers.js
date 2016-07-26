app.controller('IndexCtrl', function($http, $rootScope) {
	$rootScope.session.transitioning = false;
})
.controller('AboutCtrl', function($rootScope) {
	$rootScope.session.transitioning = false;
})
.controller('NotesCtrl', function($http, $rootScope, toastr) {
	$rootScope.session.transitioning = false;
	self = this;
	this.disable = false;
	$http({url: $rootScope.session.url+'/note', method: 'GET'}).then(function(resp) {
		self.notes = resp.data;
	}).catch(function() {

	});
	this.noteSubmit = function() {
		self.disable = true;
		$http({url: $rootScope.session.url+'/note', method: 'POST', params: {'title': self.form.title, 'subtitle': self.form.subtitle, 'body': self.form.body}}).then(function(resp) {
			self.notes.push({'title': self.form.title, 'subtitle': self.form.subtitle, 'body': self.form.body});
			self.form.title = null;
			self.form.body = null;
			self.form.subtitle = null;
			self.disable = false;
			toastr.success('Your note was saved.', 'Success');
		}).catch(function() {
			toastr.error('Problem with saving your note', 'Error');
			self.disable = false;
		});
	}
	this.removeNote = function(id) {
		$http({url: $rootScope.session.url+'/note/'+id, method: 'DELETE'}).then(function(resp) {
			for(var i = 0; i < self.notes.length; i++) {
				if(self.notes[i].id === id) {
					self.notes.splice(i, 1);
				}
			}
			toastr.success('Your note was removed.', 'Success');
		}).catch(function() {
			toastr.error('Problem with removing your note', 'Error');
		});
	}
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