define(["module"], function (module) {
    "use strict";

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

    var View = function () {
        function View(name) {
            _classCallCheck(this, View);

            this._name = name;
        }

        _createClass(View, [{
            key: "name",
            value: function name(_name) {
                if (!arguments.length) return this._name;
                this._name = _name;
                return this;
            }
        }, {
            key: "print",
            value: function print(msg) {
                console.log(msg);
            }
        }]);

        return View;
    }();

    module.exports = View;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy92aWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUFNLEk7QUFFRixzQkFBWSxJQUFaLEVBQWtCO0FBQUE7O0FBQ2QsaUJBQUssS0FBTCxHQUFhLElBQWI7QUFDSDs7OztpQ0FFSSxLLEVBQU07QUFDUCxvQkFBSSxDQUFDLFVBQVUsTUFBZixFQUF1QixPQUFPLEtBQUssS0FBWjtBQUN2QixxQkFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLHVCQUFPLElBQVA7QUFDSDs7O2tDQUVLLEcsRUFBSztBQUNWLHdCQUFRLEdBQVIsQ0FBWSxHQUFaO0FBQ0E7Ozs7OztBQUdMLFdBQU8sT0FBUCxHQUFpQixJQUFqQiIsImZpbGUiOiJ2aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVmlldyB7XG5cdFxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgbmFtZShuYW1lKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwcmludChtc2cpIHtcbiAgICBcdGNvbnNvbGUubG9nKG1zZyk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZpZXc7Il19