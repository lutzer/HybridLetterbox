define(['exports', 'backbone', 'marionette', 'socketio', 'config', 'views/main_view', 'views/submission_list_view', 'views/tag_list_view', 'views/submission_input_view', 'views/submission_view', 'views/admin_view', 'views/tablet_view', 'text!templates/header_tmpl.html'], function (exports, _backbone, _marionette, _socketio, _config, _main_view, _submission_list_view, _tag_list_view, _submission_input_view, _submission_view, _admin_view, _tablet_view, _header_tmpl) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-06-29 17:30:03
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
				this.mainView.contentRegion.show(new _submission_list_view2.default({ tag: tag }));

				//set input view
				if (!(this.mainView.topRegion.currentView instanceof _submission_input_view2.default)) this.mainView.topRegion.show(new _submission_input_view2.default());

				//set tagview
				if (this.mainView.sideRegion.currentView instanceof _tag_list_view2.default) this.mainView.sideRegion.currentView.setTag(tag);else this.mainView.sideRegion.show(new _tag_list_view2.default({ tag: tag }));
			}
		}, {
			key: 'showSubmissionSet',
			value: function showSubmissionSet() {
				var set = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
				var tag = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_header_tmpl2.default)
				}));

				//update list view
				this.mainView.contentRegion.show(new _submission_list_view2.default({ dataset: set, tag: tag }));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXdCTSxVOzs7QUFFSixzQkFBWSxHQUFaLEVBQWlCO0FBQUE7O0FBQUE7O0FBSWhCLFNBQUssR0FBTCxHQUFXLEdBQVg7O0FBRUEsT0FBSSxVQUFKLENBQWU7QUFDZCxxQkFBaUIsWUFESDtBQUVkLGlCQUFhO0FBRkMsSUFBZjs7Ozs7QUFRQSxzQkFBUyxFQUFULENBQVksT0FBWixFQUFvQixNQUFLLGVBQXpCOzs7QUFHQSxPQUFJLFNBQVMsd0JBQUksaUJBQU8sY0FBWCxDQUFiO0FBQ1MsVUFBTyxFQUFQLENBQVUsb0JBQVYsRUFBZ0MsVUFBUyxJQUFULEVBQWU7QUFDOUMsdUJBQVMsT0FBVCxDQUFpQixvQkFBakIsRUFBc0MsSUFBdEM7QUFDQSxJQUZEO0FBR0EsVUFBTyxFQUFQLENBQVUsZ0JBQVYsRUFBNEIsVUFBUyxJQUFULEVBQWU7QUFDMUMsdUJBQVMsT0FBVCxDQUFpQixnQkFBakIsRUFBa0MsSUFBbEM7QUFDQSxJQUZEO0FBR0EsVUFBTyxFQUFQLENBQVUsb0JBQVYsRUFBZ0MsVUFBUyxJQUFULEVBQWU7QUFDOUMsdUJBQVMsT0FBVCxDQUFpQixnQkFBakIsRUFBa0MsSUFBbEM7QUFDQSxJQUZEO0FBR0EsVUFBTyxFQUFQLENBQVUsbUJBQVYsRUFBK0IsVUFBUyxJQUFULEVBQWU7QUFDN0MsdUJBQVMsT0FBVCxDQUFpQixtQkFBakIsRUFBcUMsSUFBckM7QUFDQSxJQUZEOzs7QUFLQSxTQUFLLFFBQUwsR0FBZ0IseUJBQWhCO0FBQ0EsU0FBSyxHQUFMLENBQVMsZUFBVCxDQUF5QixJQUF6QixDQUE4QixNQUFLLFFBQW5DOztBQWpDTztBQW1DaEI7Ozs7Ozt3Q0FJNEI7QUFBQSxRQUFWLEdBQVUseURBQU4sSUFBTTs7O0FBRTVCLFNBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsSUFBM0IsQ0FBZ0MsSUFBSSxxQkFBVyxRQUFmLENBQXdCO0FBQ3ZELGVBQVUsRUFBRSxRQUFGO0FBRDZDLEtBQXhCLENBQWhDOzs7QUFLQSxTQUFLLFFBQUwsQ0FBYyxhQUFkLENBQTRCLElBQTVCLENBQWlDLG1DQUF1QixFQUFFLEtBQUssR0FBUCxFQUF2QixDQUFqQzs7O0FBR0EsUUFBSSxFQUFFLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsV0FBeEIsMkNBQUYsQ0FBSixFQUNDLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsSUFBeEIsQ0FBNkIscUNBQTdCOzs7QUFHRCxRQUFJLEtBQUssUUFBTCxDQUFjLFVBQWQsQ0FBeUIsV0FBekIsbUNBQUosRUFDQyxLQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLFdBQXpCLENBQXFDLE1BQXJDLENBQTRDLEdBQTVDLEVBREQsS0FHQyxLQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLElBQXpCLENBQThCLDRCQUFnQixFQUFFLEtBQUssR0FBUCxFQUFoQixDQUE5QjtBQUNEOzs7dUNBRW9DO0FBQUEsUUFBbkIsR0FBbUIseURBQWYsSUFBZTtBQUFBLFFBQVYsR0FBVSx5REFBTixJQUFNOztBQUNwQyxTQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLElBQTNCLENBQWdDLElBQUkscUJBQVcsUUFBZixDQUF3QjtBQUN2RCxlQUFVLEVBQUUsUUFBRjtBQUQ2QyxLQUF4QixDQUFoQzs7O0FBS0EsU0FBSyxRQUFMLENBQWMsYUFBZCxDQUE0QixJQUE1QixDQUFpQyxtQ0FBdUIsRUFBRSxTQUFTLEdBQVgsRUFBZ0IsS0FBTSxHQUF0QixFQUF2QixDQUFqQzs7O0FBR0EsUUFBSSxFQUFFLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsV0FBeEIsMkNBQUYsQ0FBSixFQUNDLEtBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsSUFBeEIsQ0FBNkIscUNBQTdCOzs7QUFHRCxRQUFJLEtBQUssUUFBTCxDQUFjLFVBQWQsQ0FBeUIsV0FBekIsbUNBQUosRUFDQyxLQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLFdBQXpCLENBQXFDLE1BQXJDLENBQTRDLEdBQTVDLEVBREQsS0FHQyxLQUFLLFFBQUwsQ0FBYyxVQUFkLENBQXlCLElBQXpCLENBQThCLDRCQUFnQixFQUFFLEtBQUssR0FBUCxFQUFoQixDQUE5QjtBQUVEOzs7a0NBRWMsRSxFQUFJO0FBQ2xCLFNBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsSUFBM0IsQ0FBZ0MsSUFBSSxxQkFBVyxRQUFmLENBQXdCO0FBQ3ZELGVBQVUsRUFBRSxRQUFGLENBQVcsc0ZBQVg7QUFENkMsS0FBeEIsQ0FBaEM7QUFHQSxTQUFLLFFBQUwsQ0FBYyxhQUFkLENBQTRCLElBQTVCLENBQWlDLDhCQUFtQixFQUFFLElBQUksRUFBTixFQUFuQixDQUFqQztBQUNBLFNBQUssUUFBTCxDQUFjLFVBQWQsQ0FBeUIsS0FBekI7QUFDQSxTQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLEtBQXhCO0FBQ0E7OzttQ0FFZTtBQUNmLFNBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsSUFBM0IsQ0FBZ0MsSUFBSSxxQkFBVyxRQUFmLENBQXdCO0FBQ3ZELGVBQVUsRUFBRSxRQUFGLENBQVcsc0ZBQVg7QUFENkMsS0FBeEIsQ0FBaEM7QUFHQSxTQUFLLFFBQUwsQ0FBYyxhQUFkLENBQTRCLElBQTVCLENBQWlDLDBCQUFqQztBQUNBLFNBQUssUUFBTCxDQUFjLFVBQWQsQ0FBeUIsS0FBekI7QUFDQSxTQUFLLFFBQUwsQ0FBYyxTQUFkLENBQXdCLEtBQXhCO0FBQ0E7OztvQ0FFZ0I7QUFDaEIsU0FBSyxRQUFMLENBQWMsWUFBZCxDQUEyQixJQUEzQixDQUFnQyxJQUFJLHFCQUFXLFFBQWYsQ0FBd0I7QUFDdkQsZUFBVSxFQUFFLFFBQUYsQ0FBVyxvREFBWDtBQUQ2QyxLQUF4QixDQUFoQztBQUdBLFNBQUssUUFBTCxDQUFjLGFBQWQsQ0FBNEIsSUFBNUIsQ0FBaUMsMkJBQWpDO0FBQ0EsU0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixLQUF6QjtBQUNBLFNBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsS0FBeEI7QUFDQTs7O29DQUVnQjtBQUNoQixVQUFNLGlCQUFOO0FBQ0E7Ozt3Q0FFb0I7QUFDcEIsVUFBTSxnQkFBTjtBQUNBOzs7bUNBRWUsSSxFQUFLLEssRUFBTzs7QUFFM0IsUUFBSSxRQUFRLENBQUMsT0FBSyxRQUFOLEVBQWdCLFdBQWhCLEVBQVo7QUFDQSxRQUFJLFVBQVUsTUFBTSxPQUFwQjs7QUFFQSxVQUFNLFFBQU0sSUFBTixHQUFXLE9BQWpCO0FBQ0E7OztpQ0FFYSxDQUViOzs7O0dBOUhzQixxQkFBVyxVOztBQWlJbkM7O21CQUVjLFUiLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNi0yOSAxNzozMDowM1xuKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IFNJTyBmcm9tICdzb2NrZXRpbyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ2NvbmZpZyc7XG5cbmltcG9ydCBNYWluVmlldyBmcm9tICd2aWV3cy9tYWluX3ZpZXcnO1xuaW1wb3J0IFN1Ym1pc3Npb25MaXN0VmlldyBmcm9tICd2aWV3cy9zdWJtaXNzaW9uX2xpc3Rfdmlldyc7XG5pbXBvcnQgVGFnTGlzdFZpZXcgZnJvbSAndmlld3MvdGFnX2xpc3Rfdmlldyc7XG5pbXBvcnQgU3VibWlzc2lvbklucHV0VmlldyBmcm9tICd2aWV3cy9zdWJtaXNzaW9uX2lucHV0X3ZpZXcnO1xuaW1wb3J0IFN1Ym1pc3Npb25WaWV3IGZyb20gJ3ZpZXdzL3N1Ym1pc3Npb25fdmlldyc7XG5pbXBvcnQgQWRtaW5WaWV3IGZyb20gJ3ZpZXdzL2FkbWluX3ZpZXcnO1xuaW1wb3J0IFRhYmxldFZpZXcgZnJvbSAndmlld3MvdGFibGV0X3ZpZXcnO1xuXG5pbXBvcnQgaGVhZGVyVGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvaGVhZGVyX3RtcGwuaHRtbCc7XG5cbmNsYXNzIENvbnRyb2xsZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbnRyb2xsZXIge1xuXHRcdFxuXHRcdGNvbnN0cnVjdG9yKGFwcCkge1xuXG5cdFx0XHRzdXBlcigpO1xuXG5cdFx0XHR0aGlzLmFwcCA9IGFwcDtcblx0XHRcdFxuXHRcdFx0YXBwLmFkZFJlZ2lvbnMoe1xuXHRcdFx0XHRjb250YWluZXJSZWdpb246IFwiI2NvbnRhaW5lclwiLFxuXHRcdFx0XHRtb2RhbFJlZ2lvbjogXCIjbW9kYWwtY29udGFpbmVyXCJcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHQvL3JlZ2lzdGVyIGNsaWVudCBldmVudHNcblx0XHRcdC8qQmFja2JvbmUub24oJ2RpYWxvZzpvcGVuJywgdGhpcy5vcGVuRGlhbG9nLCB0aGlzKTtcblx0XHRcdEJhY2tib25lLm9uKCdkaWFsb2c6Y2xvc2UnLCB0aGlzLmNsb3NlRGlhbG9nLCB0aGlzKTsqL1xuXHRcdFx0QmFja2JvbmUub24oJ2Vycm9yJyx0aGlzLm9wZW5FcnJvckRpYWxvZywgdGhpcyk7XG5cblx0XHRcdC8vcmVnaXN0ZXIgc29ja2V0IGV2ZW50c1xuXHRcdFx0dmFyIHNvY2tldCA9IFNJTyhDb25maWcud2ViX3NvY2tldF91cmwpO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdzdWJtaXNzaW9uOmNoYW5nZWQnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ3N1Ym1pc3Npb246Y2hhbmdlZCcsZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNvY2tldC5vbignc3VibWlzc2lvbjpuZXcnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ3N1Ym1pc3Npb246bmV3JyxkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdzdWJtaXNzaW9uOnJlbW92ZWQnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ3N1Ym1pc3Npb246bmV3JyxkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdmZWVkYmFjazpzY2FubmluZycsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIFx0QmFja2JvbmUudHJpZ2dlcignZmVlZGJhY2s6c2Nhbm5pbmcnLGRhdGEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vbG9hZCBtYWludmlld1xuICAgICAgICAgICAgdGhpcy5tYWluVmlldyA9IG5ldyBNYWluVmlldygpO1xuICAgICAgICAgICAgdGhpcy5hcHAuY29udGFpbmVyUmVnaW9uLnNob3codGhpcy5tYWluVmlldyk7XG5cdFx0XHRcblx0XHR9XG5cdFx0XHRcblx0XHQvKiBST1VURVMgKi9cblxuXHRcdHNob3dTdWJtaXNzaW9uTGlzdCh0YWc9bnVsbCkge1xuXG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoaGVhZGVyVGVtcGxhdGUpXG5cdFx0XHR9KSk7XG5cblx0XHRcdC8vdXBkYXRlIGxpc3Qgdmlld1xuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IFN1Ym1pc3Npb25MaXN0Vmlldyh7IHRhZzogdGFnIH0pKTtcblxuXHRcdFx0Ly9zZXQgaW5wdXQgdmlld1xuXHRcdFx0aWYgKCEodGhpcy5tYWluVmlldy50b3BSZWdpb24uY3VycmVudFZpZXcgaW5zdGFuY2VvZiBTdWJtaXNzaW9uSW5wdXRWaWV3KSlcblx0XHRcdFx0dGhpcy5tYWluVmlldy50b3BSZWdpb24uc2hvdyhuZXcgU3VibWlzc2lvbklucHV0VmlldygpKTtcblxuXHRcdFx0Ly9zZXQgdGFndmlld1xuXHRcdFx0aWYgKHRoaXMubWFpblZpZXcuc2lkZVJlZ2lvbi5jdXJyZW50VmlldyBpbnN0YW5jZW9mIFRhZ0xpc3RWaWV3KVxuXHRcdFx0XHR0aGlzLm1haW5WaWV3LnNpZGVSZWdpb24uY3VycmVudFZpZXcuc2V0VGFnKHRhZyk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMubWFpblZpZXcuc2lkZVJlZ2lvbi5zaG93KG5ldyBUYWdMaXN0Vmlldyh7IHRhZzogdGFnIH0pKTtcblx0XHR9XG5cblx0XHRzaG93U3VibWlzc2lvblNldChzZXQ9bnVsbCx0YWc9bnVsbCkge1xuXHRcdFx0dGhpcy5tYWluVmlldy5oZWFkZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHRcdHRlbXBsYXRlOiBfLnRlbXBsYXRlKGhlYWRlclRlbXBsYXRlKVxuXHRcdFx0fSkpO1xuXG5cdFx0XHQvL3VwZGF0ZSBsaXN0IHZpZXdcblx0XHRcdHRoaXMubWFpblZpZXcuY29udGVudFJlZ2lvbi5zaG93KG5ldyBTdWJtaXNzaW9uTGlzdFZpZXcoeyBkYXRhc2V0OiBzZXQsIHRhZyA6IHRhZyB9KSk7XG5cblx0XHRcdC8vc2V0IGlucHV0IHZpZXdcblx0XHRcdGlmICghKHRoaXMubWFpblZpZXcudG9wUmVnaW9uLmN1cnJlbnRWaWV3IGluc3RhbmNlb2YgU3VibWlzc2lvbklucHV0VmlldykpXG5cdFx0XHRcdHRoaXMubWFpblZpZXcudG9wUmVnaW9uLnNob3cobmV3IFN1Ym1pc3Npb25JbnB1dFZpZXcoKSk7XG5cblx0XHRcdC8vc2V0IHRhZ3ZpZXdcblx0XHRcdGlmICh0aGlzLm1haW5WaWV3LnNpZGVSZWdpb24uY3VycmVudFZpZXcgaW5zdGFuY2VvZiBUYWdMaXN0Vmlldylcblx0XHRcdFx0dGhpcy5tYWluVmlldy5zaWRlUmVnaW9uLmN1cnJlbnRWaWV3LnNldFRhZyh0YWcpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLm1haW5WaWV3LnNpZGVSZWdpb24uc2hvdyhuZXcgVGFnTGlzdFZpZXcoeyB0YWc6IHRhZyB9KSk7XG5cdFx0XG5cdFx0fVxuXG5cdFx0c2hvd1N1Ym1pc3Npb24oaWQpIHtcblx0XHRcdHRoaXMubWFpblZpZXcuaGVhZGVyUmVnaW9uLnNob3cobmV3IE1hcmlvbmV0dGUuSXRlbVZpZXcoe1xuXHRcdFx0XHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cImxpbmstYmFja1wiPjxhIGhyZWY9XCIjXCI+PHNwYW4gY2xhc3M9XCJjbG9zZS1idXR0b25cIj5DbG9zZTwvc3Bhbj48L2E+PC9kaXY+Jylcblx0XHRcdH0pKTtcblx0XHRcdHRoaXMubWFpblZpZXcuY29udGVudFJlZ2lvbi5zaG93KG5ldyBTdWJtaXNzaW9uVmlldyh7IGlkOiBpZCB9KSk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnNpZGVSZWdpb24ucmVzZXQoKTtcblx0XHRcdHRoaXMubWFpblZpZXcudG9wUmVnaW9uLnJlc2V0KCk7XG5cdFx0fVxuXG5cdFx0c2hvd0FkbWluUGFnZSgpIHtcblx0XHRcdHRoaXMubWFpblZpZXcuaGVhZGVyUmVnaW9uLnNob3cobmV3IE1hcmlvbmV0dGUuSXRlbVZpZXcoe1xuXHRcdFx0XHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cImxpbmstYmFja1wiPjxhIGhyZWY9XCIjXCI+PHNwYW4gY2xhc3M9XCJjbG9zZS1idXR0b25cIj5DbG9zZTwvc3Bhbj48L2E+PC9kaXY+Jylcblx0XHRcdH0pKTtcblx0XHRcdHRoaXMubWFpblZpZXcuY29udGVudFJlZ2lvbi5zaG93KG5ldyBBZG1pblZpZXcoKSk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnNpZGVSZWdpb24ucmVzZXQoKTtcblx0XHRcdHRoaXMubWFpblZpZXcudG9wUmVnaW9uLnJlc2V0KCk7XG5cdFx0fVxuXG5cdFx0c2hvd1RhYmxldFZpZXcoKSB7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoJzxoMT5Mb2dvPC9oMT48c3BhbiBjbGFzcz1cImxpbmUtaG9yaXpvbnRhbFwiPjwvc3Bhbj4nKVxuXHRcdFx0fSkpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IFRhYmxldFZpZXcoKSApO1xuXHRcdFx0dGhpcy5tYWluVmlldy5zaWRlUmVnaW9uLnJlc2V0KCk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnRvcFJlZ2lvbi5yZXNldCgpO1xuXHRcdH1cblxuXHRcdHBvc3RTdWJtaXNzaW9uKCkge1xuXHRcdFx0YWxlcnQoJ3Bvc3Qgc3VibWlzc2lvbicpO1xuXHRcdH1cblxuXHRcdHNob3dTY2FubmluZ0RpYWxvZygpIHtcblx0XHRcdGFsZXJ0KFwiU2Nhbm5pbmdEaWFsb2dcIik7XG5cdFx0fVxuXG5cdFx0b3BlbkVycm9yRGlhbG9nKHR5cGUsZXJyb3IpIHtcblxuXHRcdFx0dmFyIHRpdGxlID0gKHR5cGUrJy1lcnJvcicpLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR2YXIgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG5cblx0XHRcdGFsZXJ0KHRpdGxlKyc6ICcrbWVzc2FnZSk7XG5cdFx0fVxuXG5cdFx0Y2xvc2VEaWFsb2coKSB7XG5cblx0XHR9XG5cblx0XHRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXJcblx0Il19