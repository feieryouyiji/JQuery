/**
 * Created by 冯飞林 on 2017/4/29.
 */

//给原型扩展DOM方法...
$.fn.extend({

    /**
     * DOM操作方法   //链式编程-->获取值就不用返回this, 设置值就返回this
     * empty: 清空所有元素的内容
     * remove: 删除所有元素
     * html: 设置所有元素的内容, 获取第一个元素的内容
     * text:  设置所有元素的文本内容
     * appendTo: 把所有元素添加到指定的元素后面
     * append: 给所有元素添加新内容
     * prependTo 把所有元素添加到指定元素前面
     * prepend 给所有元素添加新内容
     */


    //DOM方法
    //1.empty: 清空所有元素的内容
    empty: function () {
        this.each(function () {
            this.innerHTML = "";

        })
        return this;
    },


    //2.remove: 删除所有元素
    remove:function () {
        this.each(function () {
            this.parentNode.removeChild(this);
        })
        return this;
    },

    //3. html: 设置所有元素的内容, 获取第一个元素的内容

    html: function (html) {

        //获取第一个元素的内容
        if(arguments.length ==0){
            return this[0].innerHTML;
        }
        else{
            //设置所有元素的内容
            this.each(function () {
                this.innerHTML = html ;
            })
            return this;
        }
    },

    //4: text:  设置所有元素的文本内容
    text: function (text) {
        //没有传参,获取所有元素的文本
        if(arguments == 0){
            var result="";
            this.each(function () {
                result += this.innerText;
            })
            return result;
        }
        else{
            //传参,设置元素的文本
            this.each(function () {
                this.innerText = text ;
            })
            return this;
        }
    },

    //appendTo: 将指定的元素添加到实例中的每一个DOM中

    //简写版
    _appendTo: function (selector) {
        var result = [];
        var $selector =$(selector);
        var temp = null;
        this.each(function () {
            var self =this;
            $selector.each(function (j) {
                if(j==0){
                    temp =self;
                    this.appendChild(temp);
                    result.push(temp);
                }
                else{
                    temp = self.cloneNode(true);
                    this.appendChild(temp);
                    result.push(temp);
                }
            })
        });
        return $(result);
    },

    appendTo:function (selector) {
        /**
         * 1.定义一个数组来接收被添加的元素
         * 2.用jQuery来包装添加的selector;
         * 3. 在外层遍历所有的元素 this
         * 4. 在内层遍历所有的目标
         * 5.  遍历内层是判断是否是第一次将被添加的元素加到selector上
         */

            //存储被添加的元素
        var result = [];
        var $selector =$(selector);
        var temp = null;
        for(var i = 0;i<this.length;i++){

            for(var j=0; j<$selector.length; j++){

                if(j== 0 ){
                    temp = this[i];
                    $selector[j].appendChild(temp);
                    result.push(temp);
                }
                else{
                    temp = this[i].cloneNode(true);
                    $selector[j].appendChild(temp);
                    result.push(temp);
                }
            }


        }

        return $(result);
    },

    //prependTo 把所有元素添加到指定元素前面
    prependTo: function (selector) {
        var result = [];
        var temp = null;
        var $selector= $(selector);
        this.each(function () {
            var self = this;
            $selector.each(function (j) {
                if(j == 0){
                    temp = self;
                    this.insertBefore(temp,this.firstChild);
                    result.push(temp);
                }
                else{
                    temp = self.cloneNode(true);
                    this.insertBefore(temp,this.firstChild);
                    result.push(temp);
                }
            })


        })
        return $(result);
    },

    //append: 给所有元素添加新内容
    append: function (context) {

        var $context = $(context);
        if($.isString(context)){
            this.each(function () {
                this.innerHTML+=context;
            })
        }
        else{
            this.each(function () {
                $context.appendTo(this);
            })
        }
        return this;
    },

    //prepend 给所有元素添加新内容
    prepend: function (context) {
        var $context = $(context);
        if($.isString(context)){
            this.each(function () {
                this.innerHTML=context+this.innerHTML;
            })
        }
        else{
            $context.prependTo(this);
        }
        return this;
    }


})