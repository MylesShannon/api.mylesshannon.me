app.constant('constants', {
	'host': (function() { return (window.location.origin.indexOf('mylesshannon') >= 0) ? 'https://jot.mylesshannon.me' : 'http://localhost:8080'; })(),
	'api': (function() { return (window.location.origin.indexOf('mylesshannon') >= 0) ? 'https://api.mylesshannon.me' : 'http://localhost:8000'; })(),
	'states': {'requireIn':['notes'], 'requireOut':[]},
});