define(['exports', 'marionette', 'underscore', 'models/submission_collection', 'views/tablet_item_view', 'text!templates/tablet_tmpl.html'], function (exports, _marionette, _underscore, _submission_collection, _tablet_item_view, _tablet_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-06-23 12:03:15
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _submission_collection2 = _interopRequireDefault(_submission_collection);

    var _tablet_item_view2 = _interopRequireDefault(_tablet_item_view);

    var _tablet_tmpl2 = _interopRequireDefault(_tablet_tmpl);

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

    var TabletView = function (_Marionette$Composite) {
        _inherits(TabletView, _Marionette$Composite);

        function TabletView() {
            _classCallCheck(this, TabletView);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(TabletView).apply(this, arguments));
        }

        _createClass(TabletView, [{
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

                this.loadMore = true;

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
                $(window).on('scroll', this.winowScrollListener);
            }
        }, {
            key: 'onBeforeDestroy',
            value: function onBeforeDestroy() {
                //unbind scroll handler
                $(window).off("scroll", this.winowScrollListener);
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
                var submission = new SubmissionModel(data.model);
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
                this.loadMore = true;
            }
        }, {
            key: 'onWindowScroll',
            value: function onWindowScroll() {

                if (!this.loadMore) return;

                var scrollPos = $(window).scrollTop();
                var triggerPos = $(document).height() - $(window).height() * 1.2;

                if (scrollPos > triggerPos) {
                    this.collection.getNextPage(this.fetchParams);
                }
            }
        }, {
            key: 'showSpinner',
            value: function showSpinner() {
                this.$('.spinner').removeClass('hidden');
                this.$('#load-more-button').addClass('hidden');
            }
        }, {
            key: 'hideSpinner',
            value: function hideSpinner() {
                this.$('.spinner').addClass('hidden');
                if (!this.loadMore) {
                    this.$('#load-more-button').removeClass('hidden');
                }
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_tablet_tmpl2.default);
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
                return _tablet_item_view2.default;
            }
        }]);

        return TabletView;
    }(_marionette2.default.CompositeView);

    exports.default = TabletView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy90YWJsZXRfdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBZ0JNLFU7Ozs7Ozs7Ozs7O3VDQWFNLE8sRUFBUzs7QUFFbkIscUJBQUssV0FBTCxHQUFtQixFQUFuQjs7QUFFQSxvQkFBSSxRQUFRLEdBQVIsSUFBZSxJQUFuQixFQUNDLEtBQUssV0FBTCxDQUFpQixHQUFqQixHQUF1QixRQUFRLEdBQS9COztBQUVELHFCQUFLLFVBQUwsR0FBa0IscUNBQWxCOztBQUVNLHFCQUFLLFFBQUwsQ0FBYyxLQUFLLFVBQW5CLEVBQThCLE1BQTlCLEVBQXFDLEtBQUssV0FBMUM7QUFDQSxxQkFBSyxRQUFMLENBQWMsS0FBSyxVQUFuQixFQUE4QixVQUE5QixFQUF5QyxLQUFLLFdBQTlDOztBQUVBLHFCQUFLLFFBQUwsQ0FBYyxRQUFkLEVBQXVCLG9CQUF2QixFQUE2QyxLQUFLLG1CQUFsRDtBQUNBLHFCQUFLLFFBQUwsQ0FBYyxRQUFkLEVBQXVCLGdCQUF2QixFQUF5QyxLQUFLLGlCQUE5QztBQUNBLHFCQUFLLFFBQUwsQ0FBYyxRQUFkLEVBQXVCLG9CQUF2QixFQUE2QyxLQUFLLG1CQUFsRDs7QUFFQSxxQkFBSyxRQUFMLEdBQWdCLElBQWhCOztBQUVBLHFCQUFLLFVBQUwsQ0FBZ0IsWUFBaEIsQ0FBNkIsS0FBSyxXQUFsQztBQUNOOzs7dUNBRWE7QUFBQTs7O0FBRVAscUJBQUssbUJBQUwsR0FBNEIscUJBQUUsUUFBRixDQUFXLFlBQU07QUFDekMsMkJBQUssY0FBTDtBQUNILGlCQUYyQixFQUUxQixHQUYwQixDQUE1QjtBQUdBLGtCQUFFLE1BQUYsRUFBVSxFQUFWLENBQWEsUUFBYixFQUFzQixLQUFLLG1CQUEzQjtBQUNIOzs7OENBRWlCOztBQUVkLGtCQUFFLE1BQUYsRUFBVSxHQUFWLENBQWMsUUFBZCxFQUF3QixLQUFLLG1CQUE3QjtBQUNIOzs7Z0RBSW1CLEksRUFBTTtBQUN6QixvQkFBSSxRQUFRLEtBQUssVUFBTCxDQUFnQixHQUFoQixDQUFvQixLQUFLLEtBQUwsQ0FBVyxHQUEvQixDQUFaO0FBQ0Esb0JBQUksS0FBSixFQUNDLE1BQU0sS0FBTjtBQUNEOzs7OENBRWlCLEksRUFBTTs7QUFFdkIsb0JBQUksYUFBYSxJQUFJLGVBQUosQ0FBb0IsS0FBSyxLQUF6QixDQUFqQjtBQUNBLDJCQUFXLEtBQVg7O0FBRUgscUJBQUssVUFBTCxDQUFnQixHQUFoQixDQUFvQixVQUFwQixFQUFnQyxFQUFFLElBQUksQ0FBTixFQUFoQztBQUNHOzs7Z0RBRW1CLEksRUFBTTs7QUFFdEIscUJBQUssVUFBTCxDQUFnQixNQUFoQixDQUF1QixJQUF2QjtBQUNIOzs7a0RBRXFCLEssRUFBTztBQUN6QixzQkFBTSxjQUFOO0FBQ0EscUJBQUssVUFBTCxDQUFnQixXQUFoQixDQUE0QixLQUFLLFdBQWpDO0FBQ0EscUJBQUssUUFBTCxHQUFnQixJQUFoQjtBQUNIOzs7NkNBRWdCOztBQUViLG9CQUFJLENBQUUsS0FBSyxRQUFYLEVBQ0k7O0FBRUosb0JBQUksWUFBWSxFQUFFLE1BQUYsRUFBVSxTQUFWLEVBQWhCO0FBQ0Esb0JBQUksYUFBYyxFQUFFLFFBQUYsRUFBWSxNQUFaLEtBQXVCLEVBQUUsTUFBRixFQUFVLE1BQVYsS0FBcUIsR0FBOUQ7O0FBRUEsb0JBQUksWUFBWSxVQUFoQixFQUE0QjtBQUN4Qix5QkFBSyxVQUFMLENBQWdCLFdBQWhCLENBQTRCLEtBQUssV0FBakM7QUFDSDtBQUNKOzs7MENBRWE7QUFDVixxQkFBSyxDQUFMLENBQU8sVUFBUCxFQUFtQixXQUFuQixDQUErQixRQUEvQjtBQUNBLHFCQUFLLENBQUwsQ0FBTyxtQkFBUCxFQUE0QixRQUE1QixDQUFxQyxRQUFyQztBQUNIOzs7MENBRWE7QUFDVixxQkFBSyxDQUFMLENBQU8sVUFBUCxFQUFtQixRQUFuQixDQUE0QixRQUE1QjtBQUNBLG9CQUFJLENBQUUsS0FBSyxRQUFYLEVBQXNCO0FBQ2xCLHlCQUFLLENBQUwsQ0FBTyxtQkFBUCxFQUE0QixXQUE1QixDQUF3QyxRQUF4QztBQUNIO0FBQ0o7OztnQ0E5Rlc7QUFBRSx1QkFBTyxxQkFBRSxRQUFGLHVCQUFQO0FBQTZCOzs7Z0NBRTlCO0FBQUUsdUJBQU8sZ0JBQVA7QUFBeUI7OztnQ0FFbEI7QUFBRSx1QkFBTyxrQkFBUDtBQUEyQjs7O2dDQUV0QztBQUFFO0FBQXVCOzs7O01BVGpCLHFCQUFXLGE7O3NCQXFHckIsVSIsImZpbGUiOiJ0YWJsZXRfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNi0yMyAxMjowMzoxNVxuKi9cblxuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCBTdWJtaXNzaW9uQ29sbGVjdGlvbiBmcm9tICdtb2RlbHMvc3VibWlzc2lvbl9jb2xsZWN0aW9uJztcbmltcG9ydCBUYWJsZXRJdGVtVmlldyBmcm9tICd2aWV3cy90YWJsZXRfaXRlbV92aWV3JztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL3RhYmxldF90bXBsLmh0bWwnO1xuXG5jbGFzcyBUYWJsZXRWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG5cdGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuXHRnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ2NvbXBvc2l0ZS12aWV3JyB9XG5cblx0Z2V0IGNoaWxkVmlld0NvbnRhaW5lcigpIHsgcmV0dXJuICcjc3VibWlzc2lvbi1saXN0JyB9XG5cblx0Z2V0IGNoaWxkVmlldygpIHsgcmV0dXJuIFRhYmxldEl0ZW1WaWV3IH1cblxuXHQvKiBtZXRob2RzICovXG5cblx0aW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cblx0XHR0aGlzLmZldGNoUGFyYW1zID0ge307XG5cblx0XHRpZiAob3B0aW9ucy50YWcgIT0gbnVsbClcblx0XHRcdHRoaXMuZmV0Y2hQYXJhbXMudGFnID0gb3B0aW9ucy50YWdcblx0XHRcblx0XHR0aGlzLmNvbGxlY3Rpb24gPSBuZXcgU3VibWlzc2lvbkNvbGxlY3Rpb24oKTtcblxuICAgICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29sbGVjdGlvbiwnc3luYycsdGhpcy5oaWRlU3Bpbm5lcik7XG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCdmZXRjaGluZycsdGhpcy5zaG93U3Bpbm5lcik7XG5cbiAgICAgICAgdGhpcy5saXN0ZW5UbyhCYWNrYm9uZSwnc3VibWlzc2lvbjpjaGFuZ2VkJywgdGhpcy5vblN1Ym1pc3Npb25DaGFuZ2VkKTtcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhCYWNrYm9uZSwnc3VibWlzc2lvbjpuZXcnLCB0aGlzLm9uU3VibWlzc2lvbkFkZGVkKTtcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhCYWNrYm9uZSwnc3VibWlzc2lvbjpyZW1vdmVkJywgdGhpcy5vblN1Ym1pc3Npb25SZW1vdmVkKTtcblxuICAgICAgICB0aGlzLmxvYWRNb3JlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZ2V0Rmlyc3RQYWdlKHRoaXMuZmV0Y2hQYXJhbXMpO1xuXHR9XG5cbiAgICBvbkF0dGFjaCgpIHtcbiAgICAgICAgLy9iaW5kIHNjcm9sbCBoYW5kbGVyXG4gICAgICAgIHRoaXMud2lub3dTY3JvbGxMaXN0ZW5lciA9ICBfLnRocm90dGxlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25XaW5kb3dTY3JvbGwoKTtcbiAgICAgICAgfSw1MDApO1xuICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsdGhpcy53aW5vd1Njcm9sbExpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBvbkJlZm9yZURlc3Ryb3koKSB7XG4gICAgICAgIC8vdW5iaW5kIHNjcm9sbCBoYW5kbGVyXG4gICAgICAgICQod2luZG93KS5vZmYoXCJzY3JvbGxcIiwgdGhpcy53aW5vd1Njcm9sbExpc3RlbmVyKTtcbiAgICB9XG5cblxuXHQvLyB1cGRhdGUgbW9kZWwgb24gZGF0YSBjaGFuZ2VcbiAgICBvblN1Ym1pc3Npb25DaGFuZ2VkKGRhdGEpIHtcbiAgICBcdHZhciBtb2RlbCA9IHRoaXMuY29sbGVjdGlvbi5nZXQoZGF0YS5tb2RlbC5faWQpO1xuICAgIFx0aWYgKG1vZGVsKVxuICAgIFx0XHRtb2RlbC5mZXRjaCgpO1xuICAgIH1cblxuICAgIG9uU3VibWlzc2lvbkFkZGVkKGRhdGEpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcbiAgICBcdHZhciBzdWJtaXNzaW9uID0gbmV3IFN1Ym1pc3Npb25Nb2RlbChkYXRhLm1vZGVsKTtcbiAgICBcdHN1Ym1pc3Npb24uZmV0Y2goKTtcbiAgICBcdCAvLyBhZGQgdG8gZnJvbnQgb2YgY29sbGVjdGlvblxuXHRcdHRoaXMuY29sbGVjdGlvbi5hZGQoc3VibWlzc2lvbiwgeyBhdDogMH0pO1xuICAgIH1cblxuICAgIG9uU3VibWlzc2lvblJlbW92ZWQoZGF0YSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24ucmVtb3ZlKGRhdGEpO1xuICAgIH1cblxuICAgIG9uTG9hZE1vcmVCdXR0b25DbGljayhldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZ2V0TmV4dFBhZ2UodGhpcy5mZXRjaFBhcmFtcyk7XG4gICAgICAgIHRoaXMubG9hZE1vcmUgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uV2luZG93U2Nyb2xsKCkge1xuXG4gICAgICAgIGlmICghKHRoaXMubG9hZE1vcmUpKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzY3JvbGxQb3MgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIHZhciB0cmlnZ2VyUG9zID0gICQoZG9jdW1lbnQpLmhlaWdodCgpIC0gJCh3aW5kb3cpLmhlaWdodCgpICogMS4yO1xuXG4gICAgICAgIGlmIChzY3JvbGxQb3MgPiB0cmlnZ2VyUG9zKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZ2V0TmV4dFBhZ2UodGhpcy5mZXRjaFBhcmFtcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93U3Bpbm5lcigpIHtcbiAgICAgICAgdGhpcy4kKCcuc3Bpbm5lcicpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy4kKCcjbG9hZC1tb3JlLWJ1dHRvbicpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG4gICAgXG4gICAgaGlkZVNwaW5uZXIoKSB7XG4gICAgICAgIHRoaXMuJCgnLnNwaW5uZXInKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIGlmICghKHRoaXMubG9hZE1vcmUpKSB7XG4gICAgICAgICAgICB0aGlzLiQoJyNsb2FkLW1vcmUtYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfVxuICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGV0VmlldyJdfQ==