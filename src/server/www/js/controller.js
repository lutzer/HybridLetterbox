define(['exports', 'backbone', 'marionette', 'socketio', 'config', 'views/main_view', 'views/submission_list_view', 'views/tag_list_view', 'views/submission_input_view', 'views/submission_view', 'views/admin_view'], function (exports, _backbone, _marionette, _socketio, _config, _main_view, _submission_list_view, _tag_list_view, _submission_input_view, _submission_view, _admin_view) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-06-21 15:54:40
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBcUJNLFU7OztBQUVKLHNCQUFZLEdBQVosRUFBaUI7QUFBQTs7QUFBQTs7QUFJaEIsU0FBSyxHQUFMLEdBQVcsR0FBWDs7QUFFQSxPQUFJLFVBQUosQ0FBZTtBQUNkLHFCQUFpQixZQURIO0FBRWQsaUJBQWE7QUFGQyxJQUFmOzs7OztBQVFBLHNCQUFTLEVBQVQsQ0FBWSxPQUFaLEVBQW9CLE1BQUssZUFBekI7OztBQUdBLE9BQUksU0FBUyx3QkFBSSxpQkFBTyxjQUFYLENBQWI7QUFDUyxVQUFPLEVBQVAsQ0FBVSxvQkFBVixFQUFnQyxVQUFTLElBQVQsRUFBZTtBQUM5Qyx1QkFBUyxPQUFULENBQWlCLG9CQUFqQixFQUFzQyxJQUF0QztBQUNBLElBRkQ7QUFHQSxVQUFPLEVBQVAsQ0FBVSxnQkFBVixFQUE0QixVQUFTLElBQVQsRUFBZTtBQUMxQyx1QkFBUyxPQUFULENBQWlCLGdCQUFqQixFQUFrQyxJQUFsQztBQUNBLElBRkQ7QUFHQSxVQUFPLEVBQVAsQ0FBVSxvQkFBVixFQUFnQyxVQUFTLElBQVQsRUFBZTtBQUM5Qyx1QkFBUyxPQUFULENBQWlCLGdCQUFqQixFQUFrQyxJQUFsQztBQUNBLElBRkQ7OztBQUtBLFNBQUssUUFBTCxHQUFnQix5QkFBaEI7QUFDQSxTQUFLLEdBQUwsQ0FBUyxlQUFULENBQXlCLElBQXpCLENBQThCLE1BQUssUUFBbkM7O0FBOUJPO0FBZ0NoQjs7Ozs7O3dDQUk0QjtBQUFBLFFBQVYsR0FBVSx5REFBTixJQUFNOzs7QUFFNUIsU0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixJQUEzQixDQUFnQyxJQUFJLHFCQUFXLFFBQWYsQ0FBd0I7QUFDdkQsY0FBUyxJQUQ4QztBQUV2RCxlQUFVLEVBQUUsUUFBRixDQUFXLE1BQVg7QUFGNkMsS0FBeEIsQ0FBaEM7OztBQU1BLFNBQUssUUFBTCxDQUFjLGFBQWQsQ0FBNEIsSUFBNUIsQ0FBaUMsbUNBQXVCLEVBQUUsS0FBSyxHQUFQLEVBQXZCLENBQWpDOzs7QUFHQSxRQUFJLEVBQUUsS0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixXQUF4QiwyQ0FBRixDQUFKLEVBQ0MsS0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixJQUF4QixDQUE2QixxQ0FBN0I7OztBQUdELFFBQUksS0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixXQUF6QixtQ0FBSixFQUNDLEtBQUssUUFBTCxDQUFjLFVBQWQsQ0FBeUIsV0FBekIsQ0FBcUMsTUFBckMsQ0FBNEMsR0FBNUMsRUFERCxLQUdDLEtBQUssUUFBTCxDQUFjLFVBQWQsQ0FBeUIsSUFBekIsQ0FBOEIsNEJBQWdCLEVBQUUsS0FBSyxHQUFQLEVBQWhCLENBQTlCO0FBQ0Q7OztrQ0FFYyxFLEVBQUk7QUFDbEIsU0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixJQUEzQixDQUFnQyxJQUFJLHFCQUFXLFFBQWYsQ0FBd0I7QUFDdkQsZUFBVSxFQUFFLFFBQUYsQ0FBVyxzRkFBWDtBQUQ2QyxLQUF4QixDQUFoQztBQUdBLFNBQUssUUFBTCxDQUFjLGFBQWQsQ0FBNEIsSUFBNUIsQ0FBaUMsOEJBQW1CLEVBQUUsSUFBSSxFQUFOLEVBQW5CLENBQWpDO0FBQ0EsU0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixLQUF6QjtBQUNBLFNBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsS0FBeEI7QUFDQTs7O21DQUVlO0FBQ2YsU0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixJQUEzQixDQUFnQyxJQUFJLHFCQUFXLFFBQWYsQ0FBd0I7QUFDdkQsZUFBVSxFQUFFLFFBQUYsQ0FBVyxzRkFBWDtBQUQ2QyxLQUF4QixDQUFoQztBQUdBLFNBQUssUUFBTCxDQUFjLGFBQWQsQ0FBNEIsSUFBNUIsQ0FBaUMsMEJBQWpDO0FBQ0EsU0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixLQUF6QjtBQUNBLFNBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsS0FBeEI7QUFDQTs7O29DQUVnQjtBQUNoQixVQUFNLGlCQUFOO0FBQ0E7Ozt3Q0FFb0I7QUFDcEIsVUFBTSxnQkFBTjtBQUNBOzs7bUNBRWUsSSxFQUFLLEssRUFBTzs7QUFFM0IsUUFBSSxRQUFRLENBQUMsT0FBSyxRQUFOLEVBQWdCLFdBQWhCLEVBQVo7QUFDQSxRQUFJLFVBQVUsTUFBTSxPQUFwQjs7QUFFQSxVQUFNLFFBQU0sSUFBTixHQUFXLE9BQWpCO0FBQ0E7OztpQ0FFYSxDQUViOzs7O0dBL0ZzQixxQkFBVyxVOztBQWtHbkM7O21CQUVjLFUiLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNi0yMSAxNTo1NDo0MFxuKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IFNJTyBmcm9tICdzb2NrZXRpbyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5cbmltcG9ydCBNYWluVmlldyBmcm9tICd2aWV3cy9tYWluX3ZpZXcnO1xuaW1wb3J0IFN1Ym1pc3Npb25MaXN0VmlldyBmcm9tICd2aWV3cy9zdWJtaXNzaW9uX2xpc3Rfdmlldyc7XG5pbXBvcnQgVGFnTGlzdFZpZXcgZnJvbSAndmlld3MvdGFnX2xpc3Rfdmlldyc7XG5pbXBvcnQgU3VibWlzc2lvbklucHV0VmlldyBmcm9tICd2aWV3cy9zdWJtaXNzaW9uX2lucHV0X3ZpZXcnO1xuaW1wb3J0IFN1Ym1pc3Npb25WaWV3IGZyb20gJ3ZpZXdzL3N1Ym1pc3Npb25fdmlldyc7XG5pbXBvcnQgQWRtaW5WaWV3IGZyb20gJ3ZpZXdzL2FkbWluX3ZpZXcnO1xuXG5jbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgTWFyaW9uZXR0ZS5Db250cm9sbGVyIHtcblx0XHRcblx0XHRjb25zdHJ1Y3RvcihhcHApIHtcblxuXHRcdFx0c3VwZXIoKTtcblxuXHRcdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0XHRcblx0XHRcdGFwcC5hZGRSZWdpb25zKHtcblx0XHRcdFx0Y29udGFpbmVyUmVnaW9uOiBcIiNjb250YWluZXJcIixcblx0XHRcdFx0bW9kYWxSZWdpb246IFwiI21vZGFsLWNvbnRhaW5lclwiXG5cdFx0XHR9KTtcblx0XHRcdFxuXHRcdFx0Ly9yZWdpc3RlciBjbGllbnQgZXZlbnRzXG5cdFx0XHQvKkJhY2tib25lLm9uKCdkaWFsb2c6b3BlbicsIHRoaXMub3BlbkRpYWxvZywgdGhpcyk7XG5cdFx0XHRCYWNrYm9uZS5vbignZGlhbG9nOmNsb3NlJywgdGhpcy5jbG9zZURpYWxvZywgdGhpcyk7Ki9cblx0XHRcdEJhY2tib25lLm9uKCdlcnJvcicsdGhpcy5vcGVuRXJyb3JEaWFsb2csIHRoaXMpO1xuXG5cdFx0XHQvL3JlZ2lzdGVyIHNvY2tldCBldmVudHNcblx0XHRcdHZhciBzb2NrZXQgPSBTSU8oQ29uZmlnLndlYl9zb2NrZXRfdXJsKTtcbiAgICAgICAgICAgIHNvY2tldC5vbignc3VibWlzc2lvbjpjaGFuZ2VkJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgXHRCYWNrYm9uZS50cmlnZ2VyKCdzdWJtaXNzaW9uOmNoYW5nZWQnLGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzb2NrZXQub24oJ3N1Ym1pc3Npb246bmV3JywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgXHRCYWNrYm9uZS50cmlnZ2VyKCdzdWJtaXNzaW9uOm5ldycsZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNvY2tldC5vbignc3VibWlzc2lvbjpyZW1vdmVkJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgXHRCYWNrYm9uZS50cmlnZ2VyKCdzdWJtaXNzaW9uOm5ldycsZGF0YSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy9sb2FkIG1haW52aWV3XG4gICAgICAgICAgICB0aGlzLm1haW5WaWV3ID0gbmV3IE1haW5WaWV3KCk7XG4gICAgICAgICAgICB0aGlzLmFwcC5jb250YWluZXJSZWdpb24uc2hvdyh0aGlzLm1haW5WaWV3KTtcblx0XHRcdFxuXHRcdH1cblx0XHRcdFxuXHRcdC8qIFJPVVRFUyAqL1xuXG5cdFx0c2hvd1N1Ym1pc3Npb25MaXN0KHRhZz1udWxsKSB7XG5cblx0XHRcdHRoaXMubWFpblZpZXcuaGVhZGVyUmVnaW9uLnNob3cobmV3IE1hcmlvbmV0dGUuSXRlbVZpZXcoe1xuXHRcdFx0XHR0YWdOYW1lOiAnaDEnLFxuXHRcdFx0XHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgnTG9nbycpXG5cdFx0XHR9KSk7XG5cblx0XHRcdC8vdXBkYXRlIGxpc3Qgdmlld1xuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IFN1Ym1pc3Npb25MaXN0Vmlldyh7IHRhZzogdGFnIH0pKTtcblxuXHRcdFx0Ly9zZXQgaW5wdXQgdmlld1xuXHRcdFx0aWYgKCEodGhpcy5tYWluVmlldy50b3BSZWdpb24uY3VycmVudFZpZXcgaW5zdGFuY2VvZiBTdWJtaXNzaW9uSW5wdXRWaWV3KSlcblx0XHRcdFx0dGhpcy5tYWluVmlldy50b3BSZWdpb24uc2hvdyhuZXcgU3VibWlzc2lvbklucHV0VmlldygpKTtcblxuXHRcdFx0Ly9zZXQgdGFndmlld1xuXHRcdFx0aWYgKHRoaXMubWFpblZpZXcuc2lkZVJlZ2lvbi5jdXJyZW50VmlldyBpbnN0YW5jZW9mIFRhZ0xpc3RWaWV3KVxuXHRcdFx0XHR0aGlzLm1haW5WaWV3LnNpZGVSZWdpb24uY3VycmVudFZpZXcuc2V0VGFnKHRhZyk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMubWFpblZpZXcuc2lkZVJlZ2lvbi5zaG93KG5ldyBUYWdMaXN0Vmlldyh7IHRhZzogdGFnIH0pKTtcblx0XHR9XG5cblx0XHRzaG93U3VibWlzc2lvbihpZCkge1xuXHRcdFx0dGhpcy5tYWluVmlldy5oZWFkZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHRcdHRlbXBsYXRlOiBfLnRlbXBsYXRlKCc8ZGl2IGNsYXNzPVwibGluay1iYWNrXCI+PGEgaHJlZj1cIiNcIj48c3BhbiBjbGFzcz1cImNsb3NlLWJ1dHRvblwiPkNsb3NlPC9zcGFuPjwvYT48L2Rpdj4nKVxuXHRcdFx0fSkpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IFN1Ym1pc3Npb25WaWV3KHsgaWQ6IGlkIH0pKTtcblx0XHRcdHRoaXMubWFpblZpZXcuc2lkZVJlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy50b3BSZWdpb24ucmVzZXQoKTtcblx0XHR9XG5cblx0XHRzaG93QWRtaW5QYWdlKCkge1xuXHRcdFx0dGhpcy5tYWluVmlldy5oZWFkZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHRcdHRlbXBsYXRlOiBfLnRlbXBsYXRlKCc8ZGl2IGNsYXNzPVwibGluay1iYWNrXCI+PGEgaHJlZj1cIiNcIj48c3BhbiBjbGFzcz1cImNsb3NlLWJ1dHRvblwiPkNsb3NlPC9zcGFuPjwvYT48L2Rpdj4nKVxuXHRcdFx0fSkpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IEFkbWluVmlldygpKTtcblx0XHRcdHRoaXMubWFpblZpZXcuc2lkZVJlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy50b3BSZWdpb24ucmVzZXQoKTtcblx0XHR9XG5cblx0XHRwb3N0U3VibWlzc2lvbigpIHtcblx0XHRcdGFsZXJ0KCdwb3N0IHN1Ym1pc3Npb24nKTtcblx0XHR9XG5cblx0XHRzaG93U2Nhbm5pbmdEaWFsb2coKSB7XG5cdFx0XHRhbGVydChcIlNjYW5uaW5nRGlhbG9nXCIpO1xuXHRcdH1cblxuXHRcdG9wZW5FcnJvckRpYWxvZyh0eXBlLGVycm9yKSB7XG5cblx0XHRcdHZhciB0aXRsZSA9ICh0eXBlKyctZXJyb3InKS50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0dmFyIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuXG5cdFx0XHRhbGVydCh0aXRsZSsnOiAnK21lc3NhZ2UpO1xuXHRcdH1cblxuXHRcdGNsb3NlRGlhbG9nKCkge1xuXG5cdFx0fVxuXG5cdFx0XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyXG5cdCJdfQ==