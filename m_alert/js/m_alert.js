;(function($){
    $.fn.mAlert = function(options){
        // 设置如果没有穿任何参数，参数为空对象，防止报错
        if(options == null || options == undefined){
            options = {}
        };
        // 设置默认样式（如果有其他需要设置的属性，可以自行在css中调整）
        var defaults = {
            // 弹出框隐藏状态下的top值
            "hideTop": "20px",
            // 弹出框显示状态下的top值（弹出框是由上到下滑入的，这是通过css3的transition属性设置的，所以不兼容css3 transition属性的浏览器不能使用本插件）
            "showTop": "40px",
            // 弹出框在1920宽度下的默认left值
            "showLeft": "810px",
            // 弹出框的覆盖层级
            "zIndex": "100",
            // 执行transition动画的时间
            "times": "0.5s",
            // 自动关闭窗口的定时时间
            "closeTimes": "2000"
        };
        // 获取提示框的当前宽度（因为css里面只给限定了最大和最小宽度所以宽度是由文字长度决定的）
        var realityWidth = $(".m_alert").width();
        // 获取当前浏览器窗口宽度
        var nowScreenWidth = $(window).width();
        // 加上css中的padding计算当前提示框的实际宽度
        realityWidth = (realityWidth + 46 + 20);
        console.log(realityWidth + "------" + nowScreenWidth);
        // 计算提示框的left值
        var setLeft = ((nowScreenWidth - realityWidth) / 2);
        // 设置常规的css3动画和提示框保持居中的对象
        var constObj = {
            "opacity": 0,
            "transition": "top " + (options.times ? options.times : defaults.times) + ",opacity " + (options.times ? options.times : defaults.times),
            "showLeft": setLeft + "px"
        };
        // 整合参数 {}是保护默认参数 defaults是默认参数 options是传进来的参数 constObj是设置的常规参数
        var settings = $.extend({}, defaults, options, constObj);
        
        // 判断需要提示框的样式状态
        if(options.theme){
            console.log(settings);
            var nowTheme = options.theme;
            switch(nowTheme){
                case "success":
                    var nowThemeBgcolor = {
                        "background":"#ACE37E"
                    }
                    settings = $.extend(settings,nowThemeBgcolor);
                    break;
                case "warning":
                    var nowThemeBgcolor = {
                        "background":"#FB9673"
                    }
                    settings = $.extend(settings,nowThemeBgcolor);
                    break;
                case "error":
                    var nowThemeBgcolor = {
                        "background":"#F45F5F"
                    }
                    settings = $.extend(settings,nowThemeBgcolor);
                    break;
                case "hint":
                    var nowThemeBgcolor = {
                        // "background":"#12B7F5"
                        "background":"#CBEAFB"
                    }
                    settings = $.extend(settings,nowThemeBgcolor);
                    break;
            }
        }
        // 给选中元素绑定事件
        this.unbind().on('click',function(){
            $(".m_alert").css({
                "transition": settings.transition,
                "top": settings.showTop,
                "opacity": 1,
                "background": settings.background
            }).children("p").text(settings.content);
            var mAlertTiming = setTimeout(function() {
                $(".m_alert").css({
                    "transition": settings.transition,
                    "top": settings.hideTop,
                    "opacity": 0
                })
            }, settings.closeTimes);
            $("#closeBtn").unbind().on('click', function() {
                clearTimeout(mAlertTiming);
                $(".m_alert").css({
                    "transition": settings.transition,
                    "top": settings.hideTop,
                    "opacity": 0
                })
            })
        })
        return $(".m_alert").css({
            "top": settings.hideTop,
            "left": settings.showLeft,
            // "opacity": settings.opacity,
            "transition": settings.transition,
            "z-index": settings.zIndex
        })
    }
})(jQuery);