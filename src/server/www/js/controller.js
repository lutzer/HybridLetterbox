define(['exports', 'backbone', 'marionette', 'socketio', 'config', 'views/main_view', 'views/submission_list_view', 'views/tag_list_view', 'views/submission_input_view', 'views/submission_view', 'views/admin_view', 'views/tablet_view', 'text!templates/header_tmpl.html'], function (exports, _backbone, _marionette, _socketio, _config, _main_view, _submission_list_view, _tag_list_view, _submission_input_view, _submission_view, _admin_view, _tablet_view, _header_tmpl) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-01 20:12:22
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

	var _header_tmpl2 = _interopRequireDefault(_header_tmpl);

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
			socket.on('feedback:scanning', function (data) {
				_backbone2.default.trigger('feedback:scanning', data);
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
					template: _.template(_header_tmpl2.default)
				}));

				//update list view
				this.mainView.contentRegion.show(new _submission_list_view2.default({ tag: tag, dataset: _config2.default.dataset }));

				//set input view
				if (!(this.mainView.topRegion.currentView instanceof _submission_input_view2.default)) this.mainView.topRegion.show(new _submission_input_view2.default());

				//set tagview
				if (this.mainView.tagsRegion.currentView instanceof _tag_list_view2.default) this.mainView.tagsRegion.currentView.setTag(tag);else this.mainView.tagsRegion.show(new _tag_list_view2.default({ tag: tag, dataset: _config2.default.dataset }));
			}
		}, {
			key: 'showSubmission',
			value: function showSubmission(id) {
				this.mainView.headerRegion.reset();
				this.mainView.contentRegion.show(new _submission_view2.default({ id: id }));
				this.mainView.tagsRegion.reset();
				this.mainView.topRegion.reset();
			}
		}, {
			key: 'showAdminPage',
			value: function showAdminPage() {
				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template('<div class="link-back"><a href="#"><span class="close-button">Close</span></a></div>')
				}));
				this.mainView.contentRegion.show(new _admin_view2.default({ dataset: _config2.default.dataset }));
				this.mainView.tagsRegion.reset();
				this.mainView.topRegion.reset();
			}
		}, {
			key: 'showTabletView',
			value: function showTabletView() {
				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template('<h1>Logo</h1><span class="line-horizontal"></span>')
				}));
				this.mainView.contentRegion.show(new _tablet_view2.default({ dataset: _config2.default.dataset }));
				this.mainView.tagsRegion.reset();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXdCTSxVOzs7QUFFSixzQkFBWSxHQUFaLEVBQWlCO0FBQUE7O0FBQUE7O0FBSWhCLFNBQUssR0FBTCxHQUFXLEdBQVg7O0FBRUEsT0FBSSxVQUFKLENBQWU7QUFDZCxxQkFBaUIsWUFESDtBQUVkLGlCQUFhO0FBRkMsSUFBZjs7Ozs7QUFRQSxzQkFBUyxFQUFULENBQVksT0FBWixFQUFvQixNQUFLLGVBQXpCOzs7QUFHQSxPQUFJLFNBQVMsd0JBQUksaUJBQU8sY0FBWCxDQUFiO0FBQ1MsVUFBTyxFQUFQLENBQVUsb0JBQVYsRUFBZ0MsVUFBUyxJQUFULEVBQWU7QUFDOUMsdUJBQVMsT0FBVCxDQUFpQixvQkFBakIsRUFBc0MsSUFBdEM7QUFDQSxJQUZEO0FBR0EsVUFBTyxFQUFQLENBQVUsZ0JBQVYsRUFBNEIsVUFBUyxJQUFULEVBQWU7QUFDMUMsdUJBQVMsT0FBVCxDQUFpQixnQkFBakIsRUFBa0MsSUFBbEM7QUFDQSxJQUZEO0FBR0EsVUFBTyxFQUFQLENBQVUsb0JBQVYsRUFBZ0MsVUFBUyxJQUFULEVBQWU7QUFDOUMsdUJBQVMsT0FBVCxDQUFpQixnQkFBakIsRUFBa0MsSUFBbEM7QUFDQSxJQUZEO0FBR0EsVUFBTyxFQUFQLENBQVUsbUJBQVYsRUFBK0IsVUFBUyxJQUFULEVBQWU7QUFDN0MsdUJBQVMsT0FBVCxDQUFpQixtQkFBakIsRUFBcUMsSUFBckM7QUFDQSxJQUZEOzs7QUFLQSxTQUFLLFFBQUwsR0FBZ0IseUJBQWhCO0FBQ0EsU0FBSyxHQUFMLENBQVMsZUFBVCxDQUF5QixJQUF6QixDQUE4QixNQUFLLFFBQW5DOztBQWpDTztBQW1DaEI7Ozs7Ozt3Q0FJNEI7QUFBQSxRQUFWLEdBQVUseURBQU4sSUFBTTs7O0FBRTVCLFNBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsSUFBM0IsQ0FBZ0MsSUFBSSxxQkFBVyxRQUFmLENBQXdCO0FBQ3ZELGVBQVUsRUFBRSxRQUFGO0FBRDZDLEtBQXhCLENBQWhDOzs7QUFLQSxTQUFLLFFBQUwsQ0FBYyxhQUFkLENBQTRCLElBQTVCLENBQWlDLG1DQUF1QixFQUFFLEtBQUssR0FBUCxFQUFZLFNBQVMsaUJBQU8sT0FBNUIsRUFBdkIsQ0FBakM7OztBQUdBLFFBQUksRUFBRSxLQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLFdBQXhCLDJDQUFGLENBQUosRUFDQyxLQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLElBQXhCLENBQTZCLHFDQUE3Qjs7O0FBR0QsUUFBSSxLQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLFdBQXpCLG1DQUFKLEVBQ0MsS0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixXQUF6QixDQUFxQyxNQUFyQyxDQUE0QyxHQUE1QyxFQURELEtBR0MsS0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixJQUF6QixDQUE4Qiw0QkFBZ0IsRUFBRSxLQUFLLEdBQVAsRUFBWSxTQUFTLGlCQUFPLE9BQTVCLEVBQWhCLENBQTlCO0FBQ0Q7OztrQ0FFYyxFLEVBQUk7QUFDbEIsU0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixLQUEzQjtBQUNBLFNBQUssUUFBTCxDQUFjLGFBQWQsQ0FBNEIsSUFBNUIsQ0FBaUMsOEJBQW1CLEVBQUUsSUFBSSxFQUFOLEVBQW5CLENBQWpDO0FBQ0EsU0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixLQUF6QjtBQUNBLFNBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsS0FBeEI7QUFDQTs7O21DQUVlO0FBQ2YsU0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixJQUEzQixDQUFnQyxJQUFJLHFCQUFXLFFBQWYsQ0FBd0I7QUFDdkQsZUFBVSxFQUFFLFFBQUYsQ0FBVyxzRkFBWDtBQUQ2QyxLQUF4QixDQUFoQztBQUdBLFNBQUssUUFBTCxDQUFjLGFBQWQsQ0FBNEIsSUFBNUIsQ0FBaUMseUJBQWMsRUFBRSxTQUFTLGlCQUFPLE9BQWxCLEVBQWQsQ0FBakM7QUFDQSxTQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLEtBQXpCO0FBQ0EsU0FBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixLQUF4QjtBQUNBOzs7b0NBRWdCO0FBQ2hCLFNBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsSUFBM0IsQ0FBZ0MsSUFBSSxxQkFBVyxRQUFmLENBQXdCO0FBQ3ZELGVBQVUsRUFBRSxRQUFGLENBQVcsb0RBQVg7QUFENkMsS0FBeEIsQ0FBaEM7QUFHQSxTQUFLLFFBQUwsQ0FBYyxhQUFkLENBQTRCLElBQTVCLENBQWlDLDBCQUFlLEVBQUUsU0FBUyxpQkFBTyxPQUFsQixFQUFmLENBQWpDO0FBQ0EsU0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixLQUF6QjtBQUNBLFNBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsS0FBeEI7QUFDQTs7O29DQUVnQjtBQUNoQixVQUFNLGlCQUFOO0FBQ0E7Ozt3Q0FFb0I7QUFDcEIsVUFBTSxnQkFBTjtBQUNBOzs7bUNBRWUsSSxFQUFLLEssRUFBTzs7QUFFM0IsUUFBSSxRQUFRLENBQUMsT0FBSyxRQUFOLEVBQWdCLFdBQWhCLEVBQVo7QUFDQSxRQUFJLFVBQVUsTUFBTSxPQUFwQjs7QUFFQSxVQUFNLFFBQU0sSUFBTixHQUFXLE9BQWpCO0FBQ0E7OztpQ0FFYSxDQUViOzs7O0dBeEdzQixxQkFBVyxVOztBQTJHbkM7O21CQUVjLFUiLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0wMSAyMDoxMjoyMlxuKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IFNJTyBmcm9tICdzb2NrZXRpbyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5cbmltcG9ydCBNYWluVmlldyBmcm9tICd2aWV3cy9tYWluX3ZpZXcnO1xuaW1wb3J0IFN1Ym1pc3Npb25MaXN0VmlldyBmcm9tICd2aWV3cy9zdWJtaXNzaW9uX2xpc3Rfdmlldyc7XG5pbXBvcnQgVGFnTGlzdFZpZXcgZnJvbSAndmlld3MvdGFnX2xpc3Rfdmlldyc7XG5pbXBvcnQgU3VibWlzc2lvbklucHV0VmlldyBmcm9tICd2aWV3cy9zdWJtaXNzaW9uX2lucHV0X3ZpZXcnO1xuaW1wb3J0IFN1Ym1pc3Npb25WaWV3IGZyb20gJ3ZpZXdzL3N1Ym1pc3Npb25fdmlldyc7XG5pbXBvcnQgQWRtaW5WaWV3IGZyb20gJ3ZpZXdzL2FkbWluX3ZpZXcnO1xuaW1wb3J0IFRhYmxldFZpZXcgZnJvbSAndmlld3MvdGFibGV0X3ZpZXcnO1xuXG5pbXBvcnQgaGVhZGVyVGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvaGVhZGVyX3RtcGwuaHRtbCc7XG5cbmNsYXNzIENvbnRyb2xsZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbnRyb2xsZXIge1xuXHRcdFxuXHRcdGNvbnN0cnVjdG9yKGFwcCkge1xuXG5cdFx0XHRzdXBlcigpO1xuXG5cdFx0XHR0aGlzLmFwcCA9IGFwcDtcblx0XHRcdFxuXHRcdFx0YXBwLmFkZFJlZ2lvbnMoe1xuXHRcdFx0XHRjb250YWluZXJSZWdpb246IFwiI2NvbnRhaW5lclwiLFxuXHRcdFx0XHRtb2RhbFJlZ2lvbjogXCIjbW9kYWwtY29udGFpbmVyXCJcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHQvL3JlZ2lzdGVyIGNsaWVudCBldmVudHNcblx0XHRcdC8qQmFja2JvbmUub24oJ2RpYWxvZzpvcGVuJywgdGhpcy5vcGVuRGlhbG9nLCB0aGlzKTtcblx0XHRcdEJhY2tib25lLm9uKCdkaWFsb2c6Y2xvc2UnLCB0aGlzLmNsb3NlRGlhbG9nLCB0aGlzKTsqL1xuXHRcdFx0QmFja2JvbmUub24oJ2Vycm9yJyx0aGlzLm9wZW5FcnJvckRpYWxvZywgdGhpcyk7XG5cblx0XHRcdC8vcmVnaXN0ZXIgc29ja2V0IGV2ZW50c1xuXHRcdFx0dmFyIHNvY2tldCA9IFNJTyhDb25maWcud2ViX3NvY2tldF91cmwpO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdzdWJtaXNzaW9uOmNoYW5nZWQnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ3N1Ym1pc3Npb246Y2hhbmdlZCcsZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNvY2tldC5vbignc3VibWlzc2lvbjpuZXcnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ3N1Ym1pc3Npb246bmV3JyxkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdzdWJtaXNzaW9uOnJlbW92ZWQnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ3N1Ym1pc3Npb246bmV3JyxkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdmZWVkYmFjazpzY2FubmluZycsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIFx0QmFja2JvbmUudHJpZ2dlcignZmVlZGJhY2s6c2Nhbm5pbmcnLGRhdGEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vbG9hZCBtYWludmlld1xuICAgICAgICAgICAgdGhpcy5tYWluVmlldyA9IG5ldyBNYWluVmlldygpO1xuICAgICAgICAgICAgdGhpcy5hcHAuY29udGFpbmVyUmVnaW9uLnNob3codGhpcy5tYWluVmlldyk7XG5cdFx0XHRcblx0XHR9XG5cdFx0XHRcblx0XHQvKiBST1VURVMgKi9cblxuXHRcdHNob3dTdWJtaXNzaW9uTGlzdCh0YWc9bnVsbCkge1xuXG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoaGVhZGVyVGVtcGxhdGUpXG5cdFx0XHR9KSk7XG5cblx0XHRcdC8vdXBkYXRlIGxpc3Qgdmlld1xuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IFN1Ym1pc3Npb25MaXN0Vmlldyh7IHRhZzogdGFnLCBkYXRhc2V0OiBDb25maWcuZGF0YXNldCB9KSk7XG5cblx0XHRcdC8vc2V0IGlucHV0IHZpZXdcblx0XHRcdGlmICghKHRoaXMubWFpblZpZXcudG9wUmVnaW9uLmN1cnJlbnRWaWV3IGluc3RhbmNlb2YgU3VibWlzc2lvbklucHV0VmlldykpXG5cdFx0XHRcdHRoaXMubWFpblZpZXcudG9wUmVnaW9uLnNob3cobmV3IFN1Ym1pc3Npb25JbnB1dFZpZXcoKSk7XG5cblx0XHRcdC8vc2V0IHRhZ3ZpZXdcblx0XHRcdGlmICh0aGlzLm1haW5WaWV3LnRhZ3NSZWdpb24uY3VycmVudFZpZXcgaW5zdGFuY2VvZiBUYWdMaXN0Vmlldylcblx0XHRcdFx0dGhpcy5tYWluVmlldy50YWdzUmVnaW9uLmN1cnJlbnRWaWV3LnNldFRhZyh0YWcpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLm1haW5WaWV3LnRhZ3NSZWdpb24uc2hvdyhuZXcgVGFnTGlzdFZpZXcoeyB0YWc6IHRhZywgZGF0YXNldDogQ29uZmlnLmRhdGFzZXQgfSkpO1xuXHRcdH1cblxuXHRcdHNob3dTdWJtaXNzaW9uKGlkKSB7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IFN1Ym1pc3Npb25WaWV3KHsgaWQ6IGlkIH0pKTtcblx0XHRcdHRoaXMubWFpblZpZXcudGFnc1JlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy50b3BSZWdpb24ucmVzZXQoKTtcblx0XHR9XG5cblx0XHRzaG93QWRtaW5QYWdlKCkge1xuXHRcdFx0dGhpcy5tYWluVmlldy5oZWFkZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHRcdHRlbXBsYXRlOiBfLnRlbXBsYXRlKCc8ZGl2IGNsYXNzPVwibGluay1iYWNrXCI+PGEgaHJlZj1cIiNcIj48c3BhbiBjbGFzcz1cImNsb3NlLWJ1dHRvblwiPkNsb3NlPC9zcGFuPjwvYT48L2Rpdj4nKVxuXHRcdFx0fSkpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IEFkbWluVmlldyh7IGRhdGFzZXQ6IENvbmZpZy5kYXRhc2V0IH0pKTtcblx0XHRcdHRoaXMubWFpblZpZXcudGFnc1JlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy50b3BSZWdpb24ucmVzZXQoKTtcblx0XHR9XG5cblx0XHRzaG93VGFibGV0VmlldygpIHtcblx0XHRcdHRoaXMubWFpblZpZXcuaGVhZGVyUmVnaW9uLnNob3cobmV3IE1hcmlvbmV0dGUuSXRlbVZpZXcoe1xuXHRcdFx0XHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgnPGgxPkxvZ288L2gxPjxzcGFuIGNsYXNzPVwibGluZS1ob3Jpem9udGFsXCI+PC9zcGFuPicpXG5cdFx0XHR9KSk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgVGFibGV0Vmlldyh7IGRhdGFzZXQ6IENvbmZpZy5kYXRhc2V0IH0pICk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnRhZ3NSZWdpb24ucmVzZXQoKTtcblx0XHRcdHRoaXMubWFpblZpZXcudG9wUmVnaW9uLnJlc2V0KCk7XG5cdFx0fVxuXG5cdFx0cG9zdFN1Ym1pc3Npb24oKSB7XG5cdFx0XHRhbGVydCgncG9zdCBzdWJtaXNzaW9uJyk7XG5cdFx0fVxuXG5cdFx0c2hvd1NjYW5uaW5nRGlhbG9nKCkge1xuXHRcdFx0YWxlcnQoXCJTY2FubmluZ0RpYWxvZ1wiKTtcblx0XHR9XG5cblx0XHRvcGVuRXJyb3JEaWFsb2codHlwZSxlcnJvcikge1xuXG5cdFx0XHR2YXIgdGl0bGUgPSAodHlwZSsnLWVycm9yJykudG9VcHBlckNhc2UoKTtcblx0XHRcdHZhciBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcblxuXHRcdFx0YWxlcnQodGl0bGUrJzogJyttZXNzYWdlKTtcblx0XHR9XG5cblx0XHRjbG9zZURpYWxvZygpIHtcblxuXHRcdH1cblxuXHRcdFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlclxuXHQiXX0=