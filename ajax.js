/**
 * Created by 冯飞林 on 2017/5/1.
 */


$.extend({

    /**
     *  1: 默认给静态绑定一个ajax设置 参数的对象
     *  2: 再将
     *
     */



    //1: 默认给静态绑定一个ajax设置 参数的对象

    ajaxSettings:{
        url: location.href,    // 默认的url为本地地址
        type: "GET",           // 默认请求的方法为GET
        async: true,           // 默认为异步请求
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",   // POST发送数据时设置头信息时候要使用
        timeout: null,         // 默认不看延迟事件
        dataType: 'JSON',       //默认传json类型数据
        success: function(){},
        error: function(){},
        complete: function(){},

    },

    //将传入的数据对象以url后的字符串形式返回
    urlStringify: function (data) {
        var result = "";
        if (! $.isObject(data)){
            return result;
        }
        else{
            for(var k in data){
                result += window.encodeURIComponent(k)+'='+window.encodeURIComponent(data[k])+ '&';
            }
            return result.slice(0,-1);
        }
    },
    processOptions: function (options) {
        var optionsNew = {};

        //把默认的对象的属性帮到新的对象上,再把手动添加的属性覆盖掉默认的
        $.extend(optionsNew,$.ajaxSettings,options);

        //对data数据进行处理成url 后的字符串
        optionsNew.data = $.urlStringify(optionsNew.data);

        //将类型转变成大写...
        optionsNew.type = optionsNew.type.toUpperCase();


        //如果是get请求,将数据加到url后
        if(optionsNew.type =='get'){
            optionsNew.url +='?'+ optionsNew.data;

            //再将数据变成空
            optionsNew.data = null ;
        }

        return optionsNew;

    },

    ajax: function (options) {

        // 处理传过来的数据
        var optionsNew = $.processOptions(options);

        var xhr = new XMLHttpRequest();

        //接收处理过的返回数据
        var result = "" ;

        //配置请求
        xhr.open(optionsNew.type,optionsNew.url,optionsNew.async);

        xhr.onreadystatechange = function () {

            //判断请求是否完成
            if(xhr.readyState == 4){

                //请求完成关闭 定时器;
                clearTimeout(timer);
                optionsNew.complete();

                //判断数据接收是否成功
                if((xhr.status >=200 && xhr.status <=300) || xhr.status == 304){

                    //根据dataType类型将返回的字符串进行处理
                    switch (optionsNew.dataType){
                        case 'JSON':
                            result = JSON.parse(xhr.responseText);
                            break;
                        case 'script':
                            //执行脚本
                            eval(xhr.responseText);
                            result = xhr.responseText;
                            break;
                        case 'style':
                            //渲染style
                            $('<style></style>').html(xhr.responseText).appendTo('head');
                            result = xhr.responseText;
                            break;
                        default:
                            result = xhr.responseText;
                            break;
                    }
                    optionsNew.success( result );
                }
                else {
                    optionsNew.error ()
                }
            }

        }

        //如果为post,添加一个请求头
        if(optionsNew.type === 'post'){
            xhr.setRequestHeader('content-type',optionsNew.contentType);
        };


        //发送请求
        xhr.send(optionsNew.data);

        //是否开启了请求时间
        if(optionsNew.timeout){


            // 在指定的时间内，请求还没有完成，
            // 那么直接调用error方法报错
            var timer =setTimeout(function () {

                optionsNew.error("请求超时");

                xhr.onreadystatechange = null;
            },optionsNew.timeout)

        }
    },

    //简写的get请求
    get: function (url, data, fn ) {
        // 如果传入两个参数，默认为第二个参数为回调
        fn = fn || data || function(){};
        jQuery.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: fn
        });
    },

    // 加载js脚本
    getScript: function( url, data, fn ) {
        // 如果传入两个参数，默认为第二个参数为回调
        fn = fn || data || function(){};
        jQuery.ajax({
            dataType: 'script',
            url: url,
            data: data,
            success: fn
        });
    },

    // 加载样式
    getCss: function( url, data, fn ) {
        // 如果传入两个参数，默认为第二个参数为回调
        fn = fn || data || function(){};
        jQuery.ajax({
            dataType: 'style',
            url: url,
            data: data,
            success: fn
        });
    }




})