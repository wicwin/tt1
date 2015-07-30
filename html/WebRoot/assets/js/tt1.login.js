/**
* $.loginFormVali
* @extends jquery.1.7.2
* @fileOverview tt1登录、注册表单验证
* @author glen.luo
* @site wwww.tt1.com.cn
* @version 0.1
* @date 2014-08-21
* @example
* $("form#register")loginFormVali();
*/

;(function($) {
    function formValidate(formObj) {
        this.formObj        = formObj;
        this.allowSubmit    = {};
        this.valiChain      = {};

        this.setup();
    }

    formValidate.prototype = {
        isSubmit: function() {
            var valied = true;
            var _id    = '';
            for (var i in this.allowSubmit) {
                if (!this.allowSubmit[i]) {
                    $('#' + i).blur();
                    _id = _id.length <= 0 ? '#' + i : _id;
                }
                valied = valied && this.allowSubmit[i];
            }

            if (_id.length > 0) {
                $(_id).focus();
            }

            return valied;
        },

        rules: {
            min: function(filed, len) {
                return len <= 0 ? false : ( (filed.val().length > 0 && filed.val().length < len) ? false : true);
            },

            max: function(filed, len) {
                return len <= 0 ? false : ( (filed.val().length > 0 && filed.val().length > len) ? false : true);
            },

            required: function(filed) {
                switch (filed.attr('type')) {
                    case 'checkbox':
                        var val = filed.prop('checked') ? 'xx' : '';
                        break;
                    default:
                        var val = filed.val();
                }

                return val.length == 0 ? false : true;
            },

            matches: function(field, elm) {
                var val1 = field.val();
                var val2 = $(elm, field.parents('form')).val();
                return val2.length == 0 ? false : (val1 != val2 ? false : true);
            },

            unique: function(field, url) {
                var data = {};
                var dtd = $.Deferred();
                data[field.attr('name')] = field.val();
                jqXHR = $.ajax({
                    url: url,
                    data: data,
                    dataType: 'json'
                })
                .done(function(result){
                    if (result.success) {
                        if (result.isExiest) {
                            dtd.reject();
                        }
                        else {
                            dtd.resolve();
                        }
                    }
                    else {
                           dtd.reject();
                    }
                });
                return dtd.promise();
            },

            existent: function(field, url) {
                var data = {};
                var dtd = $.Deferred();
                data[field.attr('name')] = field.val();
                jqXHR = $.ajax({
                    url: url,
                    data: data,
                    dataType: 'json'
                })
                .done(function(result){
                    if (result.success) {
                        if (result.isExiest) {
                            dtd.resolve();
                        }
                        else {
                            dtd.reject();
                        }
                    }
                    else {
                           dtd.reject();
                    }
                });
                return dtd.promise();
            },

            tester: function(field, pattern) {
                var val = field.val();
                if (val.length > 0) {
                    return pattern.test(val);
                }
                else {
                    return true;
                }
            }
        },

        message: {
            min: function(filed, len) {
                return filed.attr('title') + "至少包含" + len + "个字符";
            },

            max: function(filed, len) {
                return filed.attr('title') + "不能超过" + len + "个字符";
            },

            required: function(filed) {
                var msg = filed.attr('title');
                switch (filed.attr('type')) {
                    case 'checkbox':
                        msg += '必须勾选';
                        break;
                    default:
                        msg += '必须填写';
                }
                return msg;
            },

            matches: function(field, elm) {
                var _elm = $(elm, field.parents('form'))
                return field.attr('title') + "与" + _elm.attr('title') + "不相符合";
            },

            unique: function(field) {
                return field.attr('title') + '已被占用';
            },

            existent: function(field) {
                return field.attr('title') + '不存在';
            },

            tester: function(field) {
                return field.attr('title') + '格式错误';
            }
        },

        setup: function() {
            this.fields = $('input[rule]', this.formObj).get();
            for (var j = 0; j < this.fields.length; j++) {
                var _field = $(this.fields[j]);
                _field.attr('id') == undefined ? _field.attr('id', 'vali' + Math.floor(Math.random()*10000+100)) : true;
                var _id    = _field.attr('id');
                this.allowSubmit[_id] = false;
                var _ruleStr = _field.attr('rule');
                if (_ruleStr.length > 0) {
                    var _rules = _ruleStr.split('|');
                    for (var i = 0; i <_rules.length; i++) {
                        var _param = _rules[i].split(':');
                        switch (_param[0]) {
                            case 'required':
                                _param.length == 1 ? _param[1] = null : true;
                                break;
                            case 'id_card':
                                _param[0] = 'tester';
                                _param[1] = /^\d{17}(\d|X)$/i;
                                /*_param[1] = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;*/
                                break;
                            case 'alpha_dash':
                                _param[0] = 'tester';
                                _param[1] = /^[\w\d-_\.@]+$/;
                                break;
                            case 'url':
                                _param[0] = 'tester';
                                _param[1] = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
                                break;
                            case 'mobile':
                                _param[0] = 'tester';
                                _param[1] = /^1[3|4|5|7|8][0-9]\d{8}$/;
                                break;
                            default:
                                break;
                        }
                        if (_param.length >= 2 && Object.prototype.hasOwnProperty.call(this.rules, _param[0])) {
                            Object.prototype.hasOwnProperty.call(this.valiChain, _id) ? true : this.valiChain[_id] = new Array();
                            this.valiChain[_id].push({
                                hander : this.rules[_param[0]],
                                param  : _param[1],
                                rule   : _param[0]
                            });
                        }
                    }
                }
            };
        }
    };

    $.fn.loginFormVali = function (options) {
        var defaults = {
            failClass  : 'icon_wrong',
            sucClass   : 'icon_right',
            msgWarp    : ' <em class="tips1 form_tool_tip"><i class="icon_arrow_left"></i>{msg}</em>',
            submitMark : 'a#reg_submit',
            submitHandler: function(form, validator) {
                if (validator.isSubmit()) {
                    form.submit();
                }
            },
            failHandler: {},
            successHandler: {},
            defaultFailHandler: function(msg) {
                var _self = $(this),
                    msg   = arguments.length == 0 ? _self.attr('msg') : arguments[0];
                _self.siblings('i').removeClass(opts.sucClass).addClass(opts.failClass);
                _self.siblings('em.form_tool_tip').remove();
                _self.parent().append(opts.msgWarp.replace(/{msg}/, msg));
            },
            defaultSucHandler: function() {
                var _self = $(this);
                _self.siblings('i').removeClass(opts.failClass).addClass(opts.sucClass);
                _self.siblings('em.form_tool_tip').remove();
            }
        };

        var opts = $.extend({}, defaults, options);

        return this.each(function() {
            var _formObj = $(this);
            var _formVali = new formValidate(_formObj);

            $(opts.submitMark, $(this)).click(function(e){
                e.preventDefault();
                opts.submitHandler(_formObj, _formVali);
            });

            _formObj.on('keyup', 'input.inputbox', function(e){
                var code = e.which,
                    but  = $(opts.submitMark, _formObj);
                if (code == 13) {
                    e.preventDefault();
                    but.click();
                }
                else {
                    if ($(this).val().length > 0) {
                        $(this).addClass('on');
                    }
                    else {
                        $(this).removeClass('on');
                    }
                }
            });

            for (var l = 0; l < _formVali.fields.length; l++) {
                var _field = $(_formVali.fields[l]);
                _field.blur(function(e){
                    var valied = new Array(),
                        _self  = $(e.target),
                        _id    = _self.attr('id');

                    if ($.trim(_self.val()).length <= 0 ) {
                        return false;
                    }

                    $.each(_formVali.valiChain[_id], function(i, _vail){
                        _field.queue('valiChain', function(next){
                            var _valied = _vail.hander(_self, _vail.param);
                            if (typeof(_valied) == 'boolean') {
                                valied.push({
                                    rule   : _vail.rule,
                                    message: _valied ? '' : _formVali.message[_vail.rule](_self, _vail.param),
                                    valied : _valied
                                });
                                next();
                            }
                            else {
                                _valied.done(function(){
                                    valied.push({
                                        rule   : _vail.rule,
                                        message: '',
                                        valied : true
                                    });
                                })
                                .fail(function(){
                                    valied.push({
                                        rule   : _vail.rule,
                                        message: _formVali.message[_vail.rule](_self, _vail.param),
                                        valied : false
                                    });
                                })
                                .then(next, next);
                            }
                        });
                    });

                    _field.queue('valiChain', function(next){
                        var _v = true,
                            _m = null;

                        for (var i = 0, l = valied.length; i < l; i ++) {
                            _v = _v && valied[i].valied;
                            if (valied[i].valied == false) {
                                _m = valied[i].message;
                                break;
                            }
                        }

                        if (!_v) {
                            _formVali.allowSubmit[_id] = false;
                            if (opts.failHandler.hasOwnProperty(_id)) {
                                opts.failHandler[_id].apply(_self, new Array(_m));
                            }
                            else {
                                if (_m !== null) {
                                    opts.defaultFailHandler.apply(_self, new Array(_m));
                                }
                                else {
                                    opts.defaultFailHandler.apply(_self);
                                }
                            }
                        }
                        else {
                            _formVali.allowSubmit[_id] = true;

                            if (opts.successHandler.hasOwnProperty(_id)) {
                                opts.successHandler[_id].apply(_self);
                            }
                            else {
                                opts.defaultSucHandler.apply(_self);
                            }
                        }

                        next();
                    });

                    _field.dequeue('valiChain');
                });
            }
        });
    }
})(jQuery);
