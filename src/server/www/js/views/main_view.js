define(['exports', 'marionette', 'underscore', 'text!templates/main_tmpl.html'], function (exports, _marionette, _underscore, _main_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-05-30 16:11:18
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _main_tmpl2 = _interopRequireDefault(_main_tmpl);

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

    var MainView = function (_Marionette$LayoutVie) {
        _inherits(MainView, _Marionette$LayoutVie);

        function MainView() {
            _classCallCheck(this, MainView);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(MainView).apply(this, arguments));
        }

        _createClass(MainView, [{
            key: 'regions',
            value: function regions() {
                return {
                    headerRegion: '#header',
                    topRegion: '#top',
                    contentRegion: '#content',
                    sideRegion: '#side'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {}
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_main_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'page';
            }
        }]);

        return MainView;
    }(_marionette2.default.LayoutView);

    exports.default = MainView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9tYWluX3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBY00sUTs7Ozs7Ozs7Ozs7c0NBT1E7QUFBRSx1QkFBTztBQUNmLGtDQUFjLFNBREM7QUFFZiwrQkFBVyxNQUZJO0FBR2xCLG1DQUFlLFVBSEc7QUFJZixnQ0FBWTtBQUpHLGlCQUFQO0FBS1Y7Ozt1Q0FHUyxPLEVBQVMsQ0FFbkI7OztnQ0FkYztBQUFFLHVCQUFPLHFCQUFFLFFBQUYscUJBQVA7QUFBNkI7OztnQ0FFOUI7QUFBRSx1QkFBTyxNQUFQO0FBQWU7Ozs7TUFMZCxxQkFBVyxVOztzQkFxQm5CLFEiLCJmaWxlIjoibWFpbl92aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTA0IDExOjM4OjQxXG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA1LTMwIDE2OjExOjE4XG4qL1xuXG5pbXBvcnQgTWFyaW9uZXR0ZSBmcm9tICdtYXJpb25ldHRlJ1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSdcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJ3RleHQhdGVtcGxhdGVzL21haW5fdG1wbC5odG1sJztcblxuY2xhc3MgTWFpblZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkxheW91dFZpZXcge1xuXG5cdC8qIHByb3BlcnRpZXMgKi9cbiAgICBnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ3BhZ2UnIH1cblxuICAgIHJlZ2lvbnMoKSB7IHJldHVybiB7XG4gICAgICAgIGhlYWRlclJlZ2lvbjogJyNoZWFkZXInLFxuICAgICAgICB0b3BSZWdpb246ICcjdG9wJyxcbiAgICBcdGNvbnRlbnRSZWdpb246ICcjY29udGVudCcsXG4gICAgICAgIHNpZGVSZWdpb246ICcjc2lkZSdcbiAgICB9fVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuXG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBNYWluVmlldyJdfQ==