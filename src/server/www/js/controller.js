define(['exports', 'backbone', 'marionette', 'socketio', 'config', 'views/main_view', 'views/submission_list_view', 'views/tag_list_view', 'views/submission_input_view', 'views/submission_view', 'views/admin_view', 'views/tablet_view'], function (exports, _backbone, _marionette, _socketio, _config, _main_view, _submission_list_view, _tag_list_view, _submission_input_view, _submission_view, _admin_view, _tablet_view) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-06-23 14:09:48
 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _backbone2 = _interopRequireDefault(_backbone);

	var _marionette2 = _interopRequireDefault(_marionette);

	var _socketio2 = _interopRequireDefault(_socketio);

	var _config2 = _interopRequireDefault(_config);

	var _main_view2 = _interopRequireDefault(_main_view);

	var _submission_list_view2 = _interopRequireDefault(_submission_list_view);

	var _tag_list_view2 = _interopRequireDefault(_tag_list_view);

	var _submission_input_view2 = _interopRequireDefault(_submission_input_view);

	var _submission_view2 = _interopRequireDefault(_submission_view);

	var _admin_view2 = _interopRequireDefault(_admin_view);

	var _tablet_view2 = _interopRequireDefault(_tablet_view);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Controller = function (_Marionette$Controlle) {
		_inherits(Controller, _Marionette$Controlle);

		function Controller(app) {
			_classCallCheck(this, Controller);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Controller).call(this));

			_this.app = app;

			app.addRegions({
				containerRegion: "#container",
				modalRegion: "#modal-container"
			});

			//register client events
			/*Backbone.on('dialog:open', this.openDialog, this);
   Backbone.on('dialog:close', this.closeDialog, this);*/
			_backbone2.default.on('error', _this.openErrorDialog, _this);

			//register socket events
			var socket = (0, _socketio2.default)(_config2.default.web_socket_url);
			socket.on('submission:changed', function (data) {
				_backbone2.default.trigger('submission:changed', data);
			});
			socket.on('submission:new', function (data) {
				_backbone2.default.trigger('submission:new', data);
			});
			socket.on('submission:removed', function (data) {
				_backbone2.default.trigger('submission:new', data);
			});

			//load mainview
			_this.mainView = new _main_view2.default();
			_this.app.containerRegion.show(_this.mainView);

			return _this;
		}

		/* ROUTES */

		_createClass(Controller, [{
			key: 'showSubmissionList',
			value: function showSubmissionList() {
				var tag = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];


				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					tagName: 'h1',
					template: _.template('Logo')
				}));

				//update list view
				this.mainView.contentRegion.show(new _submission_list_view2.default({ tag: tag }));

				//set input view
				if (!(this.mainView.topRegion.currentView instanceof _submission_input_view2.default)) this.mainView.topRegion.show(new _submission_input_view2.default());

				//set tagview
				if (this.mainView.sideRegion.currentView instanceof _tag_list_view2.default) this.mainView.sideRegion.currentView.setTag(tag);else this.mainView.sideRegion.show(new _tag_list_view2.default({ tag: tag }));
			}
		}, {
			key: 'showSubmission',
			value: function showSubmission(id) {
				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template('<div class="link-back"><a href="#"><span class="close-button">Close</span></a></div>')
				}));
				this.mainView.contentRegion.show(new _submission_view2.default({ id: id }));
				this.mainView.sideRegion.reset();
				this.mainView.topRegion.reset();
			}
		}, {
			key: 'showAdminPage',
			value: function showAdminPage() {
				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template('<div class="link-back"><a href="#"><span class="close-button">Close</span></a></div>')
				}));
				this.mainView.contentRegion.show(new _admin_view2.default());
				this.mainView.sideRegion.reset();
				this.mainView.topRegion.reset();
			}
		}, {
			key: 'showTabletView',
			value: function showTabletView() {
				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template('<h1>Logo</h1><span class="line-horizontal"></span>')
				}));
				this.mainView.contentRegion.show(new _tablet_view2.default());
				this.mainView.sideRegion.reset();
				this.mainView.topRegion.reset();
			}
		}, {
			key: 'postSubmission',
			value: function postSubmission() {
				alert('post submission');
			}
		}, {
			key: 'showScanningDialog',
			value: function showScanningDialog() {
				alert("ScanningDialog");
			}
		}, {
			key: 'openErrorDialog',
			value: function openErrorDialog(type, error) {

				var title = (type + '-error').toUpperCase();
				var message = error.message;

				alert(title + ': ' + message);
			}
		}, {
			key: 'closeDialog',
			value: function closeDialog() {}
		}]);

		return Controller;
	}(_marionette2.default.Controller);

	;

	exports.default = Controller;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FzQk0sVTs7O0FBRUosc0JBQVksR0FBWixFQUFpQjtBQUFBOztBQUFBOztBQUloQixTQUFLLEdBQUwsR0FBVyxHQUFYOztBQUVBLE9BQUksVUFBSixDQUFlO0FBQ2QscUJBQWlCLFlBREg7QUFFZCxpQkFBYTtBQUZDLElBQWY7Ozs7O0FBUUEsc0JBQVMsRUFBVCxDQUFZLE9BQVosRUFBb0IsTUFBSyxlQUF6Qjs7O0FBR0EsT0FBSSxTQUFTLHdCQUFJLGlCQUFPLGNBQVgsQ0FBYjtBQUNTLFVBQU8sRUFBUCxDQUFVLG9CQUFWLEVBQWdDLFVBQVMsSUFBVCxFQUFlO0FBQzlDLHVCQUFTLE9BQVQsQ0FBaUIsb0JBQWpCLEVBQXNDLElBQXRDO0FBQ0EsSUFGRDtBQUdBLFVBQU8sRUFBUCxDQUFVLGdCQUFWLEVBQTRCLFVBQVMsSUFBVCxFQUFlO0FBQzFDLHVCQUFTLE9BQVQsQ0FBaUIsZ0JBQWpCLEVBQWtDLElBQWxDO0FBQ0EsSUFGRDtBQUdBLFVBQU8sRUFBUCxDQUFVLG9CQUFWLEVBQWdDLFVBQVMsSUFBVCxFQUFlO0FBQzlDLHVCQUFTLE9BQVQsQ0FBaUIsZ0JBQWpCLEVBQWtDLElBQWxDO0FBQ0EsSUFGRDs7O0FBS0EsU0FBSyxRQUFMLEdBQWdCLHlCQUFoQjtBQUNBLFNBQUssR0FBTCxDQUFTLGVBQVQsQ0FBeUIsSUFBekIsQ0FBOEIsTUFBSyxRQUFuQzs7QUE5Qk87QUFnQ2hCOzs7Ozs7d0NBSTRCO0FBQUEsUUFBVixHQUFVLHlEQUFOLElBQU07OztBQUU1QixTQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLElBQTNCLENBQWdDLElBQUkscUJBQVcsUUFBZixDQUF3QjtBQUN2RCxjQUFTLElBRDhDO0FBRXZELGVBQVUsRUFBRSxRQUFGLENBQVcsTUFBWDtBQUY2QyxLQUF4QixDQUFoQzs7O0FBTUEsU0FBSyxRQUFMLENBQWMsYUFBZCxDQUE0QixJQUE1QixDQUFpQyxtQ0FBdUIsRUFBRSxLQUFLLEdBQVAsRUFBdkIsQ0FBakM7OztBQUdBLFFBQUksRUFBRSxLQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLFdBQXhCLDJDQUFGLENBQUosRUFDQyxLQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLElBQXhCLENBQTZCLHFDQUE3Qjs7O0FBR0QsUUFBSSxLQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLFdBQXpCLG1DQUFKLEVBQ0MsS0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixXQUF6QixDQUFxQyxNQUFyQyxDQUE0QyxHQUE1QyxFQURELEtBR0MsS0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixJQUF6QixDQUE4Qiw0QkFBZ0IsRUFBRSxLQUFLLEdBQVAsRUFBaEIsQ0FBOUI7QUFDRDs7O2tDQUVjLEUsRUFBSTtBQUNsQixTQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLElBQTNCLENBQWdDLElBQUkscUJBQVcsUUFBZixDQUF3QjtBQUN2RCxlQUFVLEVBQUUsUUFBRixDQUFXLHNGQUFYO0FBRDZDLEtBQXhCLENBQWhDO0FBR0EsU0FBSyxRQUFMLENBQWMsYUFBZCxDQUE0QixJQUE1QixDQUFpQyw4QkFBbUIsRUFBRSxJQUFJLEVBQU4sRUFBbkIsQ0FBakM7QUFDQSxTQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLEtBQXpCO0FBQ0EsU0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixLQUF4QjtBQUNBOzs7bUNBRWU7QUFDZixTQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLElBQTNCLENBQWdDLElBQUkscUJBQVcsUUFBZixDQUF3QjtBQUN2RCxlQUFVLEVBQUUsUUFBRixDQUFXLHNGQUFYO0FBRDZDLEtBQXhCLENBQWhDO0FBR0EsU0FBSyxRQUFMLENBQWMsYUFBZCxDQUE0QixJQUE1QixDQUFpQywwQkFBakM7QUFDQSxTQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLEtBQXpCO0FBQ0EsU0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixLQUF4QjtBQUNBOzs7b0NBRWdCO0FBQ2hCLFNBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsSUFBM0IsQ0FBZ0MsSUFBSSxxQkFBVyxRQUFmLENBQXdCO0FBQ3ZELGVBQVUsRUFBRSxRQUFGLENBQVcsb0RBQVg7QUFENkMsS0FBeEIsQ0FBaEM7QUFHQSxTQUFLLFFBQUwsQ0FBYyxhQUFkLENBQTRCLElBQTVCLENBQWlDLDJCQUFqQztBQUNBLFNBQUssUUFBTCxDQUFjLFVBQWQsQ0FBeUIsS0FBekI7QUFDQSxTQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLEtBQXhCO0FBQ0E7OztvQ0FFZ0I7QUFDaEIsVUFBTSxpQkFBTjtBQUNBOzs7d0NBRW9CO0FBQ3BCLFVBQU0sZ0JBQU47QUFDQTs7O21DQUVlLEksRUFBSyxLLEVBQU87O0FBRTNCLFFBQUksUUFBUSxDQUFDLE9BQUssUUFBTixFQUFnQixXQUFoQixFQUFaO0FBQ0EsUUFBSSxVQUFVLE1BQU0sT0FBcEI7O0FBRUEsVUFBTSxRQUFNLElBQU4sR0FBVyxPQUFqQjtBQUNBOzs7aUNBRWEsQ0FFYjs7OztHQXhHc0IscUJBQVcsVTs7QUEyR25DOzttQkFFYyxVIiwiZmlsZSI6ImNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDYtMjMgMTQ6MDk6NDhcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBTSU8gZnJvbSAnc29ja2V0aW8nO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuXG5pbXBvcnQgTWFpblZpZXcgZnJvbSAndmlld3MvbWFpbl92aWV3JztcbmltcG9ydCBTdWJtaXNzaW9uTGlzdFZpZXcgZnJvbSAndmlld3Mvc3VibWlzc2lvbl9saXN0X3ZpZXcnO1xuaW1wb3J0IFRhZ0xpc3RWaWV3IGZyb20gJ3ZpZXdzL3RhZ19saXN0X3ZpZXcnO1xuaW1wb3J0IFN1Ym1pc3Npb25JbnB1dFZpZXcgZnJvbSAndmlld3Mvc3VibWlzc2lvbl9pbnB1dF92aWV3JztcbmltcG9ydCBTdWJtaXNzaW9uVmlldyBmcm9tICd2aWV3cy9zdWJtaXNzaW9uX3ZpZXcnO1xuaW1wb3J0IEFkbWluVmlldyBmcm9tICd2aWV3cy9hZG1pbl92aWV3JztcbmltcG9ydCBUYWJsZXRWaWV3IGZyb20gJ3ZpZXdzL3RhYmxldF92aWV3JztcblxuY2xhc3MgQ29udHJvbGxlciBleHRlbmRzIE1hcmlvbmV0dGUuQ29udHJvbGxlciB7XG5cdFx0XG5cdFx0Y29uc3RydWN0b3IoYXBwKSB7XG5cblx0XHRcdHN1cGVyKCk7XG5cblx0XHRcdHRoaXMuYXBwID0gYXBwO1xuXHRcdFx0XG5cdFx0XHRhcHAuYWRkUmVnaW9ucyh7XG5cdFx0XHRcdGNvbnRhaW5lclJlZ2lvbjogXCIjY29udGFpbmVyXCIsXG5cdFx0XHRcdG1vZGFsUmVnaW9uOiBcIiNtb2RhbC1jb250YWluZXJcIlxuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdC8vcmVnaXN0ZXIgY2xpZW50IGV2ZW50c1xuXHRcdFx0LypCYWNrYm9uZS5vbignZGlhbG9nOm9wZW4nLCB0aGlzLm9wZW5EaWFsb2csIHRoaXMpO1xuXHRcdFx0QmFja2JvbmUub24oJ2RpYWxvZzpjbG9zZScsIHRoaXMuY2xvc2VEaWFsb2csIHRoaXMpOyovXG5cdFx0XHRCYWNrYm9uZS5vbignZXJyb3InLHRoaXMub3BlbkVycm9yRGlhbG9nLCB0aGlzKTtcblxuXHRcdFx0Ly9yZWdpc3RlciBzb2NrZXQgZXZlbnRzXG5cdFx0XHR2YXIgc29ja2V0ID0gU0lPKENvbmZpZy53ZWJfc29ja2V0X3VybCk7XG4gICAgICAgICAgICBzb2NrZXQub24oJ3N1Ym1pc3Npb246Y2hhbmdlZCcsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIFx0QmFja2JvbmUudHJpZ2dlcignc3VibWlzc2lvbjpjaGFuZ2VkJyxkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdzdWJtaXNzaW9uOm5ldycsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIFx0QmFja2JvbmUudHJpZ2dlcignc3VibWlzc2lvbjpuZXcnLGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzb2NrZXQub24oJ3N1Ym1pc3Npb246cmVtb3ZlZCcsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIFx0QmFja2JvbmUudHJpZ2dlcignc3VibWlzc2lvbjpuZXcnLGRhdGEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vbG9hZCBtYWludmlld1xuICAgICAgICAgICAgdGhpcy5tYWluVmlldyA9IG5ldyBNYWluVmlldygpO1xuICAgICAgICAgICAgdGhpcy5hcHAuY29udGFpbmVyUmVnaW9uLnNob3codGhpcy5tYWluVmlldyk7XG5cdFx0XHRcblx0XHR9XG5cdFx0XHRcblx0XHQvKiBST1VURVMgKi9cblxuXHRcdHNob3dTdWJtaXNzaW9uTGlzdCh0YWc9bnVsbCkge1xuXG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGFnTmFtZTogJ2gxJyxcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoJ0xvZ28nKVxuXHRcdFx0fSkpO1xuXG5cdFx0XHQvL3VwZGF0ZSBsaXN0IHZpZXdcblx0XHRcdHRoaXMubWFpblZpZXcuY29udGVudFJlZ2lvbi5zaG93KG5ldyBTdWJtaXNzaW9uTGlzdFZpZXcoeyB0YWc6IHRhZyB9KSk7XG5cblx0XHRcdC8vc2V0IGlucHV0IHZpZXdcblx0XHRcdGlmICghKHRoaXMubWFpblZpZXcudG9wUmVnaW9uLmN1cnJlbnRWaWV3IGluc3RhbmNlb2YgU3VibWlzc2lvbklucHV0VmlldykpXG5cdFx0XHRcdHRoaXMubWFpblZpZXcudG9wUmVnaW9uLnNob3cobmV3IFN1Ym1pc3Npb25JbnB1dFZpZXcoKSk7XG5cblx0XHRcdC8vc2V0IHRhZ3ZpZXdcblx0XHRcdGlmICh0aGlzLm1haW5WaWV3LnNpZGVSZWdpb24uY3VycmVudFZpZXcgaW5zdGFuY2VvZiBUYWdMaXN0Vmlldylcblx0XHRcdFx0dGhpcy5tYWluVmlldy5zaWRlUmVnaW9uLmN1cnJlbnRWaWV3LnNldFRhZyh0YWcpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLm1haW5WaWV3LnNpZGVSZWdpb24uc2hvdyhuZXcgVGFnTGlzdFZpZXcoeyB0YWc6IHRhZyB9KSk7XG5cdFx0fVxuXG5cdFx0c2hvd1N1Ym1pc3Npb24oaWQpIHtcblx0XHRcdHRoaXMubWFpblZpZXcuaGVhZGVyUmVnaW9uLnNob3cobmV3IE1hcmlvbmV0dGUuSXRlbVZpZXcoe1xuXHRcdFx0XHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cImxpbmstYmFja1wiPjxhIGhyZWY9XCIjXCI+PHNwYW4gY2xhc3M9XCJjbG9zZS1idXR0b25cIj5DbG9zZTwvc3Bhbj48L2E+PC9kaXY+Jylcblx0XHRcdH0pKTtcblx0XHRcdHRoaXMubWFpblZpZXcuY29udGVudFJlZ2lvbi5zaG93KG5ldyBTdWJtaXNzaW9uVmlldyh7IGlkOiBpZCB9KSk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnNpZGVSZWdpb24ucmVzZXQoKTtcblx0XHRcdHRoaXMubWFpblZpZXcudG9wUmVnaW9uLnJlc2V0KCk7XG5cdFx0fVxuXG5cdFx0c2hvd0FkbWluUGFnZSgpIHtcblx0XHRcdHRoaXMubWFpblZpZXcuaGVhZGVyUmVnaW9uLnNob3cobmV3IE1hcmlvbmV0dGUuSXRlbVZpZXcoe1xuXHRcdFx0XHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cImxpbmstYmFja1wiPjxhIGhyZWY9XCIjXCI+PHNwYW4gY2xhc3M9XCJjbG9zZS1idXR0b25cIj5DbG9zZTwvc3Bhbj48L2E+PC9kaXY+Jylcblx0XHRcdH0pKTtcblx0XHRcdHRoaXMubWFpblZpZXcuY29udGVudFJlZ2lvbi5zaG93KG5ldyBBZG1pblZpZXcoKSk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnNpZGVSZWdpb24ucmVzZXQoKTtcblx0XHRcdHRoaXMubWFpblZpZXcudG9wUmVnaW9uLnJlc2V0KCk7XG5cdFx0fVxuXG5cdFx0c2hvd1RhYmxldFZpZXcoKSB7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoJzxoMT5Mb2dvPC9oMT48c3BhbiBjbGFzcz1cImxpbmUtaG9yaXpvbnRhbFwiPjwvc3Bhbj4nKVxuXHRcdFx0fSkpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IFRhYmxldFZpZXcoKSApO1xuXHRcdFx0dGhpcy5tYWluVmlldy5zaWRlUmVnaW9uLnJlc2V0KCk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnRvcFJlZ2lvbi5yZXNldCgpO1xuXHRcdH1cblxuXHRcdHBvc3RTdWJtaXNzaW9uKCkge1xuXHRcdFx0YWxlcnQoJ3Bvc3Qgc3VibWlzc2lvbicpO1xuXHRcdH1cblxuXHRcdHNob3dTY2FubmluZ0RpYWxvZygpIHtcblx0XHRcdGFsZXJ0KFwiU2Nhbm5pbmdEaWFsb2dcIik7XG5cdFx0fVxuXG5cdFx0b3BlbkVycm9yRGlhbG9nKHR5cGUsZXJyb3IpIHtcblxuXHRcdFx0dmFyIHRpdGxlID0gKHR5cGUrJy1lcnJvcicpLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR2YXIgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG5cblx0XHRcdGFsZXJ0KHRpdGxlKyc6ICcrbWVzc2FnZSk7XG5cdFx0fVxuXG5cdFx0Y2xvc2VEaWFsb2coKSB7XG5cblx0XHR9XG5cblx0XHRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXJcblx0Il19