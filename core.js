/**
 * Created by 冯飞林 on 2017/4/28.
 */



(function (w) {
    function jQuery(selector) {
        return new init(selector);
    }

    var version = 1
    //原型
    jQuery.fn = jQuery.prototype = {

        /*
         * jQ原型上的核心方法和属性：
         * 1、jquery 获取版本号
         * 2、selector 代表所有实例默认的选择器，也代表实例是一个jQuery类型的对象
         * 3、length 代表所有实例默认的长度
         * 4、toArray 把实例转换为数组返回
         * 5、get 获取指定下标的元素，获取的是原生DOM
         * 6、each 遍历实例，把遍历到的数据分别传给回调使用
         * 7、map 遍历实例，把遍历到的数据分别传给回调使用，然后把回调的返回值收集起来组成一个数组返回
         * 8、slice 截取实例的部分元素，构成一个新的jQuery实例返回。
         * 9、first 获取实例中的第一个元素，是jQuery类型的实例对象。
         * 10、last 获取实例中的最后一个元素，是jQuery类型的实例对象。
         * 11、eq 获取指定下标的元素，获取的是jQuery类型的实例对象。
         * 12、push 给实例添加新元素
         * 13、sort 对实例中的元素进行排序
         * 14、splice 按照指定下标指定数量删除元素，也可以替换删除的元素。
         * */

        constructor: jQuery,

        //jquery 获取版本号
        jQuery: version,

        //代表所有实例默认的选择器，也代表实例是一个jQuery类型的对象
        selector:"",

        //代表所有实例默认的长度
        length: 0,

        //toArray 把实例转换为数组返回
        toArray:function () {
            return [].slice.call(this);
        },

        //获取指定下标的元素，获取的是原生DOM
        get:function (i) {
            /**如果获取的 null 或者undefined 转换为数组返回
             * 如果获取的是正数,将下标元素返回
             * 如果获取的事负数,返回(this.length-负数)的元素
             */
            if( i == null){
                return this.toArray();
            }
            if(i>=0){
                return this[i];
            }
            else{
                return this[this.length+i];
            }
        },

        //each 遍历实例，把遍历到的数据分别传给回调使用
        each:function (fn) {
            return $.each(this,fn);
        },

        //map 遍历实例，把遍历到的数据分别传给回调使用，然后把回调的返回值收集起来组成一个数组返回
        map:function (fn) {
            return $.map(this,fn);
        },

        //slice 截取实例的部分元素，构成一个新的jQuery实例返回。
        slice:function () {
            /**
             * 通过数组的slice截取实例 获取DOM数组,再将slice的数组转成实例
             *
             */
            arr = [].slice.apply(this,arguements);
            return jQuery(arr);

        },

        //first 获取实例中的第一个元素，是jQuery类型的实例对象。
        first:function () {
            return jQuery(this[1]);
        },

        //last 获取实例中的最后一个元素，是jQuery类型的实例对象。
        last: function () {
            return this.eq(-1);
        },

        //eq 获取指定下标的元素，获取的是jQuery类型的实例对象。
        eq: function (i) {
            if( i == null){
                return jQuery();
            }
            if(i>=0){
                return jQuery(this[i]);
            }
            else{
                return jQuery(this[this.length+i]) ;
            }
        },

        //给实例添加新元素
        push: [].push,

        //sort 对实例中的元素进行排序
        sort: [].sort,


        //splice 按照指定下标指定数量删除元素，也可以替换删除的元素。
        splice: [].splice


    }



    //构造函数  ...真正的构造函数   //init是为了实例找出他真正的构造函数
    var init = jQuery.fn.init = function (selector) {

        // null undefined '' 0 false ..
        if(!selector){
            return this;
        }

        //function

        else if(jQuery.isFunction(selector)){
            //打包給ready 靜態方法
            jQuery.ready(selector);
        }

        //string
        else if( typeof selector === "string" ){
            //为了用户友好体验,先去掉空白
            selector = jQuery.trim(selector);

            //html
            if(jQuery.isHTML(selector)){

                //利用临时的div 创建DOM,将创建好的DOM push给实例.
                var tempDiv = document.createElement('div');
                tempDiv.innerHTML = selector;
                [].push.apply(this,[].slice.call(tempDiv.childNodes));
            }
            //选择器
            else{

                try{
                    var nodes = document.querySelectorAll(selector);
                    [].push.apply(this,[].slice.call(nodes));
                }
                catch(e){
                    //如果报错了,那么手动补一个length = 0 ; 属性,代表没有获取到任何元素
                    this.length = 0;
                }
            }

        }

        // Array || Pseudo Array
        else if(jQuery.isLikeArray(selector)){
            [].push.apply(this,[].slice.call(selector));
        }
        else{
            this[0]=selector;
            this.length = 1;
        }

    }


    //给jQuery绑定法 实现混入绑定方法
    jQuery.extend = jQuery.fn.extend = function () {

        var target = this;
        //传一个参数谁调用,给谁添加属性方法

        if(arguments.length == 1){
            for(var k in arguments[0]){
                this[k] = arguments[0][k];
            }
        }
        else if(arguments.length >=2){

            target = arguments[0];
            //遍历每一个对象
            for(var i=1,lens= arguments.length;i<lens;i++){
                //遍历每一个对象的属性
                for(var k in arguments[i]){

                    //将每一个属性绑定到第一个对象中
                    target[k] = arguments[i][k]
                }

            }
        }
        //给谁混入,返回谁
        return target;

    }

    //绑定静态方法

    jQuery.extend({

        //ready: 加載事件
        ready:function (fn) {
            if(document.readystate ==='complete'){
                fn();
            }
            else if(document.addEventListener){
                document.addEventListener('DOMContentLoaded',fn);
            }
            else{
                document.attachEvent('onreadystatechange',function () {
                    if(document.readystate==='complete'){
                        fn();
                    }
                })
            }

        },


        //将字符串两端空白截取掉
        trim :function (str) {
            // null undefined '' 0 false ..
            if(!str){
                return this;
            }else{
                if(str.trim){
                    return str.trim();
                }else{
                    return str.replace(/^\s+|\s+$/g,'');
                }
            }
        },
        //判断是否是字符串
        isString:function (str) {
            if(!str){
                return false

            }
            if(typeof str==='string'){
                return true;
            }
            else{
                return false;
            }
        },


        //判断是否是html标签
        isHTML: function (html) {
            //判断是否为空
            if(!html){
                return false;
            }
            if(html.charAt(0) === "<" &&
                html.charAt(html.length-1) === ">" &&
                html.length >=3
            ){
                return true;
            }
            return false;
        },

        //判断是否是函数
        isFunction :function (fn) {
            return (typeof fn=='function')
        },

        //判断是否是window
        isWindow:function (w) {
            if(!w){
                return false;
            }
            if(w.window == window){
                return true;
            }
            return false;
        },

        //判断是否是对象
        isObject:function (obj) {
            if(obj == null){
                return false;
            }
            if(typeof obj =='object' || typeof obj =='function' ){
                return true;
            }
            return false;

        },

        //判断是不是真数组或者伪数组 Pseudo Array
        isLikeArray:function (arr) {
            if($.isFunction(arr) || $.isWindow(arr) ||  !$.isObject){
                return false ;
            }
            //判断是否真数组
            if(({}).toString.call(arr) ==='[object Array]'){
                return true;
            }
            //判断是否伪数组
            if( 'length' in arr && (arr.length ==0 || (arr.length-1) in arr)){
                return true;
            }
            return false;
        },

        //each 方法
        each: function (obj,fn) {
            var i, k;
            if ($.isLikeArray(obj)){

                for(i=0;i<obj.length;i++){

                    //指定fn调用时的this指向
                    if(fn.call(obj[i],i,obj[i]) == false){
                        break;
                    }
                }
            }
            else{
                for(k in obj){
                    if(fn.call(obj[k],k,obj[k]) == false) {
                        break;
                    }
                }
            }
            return obj;
        },

        //map 方法
        map: function (obj,fn) {
            var i, k , result = [];
            if ($.isLikeArray(obj)){

                for(i=0;i<obj.length;i++){

                    //指定fn调用时的this指向
                    result.push(fn.call(obj[i],i,obj[i])) ;
                }
            }
            else{
                for(k in obj){

                    result.push(fn.call(obj[k],k,obj[k]));


                }
            }
            return result;
        },

        // 获取样式
        getStyle: function (dom,style) {

            if(window.getComputedStyle){
                return window.getComputedStyle(dom)[style];
            }
            else{
                return dom.currentStyle(style);
            }
        },


        //事件添加兼容绑定事件
        addEvent: function(ele,type,fn){
            if( !ele.nodeType || !$.isString(type) || !$.isFunction(fn)){
                return ;
            }
            if(ele.addEventListener){
                ele.addEventListener(type,fn);
            }
            else{
                ele.attachEvent('on'+type,fn);
            }
        },

        //事件移除绑定事件
        removeEvent: function (ele,type,fn) {
            if( !ele.nodeType || !$.isString(type) || !$.isFunction(fn)){
                return ;
            }
            if(ele.removeEventListener){
                ele.removeEventListener(type,fn);
            }
            else{
                ele.detach('on'+type,fn);
            }
        }




    });
    //绑定实例方法
    jQuery.fn.extend({



    });


    //替换init原型 为工厂的原型
    init.prototype = jQuery.fn;

    w.jQuery = w.$ = jQuery;



})(window)