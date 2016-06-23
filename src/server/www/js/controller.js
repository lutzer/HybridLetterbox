define(['exports', 'backbone', 'marionette', 'socketio', 'config', 'views/main_view', 'views/submission_list_view', 'views/tag_list_view', 'views/submission_input_view', 'views/submission_view', 'views/admin_view', 'views/tablet_view'], function (exports, _backbone, _marionette, _socketio, _config, _main_view, _submission_list_view, _tag_list_view, _submission_input_view, _submission_view, _admin_view, _tablet_view) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-06-23 11:51:43
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
					tagName: 'h1',
					template: _.template('Logo')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FzQk0sVTs7O0FBRUosc0JBQVksR0FBWixFQUFpQjtBQUFBOztBQUFBOztBQUloQixTQUFLLEdBQUwsR0FBVyxHQUFYOztBQUVBLE9BQUksVUFBSixDQUFlO0FBQ2QscUJBQWlCLFlBREg7QUFFZCxpQkFBYTtBQUZDLElBQWY7Ozs7O0FBUUEsc0JBQVMsRUFBVCxDQUFZLE9BQVosRUFBb0IsTUFBSyxlQUF6Qjs7O0FBR0EsT0FBSSxTQUFTLHdCQUFJLGlCQUFPLGNBQVgsQ0FBYjtBQUNTLFVBQU8sRUFBUCxDQUFVLG9CQUFWLEVBQWdDLFVBQVMsSUFBVCxFQUFlO0FBQzlDLHVCQUFTLE9BQVQsQ0FBaUIsb0JBQWpCLEVBQXNDLElBQXRDO0FBQ0EsSUFGRDtBQUdBLFVBQU8sRUFBUCxDQUFVLGdCQUFWLEVBQTRCLFVBQVMsSUFBVCxFQUFlO0FBQzFDLHVCQUFTLE9BQVQsQ0FBaUIsZ0JBQWpCLEVBQWtDLElBQWxDO0FBQ0EsSUFGRDtBQUdBLFVBQU8sRUFBUCxDQUFVLG9CQUFWLEVBQWdDLFVBQVMsSUFBVCxFQUFlO0FBQzlDLHVCQUFTLE9BQVQsQ0FBaUIsZ0JBQWpCLEVBQWtDLElBQWxDO0FBQ0EsSUFGRDs7O0FBS0EsU0FBSyxRQUFMLEdBQWdCLHlCQUFoQjtBQUNBLFNBQUssR0FBTCxDQUFTLGVBQVQsQ0FBeUIsSUFBekIsQ0FBOEIsTUFBSyxRQUFuQzs7QUE5Qk87QUFnQ2hCOzs7Ozs7d0NBSTRCO0FBQUEsUUFBVixHQUFVLHlEQUFOLElBQU07OztBQUU1QixTQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLElBQTNCLENBQWdDLElBQUkscUJBQVcsUUFBZixDQUF3QjtBQUN2RCxjQUFTLElBRDhDO0FBRXZELGVBQVUsRUFBRSxRQUFGLENBQVcsTUFBWDtBQUY2QyxLQUF4QixDQUFoQzs7O0FBTUEsU0FBSyxRQUFMLENBQWMsYUFBZCxDQUE0QixJQUE1QixDQUFpQyxtQ0FBdUIsRUFBRSxLQUFLLEdBQVAsRUFBdkIsQ0FBakM7OztBQUdBLFFBQUksRUFBRSxLQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLFdBQXhCLDJDQUFGLENBQUosRUFDQyxLQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLElBQXhCLENBQTZCLHFDQUE3Qjs7O0FBR0QsUUFBSSxLQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLFdBQXpCLG1DQUFKLEVBQ0MsS0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixXQUF6QixDQUFxQyxNQUFyQyxDQUE0QyxHQUE1QyxFQURELEtBR0MsS0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixJQUF6QixDQUE4Qiw0QkFBZ0IsRUFBRSxLQUFLLEdBQVAsRUFBaEIsQ0FBOUI7QUFDRDs7O2tDQUVjLEUsRUFBSTtBQUNsQixTQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLElBQTNCLENBQWdDLElBQUkscUJBQVcsUUFBZixDQUF3QjtBQUN2RCxlQUFVLEVBQUUsUUFBRixDQUFXLHNGQUFYO0FBRDZDLEtBQXhCLENBQWhDO0FBR0EsU0FBSyxRQUFMLENBQWMsYUFBZCxDQUE0QixJQUE1QixDQUFpQyw4QkFBbUIsRUFBRSxJQUFJLEVBQU4sRUFBbkIsQ0FBakM7QUFDQSxTQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLEtBQXpCO0FBQ0EsU0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixLQUF4QjtBQUNBOzs7bUNBRWU7QUFDZixTQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLElBQTNCLENBQWdDLElBQUkscUJBQVcsUUFBZixDQUF3QjtBQUN2RCxlQUFVLEVBQUUsUUFBRixDQUFXLHNGQUFYO0FBRDZDLEtBQXhCLENBQWhDO0FBR0EsU0FBSyxRQUFMLENBQWMsYUFBZCxDQUE0QixJQUE1QixDQUFpQywwQkFBakM7QUFDQSxTQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLEtBQXpCO0FBQ0EsU0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixLQUF4QjtBQUNBOzs7b0NBRWdCO0FBQ2hCLFNBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsSUFBM0IsQ0FBZ0MsSUFBSSxxQkFBVyxRQUFmLENBQXdCO0FBQ3ZELGNBQVMsSUFEOEM7QUFFdkQsZUFBVSxFQUFFLFFBQUYsQ0FBVyxNQUFYO0FBRjZDLEtBQXhCLENBQWhDO0FBSUEsU0FBSyxRQUFMLENBQWMsYUFBZCxDQUE0QixJQUE1QixDQUFpQywyQkFBakM7QUFDQSxTQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLEtBQXpCO0FBQ0EsU0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixLQUF4QjtBQUNBOzs7b0NBRWdCO0FBQ2hCLFVBQU0saUJBQU47QUFDQTs7O3dDQUVvQjtBQUNwQixVQUFNLGdCQUFOO0FBQ0E7OzttQ0FFZSxJLEVBQUssSyxFQUFPOztBQUUzQixRQUFJLFFBQVEsQ0FBQyxPQUFLLFFBQU4sRUFBZ0IsV0FBaEIsRUFBWjtBQUNBLFFBQUksVUFBVSxNQUFNLE9BQXBCOztBQUVBLFVBQU0sUUFBTSxJQUFOLEdBQVcsT0FBakI7QUFDQTs7O2lDQUVhLENBRWI7Ozs7R0F6R3NCLHFCQUFXLFU7O0FBNEduQzs7bUJBRWMsVSIsImZpbGUiOiJjb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA2LTIzIDExOjUxOjQzXG4qL1xuXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgU0lPIGZyb20gJ3NvY2tldGlvJztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcblxuaW1wb3J0IE1haW5WaWV3IGZyb20gJ3ZpZXdzL21haW5fdmlldyc7XG5pbXBvcnQgU3VibWlzc2lvbkxpc3RWaWV3IGZyb20gJ3ZpZXdzL3N1Ym1pc3Npb25fbGlzdF92aWV3JztcbmltcG9ydCBUYWdMaXN0VmlldyBmcm9tICd2aWV3cy90YWdfbGlzdF92aWV3JztcbmltcG9ydCBTdWJtaXNzaW9uSW5wdXRWaWV3IGZyb20gJ3ZpZXdzL3N1Ym1pc3Npb25faW5wdXRfdmlldyc7XG5pbXBvcnQgU3VibWlzc2lvblZpZXcgZnJvbSAndmlld3Mvc3VibWlzc2lvbl92aWV3JztcbmltcG9ydCBBZG1pblZpZXcgZnJvbSAndmlld3MvYWRtaW5fdmlldyc7XG5pbXBvcnQgVGFibGV0VmlldyBmcm9tICd2aWV3cy90YWJsZXRfdmlldyc7XG5cbmNsYXNzIENvbnRyb2xsZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbnRyb2xsZXIge1xuXHRcdFxuXHRcdGNvbnN0cnVjdG9yKGFwcCkge1xuXG5cdFx0XHRzdXBlcigpO1xuXG5cdFx0XHR0aGlzLmFwcCA9IGFwcDtcblx0XHRcdFxuXHRcdFx0YXBwLmFkZFJlZ2lvbnMoe1xuXHRcdFx0XHRjb250YWluZXJSZWdpb246IFwiI2NvbnRhaW5lclwiLFxuXHRcdFx0XHRtb2RhbFJlZ2lvbjogXCIjbW9kYWwtY29udGFpbmVyXCJcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHQvL3JlZ2lzdGVyIGNsaWVudCBldmVudHNcblx0XHRcdC8qQmFja2JvbmUub24oJ2RpYWxvZzpvcGVuJywgdGhpcy5vcGVuRGlhbG9nLCB0aGlzKTtcblx0XHRcdEJhY2tib25lLm9uKCdkaWFsb2c6Y2xvc2UnLCB0aGlzLmNsb3NlRGlhbG9nLCB0aGlzKTsqL1xuXHRcdFx0QmFja2JvbmUub24oJ2Vycm9yJyx0aGlzLm9wZW5FcnJvckRpYWxvZywgdGhpcyk7XG5cblx0XHRcdC8vcmVnaXN0ZXIgc29ja2V0IGV2ZW50c1xuXHRcdFx0dmFyIHNvY2tldCA9IFNJTyhDb25maWcud2ViX3NvY2tldF91cmwpO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdzdWJtaXNzaW9uOmNoYW5nZWQnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ3N1Ym1pc3Npb246Y2hhbmdlZCcsZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNvY2tldC5vbignc3VibWlzc2lvbjpuZXcnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ3N1Ym1pc3Npb246bmV3JyxkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdzdWJtaXNzaW9uOnJlbW92ZWQnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ3N1Ym1pc3Npb246bmV3JyxkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL2xvYWQgbWFpbnZpZXdcbiAgICAgICAgICAgIHRoaXMubWFpblZpZXcgPSBuZXcgTWFpblZpZXcoKTtcbiAgICAgICAgICAgIHRoaXMuYXBwLmNvbnRhaW5lclJlZ2lvbi5zaG93KHRoaXMubWFpblZpZXcpO1xuXHRcdFx0XG5cdFx0fVxuXHRcdFx0XG5cdFx0LyogUk9VVEVTICovXG5cblx0XHRzaG93U3VibWlzc2lvbkxpc3QodGFnPW51bGwpIHtcblxuXHRcdFx0dGhpcy5tYWluVmlldy5oZWFkZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHRcdHRhZ05hbWU6ICdoMScsXG5cdFx0XHRcdHRlbXBsYXRlOiBfLnRlbXBsYXRlKCdMb2dvJylcblx0XHRcdH0pKTtcblxuXHRcdFx0Ly91cGRhdGUgbGlzdCB2aWV3XG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgU3VibWlzc2lvbkxpc3RWaWV3KHsgdGFnOiB0YWcgfSkpO1xuXG5cdFx0XHQvL3NldCBpbnB1dCB2aWV3XG5cdFx0XHRpZiAoISh0aGlzLm1haW5WaWV3LnRvcFJlZ2lvbi5jdXJyZW50VmlldyBpbnN0YW5jZW9mIFN1Ym1pc3Npb25JbnB1dFZpZXcpKVxuXHRcdFx0XHR0aGlzLm1haW5WaWV3LnRvcFJlZ2lvbi5zaG93KG5ldyBTdWJtaXNzaW9uSW5wdXRWaWV3KCkpO1xuXG5cdFx0XHQvL3NldCB0YWd2aWV3XG5cdFx0XHRpZiAodGhpcy5tYWluVmlldy5zaWRlUmVnaW9uLmN1cnJlbnRWaWV3IGluc3RhbmNlb2YgVGFnTGlzdFZpZXcpXG5cdFx0XHRcdHRoaXMubWFpblZpZXcuc2lkZVJlZ2lvbi5jdXJyZW50Vmlldy5zZXRUYWcodGFnKTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5tYWluVmlldy5zaWRlUmVnaW9uLnNob3cobmV3IFRhZ0xpc3RWaWV3KHsgdGFnOiB0YWcgfSkpO1xuXHRcdH1cblxuXHRcdHNob3dTdWJtaXNzaW9uKGlkKSB7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoJzxkaXYgY2xhc3M9XCJsaW5rLWJhY2tcIj48YSBocmVmPVwiI1wiPjxzcGFuIGNsYXNzPVwiY2xvc2UtYnV0dG9uXCI+Q2xvc2U8L3NwYW4+PC9hPjwvZGl2PicpXG5cdFx0XHR9KSk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgU3VibWlzc2lvblZpZXcoeyBpZDogaWQgfSkpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5zaWRlUmVnaW9uLnJlc2V0KCk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnRvcFJlZ2lvbi5yZXNldCgpO1xuXHRcdH1cblxuXHRcdHNob3dBZG1pblBhZ2UoKSB7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoJzxkaXYgY2xhc3M9XCJsaW5rLWJhY2tcIj48YSBocmVmPVwiI1wiPjxzcGFuIGNsYXNzPVwiY2xvc2UtYnV0dG9uXCI+Q2xvc2U8L3NwYW4+PC9hPjwvZGl2PicpXG5cdFx0XHR9KSk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgQWRtaW5WaWV3KCkpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5zaWRlUmVnaW9uLnJlc2V0KCk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnRvcFJlZ2lvbi5yZXNldCgpO1xuXHRcdH1cblxuXHRcdHNob3dUYWJsZXRWaWV3KCkge1xuXHRcdFx0dGhpcy5tYWluVmlldy5oZWFkZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHRcdHRhZ05hbWU6ICdoMScsXG5cdFx0XHRcdHRlbXBsYXRlOiBfLnRlbXBsYXRlKCdMb2dvJylcblx0XHRcdH0pKTtcblx0XHRcdHRoaXMubWFpblZpZXcuY29udGVudFJlZ2lvbi5zaG93KG5ldyBUYWJsZXRWaWV3KCkgKTtcblx0XHRcdHRoaXMubWFpblZpZXcuc2lkZVJlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy50b3BSZWdpb24ucmVzZXQoKTtcblx0XHR9XG5cblx0XHRwb3N0U3VibWlzc2lvbigpIHtcblx0XHRcdGFsZXJ0KCdwb3N0IHN1Ym1pc3Npb24nKTtcblx0XHR9XG5cblx0XHRzaG93U2Nhbm5pbmdEaWFsb2coKSB7XG5cdFx0XHRhbGVydChcIlNjYW5uaW5nRGlhbG9nXCIpO1xuXHRcdH1cblxuXHRcdG9wZW5FcnJvckRpYWxvZyh0eXBlLGVycm9yKSB7XG5cblx0XHRcdHZhciB0aXRsZSA9ICh0eXBlKyctZXJyb3InKS50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0dmFyIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuXG5cdFx0XHRhbGVydCh0aXRsZSsnOiAnK21lc3NhZ2UpO1xuXHRcdH1cblxuXHRcdGNsb3NlRGlhbG9nKCkge1xuXG5cdFx0fVxuXG5cdFx0XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyXG5cdCJdfQ==