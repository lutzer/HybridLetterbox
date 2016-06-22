define(['exports', 'marionette', 'backbone', 'underscore', 'models/submission_model', 'config', 'text!templates/submission_input_tmpl.html', 'jquery', 'iframeTransport'], function (exports, _marionette, _backbone, _underscore, _submission_model, _config, _submission_input_tmpl) {
    'use strict';

    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-04 11:38:41
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-05-30 14:46:17
    */

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _marionette2 = _interopRequireDefault(_marionette);

    var _backbone2 = _interopRequireDefault(_backbone);

    var _underscore2 = _interopRequireDefault(_underscore);

    var _submission_model2 = _interopRequireDefault(_submission_model);

    var _config2 = _interopRequireDefault(_config);

    var _submission_input_tmpl2 = _interopRequireDefault(_submission_input_tmpl);

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

    var SubmissionInputView = function (_Marionette$ItemView) {
        _inherits(SubmissionInputView, _Marionette$ItemView);

        function SubmissionInputView() {
            _classCallCheck(this, SubmissionInputView);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(SubmissionInputView).apply(this, arguments));
        }

        _createClass(SubmissionInputView, [{
            key: 'events',
            value: function events() {
                return {
                    'focus #new-submission-text': 'focus',
                    'click #new-submission-text': 'focus',
                    'keypress #new-submission-text': 'focus',
                    'mouseleave .input-box': 'unfocus',
                    'click #submit-button': 'onSubmitButtonClick',
                    'change #new-submission-file': 'onFileInputChanged',
                    'click #tag-dropdown': 'onTagDropdownClick',
                    'click .tag-dropdown-list': 'preventPropagation',
                    'mouseleave .tag-dropdown-list': 'onLeaveDropdown'
                };
            }
        }, {
            key: 'initialize',
            value: function initialize(options) {
                //console.log(options)
            }
        }, {
            key: 'focus',
            value: function focus() {
                this.$el.addClass('expand');
            }
        }, {
            key: 'unfocus',
            value: function unfocus() {
                if (!this.$('#new-submission-text').val() && !this.$('#new-submission-author').val() && !this.$('#new-submission-file').val()) this.$el.removeClass('expand');
            }
        }, {
            key: 'clear',
            value: function clear() {
                this.$('#new-submission-text').val('');
                this.$('#new-submission-author').val('');
                this.$('#new-submission-file').val('');
                $('#attach-text').addClass('hidden');
                $('input[name="new-submission-tags"]:checked').attr('checked', false);
            }
        }, {
            key: 'onTagDropdownClick',
            value: function onTagDropdownClick() {
                this.$('.tag-dropdown-list').toggleClass('expand');
            }
        }, {
            key: 'onLeaveDropdown',
            value: function onLeaveDropdown() {
                this.$('.tag-dropdown-list').removeClass('expand');
            }
        }, {
            key: 'preventPropagation',
            value: function preventPropagation(event) {
                event.stopPropagation();
            }
        }, {
            key: 'onSubmitButtonClick',
            value: function onSubmitButtonClick() {
                var _this2 = this;

                // upload file
                var uploadFile = function uploadFile(file, model, callback) {

                    $.ajax({
                        method: 'POST',
                        url: _config2.default.web_service_url + 'file/attach/' + model.get('_id'),
                        iframe: true,
                        files: file,
                        dataType: 'json',
                        error: function error(res) {
                            _backbone2.default.trigger('error', 'http', res.responseJSON.error);
                        },
                        success: function success(res) {
                            if (_underscore2.default.has(res, 'error')) _backbone2.default.trigger('error', 'http', res.error);else callback();
                        }
                    });
                };

                var tags = _underscore2.default.map($('input[name="new-submission-tags"]:checked'), function (element) {
                    return element.value;
                });

                var submission = new _submission_model2.default({
                    text: this.$('#new-submission-text').val(),
                    author: this.$('#new-submission-author').val(),
                    tags: tags
                });
                submission.save(null, {
                    error: function error(model, res) {
                        _backbone2.default.trigger('error', 'http', res.responseJSON.error);
                    },
                    success: function success(model, res) {
                        if (_this2.$('#new-submission-file').val()) uploadFile(_this2.$('#new-submission-file'), model, function () {
                            _this2.clear();
                            _this2.unfocus();
                        });else {
                            _this2.clear();
                            _this2.unfocus();
                        }
                    }
                });
            }
        }, {
            key: 'onFileInputChanged',
            value: function onFileInputChanged() {
                var filename = _underscore2.default.last(this.$('#new-submission-file').val().split("\\"));
                $('#attach-text').html('Image: ' + filename);
                $('#attach-text').removeClass('hidden');
                this.focus();
            }
        }, {
            key: 'template',
            get: function get() {
                return _underscore2.default.template(_submission_input_tmpl2.default);
            }
        }, {
            key: 'className',
            get: function get() {
                return 'submission-input';
            }
        }, {
            key: 'templateHelpers',
            get: function get() {
                return {
                    tags: _config2.default.tags
                };
            }
        }]);

        return SubmissionInputView;
    }(_marionette2.default.ItemView);

    exports.default = SubmissionInputView;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92aWV3cy9zdWJtaXNzaW9uX2lucHV0X3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBbUJNLG1COzs7Ozs7Ozs7OztxQ0FPTztBQUNSLHVCQUFPO0FBQ0Esa0RBQStCLE9BRC9CO0FBRUEsa0RBQStCLE9BRi9CO0FBR0EscURBQWtDLE9BSGxDO0FBSUEsNkNBQTBCLFNBSjFCO0FBS0EsNENBQXlCLHFCQUx6QjtBQU1BLG1EQUFnQyxvQkFOaEM7QUFPQSwyQ0FBd0Isb0JBUHhCO0FBUUEsZ0RBQTZCLG9CQVI3QjtBQVNBLHFEQUFrQztBQVRsQyxpQkFBUDtBQVdBOzs7dUNBU1UsTyxFQUFTOztBQUVuQjs7O29DQUVPO0FBQ1AscUJBQUssR0FBTCxDQUFTLFFBQVQsQ0FBa0IsUUFBbEI7QUFDQTs7O3NDQUVTO0FBQ1Qsb0JBQUksQ0FBQyxLQUFLLENBQUwsQ0FBTyxzQkFBUCxFQUErQixHQUEvQixFQUFELElBQXlDLENBQUMsS0FBSyxDQUFMLENBQU8sd0JBQVAsRUFBaUMsR0FBakMsRUFBMUMsSUFBb0YsQ0FBQyxLQUFLLENBQUwsQ0FBTyxzQkFBUCxFQUErQixHQUEvQixFQUF6RixFQUNDLEtBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsUUFBckI7QUFDRDs7O29DQUVPO0FBQ0oscUJBQUssQ0FBTCxDQUFPLHNCQUFQLEVBQStCLEdBQS9CLENBQW1DLEVBQW5DO0FBQ0EscUJBQUssQ0FBTCxDQUFPLHdCQUFQLEVBQWlDLEdBQWpDLENBQXFDLEVBQXJDO0FBQ0EscUJBQUssQ0FBTCxDQUFPLHNCQUFQLEVBQStCLEdBQS9CLENBQW1DLEVBQW5DO0FBQ0Esa0JBQUUsY0FBRixFQUFrQixRQUFsQixDQUEyQixRQUEzQjtBQUNBLGtCQUFFLDJDQUFGLEVBQStDLElBQS9DLENBQW9E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dGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qXG4qIEBBdXRob3I6IEx1dHogUmVpdGVyLCBEZXNpZ24gUmVzZWFyY2ggTGFiLCBVbml2ZXJzaXTDpHQgZGVyIEvDvG5zdGUgQmVybGluXG4qIEBEYXRlOiAgIDIwMTYtMDUtMDQgMTE6Mzg6NDFcbiogQExhc3QgTW9kaWZpZWQgYnk6ICAgbHV0emVyXG4qIEBMYXN0IE1vZGlmaWVkIHRpbWU6IDIwMTYtMDUtMzAgMTQ6NDY6MTdcbiovXG5cbmltcG9ydCAnanF1ZXJ5JztcbmltcG9ydCAnaWZyYW1lVHJhbnNwb3J0JztcbmltcG9ydCBNYXJpb25ldHRlIGZyb20gJ21hcmlvbmV0dGUnXG5pbXBvcnQgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IF8gZnJvbSAndW5kZXJzY29yZSdcbmltcG9ydCBTdWJtaXNzaW9uTW9kZWwgZnJvbSAnbW9kZWxzL3N1Ym1pc3Npb25fbW9kZWwnO1xuaW1wb3J0IENvbmZpZyBmcm9tICdjb25maWcnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAndGV4dCF0ZW1wbGF0ZXMvc3VibWlzc2lvbl9pbnB1dF90bXBsLmh0bWwnO1xuXG5jbGFzcyBTdWJtaXNzaW9uSW5wdXRWaWV3IGV4dGVuZHMgTWFyaW9uZXR0ZS5JdGVtVmlldyB7XG5cblx0LyogcHJvcGVydGllcyAqL1xuICAgXHRnZXQgdGVtcGxhdGUoKSB7IHJldHVybiBfLnRlbXBsYXRlKHRlbXBsYXRlKSB9XG5cbiAgICBnZXQgY2xhc3NOYW1lKCkgeyByZXR1cm4gJ3N1Ym1pc3Npb24taW5wdXQnIH1cblxuICAgIGV2ZW50cygpIHtcbiAgICBcdHJldHVybiB7XG4gICAgICAgICAgICAnZm9jdXMgI25ldy1zdWJtaXNzaW9uLXRleHQnIDogJ2ZvY3VzJyxcbiAgICAgICAgICAgICdjbGljayAjbmV3LXN1Ym1pc3Npb24tdGV4dCcgOiAnZm9jdXMnLFxuICAgICAgICAgICAgJ2tleXByZXNzICNuZXctc3VibWlzc2lvbi10ZXh0JyA6ICdmb2N1cycsXG4gICAgICAgICAgICAnbW91c2VsZWF2ZSAuaW5wdXQtYm94JyA6ICd1bmZvY3VzJyxcbiAgICAgICAgICAgICdjbGljayAjc3VibWl0LWJ1dHRvbicgOiAnb25TdWJtaXRCdXR0b25DbGljaycsXG4gICAgICAgICAgICAnY2hhbmdlICNuZXctc3VibWlzc2lvbi1maWxlJyA6ICdvbkZpbGVJbnB1dENoYW5nZWQnLFxuICAgICAgICAgICAgJ2NsaWNrICN0YWctZHJvcGRvd24nIDogJ29uVGFnRHJvcGRvd25DbGljaycsXG4gICAgICAgICAgICAnY2xpY2sgLnRhZy1kcm9wZG93bi1saXN0JyA6ICdwcmV2ZW50UHJvcGFnYXRpb24nLFxuICAgICAgICAgICAgJ21vdXNlbGVhdmUgLnRhZy1kcm9wZG93bi1saXN0JyA6ICdvbkxlYXZlRHJvcGRvd24nXG4gICAgXHR9XG4gICAgfVxuXG4gICAgZ2V0IHRlbXBsYXRlSGVscGVycygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRhZ3MgOiBDb25maWcudGFnc1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogbWV0aG9kcyAqL1xuICAgIGluaXRpYWxpemUob3B0aW9ucykge1xuICAgICAgICAvL2NvbnNvbGUubG9nKG9wdGlvbnMpXG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgXHR0aGlzLiRlbC5hZGRDbGFzcygnZXhwYW5kJyk7XG4gICAgfVxuXG4gICAgdW5mb2N1cygpIHtcbiAgICBcdGlmICghdGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tdGV4dCcpLnZhbCgpICYmICF0aGlzLiQoJyNuZXctc3VibWlzc2lvbi1hdXRob3InKS52YWwoKSAmJiAhdGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tZmlsZScpLnZhbCgpKVxuICAgIFx0XHR0aGlzLiRlbC5yZW1vdmVDbGFzcygnZXhwYW5kJyk7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLXRleHQnKS52YWwoJycpO1xuICAgICAgICB0aGlzLiQoJyNuZXctc3VibWlzc2lvbi1hdXRob3InKS52YWwoJycpO1xuICAgICAgICB0aGlzLiQoJyNuZXctc3VibWlzc2lvbi1maWxlJykudmFsKCcnKTtcbiAgICAgICAgJCgnI2F0dGFjaC10ZXh0JykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAkKCdpbnB1dFtuYW1lPVwibmV3LXN1Ym1pc3Npb24tdGFnc1wiXTpjaGVja2VkJykuYXR0cignY2hlY2tlZCcsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBvblRhZ0Ryb3Bkb3duQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuJCgnLnRhZy1kcm9wZG93bi1saXN0JykudG9nZ2xlQ2xhc3MoJ2V4cGFuZCcpO1xuICAgIH1cblxuICAgIG9uTGVhdmVEcm9wZG93bigpIHtcbiAgICAgICAgdGhpcy4kKCcudGFnLWRyb3Bkb3duLWxpc3QnKS5yZW1vdmVDbGFzcygnZXhwYW5kJyk7XG4gICAgfVxuXG4gICAgcHJldmVudFByb3BhZ2F0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIG9uU3VibWl0QnV0dG9uQ2xpY2soKSB7XG5cbiAgICAgICAgLy8gdXBsb2FkIGZpbGVcbiAgICAgICAgdmFyIHVwbG9hZEZpbGUgPSBmdW5jdGlvbihmaWxlLCBtb2RlbCxjYWxsYmFjaykge1xuXG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIHVybDogQ29uZmlnLndlYl9zZXJ2aWNlX3VybCsnZmlsZS9hdHRhY2gvJyttb2RlbC5nZXQoJ19pZCcpLFxuICAgICAgICAgICAgICAgIGlmcmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBmaWxlczogZmlsZSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGVycm9yOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIEJhY2tib25lLnRyaWdnZXIoJ2Vycm9yJywnaHR0cCcscmVzLnJlc3BvbnNlSlNPTi5lcnJvcik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLmhhcyhyZXMsJ2Vycm9yJykpXG4gICAgICAgICAgICAgICAgICAgICAgICBCYWNrYm9uZS50cmlnZ2VyKCdlcnJvcicsJ2h0dHAnLHJlcy5lcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRhZ3MgPSBfLm1hcCgkKCdpbnB1dFtuYW1lPVwibmV3LXN1Ym1pc3Npb24tdGFnc1wiXTpjaGVja2VkJyksIChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC52YWx1ZTtcbiAgICAgICAgfSk7XG5cbiAgICBcdHZhciBzdWJtaXNzaW9uID0gbmV3IFN1Ym1pc3Npb25Nb2RlbCh7XG4gICAgXHRcdHRleHQgOiB0aGlzLiQoJyNuZXctc3VibWlzc2lvbi10ZXh0JykudmFsKCksXG4gICAgXHRcdGF1dGhvciA6IHRoaXMuJCgnI25ldy1zdWJtaXNzaW9uLWF1dGhvcicpLnZhbCgpLFxuICAgICAgICAgICAgdGFnczogdGFnc1xuICAgIFx0fSlcbiAgICBcdHN1Ym1pc3Npb24uc2F2ZShudWxsLHtcbiAgICAgICAgICAgIGVycm9yOiAobW9kZWwscmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgQmFja2JvbmUudHJpZ2dlcignZXJyb3InLCdodHRwJyxyZXMucmVzcG9uc2VKU09OLmVycm9yKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiAobW9kZWwsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLiQoJyNuZXctc3VibWlzc2lvbi1maWxlJykudmFsKCkpXG4gICAgICAgICAgICAgICAgICAgIHVwbG9hZEZpbGUodGhpcy4kKCcjbmV3LXN1Ym1pc3Npb24tZmlsZScpLG1vZGVsLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkZpbGVJbnB1dENoYW5nZWQoKSB7XG4gICAgICAgIHZhciBmaWxlbmFtZSA9IF8ubGFzdCh0aGlzLiQoJyNuZXctc3VibWlzc2lvbi1maWxlJykudmFsKCkuc3BsaXQoXCJcXFxcXCIpKTtcbiAgICAgICAgJCgnI2F0dGFjaC10ZXh0JykuaHRtbCgnSW1hZ2U6ICcrZmlsZW5hbWUpO1xuICAgICAgICAkKCcjYXR0YWNoLXRleHQnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICB9XG4gICAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN1Ym1pc3Npb25JbnB1dFZpZXciXX0=