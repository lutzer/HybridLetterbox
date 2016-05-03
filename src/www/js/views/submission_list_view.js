define(['exports', 'backbone', 'marionette', 'underscore'], function (exports, _backbone, _marionette, _underscore) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _backbone2 = _interopRequireDefault(_backbone);

	var _marionette2 = _interopRequireDefault(_marionette);

	var _underscore2 = _interopRequireDefault(_underscore);

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

	var SubmissionListView = function (_Marionette$ItemView) {
		_inherits(SubmissionListView, _Marionette$ItemView);

		function SubmissionListView() {
			_classCallCheck(this, SubmissionListView);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(SubmissionListView).apply(this, arguments));
		}

		_createClass(SubmissionListView, [{
			key: 'initialize',
			value: function initialize(options) {
				console.log(options);
			}
		}, {
			key: 'template',
			get: function get() {
				return _underscore2.default.template('<div>Hello World</div');
			}
		}, {
			key: 'className',
			get: function get() {
				return 'page';
			}
		}]);

		return SubmissionListView;
	}(_marionette2.default.ItemView);

	exports.default = SubmissionListView;
	;

	/*SubmissionListView.prototype.classname = 'page'
 SubmissionListView.prototype.template = _.template('<div>Hello World</div')
 
 export default SubmissionListView*/
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9zdWJtaXNzaW9uX2xpc3Rfdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBSXFCLGtCOzs7Ozs7Ozs7Ozs4QkFNVCxPLEVBQVM7QUFDbkIsWUFBUSxHQUFSLENBQVksT0FBWjtBQUNBOzs7dUJBTmM7QUFBRSxXQUFPLHFCQUFFLFFBQUYsQ0FBVyx1QkFBWCxDQUFQO0FBQTRDOzs7dUJBRTdDO0FBQUUsV0FBTyxNQUFQO0FBQWU7Ozs7R0FKYyxxQkFBVyxROzttQkFBdEMsa0I7QUFTcEIiLCJmaWxlIjoic3VibWlzc2lvbl9saXN0X3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJ1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VibWlzc2lvbkxpc3RWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlldyB7XG5cblx0Z2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gXy50ZW1wbGF0ZSgnPGRpdj5IZWxsbyBXb3JsZDwvZGl2JykgfVxuXG5cdGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAncGFnZScgfVxuXG5cdGluaXRpYWxpemUob3B0aW9ucykge1xuXHRcdGNvbnNvbGUubG9nKG9wdGlvbnMpXG5cdH1cbn07XG5cbi8qU3VibWlzc2lvbkxpc3RWaWV3LnByb3RvdHlwZS5jbGFzc25hbWUgPSAncGFnZSdcblN1Ym1pc3Npb25MaXN0Vmlldy5wcm90b3R5cGUudGVtcGxhdGUgPSBfLnRlbXBsYXRlKCc8ZGl2PkhlbGxvIFdvcmxkPC9kaXYnKVxuXG5leHBvcnQgZGVmYXVsdCBTdWJtaXNzaW9uTGlzdFZpZXcqLyJdfQ==