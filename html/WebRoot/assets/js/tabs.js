/**
* $.tabs
* @extends jquery.1.7.2
* @fileOverview tt1tab鍒囨崲
* @author glen.luo
* @site wwww.tt1.com.cn
* @version 0.1
* @date 2014-08-26
* @example
* $('.').tabs();
*/
;(function ($) {

    // Tabs engine
    var Tabs = function (opts) {
        this.opts   = opts;
        this.boxs   = [];
    };

    Tabs.prototype = {
        init: function () {
            this.boxs = $(this.opts.planSelector).hide().get();
        },

        setTab: function (tabBut) {
            var target = $(tabBut).data('target');
            $(tabBut).addClass(this.opts.tabActive).siblings().removeClass(this.opts.tabActive);

            for (var i = 0, l = this.boxs.length; i < l; i++) {
                var _box = $(this.boxs[i]);
                if (target.replace(/#/, '') == _box.attr('id')) {
                    $(this.boxs[i]).show();
                }
                else {
                    $(this.boxs[i]).hide();
                }
            }

            if (typeof this.opts.onChange === "function") {
                this.opts.onChange({
                    tab: target,
                    btn: tabBut
                });
            }
        }
    };

    $.fn.tabs = function (options) {
        var opts = $.extend({}, {
            onChange: null,               //tab鍒囨崲鍚庣殑鍥炶皟鍑芥暟
            tabButSelector: 'a',          //tab鍒囨崲鎸夐挳閫夋嫨鍣�
            tabActive: 'on',              //tab閫変腑鏃剁殑鏍峰紡
            planSelector: '.box',         //tab鍐呭
            selected: 0
        }, options);

        return this.each(function () {
            var $container  = $(this),
                tabs        = new Tabs(opts);

            tabs.init();

            $container.on('click.tabs', opts.tabButSelector, function(e){
                e.preventDefault();
                tabs.setTab(this);
            });

            tabs.setTab($container.find(opts.tabButSelector).get(opts.selected));
        });
    };

})(jQuery);