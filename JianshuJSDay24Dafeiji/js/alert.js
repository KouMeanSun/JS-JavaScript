/*
 *自定义弹窗
 */
//自执行函数 形成封闭的作用域 避免全局污染
//传入windwo和document对象  相当于将window和document作为了作用域中的局部变量，
//就不需要内部函数沿着作用域链再查找到最顶层的window 提高运行效率。
(function (window, document) {
    //定义一个构造函数Msg 作为弹窗实例的构造函数。
    let Msg = function (options) {
        //执行初始化操作
        this._init(options);
    }

    //定义初始化方法 并对方法传递的参数进行初始化
    Msg.prototype = {
        _init({
                  content = "", //文本内容
                  type = "info", //信息类型
                  useHTML = false, //是否解析html字符串
                  showIcon = true, //是否展示弹窗图标
                  confirm = null, //确认后得回调
                  cancle = null, //取消后得回调
                  footer = true, //是否显示底部的确认按钮
                  header = true, //是否显示头部信息及关闭按钮
                  title = "提示", //弹窗标题
                  contentStyle = {}, //内容样式
                  contentFontSize = "1.5em", //内容字体大小
                  btnName = ["确定", "取消"] //按钮文字内容
              }) {
            //将传入的值绑定到this上
            this.content = content;
            this.type = type;
            this.useHTML = useHTML;
            this.showIcon = showIcon;
            this.confirm = confirm;
            this.cancle = cancle;
            this.footer = footer;
            this.header = header;
            this.title = title;
            this.contentStyle = contentStyle;
            this.contentFontSize = contentFontSize;
            this.btnName = btnName;

            //执行创建元素方法
            this._creatElement();
            //显示弹窗及遮罩
            this._show({
                el: this._el,
                overlay: this._overlay
            });
            //绑定事件处理函数
            this._bind({
                el: this._el,
                overlay: this._overlay
            });
        },

        //创建弹窗元素方法
        _creatElement() {
            //创建最外层得包裹元素
            let wrap = document.createElement("div");
            wrap.className = "msg__wrap";

            //定义弹窗得两个按钮
            const [confirmBtnName, cancelBtnName] = this.btnName;

            //判断是否显示弹窗标题
            const headerHTML = this.header ?
                `<div class="msg-header">
                        <span>${this.title}</span>
                        <span class="msg-header-close-button">×</span>
                    </div>` : "";

            //判断是否显示图标
            const iconHTML = this.showIcon ?
                `<div class="msg-body-icon">
                    <div class="msg-body-icon-${this.type}"></div>
                </div>` : "";

            //判断是否显示弹窗底部按钮
            const footerHTML = this.footer ?
                `<div class="msg-footer">
                        <button class="msg-footer-btn msg-footer-cancel-button">${cancelBtnName}</button>
                        <button class="msg-footer-btn msg-footer-confirm-button">${confirmBtnName}</button>
                    </div>` : "";

            //拼接完整html
            const innerHTML = `${headerHTML}
            <div class="msg-body">
                ${iconHTML}
                <div class="msg-body-content"></div>
            </div>
            ${footerHTML}`;

            //将拼接的html赋值到wrap中
            wrap.innerHTML = innerHTML;

            //把自定义的样式进行合并
            const contentStyle = {
                fontSize: this.contentFontSize,
                ...this.contentStyle
            }

            //获取内容所属DOM
            let content = wrap.querySelector(".msg-body .msg-body-content");
            //将传过来的样式添加到contentDOM
            for (const key in contentStyle) {
                if (contentStyle.hasOwnProperty(key)) {
                    content.style[key] = contentStyle[key];

                }
            }

            //给弹窗的conntent赋值
            if (this.useHTML) {
                content.innerHTML = this.content;
            } else {
                content.innerText = this.content;
            }

            //创建遮罩层
            let overlay = document.createElement("div");
            overlay.className = "msg__overlay";

            //把dom挂载到当前实例上
            this._overlay = overlay;
            this._el = wrap;
        },

        //弹窗展现方法
        _show({
                  el,
                  overlay
              }) {
            //把弹窗的dom和遮罩插入到页面中
            document.body.appendChild(el);
            document.body.appendChild(overlay);

            //将弹窗显示出来 timeout进行异步处理显示动画
            setTimeout(() => {
                el.style.transform = "translate(-50%,-50%) scale(1,1)";
                overlay.style.opacity = "1";
            })
        },

        //关闭弹窗方法
        _close({
                   el,
                   overlay
               }) {
            //隐藏dom
            el.style.transform = "translate(-50%,-50%) scale(0,0)";
            overlay.style.opcity = "0";
            //根据动画时间  动画完成再移除
            setTimeout(() => {

                //把弹窗的dom和遮罩移除
                document.body.removeChild(el)
                document.body.removeChild(overlay);
            }, 300);
        },

        //事件处理函数，为DOM绑定事件
        _bind({
                  el,
                  overlay
              }) {
            //保存当前this
            //const _this = this;

            const cancle = (e) => {
                this.cancle && this.cancle.call(this, e);
                //隐藏弹窗
                //hideMsg();
                this._close({
                    el,
                    overlay
                });
            }
            //确认弹窗
            const confirm = (e) => {
                this.confirm && this.confirm.call(this, e);
                this._close({
                    el,
                    overlay
                });
            }


            //顶部关闭按钮绑定事件
            if (this.header) {
                el.querySelector(".msg-header-close-button").addEventListener("click", cancle);
            }
            //弹窗底部两个按钮事件监听
            if (this.footer) {
                el.querySelector(".msg-footer-cancel-button").addEventListener("click", cancle);
                el.querySelector(".msg-footer-confirm-button").addEventListener("click", confirm)
            }
        }


    }

    //将构造函数暴露到window  可直接在全局作用域中访问构造函数
    window.$Msg = Msg;


})(window, document);

JS