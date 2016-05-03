define(['module', 'views/baseview'], function (module, _baseview) {
    'use strict';

    var _baseview2 = _interopRequireDefault(_baseview);

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

    var SubmissionListView = function (_BaseView) {
        _inherits(SubmissionListView, _BaseView);

        function SubmissionListView() {
            _classCallCheck(this, SubmissionListView);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(SubmissionListView).call(this, {
                className: 'page',

                modelEvents: {
                    'sync': 'render'
                }
            }));
        }

        return SubmissionListView;
    }(_baseview2.default);

    module.exports = _baseview2.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9zdWJtaXNzaW9ubGlzdHZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFFTSxrQjs7O0FBRUYsc0NBQWM7QUFBQTs7QUFBQSx5R0FDSjtBQUNGLDJCQUFXLE1BRFQ7O0FBR0YsNkJBQWM7QUFDViw0QkFBUztBQURDO0FBSFosYUFESTtBQVFiOzs7OztBQUtMLFdBQU8sT0FBUCIsImZpbGUiOiJzdWJtaXNzaW9ubGlzdHZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVZpZXcgZnJvbSAndmlld3MvYmFzZXZpZXcnXG5cbmNsYXNzIFN1Ym1pc3Npb25MaXN0VmlldyBleHRlbmRzIEJhc2VWaWV3IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBjbGFzc05hbWU6ICdwYWdlJyxcblxuICAgICAgICAgICAgbW9kZWxFdmVudHMgOiB7XG4gICAgICAgICAgICAgICAgJ3N5bmMnIDogJ3JlbmRlcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgICAgICBcbiAgICBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlVmlldyJdfQ==