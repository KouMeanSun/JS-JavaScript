

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
 * obj:需要改变的元素节点对象
 * json：一个或多个属性所组成的对象{attr:iTarget,attr:iTarget},如：{left:300,width:200}
 * fn:回调函数，当运动停止时进行回调
 * 
 */
function startMove(obj,json,fn){
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
				if(fn){
					fn();
				}
				
			}	
		
	},30);
	
}




//封装startMove
/*
 * obj: 需要运动的元素
 * attr: 需要改变的属性
 * iTarget: 需要到达的目标值(终点值)
 * fn: 回调函数
 */
//function startMove(obj, attr, iTarget, fn) {
//	
//	//关闭之前的定时器
//	clearInterval(obj.timer);
//	
//	//再开启新的定时器
//	obj.timer = setInterval(function(){
//		
//		//1, 获取当前值
//		var current = 0;
//		if (attr == "opacity") { //透明度
//			current = parseFloat(getStyleAttr(obj, attr) * 100);
//			current = Math.round(current); //四舍五入
//		}
//		else { // left/top/width/height...
//			current = parseFloat(getStyleAttr(obj, attr));
//			current = Math.round(current); //四舍五入
//		}
//		
//		//2, 给一个速度
//		var iSpeed = (iTarget - current) / 8;
//		iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
//		
//		//3, 判断是否到达目标值
//		if (current == iTarget) {
//			clearInterval(obj.timer); //关闭定时器, 停止运动
//			//console.log("a");
//			
//			//回调
//			if (fn) {
//				fn(); 
//			}
//			
//			return; //退出函数, 不再执行下面的语句
//		}
//		
//		//4, 运动
//		if (attr == "opacity") { //透明度
//			obj.style.opacity = (current + iSpeed) / 100;
//			obj.style.filter = "alpha(opacity=" + (current + iSpeed) + ")";
//		}
//		else { // left/top/width/height
//			obj.style[attr] = current + iSpeed + "px";
//		}
//		
//	}, 30);
//}







