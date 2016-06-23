define(['exports', 'marionette', 'backbone', 'underscore', 'models/submission_collection', 'models/submission_model', 'views/tablet_item_view', 'text!templates/tablet_tmpl.html'], function (exports, _marionette, _backbone, _underscore, _submission_collection, _submission_model, _tablet_item_view, _tablet_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-06-23 12:23:39
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy90YWJsZXRfdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWtCTSxVOzs7Ozs7Ozs7Ozt1Q0FhTSxPLEVBQVM7O0FBRW5CLHFCQUFLLFdBQUwsR0FBbUIsRUFBbkI7O0FBRUEsb0JBQUksUUFBUSxHQUFSLElBQWUsSUFBbkIsRUFDQyxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsR0FBdUIsUUFBUSxHQUEvQjs7QUFFRCxxQkFBSyxVQUFMLEdBQWtCLHFDQUFsQjs7QUFFTSxxQkFBSyxRQUFMLENBQWMsS0FBSyxVQUFuQixFQUE4QixNQUE5QixFQUFxQyxLQUFLLFdBQTFDO0FBQ0EscUJBQUssUUFBTCxDQUFjLEtBQUssVUFBbkIsRUFBOEIsVUFBOUIsRUFBeUMsS0FBSyxXQUE5Qzs7QUFFQSxxQkFBSyxRQUFMLHFCQUF1QixvQkFBdkIsRUFBNkMsS0FBSyxtQkFBbEQ7QUFDQSxxQkFBSyxRQUFMLHFCQUF1QixnQkFBdkIsRUFBeUMsS0FBSyxpQkFBOUM7QUFDQSxxQkFBSyxRQUFMLHFCQUF1QixvQkFBdkIsRUFBNkMsS0FBSyxtQkFBbEQ7O0FBRUEscUJBQUssUUFBTCxHQUFnQixJQUFoQjs7QUFFQSxxQkFBSyxVQUFMLENBQWdCLFlBQWhCLENBQTZCLEtBQUssV0FBbEM7QUFDTjs7O3VDQUVhO0FBQUE7OztBQUVQLHFCQUFLLG1CQUFMLEdBQTRCLHFCQUFFLFFBQUYsQ0FBVyxZQUFNO0FBQ3pDLDJCQUFLLGNBQUw7QUFDSCxpQkFGMkIsRUFFMUIsR0FGMEIsQ0FBNUI7QUFHQSxrQkFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLFFBQWIsRUFBc0IsS0FBSyxtQkFBM0I7QUFDSDs7OzhDQUVpQjs7QUFFZCxrQkFBRSxNQUFGLEVBQVUsR0FBVixDQUFjLFFBQWQsRUFBd0IsS0FBSyxtQkFBN0I7QUFDSDs7O2dEQUltQixJLEVBQU07QUFDekIsb0JBQUksUUFBUSxLQUFLLFVBQUwsQ0FBZ0IsR0FBaEIsQ0FBb0IsS0FBSyxLQUFMLENBQVcsR0FBL0IsQ0FBWjtBQUNBLG9CQUFJLEtBQUosRUFDQyxNQUFNLEtBQU47QUFDRDs7OzhDQUVpQixJLEVBQU07O0FBRXZCLG9CQUFJLGFBQWEsK0JBQW9CLEtBQUssS0FBekIsQ0FBakI7QUFDQSwyQkFBVyxLQUFYOztBQUVILHFCQUFLLFVBQUwsQ0FBZ0IsR0FBaEIsQ0FBb0IsVUFBcEIsRUFBZ0MsRUFBRSxJQUFJLENBQU4sRUFBaEM7QUFDRzs7O2dEQUVtQixJLEVBQU07O0FBRXRCLHFCQUFLLFVBQUwsQ0FBZ0IsTUFBaEIsQ0FBdUIsSUFBdkI7QUFDSDs7O2tEQUVxQixLLEVBQU87QUFDekIsc0JBQU0sY0FBTjtBQUNBLHFCQUFLLFVBQUwsQ0FBZ0IsV0FBaEIsQ0FBNEIsS0FBSyxXQUFqQztBQUNBLHFCQUFLLFFBQUwsR0FBZ0IsSUFBaEI7QUFDSDs7OzZDQUVnQjs7QUFFYixvQkFBSSxDQUFFLEtBQUssUUFBWCxFQUNJOztBQUVKLG9CQUFJLFlBQVksRUFBRSxNQUFGLEVBQVUsU0FBVixFQUFoQjtBQUNBLG9CQUFJLGFBQWMsRUFBRSxRQUFGLEVBQVksTUFBWixLQUF1QixFQUFFLE1BQUYsRUFBVSxNQUFWLEtBQXFCLEdBQTlEOztBQUVBLG9CQUFJLFlBQVksVUFBaEIsRUFBNEI7QUFDeEIseUJBQUssVUFBTCxDQUFnQixXQUFoQixDQUE0QixLQUFLLFdBQWpDO0FBQ0g7QUFDSjs7OzBDQUVhO0FBQ1YscUJBQUssQ0FBTCxDQUFPLFVBQVAsRUFBbUIsV0FBbkIsQ0FBK0IsUUFBL0I7QUFDQSxxQkFBSyxDQUFMLENBQU8sbUJBQVAsRUFBNEIsUUFBNUIsQ0FBcUMsUUFBckM7QUFDSDs7OzBDQUVhO0FBQ1YscUJBQUssQ0FBTCxDQUFPLFVBQVAsRUFBbUIsUUFBbkIsQ0FBNEIsUUFBNUI7QUFDQSxvQkFBSSxDQUFFLEtBQUssUUFBWCxFQUFzQjtBQUNsQix5QkFBSyxDQUFMLENBQU8sbUJBQVAsRUFBNEIsV0FBNUIsQ0FBd0MsUUFBeEM7QUFDSDtBQUNKOzs7Z0NBOUZXO0FBQUUsdUJBQU8scUJBQUUsUUFBRix1QkFBUDtBQUE2Qjs7O2dDQUU5QjtBQUFFLHVCQUFPLGdCQUFQO0FBQXlCOzs7Z0NBRWxCO0FBQUUsdUJBQU8sa0JBQVA7QUFBMkI7OztnQ0FFdEM7QUFBRTtBQUF1Qjs7OztNQVRqQixxQkFBVyxhOztzQkFxR3JCLFUiLCJmaWxlIjoidGFibGV0X3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDYtMjMgMTI6MjM6MzlcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnO1xuaW1wb3J0IEJhY2tib25lIGZyb20gJ2JhY2tib25lJztcbmltcG9ydCBfIGZyb20gJ3VuZGVyc2NvcmUnO1xuaW1wb3J0IFN1Ym1pc3Npb25Db2xsZWN0aW9uIGZyb20gJ21vZGVscy9zdWJtaXNzaW9uX2NvbGxlY3Rpb24nO1xuaW1wb3J0IFN1Ym1pc3Npb25Nb2RlbCBmcm9tICdtb2RlbHMvc3VibWlzc2lvbl9tb2RlbCc7XG5pbXBvcnQgVGFibGV0SXRlbVZpZXcgZnJvbSAndmlld3MvdGFibGV0X2l0ZW1fdmlldyc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy90YWJsZXRfdG1wbC5odG1sJztcblxuY2xhc3MgVGFibGV0VmlldyBleHRlbmRzIE1hcmlvbmV0dGUuQ29tcG9zaXRlVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuXHRnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cblx0Z2V0IGNsYXNzTmFtZSgpIHsgcmV0dXJuICdjb21wb3NpdGUtdmlldycgfVxuXG5cdGdldCBjaGlsZFZpZXdDb250YWluZXIoKSB7IHJldHVybiAnI3N1Ym1pc3Npb24tbGlzdCcgfVxuXG5cdGdldCBjaGlsZFZpZXcoKSB7IHJldHVybiBUYWJsZXRJdGVtVmlldyB9XG5cblx0LyogbWV0aG9kcyAqL1xuXG5cdGluaXRpYWxpemUob3B0aW9ucykge1xuXG5cdFx0dGhpcy5mZXRjaFBhcmFtcyA9IHt9O1xuXG5cdFx0aWYgKG9wdGlvbnMudGFnICE9IG51bGwpXG5cdFx0XHR0aGlzLmZldGNoUGFyYW1zLnRhZyA9IG9wdGlvbnMudGFnXG5cdFx0XG5cdFx0dGhpcy5jb2xsZWN0aW9uID0gbmV3IFN1Ym1pc3Npb25Db2xsZWN0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5saXN0ZW5Ubyh0aGlzLmNvbGxlY3Rpb24sJ3N5bmMnLHRoaXMuaGlkZVNwaW5uZXIpO1xuICAgICAgICB0aGlzLmxpc3RlblRvKHRoaXMuY29sbGVjdGlvbiwnZmV0Y2hpbmcnLHRoaXMuc2hvd1NwaW5uZXIpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuVG8oQmFja2JvbmUsJ3N1Ym1pc3Npb246Y2hhbmdlZCcsIHRoaXMub25TdWJtaXNzaW9uQ2hhbmdlZCk7XG4gICAgICAgIHRoaXMubGlzdGVuVG8oQmFja2JvbmUsJ3N1Ym1pc3Npb246bmV3JywgdGhpcy5vblN1Ym1pc3Npb25BZGRlZCk7XG4gICAgICAgIHRoaXMubGlzdGVuVG8oQmFja2JvbmUsJ3N1Ym1pc3Npb246cmVtb3ZlZCcsIHRoaXMub25TdWJtaXNzaW9uUmVtb3ZlZCk7XG5cbiAgICAgICAgdGhpcy5sb2FkTW9yZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmdldEZpcnN0UGFnZSh0aGlzLmZldGNoUGFyYW1zKTtcblx0fVxuXG4gICAgb25BdHRhY2goKSB7XG4gICAgICAgIC8vYmluZCBzY3JvbGwgaGFuZGxlclxuICAgICAgICB0aGlzLndpbm93U2Nyb2xsTGlzdGVuZXIgPSAgXy50aHJvdHRsZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uV2luZG93U2Nyb2xsKCk7XG4gICAgICAgIH0sNTAwKTtcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLHRoaXMud2lub3dTY3JvbGxMaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgb25CZWZvcmVEZXN0cm95KCkge1xuICAgICAgICAvL3VuYmluZCBzY3JvbGwgaGFuZGxlclxuICAgICAgICAkKHdpbmRvdykub2ZmKFwic2Nyb2xsXCIsIHRoaXMud2lub3dTY3JvbGxMaXN0ZW5lcik7XG4gICAgfVxuXG5cblx0Ly8gdXBkYXRlIG1vZGVsIG9uIGRhdGEgY2hhbmdlXG4gICAgb25TdWJtaXNzaW9uQ2hhbmdlZChkYXRhKSB7XG4gICAgXHR2YXIgbW9kZWwgPSB0aGlzLmNvbGxlY3Rpb24uZ2V0KGRhdGEubW9kZWwuX2lkKTtcbiAgICBcdGlmIChtb2RlbClcbiAgICBcdFx0bW9kZWwuZmV0Y2goKTtcbiAgICB9XG5cbiAgICBvblN1Ym1pc3Npb25BZGRlZChkYXRhKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgXHR2YXIgc3VibWlzc2lvbiA9IG5ldyBTdWJtaXNzaW9uTW9kZWwoZGF0YS5tb2RlbCk7XG4gICAgXHRzdWJtaXNzaW9uLmZldGNoKCk7XG4gICAgXHQgLy8gYWRkIHRvIGZyb250IG9mIGNvbGxlY3Rpb25cblx0XHR0aGlzLmNvbGxlY3Rpb24uYWRkKHN1Ym1pc3Npb24sIHsgYXQ6IDB9KTtcbiAgICB9XG5cbiAgICBvblN1Ym1pc3Npb25SZW1vdmVkKGRhdGEpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uLnJlbW92ZShkYXRhKTtcbiAgICB9XG5cbiAgICBvbkxvYWRNb3JlQnV0dG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmdldE5leHRQYWdlKHRoaXMuZmV0Y2hQYXJhbXMpO1xuICAgICAgICB0aGlzLmxvYWRNb3JlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbldpbmRvd1Njcm9sbCgpIHtcblxuICAgICAgICBpZiAoISh0aGlzLmxvYWRNb3JlKSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgc2Nyb2xsUG9zID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgICAgICB2YXIgdHJpZ2dlclBvcyA9ICAkKGRvY3VtZW50KS5oZWlnaHQoKSAtICQod2luZG93KS5oZWlnaHQoKSAqIDEuMjtcblxuICAgICAgICBpZiAoc2Nyb2xsUG9zID4gdHJpZ2dlclBvcykge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmdldE5leHRQYWdlKHRoaXMuZmV0Y2hQYXJhbXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd1NwaW5uZXIoKSB7XG4gICAgICAgIHRoaXMuJCgnLnNwaW5uZXInKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJCgnI2xvYWQtbW9yZS1idXR0b24nKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgfVxuICAgIFxuICAgIGhpZGVTcGlubmVyKCkge1xuICAgICAgICB0aGlzLiQoJy5zcGlubmVyJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICBpZiAoISh0aGlzLmxvYWRNb3JlKSkge1xuICAgICAgICAgICAgdGhpcy4kKCcjbG9hZC1tb3JlLWJ1dHRvbicpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxldFZpZXciXX0=