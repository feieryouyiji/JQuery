/**
 * Created by 冯飞林 on 2017/4/29.
 */


$.fn.extend({
    /**
     *  属性和样式方法
     *  1.addClass: 给所有元素添加新的class
     *  2.removeClass 删除所有元素的class
     *  3.hasClass 判断元素是否有class
     *  4.toggleClass 有则删除,无则添加
     *  5.attr 设置或者 获取元素的属性节点值.
     *  6.prop 设置或者 获取元素的属性值
     *  7.val 获取或者设置元素 value属性值
     *
     *
     *
     */

    //attr  设置或者 获取元素的属性节点值.
    attr: function (attr,value) {
        if(!$.isString(attr) && ! $.isObject(attr)){
            return this;
        }
        if($.isString(attr)){

            //如果参数为1个,获取值
            if(arguments.length==1){
                return this.get(0).getAttribute(attr);
            }
            //参数多个设置值
            else{
                this.each(function () {
                    this.setAttribute(attr,value);
                })
            }
            return this;
        }
        else{
            for(var k in attr){
                this.each(function () {
                    this.setAttribute(k,attr[k]);
                })
            }
            return this;
        }
    },

    //prop  设置属性值
    prop: function(prop,value){
        if(!$.isString(prop) && !$.isObject(prop)){
            return this;
        }

        if($.isString(prop)){
            //如果是字符串,参数长度为1 获取属性值
            if(arguments.length==1){
                return this[0].prop;
            }
            //如果是字符串,参数长度大于1 设置属性值
            else{
                this.each(function () {
                    this.prop = value;
                })
                return this;
            }
        }

        //将对象的所有属性放在$对象上
        if($.isObject(prop)){
            for(k in prop){
                this.each(function () {
                    this[k]=prop[k];
                })
            }
            return this;
        }

    },

    //css 获取样式
    css: function (styleName,value) {
        if(arguments.length == 1){

            //string
            if($.isString(styleName)){
                return $.getStyle(this[0],styleName);
            }

            //object
            if($.isObject(styleName)){
                for(var k in styleName){
                    this.each(function () {
                        this.style[k] = styleName[k];
                    })
                }
                return this;
            }
        }
        else{
            this.each(function () {
                this['style'][styleName]= value;
                console.log('hi');
            });
            return this;
        }
    },


    //val: 获取或者设置元素 value属性值

    val:function (value) {
        if(arguments.length == 0){
            return this[0].value;
        }
        else{
            this.each(function () {
                this.value = value;
            })
        }
        return this;
    },


    
    
    //hasClass 判断元素是否有class
    hasClass: function (cl) {
        var hasClass = false;
        this.each(function () {

            if((" "+(this.className)+" ").indexOf(" "+cl+" ") > -1){
                hasClass = true;
                return false;   //中断遍历
            }
        });

        return hasClass;
    },

    //1.addClass: 给所有元素添加新的class

    addClass: function (className) {
        this.each(function () {
            if( !$(this).hasClass(className)){
                this.className+=' '+className;
            }
        });

        return this;
    },

    /**
     * 1. 将className字符串先去掉首位的空格
     * 2. 再split成一个数组
     * 3. 遍历每个jq对象,把split这个数组中的每一个string 在jq对象中比较
     * 4. 无则添加,有则不管....
     * @param className
     * @private
     */
    _addClass:function (className) {

        var className = className.trim();
        var classNameArr = className.split(" ");
        this.each(function () {
            var self = this;
            classNameArr.forEach(function (value,index) {
                var $self = $(self);
                if( ! $self.hasClass(value)){
                    $self.addClass(value);
                }
            })
        })
        return this;

    },

    //2.removeClass 删除所有元素的class
    removeClass: function (className) {
        if(arguments.length==0){
            this.each(function () {
                this.className ="";
            })
        }
        else{
            this.each(function () {
                this.className=(' '+this.className+' ').replace(" "+className+" "," ");
            })
        }
        return this;
    },

    _removeClass: function (className) {
        var className = className.trim();
        var classNameArr = className.split(" ");
        this.each(function () {
            var self = this;
            var $self = $(self);
            classNameArr.forEach(function (value,index) {

                if($self.hasClass(value)){
                    $self.removeClass(value);
                }
            })
        });
        return this;
    },

    // 4.toggleClass 有则删除,无则添加
    toggleClass: function (className) {
        this.each(function () {

            //有则删除
            var $this = $(this);
            if($this.hasClass(className)){
                $this.removeClass(className);
            }
            //无则添加
            else{
                $this.addClass(className);
            }
        });
        return this;
    },

    _toggleClass:function (className) {
        var className = className.trim();
        var classNameArr = className.split(" ");
        this.each(function () {     //jq对象
            var self = this;        //单个dom对象
            var $self = $(self);
            classNameArr.forEach(function (value,index) {

                if($self.hasClass(value)){
                    $self.removeClass(value);
                }
                else{
                    $self.addClass(value);
                }
            })

        })

        return this;
    }



})