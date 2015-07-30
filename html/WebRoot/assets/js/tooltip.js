/**
* $.tabs
* @extends jquery.1.9.2
* @fileOverview 娑堟伅鎻愮ず鎻掍欢
* @author glen.luo
* @site wwww.tt1.com.cn
* @version 0.1
* @date 2014-08-24
* @example
* $('.has_tooltip').ToolTip();
*/
;(function ($) {
    $.fn.ToolTip = function () {
        $(document).on('blur', '.tooltip', function(){
           $(this).hide();
        });

        $(document).on('mouseenter', '.tooltip', function(){
            $(this).unbind('blur');
        });

        $(document).on('mouseleave', '.tooltip', function(){
           $(this)
           .blur(function(){
                $(this).hide();
           })
           .hide();
        });

        return this.each(function () {
            var _self = $(this);
            _self.mouseenter(function(){
                if (_self.siblings('.tooltip').length > 0) {
                    $('.tooltip').hide()
                    _self.siblings('.tooltip').show();
                    _self.siblings('.tooltip').focus();
                }
            });
        });
    };
})(jQuery);