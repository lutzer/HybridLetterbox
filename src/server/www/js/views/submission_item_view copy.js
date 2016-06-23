define(['exports', 'marionette', 'backbone', 'underscore', 'underscoreString', 'jquery', 'moment', 'config', 'models/comment_model', 'text!templates/submission_item_tmpl.html', 'moment_en_gb'], function (exports, _marionette, _backbone, _underscore, _underscoreString, _jquery, _moment, _config, _comment_model, _submission_item_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-05-26 13:35:31
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _backbone2 = _interopRequireDefault(_backbone);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _underscoreString2 = _interopRequireDefault(_underscoreString);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _moment2 = _interopRequireDefault(_moment);

    var _config2 = _interopRequireDefault(_config);

    var _comment_model2 = _interopRequireDefault(_comment_model);

    var _submission_item_tmpl2 = _interopRequireDefault(_submission_item_tmpl);

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

    var SubmissionItemView = function (_Marionette$ItemView) {
        _inherits(SubmissionItemView, _Marionette$ItemView);

        function SubmissionItemView() {
            _classCallCheck(this, SubmissionItemView);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(SubmissionItemView).apply(this, arguments));
        }

        _createClass(SubmissionItemView, [{
            key: 'events',
            value: function events() {
                return {
                    'click': 'onClick'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {
                //console.log(this.model);
            }
        }, {
            key: 'onClick',
            value: function onClick(e) {
                window.location.hash = '#submission/' + this.model.get('_id');
                e.preventDefault();
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_submission_item_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'item-view card';
            }
        }, {
            key: 'templateHelpers',
            get: function get() {
                return {
                    filesUrl: _config2.default.files_url + this.model.get('_id') + '/',
                    isAdmin: false,
                    text_truncated_short: _underscoreString2.default.truncate(this.model.get('text'), _config2.default.stringTruncateShort, '...'),
                    text_truncated_long: _underscoreString2.default.truncate(this.model.get('text'), _config2.default.stringTruncateLong, '...'),
                    fromNow: function fromNow(date) {
                        return (0, _moment2.default)(date).fromNow();
                    }
                };
            }
        }, {
            key: 'modelEvents',
            get: function get() {
                return {
                    'change': 'render'
                };
            }
        }]);

        return SubmissionItemView;
    }(_marionette2.default.ItemView);

    exports.default = SubmissionItemView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9zdWJtaXNzaW9uX2l0ZW1fdmlldyBjb3B5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXFCTSxrQjs7Ozs7Ozs7Ozs7cUNBMEJPO0FBQ0wsdUJBQU87QUFDSCw2QkFBVTtBQURQLGlCQUFQO0FBR0g7Ozt1Q0FHVSxPLEVBQVM7O0FBRW5COzs7b0NBRU8sQyxFQUFHO0FBQ1AsdUJBQU8sUUFBUCxDQUFnQixJQUFoQixHQUF1QixpQkFBZSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsS0FBZixDQUF0QztBQUNBLGtCQUFFLGNBQUY7QUFDSDs7O2dDQXJDYztBQUFFLHVCQUFPLHFCQUFFLFFBQUYsZ0NBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxnQkFBUDtBQUF5Qjs7O2dDQUVyQjtBQUN4Qix1QkFBTztBQUNOLDhCQUFXLGlCQUFPLFNBQVAsR0FBbUIsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLEtBQWYsQ0FBbkIsR0FBMkMsR0FEaEQ7QUFFRyw2QkFBVSxLQUZiO0FBR0csMENBQXVCLDJCQUFLLFFBQUwsQ0FBYyxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsTUFBZixDQUFkLEVBQXFDLGlCQUFPLG1CQUE1QyxFQUFnRSxLQUFoRSxDQUgxQjtBQUlHLHlDQUFzQiwyQkFBSyxRQUFMLENBQWMsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLE1BQWYsQ0FBZCxFQUFxQyxpQkFBTyxrQkFBNUMsRUFBK0QsS0FBL0QsQ0FKekI7QUFLRyw2QkFBUyxpQkFBUyxJQUFULEVBQWU7QUFDcEIsK0JBQU8sc0JBQU8sSUFBUCxFQUFhLE9BQWIsRUFBUDtBQUNIO0FBUEosaUJBQVA7QUFTRzs7O2dDQUVpQjtBQUNkLHVCQUFPO0FBQ0gsOEJBQVc7QUFEUixpQkFBUDtBQUdIOzs7O01BdkI0QixxQkFBVyxROztzQkE0QzdCLGtCIiwiZmlsZSI6InN1Ym1pc3Npb25faXRlbV92aWV3IGNvcHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDUtMjYgMTM6MzU6MzFcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IF9zdHIgZnJvbSAndW5kZXJzY29yZVN0cmluZyc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IE1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICdtb21lbnRfZW5fZ2InO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuaW1wb3J0IENvbW1lbnRNb2RlbCBmcm9tICdtb2RlbHMvY29tbWVudF9tb2RlbCc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9zdWJtaXNzaW9uX2l0ZW1fdG1wbC5odG1sJztcblxuY2xhc3MgU3VibWlzc2lvbkl0ZW1WaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuICAgIGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuICAgIGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAnaXRlbS12aWV3IGNhcmQnIH1cblxuICAgIGdldCB0ZW1wbGF0ZUhlbHBlcnMoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGZpbGVzVXJsIDogQ29uZmlnLmZpbGVzX3VybCArIHRoaXMubW9kZWwuZ2V0KCdfaWQnKSArICcvJyxcbiAgICAgICAgICAgIGlzQWRtaW4gOiBmYWxzZSxcbiAgICAgICAgICAgIHRleHRfdHJ1bmNhdGVkX3Nob3J0IDogX3N0ci50cnVuY2F0ZSh0aGlzLm1vZGVsLmdldCgndGV4dCcpLENvbmZpZy5zdHJpbmdUcnVuY2F0ZVNob3J0LCcuLi4nKSxcbiAgICAgICAgICAgIHRleHRfdHJ1bmNhdGVkX2xvbmcgOiBfc3RyLnRydW5jYXRlKHRoaXMubW9kZWwuZ2V0KCd0ZXh0JyksQ29uZmlnLnN0cmluZ1RydW5jYXRlTG9uZywnLi4uJyksXG4gICAgICAgICAgICBmcm9tTm93OiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1vbWVudChkYXRlKS5mcm9tTm93KCk7IFxuICAgICAgICAgICAgfVxuXHRcdH1cbiAgICB9XG5cbiAgICBnZXQgbW9kZWxFdmVudHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnY2hhbmdlJyA6ICdyZW5kZXInXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdjbGljaycgOiAnb25DbGljaydcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIG1ldGhvZHMgKi9cbiAgICBpbml0aWFsaXplKG9wdGlvbnMpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLm1vZGVsKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGUpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnI3N1Ym1pc3Npb24vJyt0aGlzLm1vZGVsLmdldCgnX2lkJyk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3VibWlzc2lvbkl0ZW1WaWV3OyJdfQ==