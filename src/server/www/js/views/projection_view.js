define(['exports', 'backbone', 'marionette', 'underscore', 'models/submission_collection', 'models/submission_model', 'views/projection_item_view', 'config'], function (exports, _backbone, _marionette, _underscore, _submission_collection, _submission_model, _projection_item_view, _config) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-14 16:27:57
 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _backbone2 = _interopRequireDefault(_backbone);

	var _marionette2 = _interopRequireDefault(_marionette);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _submission_collection2 = _interopRequireDefault(_submission_collection);

	var _submission_model2 = _interopRequireDefault(_submission_model);

	var _projection_item_view2 = _interopRequireDefault(_projection_item_view);

	var _config2 = _interopRequireDefault(_config);

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

	var ProjectionView = function (_Marionette$Collectio) {
		_inherits(ProjectionView, _Marionette$Collectio);

		function ProjectionView() {
			_classCallCheck(this, ProjectionView);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(ProjectionView).apply(this, arguments));
		}

		_createClass(ProjectionView, [{
			key: 'initialize',
			value: function initialize(options) {

				this.collection = new _submission_collection2.default();
				this.collection.setPageSize(1);
				this.collection.getFirstPage();

				this.listenTo(_backbone2.default, 'submission:new', this.onSubmissionAdded);
				this.timer = null;

				this.startPageTimer();
			}
		}, {
			key: 'startPageTimer',
			value: function startPageTimer(showNewestPage) {
				showNewestPage = showNewestPage || false;

				var self = this;

				//clear old timer, if there is one present
				if (this.timer) clearTimeout(this.timer);

				//display next page
				if (showNewestPage) self.collection.getFirstPage();else if (self.collection.paginate.page >= self.collection.paginate.totalRecords) self.collection.getFirstPage();else self.collection.getNextPage({ remove: true });

				// start loop
				this.timer = setTimeout(function () {
					self.startPageTimer();
				}, _config2.default.projectionTimeInterval);
			}
		}, {
			key: 'onSubmissionAdded',
			value: function onSubmissionAdded(data) {
				this.startPageTimer(true);
			}
		}, {
			key: 'className',
			get: function get() {
				return 'projection';
			}
		}, {
			key: 'childView',
			get: function get() {
				return _projection_item_view2.default;
			}
		}]);

		return ProjectionView;
	}(_marionette2.default.CollectionView);

	exports.default = ProjectionView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9wcm9qZWN0aW9uX3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FpQk0sYzs7Ozs7Ozs7Ozs7OEJBU1MsTyxFQUFTOztBQUVoQixTQUFLLFVBQUwsR0FBa0IscUNBQWxCO0FBQ0EsU0FBSyxVQUFMLENBQWdCLFdBQWhCLENBQTRCLENBQTVCO0FBQ0EsU0FBSyxVQUFMLENBQWdCLFlBQWhCOztBQUVBLFNBQUssUUFBTCxxQkFBdUIsZ0JBQXZCLEVBQXlDLEtBQUssaUJBQTlDO0FBQ0EsU0FBSyxLQUFMLEdBQWEsSUFBYjs7QUFFQSxTQUFLLGNBQUw7QUFDSDs7O2tDQUVjLGMsRUFBZ0I7QUFDakMscUJBQWlCLGtCQUFrQixLQUFuQzs7QUFFQSxRQUFJLE9BQU8sSUFBWDs7O0FBR0EsUUFBSSxLQUFLLEtBQVQsRUFDQyxhQUFhLEtBQUssS0FBbEI7OztBQUdELFFBQUksY0FBSixFQUNDLEtBQUssVUFBTCxDQUFnQixZQUFoQixHQURELEtBRUssSUFBSSxLQUFLLFVBQUwsQ0FBZ0IsUUFBaEIsQ0FBeUIsSUFBekIsSUFBaUMsS0FBSyxVQUFMLENBQWdCLFFBQWhCLENBQXlCLFlBQTlELEVBQ0osS0FBSyxVQUFMLENBQWdCLFlBQWhCLEdBREksS0FHSixLQUFLLFVBQUwsQ0FBZ0IsV0FBaEIsQ0FBNEIsRUFBQyxRQUFTLElBQVYsRUFBNUI7OztBQUdELFNBQUssS0FBTCxHQUFhLFdBQVcsWUFBVztBQUNsQyxVQUFLLGNBQUw7QUFDQSxLQUZZLEVBRVgsaUJBQU8sc0JBRkksQ0FBYjtBQUlBOzs7cUNBRWlCLEksRUFBTTtBQUNqQixTQUFLLGNBQUwsQ0FBb0IsSUFBcEI7QUFDSDs7O3VCQTdDZTtBQUFFLFdBQU8sWUFBUDtBQUFxQjs7O3VCQUV2QjtBQUNmO0FBQ0E7Ozs7R0FOd0IscUJBQVcsYzs7bUJBbUR6QixjIiwiZmlsZSI6InByb2plY3Rpb25fdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNy0xNCAxNjoyNzo1N1xuKi9cblxuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJ1xuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSdcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnXG5pbXBvcnQgU3VibWlzc2lvbkNvbGxlY3Rpb24gZnJvbSAnbW9kZWxzL3N1Ym1pc3Npb25fY29sbGVjdGlvbic7XG5pbXBvcnQgU3VibWlzc2lvbk1vZGVsIGZyb20gJ21vZGVscy9zdWJtaXNzaW9uX21vZGVsJztcbmltcG9ydCBQcm9qZWN0aW9uSXRlbVZpZXcgZnJvbSAndmlld3MvcHJvamVjdGlvbl9pdGVtX3ZpZXcnO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuXG5jbGFzcyBQcm9qZWN0aW9uVmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29sbGVjdGlvblZpZXcge1xuXG4gICAgZ2V0IGNsYXNzTmFtZSgpIHsgcmV0dXJuICdwcm9qZWN0aW9uJyB9XG5cbiAgICBnZXQgY2hpbGRWaWV3KCkge1xuICAgIFx0cmV0dXJuIFByb2plY3Rpb25JdGVtVmlldztcbiAgICB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uID0gbmV3IFN1Ym1pc3Npb25Db2xsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5zZXRQYWdlU2l6ZSgxKTtcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmdldEZpcnN0UGFnZSgpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuVG8oQmFja2JvbmUsJ3N1Ym1pc3Npb246bmV3JywgdGhpcy5vblN1Ym1pc3Npb25BZGRlZCk7XG4gICAgICAgIHRoaXMudGltZXIgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuc3RhcnRQYWdlVGltZXIoKTtcbiAgICB9XG5cbiAgICBzdGFydFBhZ2VUaW1lcihzaG93TmV3ZXN0UGFnZSkge1xuXHRcdHNob3dOZXdlc3RQYWdlID0gc2hvd05ld2VzdFBhZ2UgfHwgZmFsc2U7XG5cblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHQvL2NsZWFyIG9sZCB0aW1lciwgaWYgdGhlcmUgaXMgb25lIHByZXNlbnRcblx0XHRpZiAodGhpcy50aW1lcilcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcblxuXHRcdC8vZGlzcGxheSBuZXh0IHBhZ2Vcblx0XHRpZiAoc2hvd05ld2VzdFBhZ2UpXG5cdFx0XHRzZWxmLmNvbGxlY3Rpb24uZ2V0Rmlyc3RQYWdlKCk7XG5cdFx0ZWxzZSBpZiAoc2VsZi5jb2xsZWN0aW9uLnBhZ2luYXRlLnBhZ2UgPj0gc2VsZi5jb2xsZWN0aW9uLnBhZ2luYXRlLnRvdGFsUmVjb3Jkcylcblx0XHRcdHNlbGYuY29sbGVjdGlvbi5nZXRGaXJzdFBhZ2UoKTtcblx0XHRlbHNlXG5cdFx0XHRzZWxmLmNvbGxlY3Rpb24uZ2V0TmV4dFBhZ2Uoe3JlbW92ZSA6IHRydWV9KTtcblxuXHRcdC8vIHN0YXJ0IGxvb3Bcblx0XHR0aGlzLnRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdHNlbGYuc3RhcnRQYWdlVGltZXIoKTtcblx0XHR9LENvbmZpZy5wcm9qZWN0aW9uVGltZUludGVydmFsKTtcblxuXHR9XG5cblx0b25TdWJtaXNzaW9uQWRkZWQoZGF0YSkge1xuICAgICAgICB0aGlzLnN0YXJ0UGFnZVRpbWVyKHRydWUpO1xuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdGlvblZpZXciXX0=