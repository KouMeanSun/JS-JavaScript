//获取某元素节点的某属性值
/*
 * obj: 需要获取属性值的元素节点, 如:oBox
 * attr: 需要获取的属性, 如:"left"
 */
function getStyleAttr(obj, attr) {
	if(window.getComputedStyle) { //支持IE9+, 谷歌, 火狐..
		return getComputedStyle(obj, null)[attr];
	}
	return obj.currentStyle[attr]; //支持IE8-
}
/**
 * 
 * @param {Object} obj   目标对象
 * @param {Object} json  要改变的属性
 * @param {Object} extend {buffer,callback} 当buffer为true时为弹性运动
 * animate(obj, {top:500, left: 300}, {callback:function(){}, buffer: true})
 */
function animate(obj,json,extend){
	//关闭之前的定时器
	clearInterval(obj.timer);
	
	//再开启新的定时器
	obj.timer = setInterval(function(){
		//默认所有属性都达到了目标值，表示可以停止运动了
		var bStop = true;
		for(var attr in json){
			//attr:属性名称
			//iTarget：attr所对应的目标值
			var iTarget = json[attr];//目标值
			
			//1.获取当前值：
			var current = 0;
			if(attr == "opacity"){//透明度
				current  = parseFloat(getStyleAttr(obj,attr)*100);
				current = Math.round(current);//四舍五入
			}else{//left,top,width,height...
				current = parseFloat(getStyleAttr(obj,attr));
				current = Math.round(current);//四舍五入
			}
			
			//2.给一个速度
			var iSpeed = (iTarget - current)/8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) :Math.floor(iSpeed);
			
			//3.判断是否所有属性都到达了目标值，是否有未到目标值的属性
			if(current!=iTarget){
				bStop = false;//表示不能停止运动，不能关闭定时器
			}
			//4.运动
			if(attr == "opacity"){
				obj.style.opacity = (current+iSpeed)/100;
				obj.style.filter = "alpha(opacity="+(current + iSpeed)+")";
			}else{
				obj.style[attr] = current + iSpeed + "px";
			}

		}
	//如果所有属性都达到了目标值，则可以停止运动了，可以关闭定时器了，并且回调
			if(bStop){
				clearInterval(obj.timer);
				console.log("停止运动！");
				
				//回调
				if(extend &&extend.callback()){
					extend.callback()
					console.log("动画执行完毕！");
				}else{
					"";
					console.log("error");
				}
				
			}	
		
	},30);
	
}



