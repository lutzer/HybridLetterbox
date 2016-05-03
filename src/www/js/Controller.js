define(['exports', 'backbone', 'marionette', 'views/submission_list_view'], function (exports, _backbone, _marionette, _submission_list_view) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _backbone2 = _interopRequireDefault(_backbone);

	var _marionette2 = _interopRequireDefault(_marionette);

	var _submission_list_view2 = _interopRequireDefault(_submission_list_view);

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
				contentRegion: "#content",
				modalRegion: "#modal-container"
			});

			//register client events
			_backbone2.default.on('dialog:open', _this.openDialog, _this);
			_backbone2.default.on('dialog:close', _this.closeDialog, _this);

			//register socket events
			/*var socket = io(config.web_socket_url);
            socket.on('submissions:added', function(data) {
                Backbone.trigger('submissions:added',data);
            });*/

			//fetch settings
			/*Backbone.settings = new AppModel({id: 1});
   Backbone.settings.fetch();*/
			return _this;
		}

		/* ROUTES */

		_createClass(Controller, [{
			key: 'showSubmissionList',
			value: function showSubmissionList() {
				this.app.contentRegion.show(new _submission_list_view2.default({ id: 'bla' }));
			}
		}, {
			key: 'showScanningDialog',
			value: function showScanningDialog() {
				alert("ScanningDialog");
			}
		}]);

		return Controller;
	}(_marionette2.default.Controller);

	;

	exports.default = Controller;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FLTSxVOzs7QUFFSixzQkFBWSxHQUFaLEVBQWlCO0FBQUE7O0FBQUE7O0FBSWhCLFNBQUssR0FBTCxHQUFXLEdBQVg7O0FBRUEsT0FBSSxVQUFKLENBQWU7QUFDZCxtQkFBZSxVQUREO0FBRWQsaUJBQWE7QUFGQyxJQUFmOzs7QUFNQSxzQkFBUyxFQUFULENBQVksYUFBWixFQUEyQixNQUFLLFVBQWhDO0FBQ0Esc0JBQVMsRUFBVCxDQUFZLGNBQVosRUFBNEIsTUFBSyxXQUFqQzs7Ozs7Ozs7Ozs7QUFiZ0I7QUF3QmhCOzs7Ozs7d0NBSW9CO0FBQ3BCLFNBQUssR0FBTCxDQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBNEIsbUNBQXVCLEVBQUUsSUFBSSxLQUFOLEVBQXZCLENBQTVCO0FBQ0E7Ozt3Q0FFb0I7QUFDcEIsVUFBTSxnQkFBTjtBQUNBOzs7O0dBcENzQixxQkFBVyxVOztBQXVDbkM7O21CQUVjLFUiLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcblxuaW1wb3J0IFN1Ym1pc3Npb25MaXN0VmlldyBmcm9tICd2aWV3cy9zdWJtaXNzaW9uX2xpc3Rfdmlldyc7XG5cbmNsYXNzIENvbnRyb2xsZXIgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbnRyb2xsZXIge1xuXHRcdFxuXHRcdGNvbnN0cnVjdG9yKGFwcCkge1xuXG5cdFx0XHRzdXBlcigpO1xuXG5cdFx0XHR0aGlzLmFwcCA9IGFwcDtcblx0XHRcdFxuXHRcdFx0YXBwLmFkZFJlZ2lvbnMoe1xuXHRcdFx0XHRjb250ZW50UmVnaW9uOiBcIiNjb250ZW50XCIsXG5cdFx0XHRcdG1vZGFsUmVnaW9uOiBcIiNtb2RhbC1jb250YWluZXJcIlxuXHRcdFx0fSk7XG5cdFx0XHRcblx0XHRcdC8vcmVnaXN0ZXIgY2xpZW50IGV2ZW50c1xuXHRcdFx0QmFja2JvbmUub24oJ2RpYWxvZzpvcGVuJywgdGhpcy5vcGVuRGlhbG9nLCB0aGlzKTtcblx0XHRcdEJhY2tib25lLm9uKCdkaWFsb2c6Y2xvc2UnLCB0aGlzLmNsb3NlRGlhbG9nLCB0aGlzKTtcblxuXHRcdFx0Ly9yZWdpc3RlciBzb2NrZXQgZXZlbnRzXG5cdFx0XHQvKnZhciBzb2NrZXQgPSBpbyhjb25maWcud2ViX3NvY2tldF91cmwpO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdzdWJtaXNzaW9uczphZGRlZCcsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBCYWNrYm9uZS50cmlnZ2VyKCdzdWJtaXNzaW9uczphZGRlZCcsZGF0YSk7XG4gICAgICAgICAgICB9KTsqL1xuXG4gICAgICAgICAgICAvL2ZldGNoIHNldHRpbmdzXG4gICAgICAgICAgICAvKkJhY2tib25lLnNldHRpbmdzID0gbmV3IEFwcE1vZGVsKHtpZDogMX0pO1xuICAgICAgICAgICAgQmFja2JvbmUuc2V0dGluZ3MuZmV0Y2goKTsqL1xuXHRcdH1cblx0XHRcdFxuXHRcdC8qIFJPVVRFUyAqL1xuXG5cdFx0c2hvd1N1Ym1pc3Npb25MaXN0KCkge1xuXHRcdFx0dGhpcy5hcHAuY29udGVudFJlZ2lvbi5zaG93KG5ldyBTdWJtaXNzaW9uTGlzdFZpZXcoeyBpZDogJ2JsYScgfSkpO1xuXHRcdH1cblxuXHRcdHNob3dTY2FubmluZ0RpYWxvZygpIHtcblx0XHRcdGFsZXJ0KFwiU2Nhbm5pbmdEaWFsb2dcIilcblx0XHR9XG5cblx0XHRcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXJcblx0Il19