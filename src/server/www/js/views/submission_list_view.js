define(['exports', 'marionette', 'underscore', 'jquery', 'masonry', 'config', 'views/submission_item_view', 'models/submission_collection', 'models/submission_model', 'text!templates/submission_list_tmpl.html'], function (exports, _marionette, _underscore, _jquery, _masonry, _config, _submission_item_view, _submission_collection, _submission_model, _submission_list_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-06-27 12:20:43
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _masonry2 = _interopRequireDefault(_masonry);

    var _config2 = _interopRequireDefault(_config);

    var _submission_item_view2 = _interopRequireDefault(_submission_item_view);

    var _submission_collection2 = _interopRequireDefault(_submission_collection);

    var _submission_model2 = _interopRequireDefault(_submission_model);

    var _submission_list_tmpl2 = _interopRequireDefault(_submission_list_tmpl);

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

    var SubmissionListView = function (_Marionette$Composite) {
        _inherits(SubmissionListView, _Marionette$Composite);

        function SubmissionListView() {
            _classCallCheck(this, SubmissionListView);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(SubmissionListView).apply(this, arguments));
        }

        _createClass(SubmissionListView, [{
            key: 'childEvents',
            value: function childEvents() {
                return {
                    'show-details': 'onChildShowDetails'
                };
            }
        }, {
            key: 'events',
            value: function events() {
                return {
                    'click #load-more-button': 'onLoadMoreButtonClick'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {

                this.fetchParams = {};

                if (options.tag != null) this.fetchParams.tag = options.tag;

                this.collection = new _submission_collection2.default();

                this.listenTo(this.collection, 'sync', this.hideSpinner);
                this.listenTo(this.collection, 'fetching', this.showSpinner);

                this.listenTo(Backbone, 'submission:changed', this.onSubmissionChanged);
                this.listenTo(Backbone, 'submission:new', this.onSubmissionAdded);
                this.listenTo(Backbone, 'submission:removed', this.onSubmissionRemoved);

                this.collection.getFirstPage(this.fetchParams);
            }
        }, {
            key: 'onAttach',
            value: function onAttach() {
                var _this2 = this;

                //bind scroll handler
                this.winowScrollListener = _underscore2.default.throttle(function () {
                    _this2.onWindowScroll();
                }, 500);
                (0, _jquery2.default)(window).on('scroll', this.winowScrollListener);
            }
        }, {
            key: 'onBeforeDestroy',
            value: function onBeforeDestroy() {
                //unbind scroll handler
                (0, _jquery2.default)(window).off("scroll", this.winowScrollListener);
            }
        }, {
            key: 'onSubmissionChanged',
            value: function onSubmissionChanged(data) {
                var model = this.collection.get(data.model._id);
                if (model) model.fetch();
            }
        }, {
            key: 'onSubmissionAdded',
            value: function onSubmissionAdded(data) {
                //console.log(data);
                var submission = new _submission_model2.default(data.model);
                submission.fetch();
                // add to front of collection
                this.collection.add(submission, { at: 0 });
            }
        }, {
            key: 'onSubmissionRemoved',
            value: function onSubmissionRemoved(data) {
                //console.log(data);
                this.collection.remove(data);
            }
        }, {
            key: 'onLoadMoreButtonClick',
            value: function onLoadMoreButtonClick(event) {
                event.preventDefault();
                this.collection.getNextPage(this.fetchParams);
            }
        }, {
            key: 'onWindowScroll',
            value: function onWindowScroll() {

                var scrollPos = (0, _jquery2.default)(window).scrollTop();
                var triggerPos = (0, _jquery2.default)(document).height() - (0, _jquery2.default)(window).height() * 1.2;

                if (scrollPos > triggerPos) {
                    this.collection.getNextPage(this.fetchParams);
                }
            }
        }, {
            key: 'showSpinner',
            value: function showSpinner() {
                this.$('#fetch-spinner').removeClass('hidden');
            }
        }, {
            key: 'hideSpinner',
            value: function hideSpinner() {
                this.$('#fetch-spinner').addClass('hidden');
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_submission_list_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'composite-view';
            }
        }, {
            key: 'childViewContainer',
            get: function get() {
                return '#submission-list';
            }
        }, {
            key: 'childView',
            get: function get() {
                return _submission_item_view2.default;
            }
        }]);

        return SubmissionListView;
    }(_marionette2.default.CompositeView);

    ;

    exports.default = SubmissionListView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9zdWJtaXNzaW9uX2xpc3Rfdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFvQk0sa0I7Ozs7Ozs7Ozs7OzBDQVdTO0FBQ1YsdUJBQU87QUFDTixvQ0FBaUI7QUFEWCxpQkFBUDtBQUdBOzs7cUNBRVE7QUFDTCx1QkFBTztBQUNILCtDQUE0QjtBQUR6QixpQkFBUDtBQUdIOzs7dUNBR08sTyxFQUFTOztBQUVuQixxQkFBSyxXQUFMLEdBQW1CLEVBQW5COztBQUVBLG9CQUFJLFFBQVEsR0FBUixJQUFlLElBQW5CLEVBQ0MsS0FBSyxXQUFMLENBQWlCLEdBQWpCLEdBQXVCLFFBQVEsR0FBL0I7O0FBRUQscUJBQUssVUFBTCxHQUFrQixxQ0FBbEI7O0FBRU0scUJBQUssUUFBTCxDQUFjLEtBQUssVUFBbkIsRUFBOEIsTUFBOUIsRUFBcUMsS0FBSyxXQUExQztBQUNBLHFCQUFLLFFBQUwsQ0FBYyxLQUFLLFVBQW5CLEVBQThCLFVBQTlCLEVBQXlDLEtBQUssV0FBOUM7O0FBRUEscUJBQUssUUFBTCxDQUFjLFFBQWQsRUFBdUIsb0JBQXZCLEVBQTZDLEtBQUssbUJBQWxEO0FBQ0EscUJBQUssUUFBTCxDQUFjLFFBQWQsRUFBdUIsZ0JBQXZCLEVBQXlDLEtBQUssaUJBQTlDO0FBQ0EscUJBQUssUUFBTCxDQUFjLFFBQWQsRUFBdUIsb0JBQXZCLEVBQTZDLEtBQUssbUJBQWxEOztBQUVBLHFCQUFLLFVBQUwsQ0FBZ0IsWUFBaEIsQ0FBNkIsS0FBSyxXQUFsQztBQUNOOzs7dUNBRWE7QUFBQTs7O0FBRVAscUJBQUssbUJBQUwsR0FBNEIscUJBQUUsUUFBRixDQUFXLFlBQU07QUFDekMsMkJBQUssY0FBTDtBQUNILGlCQUYyQixFQUUxQixHQUYwQixDQUE1QjtBQUdBLHNDQUFFLE1BQUYsRUFBVSxFQUFWLENBQWEsUUFBYixFQUFzQixLQUFLLG1CQUEzQjtBQUNIOzs7OENBRWlCOztBQUVkLHNDQUFFLE1BQUYsRUFBVSxHQUFWLENBQWMsUUFBZCxFQUF3QixLQUFLLG1CQUE3QjtBQUNIOzs7Z0RBSW1CLEksRUFBTTtBQUN6QixvQkFBSSxRQUFRLEtBQUssVUFBTCxDQUFnQixHQUFoQixDQUFvQixLQUFLLEtBQUwsQ0FBVyxHQUEvQixDQUFaO0FBQ0Esb0JBQUksS0FBSixFQUNDLE1BQU0sS0FBTjtBQUNEOzs7OENBRWlCLEksRUFBTTs7QUFFdkIsb0JBQUksYUFBYSwrQkFBb0IsS0FBSyxLQUF6QixDQUFqQjtBQUNBLDJCQUFXLEtBQVg7O0FBRUgscUJBQUssVUFBTCxDQUFnQixHQUFoQixDQUFvQixVQUFwQixFQUFnQyxFQUFFLElBQUksQ0FBTixFQUFoQztBQUNHOzs7Z0RBRW1CLEksRUFBTTs7QUFFdEIscUJBQUssVUFBTCxDQUFnQixNQUFoQixDQUF1QixJQUF2QjtBQUNIOzs7a0RBRXFCLEssRUFBTztBQUN6QixzQkFBTSxjQUFOO0FBQ0EscUJBQUssVUFBTCxDQUFnQixXQUFoQixDQUE0QixLQUFLLFdBQWpDO0FBQ0g7Ozs2Q0FFZ0I7O0FBRWIsb0JBQUksWUFBWSxzQkFBRSxNQUFGLEVBQVUsU0FBVixFQUFoQjtBQUNBLG9CQUFJLGFBQWMsc0JBQUUsUUFBRixFQUFZLE1BQVosS0FBdUIsc0JBQUUsTUFBRixFQUFVLE1BQVYsS0FBcUIsR0FBOUQ7O0FBRUEsb0JBQUksWUFBWSxVQUFoQixFQUE0QjtBQUN4Qix5QkFBSyxVQUFMLENBQWdCLFdBQWhCLENBQTRCLEtBQUssV0FBakM7QUFDSDtBQUNKOzs7MENBRWE7QUFDVixxQkFBSyxDQUFMLENBQU8sZ0JBQVAsRUFBeUIsV0FBekIsQ0FBcUMsUUFBckM7QUFDSDs7OzBDQUVhO0FBQ1YscUJBQUssQ0FBTCxDQUFPLGdCQUFQLEVBQXlCLFFBQXpCLENBQWtDLFFBQWxDO0FBQ0g7OztnQ0EvRlc7QUFBRSx1QkFBTyxxQkFBRSxRQUFGLGdDQUFQO0FBQTZCOzs7Z0NBRTlCO0FBQUUsdUJBQU8sZ0JBQVA7QUFBeUI7OztnQ0FFbEI7QUFBRSx1QkFBTyxrQkFBUDtBQUEyQjs7O2dDQUV0QztBQUFFO0FBQTJCOzs7O01BVGIscUJBQVcsYTs7QUFxRzNDOztzQkFFYyxrQiIsImZpbGUiOiJzdWJtaXNzaW9uX2xpc3Rfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNi0yNyAxMjoyMDo0M1xuKi9cblxuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5pbXBvcnQgTWFzb25yeSBmcm9tICdtYXNvbnJ5JztcbmltcG9ydCBDb25maWcgZnJvbSAnY29uZmlnJztcbmltcG9ydCBTdWJtaXNzaW9uSXRlbVZpZXcgZnJvbSAndmlld3Mvc3VibWlzc2lvbl9pdGVtX3ZpZXcnO1xuaW1wb3J0IFN1Ym1pc3Npb25Db2xsZWN0aW9uIGZyb20gJ21vZGVscy9zdWJtaXNzaW9uX2NvbGxlY3Rpb24nO1xuaW1wb3J0IFN1Ym1pc3Npb25Nb2RlbCBmcm9tICdtb2RlbHMvc3VibWlzc2lvbl9tb2RlbCc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9zdWJtaXNzaW9uX2xpc3RfdG1wbC5odG1sJztcblxuY2xhc3MgU3VibWlzc2lvbkxpc3RWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG5cdGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuXHRnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ2NvbXBvc2l0ZS12aWV3JyB9XG5cblx0Z2V0IGNoaWxkVmlld0NvbnRhaW5lcigpIHsgcmV0dXJuICcjc3VibWlzc2lvbi1saXN0JyB9XG5cblx0Z2V0IGNoaWxkVmlldygpIHsgcmV0dXJuIFN1Ym1pc3Npb25JdGVtVmlldyB9XG5cblx0Y2hpbGRFdmVudHMoKSB7XG4gICAgXHRyZXR1cm4ge1xuICAgIFx0XHQnc2hvdy1kZXRhaWxzJyA6ICdvbkNoaWxkU2hvd0RldGFpbHMnLFxuICAgIFx0fVxuICAgIH1cblxuICAgIGV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdjbGljayAjbG9hZC1tb3JlLWJ1dHRvbicgOiAnb25Mb2FkTW9yZUJ1dHRvbkNsaWNrJ1xuICAgICAgICB9XG4gICAgfVxuXG5cdC8qIG1ldGhvZHMgKi9cblx0aW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cblx0XHR0aGlzLmZldGNoUGFyYW1zID0ge307XG5cblx0XHRpZiAob3B0aW9ucy50YWcgIT0gbnVsbClcblx0XHRcdHRoaXMuZmV0Y2hQYXJhbXMudGFnID0gb3B0aW9ucy50YWdcblx0XHRcblx0XHR0aGlzLmNvbGxlY3Rpb24gPSBuZXcgU3VibWlzc2lvbkNvbGxlY3Rpb24oKTtcblxuICAgICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29sbGVjdGlvbiwnc3luYycsdGhpcy5oaWRlU3Bpbm5lcik7XG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCdmZXRjaGluZycsdGhpcy5zaG93U3Bpbm5lcik7XG5cbiAgICAgICAgdGhpcy5saXN0ZW5UbyhCYWNrYm9uZSwnc3VibWlzc2lvbjpjaGFuZ2VkJywgdGhpcy5vblN1Ym1pc3Npb25DaGFuZ2VkKTtcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhCYWNrYm9uZSwnc3VibWlzc2lvbjpuZXcnLCB0aGlzLm9uU3VibWlzc2lvbkFkZGVkKTtcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhCYWNrYm9uZSwnc3VibWlzc2lvbjpyZW1vdmVkJywgdGhpcy5vblN1Ym1pc3Npb25SZW1vdmVkKTtcblxuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZ2V0Rmlyc3RQYWdlKHRoaXMuZmV0Y2hQYXJhbXMpO1xuXHR9XG5cbiAgICBvbkF0dGFjaCgpIHtcbiAgICAgICAgLy9iaW5kIHNjcm9sbCBoYW5kbGVyXG4gICAgICAgIHRoaXMud2lub3dTY3JvbGxMaXN0ZW5lciA9ICBfLnRocm90dGxlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25XaW5kb3dTY3JvbGwoKTtcbiAgICAgICAgfSw1MDApO1xuICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsdGhpcy53aW5vd1Njcm9sbExpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBvbkJlZm9yZURlc3Ryb3koKSB7XG4gICAgICAgIC8vdW5iaW5kIHNjcm9sbCBoYW5kbGVyXG4gICAgICAgICQod2luZG93KS5vZmYoXCJzY3JvbGxcIiwgdGhpcy53aW5vd1Njcm9sbExpc3RlbmVyKTtcbiAgICB9XG5cblxuXHQvLyB1cGRhdGUgbW9kZWwgb24gZGF0YSBjaGFuZ2VcbiAgICBvblN1Ym1pc3Npb25DaGFuZ2VkKGRhdGEpIHtcbiAgICBcdHZhciBtb2RlbCA9IHRoaXMuY29sbGVjdGlvbi5nZXQoZGF0YS5tb2RlbC5faWQpO1xuICAgIFx0aWYgKG1vZGVsKVxuICAgIFx0XHRtb2RlbC5mZXRjaCgpO1xuICAgIH1cblxuICAgIG9uU3VibWlzc2lvbkFkZGVkKGRhdGEpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcbiAgICBcdHZhciBzdWJtaXNzaW9uID0gbmV3IFN1Ym1pc3Npb25Nb2RlbChkYXRhLm1vZGVsKTtcbiAgICBcdHN1Ym1pc3Npb24uZmV0Y2goKTtcbiAgICBcdCAvLyBhZGQgdG8gZnJvbnQgb2YgY29sbGVjdGlvblxuXHRcdHRoaXMuY29sbGVjdGlvbi5hZGQoc3VibWlzc2lvbiwgeyBhdDogMH0pO1xuICAgIH1cblxuICAgIG9uU3VibWlzc2lvblJlbW92ZWQoZGF0YSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24ucmVtb3ZlKGRhdGEpO1xuICAgIH1cblxuICAgIG9uTG9hZE1vcmVCdXR0b25DbGljayhldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZ2V0TmV4dFBhZ2UodGhpcy5mZXRjaFBhcmFtcyk7XG4gICAgfVxuXG4gICAgb25XaW5kb3dTY3JvbGwoKSB7XG5cbiAgICAgICAgdmFyIHNjcm9sbFBvcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgdmFyIHRyaWdnZXJQb3MgPSAgJChkb2N1bWVudCkuaGVpZ2h0KCkgLSAkKHdpbmRvdykuaGVpZ2h0KCkgKiAxLjI7XG5cbiAgICAgICAgaWYgKHNjcm9sbFBvcyA+IHRyaWdnZXJQb3MpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbi5nZXROZXh0UGFnZSh0aGlzLmZldGNoUGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dTcGlubmVyKCkge1xuICAgICAgICB0aGlzLiQoJyNmZXRjaC1zcGlubmVyJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH1cbiAgICBcbiAgICBoaWRlU3Bpbm5lcigpIHtcbiAgICAgICAgdGhpcy4kKCcjZmV0Y2gtc3Bpbm5lcicpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG5cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgU3VibWlzc2lvbkxpc3RWaWV3Il19