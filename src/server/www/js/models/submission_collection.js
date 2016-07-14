define(['exports', 'backbone', 'models/submission_model', 'config', 'utils'], function (exports, _backbone, _submission_model, _config, _utils) {
	'use strict';

	/*
 * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
 * @Date:   2016-05-04 11:38:41
 * @Last Modified by:   lutzer
 * @Last Modified time: 2016-07-14 12:32:04
 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _backbone2 = _interopRequireDefault(_backbone);

	var _submission_model2 = _interopRequireDefault(_submission_model);

	var _config2 = _interopRequireDefault(_config);

	var _utils2 = _interopRequireDefault(_utils);

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

	var SubmissionCollection = function (_Backbone$Collection) {
		_inherits(SubmissionCollection, _Backbone$Collection);

		function SubmissionCollection() {
			_classCallCheck(this, SubmissionCollection);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SubmissionCollection).call(this));

			_this.paginate = {
				totalRecords: false,
				page: 0,
				recordsPerPage: _config2.default.recordsPerPage
			};
			return _this;
		}

		_createClass(SubmissionCollection, [{
			key: 'parse',
			value: function parse(response) {
				this.paginate.totalRecords = response.total_records;
				return response.docs;
			}
		}, {
			key: 'fetch',
			value: function fetch(options) {
				this.trigger('fetching');
				return _backbone2.default.Collection.prototype.fetch.call(this, options);
			}
		}, {
			key: 'getFirstPage',
			value: function getFirstPage() {
				var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


				var paginateOptions = {
					skip: 0,
					limit: this.paginate.recordsPerPage
				};

				this.fetch({ data: _utils2.default.encodeQueryParameters(_.extend(options, paginateOptions)) });
			}
		}, {
			key: 'getNextPage',
			value: function getNextPage(options) {

				options = options || {};
				options.remove = options.remove || false;

				if (this.paginate.recordsPerPage * this.paginate.page > this.paginate.totalRecords) return;

				this.paginate.page++;

				var paginateOptions = {
					skip: this.paginate.recordsPerPage * this.paginate.page,
					limit: this.paginate.recordsPerPage
				};

				this.fetch({ remove: options.remove, data: _utils2.default.encodeQueryParameters(_.extend(options, paginateOptions)) });
			}
		}, {
			key: 'setPageSize',
			value: function setPageSize(numberOfModels) {
				this.paginate.recordsPerPage = numberOfModels;
			}
		}, {
			key: 'model',
			get: function get() {
				return _submission_model2.default;
			}
		}, {
			key: 'url',
			get: function get() {
				return _config2.default['web_service_url'] + "submissions";
			}
		}]);

		return SubmissionCollection;
	}(_backbone2.default.Collection);

	;

	exports.default = SubmissionCollection;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvc3VibWlzc2lvbl9jb2xsZWN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBY00sb0I7OztBQUVMLGtDQUFjO0FBQUE7O0FBQUE7O0FBR2IsU0FBSyxRQUFMLEdBQWdCO0FBQ2Ysa0JBQWUsS0FEQTtBQUVmLFVBQU8sQ0FGUTtBQUdmLG9CQUFpQixpQkFBTztBQUhULElBQWhCO0FBSGE7QUFRYjs7Ozt5QkFNSyxRLEVBQVU7QUFDZixTQUFLLFFBQUwsQ0FBYyxZQUFkLEdBQTZCLFNBQVMsYUFBdEM7QUFDTSxXQUFPLFNBQVMsSUFBaEI7QUFDTjs7O3lCQUVLLE8sRUFBUztBQUNkLFNBQUssT0FBTCxDQUFhLFVBQWI7QUFDQSxXQUFPLG1CQUFTLFVBQVQsQ0FBb0IsU0FBcEIsQ0FBOEIsS0FBOUIsQ0FBb0MsSUFBcEMsQ0FBeUMsSUFBekMsRUFBOEMsT0FBOUMsQ0FBUDtBQUNHOzs7a0NBRXFCO0FBQUEsUUFBWixPQUFZLHlEQUFKLEVBQUk7OztBQUV4QixRQUFJLGtCQUFrQjtBQUNyQixXQUFNLENBRGU7QUFFckIsWUFBTyxLQUFLLFFBQUwsQ0FBYztBQUZBLEtBQXRCOztBQUtBLFNBQUssS0FBTCxDQUFXLEVBQUUsTUFBTyxnQkFBTSxxQkFBTixDQUE0QixFQUFFLE1BQUYsQ0FBUyxPQUFULEVBQWlCLGVBQWpCLENBQTVCLENBQVQsRUFBWDtBQUNBOzs7K0JBRVcsTyxFQUFTOztBQUVwQixjQUFVLFdBQVcsRUFBckI7QUFDQSxZQUFRLE1BQVIsR0FBaUIsUUFBUSxNQUFSLElBQWtCLEtBQW5DOztBQUVBLFFBQUksS0FBSyxRQUFMLENBQWMsY0FBZCxHQUErQixLQUFLLFFBQUwsQ0FBYyxJQUE3QyxHQUFvRCxLQUFLLFFBQUwsQ0FBYyxZQUF0RSxFQUNDOztBQUVELFNBQUssUUFBTCxDQUFjLElBQWQ7O0FBRUEsUUFBSSxrQkFBa0I7QUFDckIsV0FBTSxLQUFLLFFBQUwsQ0FBYyxjQUFkLEdBQStCLEtBQUssUUFBTCxDQUFjLElBRDlCO0FBRXJCLFlBQU8sS0FBSyxRQUFMLENBQWM7QUFGQSxLQUF0Qjs7QUFLQSxTQUFLLEtBQUwsQ0FBVyxFQUFFLFFBQVEsUUFBUSxNQUFsQixFQUEwQixNQUFPLGdCQUFNLHFCQUFOLENBQTRCLEVBQUUsTUFBRixDQUFTLE9BQVQsRUFBaUIsZUFBakIsQ0FBNUIsQ0FBakMsRUFBWDtBQUNBOzs7K0JBRVcsYyxFQUFnQjtBQUMzQixTQUFLLFFBQUwsQ0FBYyxjQUFkLEdBQStCLGNBQS9CO0FBQ0E7Ozt1QkE1Q1c7QUFBRTtBQUF3Qjs7O3VCQUU1QjtBQUFFLFdBQU8saUJBQU8saUJBQVAsSUFBMEIsYUFBakM7QUFBZ0Q7Ozs7R0FkMUIsbUJBQVMsVTs7QUEwRDNDOzttQkFFYyxvQiIsImZpbGUiOiJzdWJtaXNzaW9uX2NvbGxlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTQgMTI6MzI6MDRcbiovXG5cbmltcG9ydCBCYWNrYm9uZSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgU3VibWlzc2lvbk1vZGVsIGZyb20gJ21vZGVscy9zdWJtaXNzaW9uX21vZGVsJztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcbmltcG9ydCBVdGlscyBmcm9tICd1dGlscyc7XG5cbmNsYXNzIFN1Ym1pc3Npb25Db2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvbiB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMucGFnaW5hdGUgPSB7XG5cdFx0XHR0b3RhbFJlY29yZHMgOiBmYWxzZSxcblx0XHRcdHBhZ2UgOiAwLFxuXHRcdFx0cmVjb3Jkc1BlclBhZ2UgOiBDb25maWcucmVjb3Jkc1BlclBhZ2Vcblx0XHR9XG5cdH1cblxuXHRnZXQgbW9kZWwoKSB7IHJldHVybiBTdWJtaXNzaW9uTW9kZWwgfVxuXG5cdGdldCB1cmwoKSB7IHJldHVybiBDb25maWdbJ3dlYl9zZXJ2aWNlX3VybCddK1wic3VibWlzc2lvbnNcIiB9XG5cblx0cGFyc2UocmVzcG9uc2UpIHtcblx0XHR0aGlzLnBhZ2luYXRlLnRvdGFsUmVjb3JkcyA9IHJlc3BvbnNlLnRvdGFsX3JlY29yZHM7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kb2NzO1xuXHR9XG5cblx0ZmV0Y2gob3B0aW9ucykge1xuXHRcdHRoaXMudHJpZ2dlcignZmV0Y2hpbmcnKTtcblx0XHRyZXR1cm4gQmFja2JvbmUuQ29sbGVjdGlvbi5wcm90b3R5cGUuZmV0Y2guY2FsbCh0aGlzLG9wdGlvbnMpOyAgICAgIFxuICAgIH1cblxuXHRnZXRGaXJzdFBhZ2Uob3B0aW9ucz17fSkge1xuXG5cdFx0dmFyIHBhZ2luYXRlT3B0aW9ucyA9IHtcblx0XHRcdHNraXA6IDAsXG5cdFx0XHRsaW1pdDogdGhpcy5wYWdpbmF0ZS5yZWNvcmRzUGVyUGFnZVxuXHRcdH1cblxuXHRcdHRoaXMuZmV0Y2goeyBkYXRhIDogVXRpbHMuZW5jb2RlUXVlcnlQYXJhbWV0ZXJzKF8uZXh0ZW5kKG9wdGlvbnMscGFnaW5hdGVPcHRpb25zKSkgfSk7XG5cdH1cblxuXHRnZXROZXh0UGFnZShvcHRpb25zKSB7XG5cblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXHRcdG9wdGlvbnMucmVtb3ZlID0gb3B0aW9ucy5yZW1vdmUgfHwgZmFsc2UgO1xuXG5cdFx0aWYgKHRoaXMucGFnaW5hdGUucmVjb3Jkc1BlclBhZ2UgKiB0aGlzLnBhZ2luYXRlLnBhZ2UgPiB0aGlzLnBhZ2luYXRlLnRvdGFsUmVjb3Jkcylcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMucGFnaW5hdGUucGFnZSArKztcblxuXHRcdHZhciBwYWdpbmF0ZU9wdGlvbnMgPSB7XG5cdFx0XHRza2lwOiB0aGlzLnBhZ2luYXRlLnJlY29yZHNQZXJQYWdlICogdGhpcy5wYWdpbmF0ZS5wYWdlLFxuXHRcdFx0bGltaXQ6IHRoaXMucGFnaW5hdGUucmVjb3Jkc1BlclBhZ2Vcblx0XHR9XG5cblx0XHR0aGlzLmZldGNoKHsgcmVtb3ZlOiBvcHRpb25zLnJlbW92ZSwgZGF0YSA6IFV0aWxzLmVuY29kZVF1ZXJ5UGFyYW1ldGVycyhfLmV4dGVuZChvcHRpb25zLHBhZ2luYXRlT3B0aW9ucykpIH0pO1xuXHR9XG5cblx0c2V0UGFnZVNpemUobnVtYmVyT2ZNb2RlbHMpIHtcblx0XHR0aGlzLnBhZ2luYXRlLnJlY29yZHNQZXJQYWdlID0gbnVtYmVyT2ZNb2RlbHM7XG5cdH1cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3VibWlzc2lvbkNvbGxlY3Rpb24iXX0=