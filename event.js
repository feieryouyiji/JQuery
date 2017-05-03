/**
 * Created by 冯飞林 on 2017/4/30.
 */


$.fn.extend({

    /**
     *  原生JS事件绑定方式
     *  1. DOM.on+click = function(){}  //无兼容性
     *  2. DOM.addEventListener(click,function(){})  //ie8以下不行
     *     DOM.removeEventListener()  //解绑事件
     *
     *  3. DOM.attachEvent(on+'click',function(){}) ie8以下使用
     *     DOM.detachEvent()    //解绑事件
     *
     * --------------------------------------------------------
     *
     *  JQ绑定事件
     *  on();
     *  解绑事件
     *  off()
     *
     *
     */
    _on: function (type,fn) {
        this.each(function () {
            $.addEvent(this,type,fn);
        })
        return this;
    },

    _off: function (type,fn) {
        this.each(function () {
            $.removeEvent(this,type,fn);
        })
        return this;
    },

    //以上绑定ie的问题
    /**
     * 1.  执行顺序问题(后面的会先执行)
     * 2.  this的指向问题
     */

    on: function (type,fn) {
        this.each(function () {
            var self = this;
            this.$_event_cache = this.$_event_cache || {};
            if( ! this.$_event_cache[type] ){

                //对象中没有该事件,事件执行函数
                this.$_event_cache[type] = [];
                this.$_event_cache[type].push(fn);


                //给每一个元素绑定事件
                $.addEvent(self,type,function (e) {

                            //这个this 指向每一个DOM元素?



                })
            }
            else{
                this.$_event_cache[type].push(fn);
            }

        })
        return this;
    },

    off: function (type,fn) {
        if (arguments.length == 0){
            this.each(function () {
                if( !this.$_event_cache){
                    return;
                }
                else{
                    for( k in this.$_event_cache){
                        this.$_event_cache[k] =[];
                    };
                }
            })

        }
        if (arguments.length == 1){
            this.each(function () {
                this.$_event_cache[type] = [];
            })
        }
        if (arguments.length == 2){
            this.each(function () {
                var index = this.$_event_cache[type].indexOf(fn);
                this.$_event_cache[type].splice(index,1);
            })
        }
        return this;
    },

})