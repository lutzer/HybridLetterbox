define(['module', 'jquery', 'backbone', 'marionette', 'controller'], function (module, _jquery, _backbone, _marionette, _controller) {
	'use strict';

	var _jquery2 = _interopRequireDefault(_jquery);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _marionette2 = _interopRequireDefault(_marionette);

	var _controller2 = _interopRequireDefault(_controller);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var App = new _backbone2.default.Marionette.Application();

	module.exports = {

		initialize: function initialize() {

			App.addInitializer(function (options) {
				_backbone2.default.history.start();

				// support cross origin sharing
				_jquery2.default.support.cors = true;

				_marionette2.default.Behaviors.behaviorsLookup = function () {
					return window.Behaviors;
				};
			});

			// define app routes
			App.Router = new _marionette2.default.AppRouter({
				controller: new _controller2.default(App),
				appRoutes: {
					'scanning': 'showScanningDialog',
					'*actions': 'showSubmissionList'
				}
			});
			App.start();
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQSxLQUFJLE1BQU0sSUFBSSxtQkFBUyxVQUFULENBQW9CLFdBQXhCLEVBQVY7O0FBRUEsUUFBTyxPQUFQLEdBQWlCOztBQUVoQixjQUFZLHNCQUFXOztBQUV0QixPQUFJLGNBQUosQ0FBb0IsVUFBUyxPQUFULEVBQWlCO0FBQ2xDLHVCQUFTLE9BQVQsQ0FBaUIsS0FBakI7OztBQUdBLHFCQUFFLE9BQUYsQ0FBVSxJQUFWLEdBQWUsSUFBZjs7QUFFQSx5QkFBVyxTQUFYLENBQXFCLGVBQXJCLEdBQXVDLFlBQVc7QUFDOUMsWUFBTyxPQUFPLFNBQWQ7QUFDSCxLQUZEO0FBSUYsSUFWRDs7O0FBYUEsT0FBSSxNQUFKLEdBQWEsSUFBSSxxQkFBVyxTQUFmLENBQXlCO0FBQ3JDLGdCQUFZLHlCQUFlLEdBQWYsQ0FEeUI7QUFFckMsZUFBVztBQUNWLGlCQUFhLG9CQURIO0FBRVYsaUJBQVk7QUFGRjtBQUYwQixJQUF6QixDQUFiO0FBT0EsT0FBSSxLQUFKO0FBQ0E7QUF6QmUsRUFBakIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBDb250cm9sbGVyIGZyb20gJ2NvbnRyb2xsZXInO1xuXG52YXIgQXBwID0gbmV3IEJhY2tib25lLk1hcmlvbmV0dGUuQXBwbGljYXRpb24oKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IFxuXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuXHRcblx0XHRBcHAuYWRkSW5pdGlhbGl6ZXIoIGZ1bmN0aW9uKG9wdGlvbnMpe1xuXHRcdFx0ICBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KCk7XG5cdFx0XHQgIFxuXHRcdFx0ICAvLyBzdXBwb3J0IGNyb3NzIG9yaWdpbiBzaGFyaW5nXG5cdFx0XHQgICQuc3VwcG9ydC5jb3JzPXRydWU7XG5cdFx0XHQgIFxuXHRcdFx0ICBNYXJpb25ldHRlLkJlaGF2aW9ycy5iZWhhdmlvcnNMb29rdXAgPSBmdW5jdGlvbigpIHtcblx0XHRcdCAgICAgIHJldHVybiB3aW5kb3cuQmVoYXZpb3JzO1xuXHRcdFx0ICB9XG5cdFx0XHQgIFxuXHRcdH0pO1xuXHRcdFxuXHRcdC8vIGRlZmluZSBhcHAgcm91dGVzXG5cdFx0QXBwLlJvdXRlciA9IG5ldyBNYXJpb25ldHRlLkFwcFJvdXRlcih7XG5cdFx0XHRjb250cm9sbGVyOiBuZXcgQ29udHJvbGxlcihBcHApLFxuXHRcdFx0YXBwUm91dGVzOiB7XG5cdFx0XHRcdCdzY2FubmluZycgOiAnc2hvd1NjYW5uaW5nRGlhbG9nJyxcblx0XHRcdFx0JyphY3Rpb25zJzogJ3Nob3dTdWJtaXNzaW9uTGlzdCdcblx0XHRcdH1cblx0XHR9KTtcblx0XHRBcHAuc3RhcnQoKTtcblx0fSBcbn07XG4iXX0=