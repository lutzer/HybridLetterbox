define(['exports', 'marionette', 'underscore', 'jquery', 'masonry', 'config', 'views/submission_item_view', 'models/submission_collection', 'models/submission_model', 'text!templates/submission_list_tmpl.html'], function (exports, _marionette, _underscore, _jquery, _masonry, _config, _submission_item_view, _submission_collection, _submission_model, _submission_list_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-06-23 16:18:21
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

                if (!this.loadMore) return;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9zdWJtaXNzaW9uX2xpc3Rfdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFvQk0sa0I7Ozs7Ozs7Ozs7OzBDQVdTO0FBQ1YsdUJBQU87QUFDTixvQ0FBaUI7QUFEWCxpQkFBUDtBQUdBOzs7cUNBRVE7QUFDTCx1QkFBTztBQUNILCtDQUE0QjtBQUR6QixpQkFBUDtBQUdIOzs7dUNBR08sTyxFQUFTOztBQUVuQixxQkFBSyxXQUFMLEdBQW1CLEVBQW5COztBQUVBLG9CQUFJLFFBQVEsR0FBUixJQUFlLElBQW5CLEVBQ0MsS0FBSyxXQUFMLENBQWlCLEdBQWpCLEdBQXVCLFFBQVEsR0FBL0I7O0FBRUQscUJBQUssVUFBTCxHQUFrQixxQ0FBbEI7O0FBRU0scUJBQUssUUFBTCxDQUFjLEtBQUssVUFBbkIsRUFBOEIsTUFBOUIsRUFBcUMsS0FBSyxXQUExQztBQUNBLHFCQUFLLFFBQUwsQ0FBYyxLQUFLLFVBQW5CLEVBQThCLFVBQTlCLEVBQXlDLEtBQUssV0FBOUM7O0FBRUEscUJBQUssUUFBTCxDQUFjLFFBQWQsRUFBdUIsb0JBQXZCLEVBQTZDLEtBQUssbUJBQWxEO0FBQ0EscUJBQUssUUFBTCxDQUFjLFFBQWQsRUFBdUIsZ0JBQXZCLEVBQXlDLEtBQUssaUJBQTlDO0FBQ0EscUJBQUssUUFBTCxDQUFjLFFBQWQsRUFBdUIsb0JBQXZCLEVBQTZDLEtBQUssbUJBQWxEOztBQUVBLHFCQUFLLFVBQUwsQ0FBZ0IsWUFBaEIsQ0FBNkIsS0FBSyxXQUFsQztBQUNOOzs7dUNBRWE7QUFBQTs7O0FBRVAscUJBQUssbUJBQUwsR0FBNEIscUJBQUUsUUFBRixDQUFXLFlBQU07QUFDekMsMkJBQUssY0FBTDtBQUNILGlCQUYyQixFQUUxQixHQUYwQixDQUE1QjtBQUdBLHNDQUFFLE1BQUYsRUFBVSxFQUFWLENBQWEsUUFBYixFQUFzQixLQUFLLG1CQUEzQjtBQUNIOzs7OENBRWlCOztBQUVkLHNDQUFFLE1BQUYsRUFBVSxHQUFWLENBQWMsUUFBZCxFQUF3QixLQUFLLG1CQUE3QjtBQUNIOzs7Z0RBSW1CLEksRUFBTTtBQUN6QixvQkFBSSxRQUFRLEtBQUssVUFBTCxDQUFnQixHQUFoQixDQUFvQixLQUFLLEtBQUwsQ0FBVyxHQUEvQixDQUFaO0FBQ0Esb0JBQUksS0FBSixFQUNDLE1BQU0sS0FBTjtBQUNEOzs7OENBRWlCLEksRUFBTTs7QUFFdkIsb0JBQUksYUFBYSwrQkFBb0IsS0FBSyxLQUF6QixDQUFqQjtBQUNBLDJCQUFXLEtBQVg7O0FBRUgscUJBQUssVUFBTCxDQUFnQixHQUFoQixDQUFvQixVQUFwQixFQUFnQyxFQUFFLElBQUksQ0FBTixFQUFoQztBQUNHOzs7Z0RBRW1CLEksRUFBTTs7QUFFdEIscUJBQUssVUFBTCxDQUFnQixNQUFoQixDQUF1QixJQUF2QjtBQUNIOzs7a0RBRXFCLEssRUFBTztBQUN6QixzQkFBTSxjQUFOO0FBQ0EscUJBQUssVUFBTCxDQUFnQixXQUFoQixDQUE0QixLQUFLLFdBQWpDO0FBQ0g7Ozs2Q0FFZ0I7O0FBRWIsb0JBQUksQ0FBRSxLQUFLLFFBQVgsRUFDSTs7QUFFSixvQkFBSSxZQUFZLHNCQUFFLE1BQUYsRUFBVSxTQUFWLEVBQWhCO0FBQ0Esb0JBQUksYUFBYyxzQkFBRSxRQUFGLEVBQVksTUFBWixLQUF1QixzQkFBRSxNQUFGLEVBQVUsTUFBVixLQUFxQixHQUE5RDs7QUFFQSxvQkFBSSxZQUFZLFVBQWhCLEVBQTRCO0FBQ3hCLHlCQUFLLFVBQUwsQ0FBZ0IsV0FBaEIsQ0FBNEIsS0FBSyxXQUFqQztBQUNIO0FBQ0o7OzswQ0FFYTtBQUNWLHFCQUFLLENBQUwsQ0FBTyxnQkFBUCxFQUF5QixXQUF6QixDQUFxQyxRQUFyQztBQUNIOzs7MENBRWE7QUFDVixxQkFBSyxDQUFMLENBQU8sZ0JBQVAsRUFBeUIsUUFBekIsQ0FBa0MsUUFBbEM7QUFDSDs7O2dDQWxHVztBQUFFLHVCQUFPLHFCQUFFLFFBQUYsZ0NBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxnQkFBUDtBQUF5Qjs7O2dDQUVsQjtBQUFFLHVCQUFPLGtCQUFQO0FBQTJCOzs7Z0NBRXRDO0FBQUU7QUFBMkI7Ozs7TUFUYixxQkFBVyxhOztBQXdHM0M7O3NCQUVjLGtCIiwiZmlsZSI6InN1Ym1pc3Npb25fbGlzdF92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA2LTIzIDE2OjE4OjIxXG4qL1xuXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcbmltcG9ydCBNYXNvbnJ5IGZyb20gJ21hc29ucnknO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuaW1wb3J0IFN1Ym1pc3Npb25JdGVtVmlldyBmcm9tICd2aWV3cy9zdWJtaXNzaW9uX2l0ZW1fdmlldyc7XG5pbXBvcnQgU3VibWlzc2lvbkNvbGxlY3Rpb24gZnJvbSAnbW9kZWxzL3N1Ym1pc3Npb25fY29sbGVjdGlvbic7XG5pbXBvcnQgU3VibWlzc2lvbk1vZGVsIGZyb20gJ21vZGVscy9zdWJtaXNzaW9uX21vZGVsJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL3N1Ym1pc3Npb25fbGlzdF90bXBsLmh0bWwnO1xuXG5jbGFzcyBTdWJtaXNzaW9uTGlzdFZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkNvbXBvc2l0ZVZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cblx0Z2V0IHRlbXBsYXRlKCkgeyByZXR1cm4gXy50ZW1wbGF0ZSh0ZW1wbGF0ZSkgfVxuXG5cdGdldCBjbGFzc05hbWUoKSB7IHJldHVybiAnY29tcG9zaXRlLXZpZXcnIH1cblxuXHRnZXQgY2hpbGRWaWV3Q29udGFpbmVyKCkgeyByZXR1cm4gJyNzdWJtaXNzaW9uLWxpc3QnIH1cblxuXHRnZXQgY2hpbGRWaWV3KCkgeyByZXR1cm4gU3VibWlzc2lvbkl0ZW1WaWV3IH1cblxuXHRjaGlsZEV2ZW50cygpIHtcbiAgICBcdHJldHVybiB7XG4gICAgXHRcdCdzaG93LWRldGFpbHMnIDogJ29uQ2hpbGRTaG93RGV0YWlscycsXG4gICAgXHR9XG4gICAgfVxuXG4gICAgZXZlbnRzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ2NsaWNrICNsb2FkLW1vcmUtYnV0dG9uJyA6ICdvbkxvYWRNb3JlQnV0dG9uQ2xpY2snXG4gICAgICAgIH1cbiAgICB9XG5cblx0LyogbWV0aG9kcyAqL1xuXHRpbml0aWFsaXplKG9wdGlvbnMpIHtcblxuXHRcdHRoaXMuZmV0Y2hQYXJhbXMgPSB7fTtcblxuXHRcdGlmIChvcHRpb25zLnRhZyAhPSBudWxsKVxuXHRcdFx0dGhpcy5mZXRjaFBhcmFtcy50YWcgPSBvcHRpb25zLnRhZ1xuXHRcdFxuXHRcdHRoaXMuY29sbGVjdGlvbiA9IG5ldyBTdWJtaXNzaW9uQ29sbGVjdGlvbigpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuVG8odGhpcy5jb2xsZWN0aW9uLCdzeW5jJyx0aGlzLmhpZGVTcGlubmVyKTtcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sJ2ZldGNoaW5nJyx0aGlzLnNob3dTcGlubmVyKTtcblxuICAgICAgICB0aGlzLmxpc3RlblRvKEJhY2tib25lLCdzdWJtaXNzaW9uOmNoYW5nZWQnLCB0aGlzLm9uU3VibWlzc2lvbkNoYW5nZWQpO1xuICAgICAgICB0aGlzLmxpc3RlblRvKEJhY2tib25lLCdzdWJtaXNzaW9uOm5ldycsIHRoaXMub25TdWJtaXNzaW9uQWRkZWQpO1xuICAgICAgICB0aGlzLmxpc3RlblRvKEJhY2tib25lLCdzdWJtaXNzaW9uOnJlbW92ZWQnLCB0aGlzLm9uU3VibWlzc2lvblJlbW92ZWQpO1xuXG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5nZXRGaXJzdFBhZ2UodGhpcy5mZXRjaFBhcmFtcyk7XG5cdH1cblxuICAgIG9uQXR0YWNoKCkge1xuICAgICAgICAvL2JpbmQgc2Nyb2xsIGhhbmRsZXJcbiAgICAgICAgdGhpcy53aW5vd1Njcm9sbExpc3RlbmVyID0gIF8udGhyb3R0bGUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbldpbmRvd1Njcm9sbCgpO1xuICAgICAgICB9LDUwMCk7XG4gICAgICAgICQod2luZG93KS5vbignc2Nyb2xsJyx0aGlzLndpbm93U2Nyb2xsTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIG9uQmVmb3JlRGVzdHJveSgpIHtcbiAgICAgICAgLy91bmJpbmQgc2Nyb2xsIGhhbmRsZXJcbiAgICAgICAgJCh3aW5kb3cpLm9mZihcInNjcm9sbFwiLCB0aGlzLndpbm93U2Nyb2xsTGlzdGVuZXIpO1xuICAgIH1cblxuXG5cdC8vIHVwZGF0ZSBtb2RlbCBvbiBkYXRhIGNoYW5nZVxuICAgIG9uU3VibWlzc2lvbkNoYW5nZWQoZGF0YSkge1xuICAgIFx0dmFyIG1vZGVsID0gdGhpcy5jb2xsZWN0aW9uLmdldChkYXRhLm1vZGVsLl9pZCk7XG4gICAgXHRpZiAobW9kZWwpXG4gICAgXHRcdG1vZGVsLmZldGNoKCk7XG4gICAgfVxuXG4gICAgb25TdWJtaXNzaW9uQWRkZWQoZGF0YSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xuICAgIFx0dmFyIHN1Ym1pc3Npb24gPSBuZXcgU3VibWlzc2lvbk1vZGVsKGRhdGEubW9kZWwpO1xuICAgIFx0c3VibWlzc2lvbi5mZXRjaCgpO1xuICAgIFx0IC8vIGFkZCB0byBmcm9udCBvZiBjb2xsZWN0aW9uXG5cdFx0dGhpcy5jb2xsZWN0aW9uLmFkZChzdWJtaXNzaW9uLCB7IGF0OiAwfSk7XG4gICAgfVxuXG4gICAgb25TdWJtaXNzaW9uUmVtb3ZlZChkYXRhKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5yZW1vdmUoZGF0YSk7XG4gICAgfVxuXG4gICAgb25Mb2FkTW9yZUJ1dHRvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5nZXROZXh0UGFnZSh0aGlzLmZldGNoUGFyYW1zKTtcbiAgICB9XG5cbiAgICBvbldpbmRvd1Njcm9sbCgpIHtcblxuICAgICAgICBpZiAoISh0aGlzLmxvYWRNb3JlKSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgc2Nyb2xsUG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICB2YXIgdHJpZ2dlclBvcyA9ICAkKGRvY3VtZW50KS5oZWlnaHQoKSAtICQod2luZG93KS5oZWlnaHQoKSAqIDEuMjtcblxuICAgICAgICBpZiAoc2Nyb2xsUG9zID4gdHJpZ2dlclBvcykge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmdldE5leHRQYWdlKHRoaXMuZmV0Y2hQYXJhbXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1NwaW5uZXIoKSB7XG4gICAgICAgIHRoaXMuJCgnI2ZldGNoLXNwaW5uZXInKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxuICAgIFxuICAgIGhpZGVTcGlubmVyKCkge1xuICAgICAgICB0aGlzLiQoJyNmZXRjaC1zcGlubmVyJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH1cblxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdWJtaXNzaW9uTGlzdFZpZXciXX0=