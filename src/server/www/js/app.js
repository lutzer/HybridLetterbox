define(['exports', 'jquery', 'backbone', 'marionette', 'controller'], function (exports, _jquery, _backbone, _marionette, _controller) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-01 13:38:12
 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _jquery2 = _interopRequireDefault(_jquery);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _marionette2 = _interopRequireDefault(_marionette);

	var _controller2 = _interopRequireDefault(_controller);

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

	var App = function (_Backbone$Marionette$) {
		_inherits(App, _Backbone$Marionette$);

		function App() {
			_classCallCheck(this, App);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this));

			//add app initializer
			_this.addInitializer(function (options) {
				_backbone2.default.history.start();

				// support cross origin sharing
				_jquery2.default.support.cors = true;

				_marionette2.default.Behaviors.behaviorsLookup = function () {
					return window.Behaviors;
				};
			});

			//init router
			_this.Router = new _marionette2.default.AppRouter({
				controller: new _controller2.default(_this),
				appRoutes: {
					'scanning': 'showScanningDialog',
					'tag/:tag': 'showSubmissionList',
					'new': 'postSubmission',
					'submission/:id': 'showSubmission',
					'admin': 'showAdminPage',
					'tablet': 'showTabletView',
					'*actions': 'showSubmissionList'
				}
			});
			return _this;
		}

		return App;
	}(_backbone2.default.Marionette.Application);

	exports.default = App;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FjTSxHOzs7QUFFTCxpQkFBYztBQUFBOztBQUFBOzs7QUFJYixTQUFLLGNBQUwsQ0FBcUIsVUFBUyxPQUFULEVBQWlCO0FBQ25DLHVCQUFTLE9BQVQsQ0FBaUIsS0FBakI7OztBQUdBLHFCQUFFLE9BQUYsQ0FBVSxJQUFWLEdBQWUsSUFBZjs7QUFFQSx5QkFBVyxTQUFYLENBQXFCLGVBQXJCLEdBQXVDLFlBQVc7QUFDOUMsWUFBTyxPQUFPLFNBQWQ7QUFDSCxLQUZEO0FBSUYsSUFWRDs7O0FBYUEsU0FBSyxNQUFMLEdBQWMsSUFBSSxxQkFBVyxTQUFmLENBQXlCO0FBQ3RDLGdCQUFZLCtCQUQwQjtBQUV0QyxlQUFXO0FBQ1YsaUJBQWEsb0JBREg7QUFFVixpQkFBYSxvQkFGSDtBQUdWLFlBQVEsZ0JBSEU7QUFJVix1QkFBbUIsZ0JBSlQ7QUFLVixjQUFVLGVBTEE7QUFNVixlQUFXLGdCQU5EO0FBT1YsaUJBQVk7QUFQRjtBQUYyQixJQUF6QixDQUFkO0FBakJhO0FBNkJiOzs7R0EvQmdCLG1CQUFTLFVBQVQsQ0FBb0IsVzs7bUJBa0N2QixHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0wMSAxMzozODoxMlxuKi9cblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBDb250cm9sbGVyIGZyb20gJ2NvbnRyb2xsZXInO1xuXG5jbGFzcyBBcHAgZXh0ZW5kcyBCYWNrYm9uZS5NYXJpb25ldHRlLkFwcGxpY2F0aW9uIHtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0Ly9hZGQgYXBwIGluaXRpYWxpemVyXG5cdFx0dGhpcy5hZGRJbml0aWFsaXplciggZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0XHQgIEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoKTtcblx0XHRcdCAgXG5cdFx0XHQgIC8vIHN1cHBvcnQgY3Jvc3Mgb3JpZ2luIHNoYXJpbmdcblx0XHRcdCAgJC5zdXBwb3J0LmNvcnM9dHJ1ZTtcblx0XHRcdCAgXG5cdFx0XHQgIE1hcmlvbmV0dGUuQmVoYXZpb3JzLmJlaGF2aW9yc0xvb2t1cCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0ICAgICAgcmV0dXJuIHdpbmRvdy5CZWhhdmlvcnM7XG5cdFx0XHQgIH1cblx0XHRcdCAgXG5cdFx0fSk7XG5cblx0XHQvL2luaXQgcm91dGVyXG5cdFx0dGhpcy5Sb3V0ZXIgPSBuZXcgTWFyaW9uZXR0ZS5BcHBSb3V0ZXIoe1xuXHRcdFx0Y29udHJvbGxlcjogbmV3IENvbnRyb2xsZXIodGhpcyksXG5cdFx0XHRhcHBSb3V0ZXM6IHtcblx0XHRcdFx0J3NjYW5uaW5nJyA6ICdzaG93U2Nhbm5pbmdEaWFsb2cnLFxuXHRcdFx0XHQndGFnLzp0YWcnIDogJ3Nob3dTdWJtaXNzaW9uTGlzdCcsXG5cdFx0XHRcdCduZXcnIDogJ3Bvc3RTdWJtaXNzaW9uJyxcblx0XHRcdFx0J3N1Ym1pc3Npb24vOmlkJyA6ICdzaG93U3VibWlzc2lvbicsXG5cdFx0XHRcdCdhZG1pbicgOiAnc2hvd0FkbWluUGFnZScsXG5cdFx0XHRcdCd0YWJsZXQnIDogJ3Nob3dUYWJsZXRWaWV3Jyxcblx0XHRcdFx0JyphY3Rpb25zJzogJ3Nob3dTdWJtaXNzaW9uTGlzdCdcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXX0=