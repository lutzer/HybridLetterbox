define(['exports', 'marionette', 'backbone', 'underscore', 'models/submission_collection', 'models/submission_model', 'views/tablet_item_view', 'text!templates/tablet_tmpl.html'], function (exports, _marionette, _backbone, _underscore, _submission_collection, _submission_model, _tablet_item_view, _tablet_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-06-23 16:29:03
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _backbone2 = _interopRequireDefault(_backbone);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _submission_collection2 = _interopRequireDefault(_submission_collection);

    var _submission_model2 = _interopRequireDefault(_submission_model);

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

                this.listenTo(_backbone2.default, 'submission:changed', this.onSubmissionChanged);
                this.listenTo(_backbone2.default, 'submission:new', this.onSubmissionAdded);
                this.listenTo(_backbone2.default, 'submission:removed', this.onSubmissionRemoved);
                this.listenTo(_backbone2.default, 'feedback:scanning', this.onSubmissionScanning);

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
                var submission = new _submission_model2.default(data.model);
                submission.fetch();
                // add to front of collection
                this.collection.add(submission, { at: 0 });
                this.hideScanSpinner();
            }
        }, {
            key: 'onSubmissionRemoved',
            value: function onSubmissionRemoved(data) {
                //console.log(data);
                this.collection.remove(data);
            }
        }, {
            key: 'onSubmissionScanning',
            value: function onSubmissionScanning(data) {
                this.showScanSpinner();
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
                this.$('#fetch-spinner').removeClass('hidden');
            }
        }, {
            key: 'hideSpinner',
            value: function hideSpinner() {
                this.$('#fetch-spinner').addClass('hidden');
            }
        }, {
            key: 'showScanSpinner',
            value: function showScanSpinner() {
                var _this3 = this;

                this.$('#scan-spinner').removeClass('hidden');
                setTimeout(function () {
                    _this3.hideScanSpinner();
                }, 5000);
            }
        }, {
            key: 'hideScanSpinner',
            value: function hideScanSpinner() {
                this.$('#scan-spinner').addClass('hidden');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy90YWJsZXRfdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWtCTSxVOzs7Ozs7Ozs7Ozt1Q0FhTSxPLEVBQVM7O0FBRW5CLHFCQUFLLFdBQUwsR0FBbUIsRUFBbkI7O0FBRUEsb0JBQUksUUFBUSxHQUFSLElBQWUsSUFBbkIsRUFDQyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsR0FBdUIsUUFBUSxHQUEvQjs7QUFFRCxxQkFBSyxVQUFMLEdBQWtCLHFDQUFsQjs7QUFFTSxxQkFBSyxRQUFMLENBQWMsS0FBSyxVQUFuQixFQUE4QixNQUE5QixFQUFxQyxLQUFLLFdBQTFDO0FBQ0EscUJBQUssUUFBTCxDQUFjLEtBQUssVUFBbkIsRUFBOEIsVUFBOUIsRUFBeUMsS0FBSyxXQUE5Qzs7QUFFQSxxQkFBSyxRQUFMLHFCQUF1QixvQkFBdkIsRUFBNkMsS0FBSyxtQkFBbEQ7QUFDQSxxQkFBSyxRQUFMLHFCQUF1QixnQkFBdkIsRUFBeUMsS0FBSyxpQkFBOUM7QUFDQSxxQkFBSyxRQUFMLHFCQUF1QixvQkFBdkIsRUFBNkMsS0FBSyxtQkFBbEQ7QUFDQSxxQkFBSyxRQUFMLHFCQUF1QixtQkFBdkIsRUFBNEMsS0FBSyxvQkFBakQ7O0FBRUEscUJBQUssVUFBTCxDQUFnQixZQUFoQixDQUE2QixLQUFLLFdBQWxDO0FBQ047Ozt1Q0FFYTtBQUFBOzs7QUFFUCxxQkFBSyxtQkFBTCxHQUE0QixxQkFBRSxRQUFGLENBQVcsWUFBTTtBQUN6QywyQkFBSyxjQUFMO0FBQ0gsaUJBRjJCLEVBRTFCLEdBRjBCLENBQTVCO0FBR0Esa0JBQUUsTUFBRixFQUFVLEVBQVYsQ0FBYSxRQUFiLEVBQXNCLEtBQUssbUJBQTNCO0FBQ0g7Ozs4Q0FFaUI7O0FBRWQsa0JBQUUsTUFBRixFQUFVLEdBQVYsQ0FBYyxRQUFkLEVBQXdCLEtBQUssbUJBQTdCO0FBQ0g7OztnREFJbUIsSSxFQUFNO0FBQ3pCLG9CQUFJLFFBQVEsS0FBSyxVQUFMLENBQWdCLEdBQWhCLENBQW9CLEtBQUssS0FBTCxDQUFXLEdBQS9CLENBQVo7QUFDQSxvQkFBSSxLQUFKLEVBQ0MsTUFBTSxLQUFOO0FBQ0Q7Ozs4Q0FFaUIsSSxFQUFNOztBQUV2QixvQkFBSSxhQUFhLCtCQUFvQixLQUFLLEtBQXpCLENBQWpCO0FBQ0EsMkJBQVcsS0FBWDs7QUFFSCxxQkFBSyxVQUFMLENBQWdCLEdBQWhCLENBQW9CLFVBQXBCLEVBQWdDLEVBQUUsSUFBSSxDQUFOLEVBQWhDO0FBQ0EscUJBQUssZUFBTDtBQUNHOzs7Z0RBRW1CLEksRUFBTTs7QUFFdEIscUJBQUssVUFBTCxDQUFnQixNQUFoQixDQUF1QixJQUF2QjtBQUNIOzs7aURBRW9CLEksRUFBTTtBQUMxQixxQkFBSyxlQUFMO0FBQ0E7Ozs2Q0FFZ0I7O0FBRWIsb0JBQUksQ0FBRSxLQUFLLFFBQVgsRUFDSTs7QUFFSixvQkFBSSxZQUFZLEVBQUUsTUFBRixFQUFVLFNBQVYsRUFBaEI7QUFDQSxvQkFBSSxhQUFjLEVBQUUsUUFBRixFQUFZLE1BQVosS0FBdUIsRUFBRSxNQUFGLEVBQVUsTUFBVixLQUFxQixHQUE5RDs7QUFFQSxvQkFBSSxZQUFZLFVBQWhCLEVBQTRCO0FBQ3hCLHlCQUFLLFVBQUwsQ0FBZ0IsV0FBaEIsQ0FBNEIsS0FBSyxXQUFqQztBQUNIO0FBQ0o7OzswQ0FFYTtBQUNWLHFCQUFLLENBQUwsQ0FBTyxnQkFBUCxFQUF5QixXQUF6QixDQUFxQyxRQUFyQztBQUNIOzs7MENBRWE7QUFDVixxQkFBSyxDQUFMLENBQU8sZ0JBQVAsRUFBeUIsUUFBekIsQ0FBa0MsUUFBbEM7QUFDSDs7OzhDQUVpQjtBQUFBOztBQUNqQixxQkFBSyxDQUFMLENBQU8sZUFBUCxFQUF3QixXQUF4QixDQUFvQyxRQUFwQztBQUNBLDJCQUFXLFlBQU07QUFDaEIsMkJBQUssZUFBTDtBQUNBLGlCQUZELEVBRUUsSUFGRjtBQUdBOzs7OENBRWlCO0FBQ2pCLHFCQUFLLENBQUwsQ0FBTyxlQUFQLEVBQXdCLFFBQXhCLENBQWlDLFFBQWpDO0FBQ0E7OztnQ0FuR1c7QUFBRSx1QkFBTyxxQkFBRSxRQUFGLHVCQUFQO0FBQTZCOzs7Z0NBRTlCO0FBQUUsdUJBQU8sZ0JBQVA7QUFBeUI7OztnQ0FFbEI7QUFBRSx1QkFBTyxrQkFBUDtBQUEyQjs7O2dDQUV0QztBQUFFO0FBQXVCOzs7O01BVGpCLHFCQUFXLGE7O3NCQTBHckIsVSIsImZpbGUiOiJ0YWJsZXRfdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLypcbiogQEF1dGhvcjogTHV0eiBSZWl0ZXIsIERlc2lnbiBSZXNlYXJjaCBMYWIsIFVuaXZlcnNpdMOkdCBkZXIgS8O8bnN0ZSBCZXJsaW5cbiogQERhdGU6ICAgMjAxNi0wNS0wNCAxMTozODo0MVxuKiBATGFzdCBNb2RpZmllZCBieTogICBsdXR6ZXJcbiogQExhc3QgTW9kaWZpZWQgdGltZTogMjAxNi0wNi0yMyAxNjoyOTowM1xuKi9cblxuaW1wb3J0IE1hcmlvbmV0dGUgZnJvbSAnbWFyaW9uZXR0ZSc7XG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSc7XG5pbXBvcnQgU3VibWlzc2lvbkNvbGxlY3Rpb24gZnJvbSAnbW9kZWxzL3N1Ym1pc3Npb25fY29sbGVjdGlvbic7XG5pbXBvcnQgU3VibWlzc2lvbk1vZGVsIGZyb20gJ21vZGVscy9zdWJtaXNzaW9uX21vZGVsJztcbmltcG9ydCBUYWJsZXRJdGVtVmlldyBmcm9tICd2aWV3cy90YWJsZXRfaXRlbV92aWV3JztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL3RhYmxldF90bXBsLmh0bWwnO1xuXG5jbGFzcyBUYWJsZXRWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG5cdGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuXHRnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ2NvbXBvc2l0ZS12aWV3JyB9XG5cblx0Z2V0IGNoaWxkVmlld0NvbnRhaW5lcigpIHsgcmV0dXJuICcjc3VibWlzc2lvbi1saXN0JyB9XG5cblx0Z2V0IGNoaWxkVmlldygpIHsgcmV0dXJuIFRhYmxldEl0ZW1WaWV3IH1cblxuXHQvKiBtZXRob2RzICovXG5cblx0aW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cblx0XHR0aGlzLmZldGNoUGFyYW1zID0ge307XG5cblx0XHRpZiAob3B0aW9ucy50YWcgIT0gbnVsbClcblx0XHRcdHRoaXMuZmV0Y2hQYXJhbXMudGFnID0gb3B0aW9ucy50YWdcblx0XHRcblx0XHR0aGlzLmNvbGxlY3Rpb24gPSBuZXcgU3VibWlzc2lvbkNvbGxlY3Rpb24oKTtcblxuICAgICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29sbGVjdGlvbiwnc3luYycsdGhpcy5oaWRlU3Bpbm5lcik7XG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCdmZXRjaGluZycsdGhpcy5zaG93U3Bpbm5lcik7XG5cbiAgICAgICAgdGhpcy5saXN0ZW5UbyhCYWNrYm9uZSwnc3VibWlzc2lvbjpjaGFuZ2VkJywgdGhpcy5vblN1Ym1pc3Npb25DaGFuZ2VkKTtcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhCYWNrYm9uZSwnc3VibWlzc2lvbjpuZXcnLCB0aGlzLm9uU3VibWlzc2lvbkFkZGVkKTtcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhCYWNrYm9uZSwnc3VibWlzc2lvbjpyZW1vdmVkJywgdGhpcy5vblN1Ym1pc3Npb25SZW1vdmVkKTtcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhCYWNrYm9uZSwnZmVlZGJhY2s6c2Nhbm5pbmcnLCB0aGlzLm9uU3VibWlzc2lvblNjYW5uaW5nKTtcblxuICAgICAgICB0aGlzLmNvbGxlY3Rpb24uZ2V0Rmlyc3RQYWdlKHRoaXMuZmV0Y2hQYXJhbXMpO1xuXHR9XG5cbiAgICBvbkF0dGFjaCgpIHtcbiAgICAgICAgLy9iaW5kIHNjcm9sbCBoYW5kbGVyXG4gICAgICAgIHRoaXMud2lub3dTY3JvbGxMaXN0ZW5lciA9ICBfLnRocm90dGxlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25XaW5kb3dTY3JvbGwoKTtcbiAgICAgICAgfSw1MDApO1xuICAgICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsdGhpcy53aW5vd1Njcm9sbExpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBvbkJlZm9yZURlc3Ryb3koKSB7XG4gICAgICAgIC8vdW5iaW5kIHNjcm9sbCBoYW5kbGVyXG4gICAgICAgICQod2luZG93KS5vZmYoXCJzY3JvbGxcIiwgdGhpcy53aW5vd1Njcm9sbExpc3RlbmVyKTtcbiAgICB9XG5cblxuXHQvLyB1cGRhdGUgbW9kZWwgb24gZGF0YSBjaGFuZ2VcbiAgICBvblN1Ym1pc3Npb25DaGFuZ2VkKGRhdGEpIHtcbiAgICBcdHZhciBtb2RlbCA9IHRoaXMuY29sbGVjdGlvbi5nZXQoZGF0YS5tb2RlbC5faWQpO1xuICAgIFx0aWYgKG1vZGVsKVxuICAgIFx0XHRtb2RlbC5mZXRjaCgpO1xuICAgIH1cblxuICAgIG9uU3VibWlzc2lvbkFkZGVkKGRhdGEpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcbiAgICBcdHZhciBzdWJtaXNzaW9uID0gbmV3IFN1Ym1pc3Npb25Nb2RlbChkYXRhLm1vZGVsKTtcbiAgICBcdHN1Ym1pc3Npb24uZmV0Y2goKTtcbiAgICBcdCAvLyBhZGQgdG8gZnJvbnQgb2YgY29sbGVjdGlvblxuXHRcdHRoaXMuY29sbGVjdGlvbi5hZGQoc3VibWlzc2lvbiwgeyBhdDogMH0pO1xuXHRcdHRoaXMuaGlkZVNjYW5TcGlubmVyKCk7XG4gICAgfVxuXG4gICAgb25TdWJtaXNzaW9uUmVtb3ZlZChkYXRhKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5yZW1vdmUoZGF0YSk7XG4gICAgfVxuXG4gICAgb25TdWJtaXNzaW9uU2Nhbm5pbmcoZGF0YSkge1xuICAgIFx0dGhpcy5zaG93U2NhblNwaW5uZXIoKTtcbiAgICB9XG5cbiAgICBvbldpbmRvd1Njcm9sbCgpIHtcblxuICAgICAgICBpZiAoISh0aGlzLmxvYWRNb3JlKSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgc2Nyb2xsUG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICB2YXIgdHJpZ2dlclBvcyA9ICAkKGRvY3VtZW50KS5oZWlnaHQoKSAtICQod2luZG93KS5oZWlnaHQoKSAqIDEuMjtcblxuICAgICAgICBpZiAoc2Nyb2xsUG9zID4gdHJpZ2dlclBvcykge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmdldE5leHRQYWdlKHRoaXMuZmV0Y2hQYXJhbXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1NwaW5uZXIoKSB7XG4gICAgICAgIHRoaXMuJCgnI2ZldGNoLXNwaW5uZXInKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7ICAgIFxuICAgIH1cbiAgICBcbiAgICBoaWRlU3Bpbm5lcigpIHtcbiAgICAgICAgdGhpcy4kKCcjZmV0Y2gtc3Bpbm5lcicpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBzaG93U2NhblNwaW5uZXIoKSB7XG4gICAgXHR0aGlzLiQoJyNzY2FuLXNwaW5uZXInKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgXHRzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBcdFx0dGhpcy5oaWRlU2NhblNwaW5uZXIoKTtcbiAgICBcdH0sNTAwMClcbiAgICB9XG5cbiAgICBoaWRlU2NhblNwaW5uZXIoKSB7XG4gICAgXHR0aGlzLiQoJyNzY2FuLXNwaW5uZXInKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxuICBcbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGV0VmlldyJdfQ==