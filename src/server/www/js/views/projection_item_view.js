define(['exports', 'marionette', 'underscore', 'config', 'text!templates/projection_item_tmpl.html'], function (exports, _marionette, _underscore, _config, _projection_item_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-07-14 16:16:42
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _config2 = _interopRequireDefault(_config);

    var _projection_item_tmpl2 = _interopRequireDefault(_projection_item_tmpl);

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

    var BaseView = function (_Marionette$ItemView) {
        _inherits(BaseView, _Marionette$ItemView);

        function BaseView() {
            _classCallCheck(this, BaseView);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(BaseView).apply(this, arguments));
        }

        _createClass(BaseView, [{
            key: 'initialize',
            value: function initialize(options) {}
        }, {
            key: 'onShow',
            value: function onShow() {
                if (this.model.get('device') == "letterbox") this.$('.background').addClass("invert");
            }
        }, {
            key: 'getBackgroundImageString',
            value: function getBackgroundImageString() {
                var filesUrl = _config2.default.files_url + this.model.get('_id') + '/';
                var files = this.model.get('files');
                if (files.length > 0) return "style=\"background-image: url('" + filesUrl + files[0].name + "')\"";else return "";
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_projection_item_tmpl2.default);
            }
        }, {
            key: 'templateHelpers',
            get: function get() {
                return {
                    backgroundImage: this.getBackgroundImageString()
                };
            }
        }]);

        return BaseView;
    }(_marionette2.default.ItemView);

    exports.default = BaseView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9wcm9qZWN0aW9uX2l0ZW1fdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWVNLFE7Ozs7Ozs7Ozs7O3VDQVlTLE8sRUFBUyxDQUNuQjs7O3FDQUVRO0FBQ0wsb0JBQUksS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLFFBQWYsS0FBNEIsV0FBaEMsRUFDSSxLQUFLLENBQUwsQ0FBTyxhQUFQLEVBQXNCLFFBQXRCLENBQStCLFFBQS9CO0FBQ1A7Ozt1REFFMEI7QUFDdkIsb0JBQUksV0FBVyxpQkFBTyxTQUFQLEdBQW1CLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxLQUFmLENBQW5CLEdBQTJDLEdBQTFEO0FBQ0Esb0JBQUksUUFBUSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsT0FBZixDQUFaO0FBQ0Esb0JBQUksTUFBTSxNQUFOLEdBQWUsQ0FBbkIsRUFDSSxPQUFPLG9DQUFrQyxRQUFsQyxHQUEyQyxNQUFNLENBQU4sRUFBUyxJQUFwRCxHQUF5RCxNQUFoRSxDQURKLEtBR0ksT0FBTyxFQUFQO0FBQ1A7OztnQ0F4QmM7QUFBRSx1QkFBTyxxQkFBRSxRQUFGLGdDQUFQO0FBQTZCOzs7Z0NBRXhCO0FBQ3RCLHVCQUFPO0FBQ0MscUNBQWtCLEtBQUssd0JBQUw7QUFEbkIsaUJBQVA7QUFHQzs7OztNQVRrQixxQkFBVyxROztzQkErQm5CLFEiLCJmaWxlIjoicHJvamVjdGlvbl9pdGVtX3ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDctMTQgMTY6MTY6NDJcbiovXG5cbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnXG5pbXBvcnQgXyBmcm9tICd1bmRlcnNjb3JlJ1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnXG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICd0ZXh0IXRlbXBsYXRlcy9wcm9qZWN0aW9uX2l0ZW1fdG1wbC5odG1sJztcblxuY2xhc3MgQmFzZVZpZXcgZXh0ZW5kcyBNYXJpb25ldHRlLkl0ZW1WaWV3IHtcblxuXHQvKiBwcm9wZXJ0aWVzICovXG4gICBcdGdldCB0ZW1wbGF0ZSgpIHsgcmV0dXJuIF8udGVtcGxhdGUodGVtcGxhdGUpIH1cblxuICAgXHRnZXQgdGVtcGxhdGVIZWxwZXJzKCkge1xuICBcdFx0cmV0dXJuIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZSA6IHRoaXMuZ2V0QmFja2dyb3VuZEltYWdlU3RyaW5nKClcbiAgXHRcdH1cbiAgICB9XG5cbiAgICAvKiBtZXRob2RzICovXG4gICAgaW5pdGlhbGl6ZShvcHRpb25zKSB7XG4gICAgfVxuXG4gICAgb25TaG93KCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlbC5nZXQoJ2RldmljZScpID09IFwibGV0dGVyYm94XCIpXG4gICAgICAgICAgICB0aGlzLiQoJy5iYWNrZ3JvdW5kJykuYWRkQ2xhc3MoXCJpbnZlcnRcIik7XG4gICAgfVxuXG4gICAgZ2V0QmFja2dyb3VuZEltYWdlU3RyaW5nKCkge1xuICAgICAgICB2YXIgZmlsZXNVcmwgPSBDb25maWcuZmlsZXNfdXJsICsgdGhpcy5tb2RlbC5nZXQoJ19pZCcpICsgJy8nO1xuICAgICAgICB2YXIgZmlsZXMgPSB0aGlzLm1vZGVsLmdldCgnZmlsZXMnKVxuICAgICAgICBpZiAoZmlsZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHJldHVybiBcInN0eWxlPVxcXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ1wiK2ZpbGVzVXJsK2ZpbGVzWzBdLm5hbWUrXCInKVxcXCJcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlVmlldyJdfQ==