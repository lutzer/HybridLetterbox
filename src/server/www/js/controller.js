define(['exports', 'backbone', 'marionette', 'socketio', 'config', 'views/main_view', 'views/submission_list_view', 'views/tag_list_view', 'views/submission_input_view', 'views/submission_view', 'views/admin_view', 'views/tablet_view', 'views/projection_view', 'text!templates/header_tmpl.html', 'text!templates/footer_tmpl.html'], function (exports, _backbone, _marionette, _socketio, _config, _main_view, _submission_list_view, _tag_list_view, _submission_input_view, _submission_view, _admin_view, _tablet_view, _projection_view, _header_tmpl, _footer_tmpl) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-14 11:02:33
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

	var _projection_view2 = _interopRequireDefault(_projection_view);

	var _header_tmpl2 = _interopRequireDefault(_header_tmpl);

	var _footer_tmpl2 = _interopRequireDefault(_footer_tmpl);

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

				this.mainView.footerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_footer_tmpl2.default)
				}));
			}
		}, {
			key: 'showSubmission',
			value: function showSubmission(id) {
				this.mainView.headerRegion.reset();
				this.mainView.contentRegion.show(new _submission_view2.default({ id: id }));
				this.mainView.tagsRegion.reset();
				this.mainView.topRegion.reset();
				this.mainView.footerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_footer_tmpl2.default)
				}));
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
				this.mainView.footerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_footer_tmpl2.default)
				}));
			}
		}, {
			key: 'showTabletView',
			value: function showTabletView() {

				$('body').addClass("tablet");

				this.mainView.headerRegion.show(new _marionette2.default.ItemView({
					template: _.template('<div class="logo"><img src="images/logo.png"></div><span class="line-horizontal"></span>')
				}));
				this.mainView.contentRegion.show(new _tablet_view2.default({ dataset: _config2.default.dataset }));
				this.mainView.tagsRegion.reset();
				this.mainView.topRegion.reset();
				this.mainView.footerRegion.show(new _marionette2.default.ItemView({
					template: _.template(_footer_tmpl2.default)
				}));
			}
		}, {
			key: 'showProjection',
			value: function showProjection() {
				$('body').addClass("projection");

				this.mainView.headerRegion.reset();
				this.mainView.contentRegion.show(new _projection_view2.default({ dataset: _config2.default.dataset }));
				this.mainView.tagsRegion.reset();
				this.mainView.topRegion.reset();
				this.mainView.footerRegion.reset();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0EwQk0sVTs7O0FBRUosc0JBQVksR0FBWixFQUFpQjtBQUFBOztBQUFBOztBQUloQixTQUFLLEdBQUwsR0FBVyxHQUFYOztBQUVBLE9BQUksVUFBSixDQUFlO0FBQ2QscUJBQWlCLFlBREg7QUFFZCxpQkFBYTtBQUZDLElBQWY7Ozs7O0FBUUEsc0JBQVMsRUFBVCxDQUFZLE9BQVosRUFBb0IsTUFBSyxlQUF6Qjs7O0FBR0EsT0FBSSxTQUFTLHdCQUFJLGlCQUFPLGNBQVgsQ0FBYjtBQUNTLFVBQU8sRUFBUCxDQUFVLG9CQUFWLEVBQWdDLFVBQVMsSUFBVCxFQUFlO0FBQzlDLHVCQUFTLE9BQVQsQ0FBaUIsb0JBQWpCLEVBQXNDLElBQXRDO0FBQ0EsSUFGRDtBQUdBLFVBQU8sRUFBUCxDQUFVLGdCQUFWLEVBQTRCLFVBQVMsSUFBVCxFQUFlO0FBQzFDLHVCQUFTLE9BQVQsQ0FBaUIsZ0JBQWpCLEVBQWtDLElBQWxDO0FBQ0EsSUFGRDtBQUdBLFVBQU8sRUFBUCxDQUFVLG9CQUFWLEVBQWdDLFVBQVMsSUFBVCxFQUFlO0FBQzlDLHVCQUFTLE9BQVQsQ0FBaUIsZ0JBQWpCLEVBQWtDLElBQWxDO0FBQ0EsSUFGRDtBQUdBLFVBQU8sRUFBUCxDQUFVLG1CQUFWLEVBQStCLFVBQVMsSUFBVCxFQUFlO0FBQzdDLHVCQUFTLE9BQVQsQ0FBaUIsbUJBQWpCLEVBQXFDLElBQXJDO0FBQ0EsSUFGRDs7O0FBS0EsU0FBSyxRQUFMLEdBQWdCLHlCQUFoQjtBQUNBLFNBQUssR0FBTCxDQUFTLGVBQVQsQ0FBeUIsSUFBekIsQ0FBOEIsTUFBSyxRQUFuQzs7QUFqQ087QUFtQ2hCOzs7Ozs7d0NBSTRCO0FBQUEsUUFB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QUFDaEIsTUFBRSxNQUFGLEVBQVUsUUFBVixDQUFtQixZQUFuQjs7QUFFQSxTQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLEtBQTNCO0FBQ0EsU0FBSyxRQUFMLENBQWMsYUFBZCxDQUE0QixJQUE1QixDQUFpQyw4QkFBbUIsRUFBRSxTQUFTLGlCQUFPLE9BQWxCLEVBQW5CLENBQWpDO0FBQ0EsU0FBSyxRQUFMLENBQWMsVUFBZCxDQUF5QixLQUF6QjtBQUNBLFNBQUssUUFBTCxDQUFjLFNBQWQsQ0FBd0IsS0FBeEI7QUFDQSxTQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLEtBQTNCO0FBQ0E7OztvQ0FFZ0I7QUFDaEIsVUFBTSxpQkFBTjtBQUNBOzs7d0NBRW9CO0FBQ3BCLFVBQU0sZ0JBQU47QUFDQTs7O21DQUVlLEksRUFBSyxLLEVBQU87O0FBRTNCLFFBQUksUUFBUSxDQUFDLE9BQUssUUFBTixFQUFnQixXQUFoQixFQUFaO0FBQ0EsUUFBSSxVQUFVLE1BQU0sT0FBcEI7O0FBRUEsVUFBTSxRQUFNLElBQU4sR0FBVyxPQUFqQjtBQUNBOzs7aUNBRWEsQ0FFYjs7OztHQWxJc0IscUJBQVcsVTs7QUFxSW5DOzttQkFFYyxVIiwiZmlsZSI6ImNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTQgMTE6MDI6MzNcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBTSU8gZnJvbSAnc29ja2V0aW8nO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuXG5pbXBvcnQgTWFpblZpZXcgZnJvbSAndmlld3MvbWFpbl92aWV3JztcbmltcG9ydCBTdWJtaXNzaW9uTGlzdFZpZXcgZnJvbSAndmlld3Mvc3VibWlzc2lvbl9saXN0X3ZpZXcnO1xuaW1wb3J0IFRhZ0xpc3RWaWV3IGZyb20gJ3ZpZXdzL3RhZ19saXN0X3ZpZXcnO1xuaW1wb3J0IFN1Ym1pc3Npb25JbnB1dFZpZXcgZnJvbSAndmlld3Mvc3VibWlzc2lvbl9pbnB1dF92aWV3JztcbmltcG9ydCBTdWJtaXNzaW9uVmlldyBmcm9tICd2aWV3cy9zdWJtaXNzaW9uX3ZpZXcnO1xuaW1wb3J0IEFkbWluVmlldyBmcm9tICd2aWV3cy9hZG1pbl92aWV3JztcbmltcG9ydCBUYWJsZXRWaWV3IGZyb20gJ3ZpZXdzL3RhYmxldF92aWV3JztcbmltcG9ydCBQcm9qZWN0aW9uVmlldyBmcm9tICd2aWV3cy9wcm9qZWN0aW9uX3ZpZXcnO1xuXG5pbXBvcnQgaGVhZGVyVGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvaGVhZGVyX3RtcGwuaHRtbCc7XG5pbXBvcnQgZm9vdGVyVGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvZm9vdGVyX3RtcGwuaHRtbCc7XG5cbmNsYXNzIENvbnRyb2xsZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbnRyb2xsZXIge1xuXHRcdFxuXHRcdGNvbnN0cnVjdG9yKGFwcCkge1xuXG5cdFx0XHRzdXBlcigpO1xuXG5cdFx0XHR0aGlzLmFwcCA9IGFwcDtcblx0XHRcdFxuXHRcdFx0YXBwLmFkZFJlZ2lvbnMoe1xuXHRcdFx0XHRjb250YWluZXJSZWdpb246IFwiI2NvbnRhaW5lclwiLFxuXHRcdFx0XHRtb2RhbFJlZ2lvbjogXCIjbW9kYWwtY29udGFpbmVyXCJcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHQvL3JlZ2lzdGVyIGNsaWVudCBldmVudHNcblx0XHRcdC8qQmFja2JvbmUub24oJ2RpYWxvZzpvcGVuJywgdGhpcy5vcGVuRGlhbG9nLCB0aGlzKTtcblx0XHRcdEJhY2tib25lLm9uKCdkaWFsb2c6Y2xvc2UnLCB0aGlzLmNsb3NlRGlhbG9nLCB0aGlzKTsqL1xuXHRcdFx0QmFja2JvbmUub24oJ2Vycm9yJyx0aGlzLm9wZW5FcnJvckRpYWxvZywgdGhpcyk7XG5cblx0XHRcdC8vcmVnaXN0ZXIgc29ja2V0IGV2ZW50c1xuXHRcdFx0dmFyIHNvY2tldCA9IFNJTyhDb25maWcud2ViX3NvY2tldF91cmwpO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdzdWJtaXNzaW9uOmNoYW5nZWQnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ3N1Ym1pc3Npb246Y2hhbmdlZCcsZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNvY2tldC5vbignc3VibWlzc2lvbjpuZXcnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ3N1Ym1pc3Npb246bmV3JyxkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdzdWJtaXNzaW9uOnJlbW92ZWQnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBcdEJhY2tib25lLnRyaWdnZXIoJ3N1Ym1pc3Npb246bmV3JyxkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdmZWVkYmFjazpzY2FubmluZycsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIFx0QmFja2JvbmUudHJpZ2dlcignZmVlZGJhY2s6c2Nhbm5pbmcnLGRhdGEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vbG9hZCBtYWludmlld1xuICAgICAgICAgICAgdGhpcy5tYWluVmlldyA9IG5ldyBNYWluVmlldygpO1xuICAgICAgICAgICAgdGhpcy5hcHAuY29udGFpbmVyUmVnaW9uLnNob3codGhpcy5tYWluVmlldyk7XG5cdFx0XHRcblx0XHR9XG5cdFx0XHRcblx0XHQvKiBST1VURVMgKi9cblxuXHRcdHNob3dTdWJtaXNzaW9uTGlzdCh0YWc9bnVsbCkge1xuXG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoaGVhZGVyVGVtcGxhdGUpXG5cdFx0XHR9KSk7XG5cblx0XHRcdC8vdXBkYXRlIGxpc3Qgdmlld1xuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IFN1Ym1pc3Npb25MaXN0Vmlldyh7IHRhZzogdGFnLCBkYXRhc2V0OiBDb25maWcuZGF0YXNldCB9KSk7XG5cblx0XHRcdC8vc2V0IGlucHV0IHZpZXdcblx0XHRcdGlmICghKHRoaXMubWFpblZpZXcudG9wUmVnaW9uLmN1cnJlbnRWaWV3IGluc3RhbmNlb2YgU3VibWlzc2lvbklucHV0VmlldykpXG5cdFx0XHRcdHRoaXMubWFpblZpZXcudG9wUmVnaW9uLnNob3cobmV3IFN1Ym1pc3Npb25JbnB1dFZpZXcoKSk7XG5cblx0XHRcdC8vc2V0IHRhZ3ZpZXdcblx0XHRcdGlmICh0aGlzLm1haW5WaWV3LnRhZ3NSZWdpb24uY3VycmVudFZpZXcgaW5zdGFuY2VvZiBUYWdMaXN0Vmlldylcblx0XHRcdFx0dGhpcy5tYWluVmlldy50YWdzUmVnaW9uLmN1cnJlbnRWaWV3LnNldFRhZyh0YWcpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHR0aGlzLm1haW5WaWV3LnRhZ3NSZWdpb24uc2hvdyhuZXcgVGFnTGlzdFZpZXcoeyB0YWc6IHRhZywgZGF0YXNldDogQ29uZmlnLmRhdGFzZXQgfSkpO1xuXG5cdFx0XHR0aGlzLm1haW5WaWV3LmZvb3RlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoZm9vdGVyVGVtcGxhdGUpXG5cdFx0XHR9KSk7XG5cdFx0fVxuXG5cdFx0c2hvd1N1Ym1pc3Npb24oaWQpIHtcblx0XHRcdHRoaXMubWFpblZpZXcuaGVhZGVyUmVnaW9uLnJlc2V0KCk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgU3VibWlzc2lvblZpZXcoeyBpZDogaWQgfSkpO1xuXHRcdFx0dGhpcy5tYWluVmlldy50YWdzUmVnaW9uLnJlc2V0KCk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnRvcFJlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5mb290ZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHRcdHRlbXBsYXRlOiBfLnRlbXBsYXRlKGZvb3RlclRlbXBsYXRlKVxuXHRcdFx0fSkpO1xuXHRcdH1cblxuXHRcdHNob3dBZG1pblBhZ2UoKSB7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoJzxkaXYgY2xhc3M9XCJsaW5rLWJhY2tcIj48YSBocmVmPVwiI1wiPjxzcGFuIGNsYXNzPVwiY2xvc2UtYnV0dG9uXCI+Q2xvc2U8L3NwYW4+PC9hPjwvZGl2PicpXG5cdFx0XHR9KSk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgQWRtaW5WaWV3KHsgZGF0YXNldDogQ29uZmlnLmRhdGFzZXQgfSkpO1xuXHRcdFx0dGhpcy5tYWluVmlldy50YWdzUmVnaW9uLnJlc2V0KCk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnRvcFJlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5mb290ZXJSZWdpb24uc2hvdyhuZXcgTWFyaW9uZXR0ZS5JdGVtVmlldyh7XG5cdFx0XHRcdHRlbXBsYXRlOiBfLnRlbXBsYXRlKGZvb3RlclRlbXBsYXRlKVxuXHRcdFx0fSkpO1xuXHRcdH1cblxuXHRcdHNob3dUYWJsZXRWaWV3KCkge1xuXG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoXCJ0YWJsZXRcIik7XG5cblx0XHRcdHRoaXMubWFpblZpZXcuaGVhZGVyUmVnaW9uLnNob3cobmV3IE1hcmlvbmV0dGUuSXRlbVZpZXcoe1xuXHRcdFx0XHR0ZW1wbGF0ZTogXy50ZW1wbGF0ZSgnPGRpdiBjbGFzcz1cImxvZ29cIj48aW1nIHNyYz1cImltYWdlcy9sb2dvLnBuZ1wiPjwvZGl2PjxzcGFuIGNsYXNzPVwibGluZS1ob3Jpem9udGFsXCI+PC9zcGFuPicpXG5cdFx0XHR9KSk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmNvbnRlbnRSZWdpb24uc2hvdyhuZXcgVGFibGV0Vmlldyh7IGRhdGFzZXQ6IENvbmZpZy5kYXRhc2V0IH0pICk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LnRhZ3NSZWdpb24ucmVzZXQoKTtcblx0XHRcdHRoaXMubWFpblZpZXcudG9wUmVnaW9uLnJlc2V0KCk7XG5cdFx0XHR0aGlzLm1haW5WaWV3LmZvb3RlclJlZ2lvbi5zaG93KG5ldyBNYXJpb25ldHRlLkl0ZW1WaWV3KHtcblx0XHRcdFx0dGVtcGxhdGU6IF8udGVtcGxhdGUoZm9vdGVyVGVtcGxhdGUpXG5cdFx0XHR9KSk7XG5cdFx0fVxuXG5cdFx0c2hvd1Byb2plY3Rpb24oKSB7XG5cdFx0XHQkKCdib2R5JykuYWRkQ2xhc3MoXCJwcm9qZWN0aW9uXCIpO1xuXG5cdFx0XHR0aGlzLm1haW5WaWV3LmhlYWRlclJlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy5jb250ZW50UmVnaW9uLnNob3cobmV3IFByb2plY3Rpb25WaWV3KHsgZGF0YXNldDogQ29uZmlnLmRhdGFzZXQgfSkgKTtcblx0XHRcdHRoaXMubWFpblZpZXcudGFnc1JlZ2lvbi5yZXNldCgpO1xuXHRcdFx0dGhpcy5tYWluVmlldy50b3BSZWdpb24ucmVzZXQoKTtcblx0XHRcdHRoaXMubWFpblZpZXcuZm9vdGVyUmVnaW9uLnJlc2V0KCk7XG5cdFx0fVxuXG5cdFx0cG9zdFN1Ym1pc3Npb24oKSB7XG5cdFx0XHRhbGVydCgncG9zdCBzdWJtaXNzaW9uJyk7XG5cdFx0fVxuXG5cdFx0c2hvd1NjYW5uaW5nRGlhbG9nKCkge1xuXHRcdFx0YWxlcnQoXCJTY2FubmluZ0RpYWxvZ1wiKTtcblx0XHR9XG5cblx0XHRvcGVuRXJyb3JEaWFsb2codHlwZSxlcnJvcikge1xuXG5cdFx0XHR2YXIgdGl0bGUgPSAodHlwZSsnLWVycm9yJykudG9VcHBlckNhc2UoKTtcblx0XHRcdHZhciBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcblxuXHRcdFx0YWxlcnQodGl0bGUrJzogJyttZXNzYWdlKTtcblx0XHR9XG5cblx0XHRjbG9zZURpYWxvZygpIHtcblxuXHRcdH1cblxuXHRcdFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlclxuXHQiXX0=