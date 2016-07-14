define(['exports', 'backbone', 'marionette', 'underscore', 'models/submission_collection', 'models/submission_model', 'views/projection_item_view', 'config'], function (exports, _backbone, _marionette, _underscore, _submission_collection, _submission_model, _projection_item_view, _config) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-14 12:36:49
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9wcm9qZWN0aW9uX3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FpQk0sYzs7Ozs7Ozs7Ozs7OEJBU1MsTyxFQUFTOztBQUVoQixTQUFLLFVBQUwsR0FBa0IscUNBQWxCO0FBQ0EsU0FBSyxVQUFMLENBQWdCLFdBQWhCLENBQTRCLENBQTVCO0FBQ0EsU0FBSyxVQUFMLENBQWdCLFlBQWhCOztBQUVBLFNBQUssS0FBTCxHQUFhLElBQWI7O0FBRUEsU0FBSyxjQUFMO0FBQ0g7OztrQ0FFYyxjLEVBQWdCO0FBQ2pDLHFCQUFpQixrQkFBa0IsS0FBbkM7O0FBRUEsUUFBSSxPQUFPLElBQVg7OztBQUdBLFFBQUksS0FBSyxLQUFULEVBQ0MsYUFBYSxLQUFLLEtBQWxCOzs7QUFHRCxRQUFJLGNBQUosRUFDQyxLQUFLLFVBQUwsQ0FBZ0IsWUFBaEIsR0FERCxLQUVLLElBQUksS0FBSyxVQUFMLENBQWdCLFFBQWhCLENBQXlCLElBQXpCLElBQWlDLEtBQUssVUFBTCxDQUFnQixRQUFoQixDQUF5QixZQUE5RCxFQUNKLEtBQUssVUFBTCxDQUFnQixZQUFoQixHQURJLEtBR0osS0FBSyxVQUFMLENBQWdCLFdBQWhCLENBQTRCLEVBQUMsUUFBUyxJQUFWLEVBQTVCOzs7QUFHRCxTQUFLLEtBQUwsR0FBYSxXQUFXLFlBQVc7QUFDbEMsVUFBSyxjQUFMO0FBQ0EsS0FGWSxFQUVYLGlCQUFPLHNCQUZJLENBQWI7QUFJQTs7O3VCQXhDa0I7QUFBRSxXQUFPLFlBQVA7QUFBcUI7Ozt1QkFFdkI7QUFDZjtBQUNBOzs7O0dBTndCLHFCQUFXLGM7O21CQThDekIsYyIsImZpbGUiOiJwcm9qZWN0aW9uX3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTQgMTI6MzY6NDlcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSdcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnXG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJ1xuaW1wb3J0IFN1Ym1pc3Npb25Db2xsZWN0aW9uIGZyb20gJ21vZGVscy9zdWJtaXNzaW9uX2NvbGxlY3Rpb24nO1xuaW1wb3J0IFN1Ym1pc3Npb25Nb2RlbCBmcm9tICdtb2RlbHMvc3VibWlzc2lvbl9tb2RlbCc7XG5pbXBvcnQgUHJvamVjdGlvbkl0ZW1WaWV3IGZyb20gJ3ZpZXdzL3Byb2plY3Rpb25faXRlbV92aWV3JztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcblxuY2xhc3MgUHJvamVjdGlvblZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbGxlY3Rpb25WaWV3IHtcblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAncHJvamVjdGlvbicgfVxuXG4gICAgZ2V0IGNoaWxkVmlldygpIHtcbiAgICBcdHJldHVybiBQcm9qZWN0aW9uSXRlbVZpZXc7XG4gICAgfVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IG5ldyBTdWJtaXNzaW9uQ29sbGVjdGlvbigpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uc2V0UGFnZVNpemUoMSk7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5nZXRGaXJzdFBhZ2UoKTtcblxuICAgICAgICB0aGlzLnRpbWVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLnN0YXJ0UGFnZVRpbWVyKCk7XG4gICAgfVxuXG4gICAgc3RhcnRQYWdlVGltZXIoc2hvd05ld2VzdFBhZ2UpIHtcblx0XHRzaG93TmV3ZXN0UGFnZSA9IHNob3dOZXdlc3RQYWdlIHx8IGZhbHNlO1xuXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuXG5cdFx0Ly9jbGVhciBvbGQgdGltZXIsIGlmIHRoZXJlIGlzIG9uZSBwcmVzZW50XG5cdFx0aWYgKHRoaXMudGltZXIpXG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy50aW1lcik7XG5cblx0XHQvL2Rpc3BsYXkgbmV4dCBwYWdlXG5cdFx0aWYgKHNob3dOZXdlc3RQYWdlKVxuXHRcdFx0c2VsZi5jb2xsZWN0aW9uLmdldEZpcnN0UGFnZSgpO1xuXHRcdGVsc2UgaWYgKHNlbGYuY29sbGVjdGlvbi5wYWdpbmF0ZS5wYWdlID49IHNlbGYuY29sbGVjdGlvbi5wYWdpbmF0ZS50b3RhbFJlY29yZHMpXG5cdFx0XHRzZWxmLmNvbGxlY3Rpb24uZ2V0Rmlyc3RQYWdlKCk7XG5cdFx0ZWxzZVxuXHRcdFx0c2VsZi5jb2xsZWN0aW9uLmdldE5leHRQYWdlKHtyZW1vdmUgOiB0cnVlfSk7XG5cblx0XHQvLyBzdGFydCBsb29wXG5cdFx0dGhpcy50aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRzZWxmLnN0YXJ0UGFnZVRpbWVyKCk7XG5cdFx0fSxDb25maWcucHJvamVjdGlvblRpbWVJbnRlcnZhbCk7XG5cblx0fVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aW9uVmlldyJdfQ==