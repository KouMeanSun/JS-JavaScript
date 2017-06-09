
/**
 * 获取style样式值
 * @param {Object} obj   要获取style样式目标样式节点
 * @param {Object} attr  要获取样式的属性值
 */

function getStyle(obj,attr){
	if(window.getComputedStyle){//支持ie9+，谷歌，火狐。。。
		return getComputedStyle(obj,null)[attr];
	}else{//ie8以下
		return obj.currentStyle[attr];
	}
}
//startMove(oList,{top:iTop,left:100,opacity:100},next);
/**
 * 
 * @param {Object} obj 需要移动的目标节点对象
 * @param {Object} json 包含一个或多个属性值(attr)和目标值(iTarget)
 * @param {Object} fn 运动完成后的回调函数
 */
function startMove(obj,json,fn){
	//清除原来的定时器
	clearInterval(obj.timer);
	//开启新的定时器
	obj.timer = setInterval(function(){
		//遍历json对象
		for(var attr in json){
			//目标值
			var iTarget = json[attr];
			
			//1,当前值current，
			var current = 0;
			//如果是改变透明度
			if(attr == "opacity"){
				current = parseFloat(getStyle(obj,attr))*100;
				current = iTarget>current?current:parseInt(current);
			}else {
				  //如果是left/top/width/height
				  current = parseFloat(getStyle(obj,attr));
				  current = current>0?Math.ceil(current):Math.floor(current);
			}
			//2.计算速度
			var iSpeed = (iTarget-current)/8;
			iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			//3.判断临界值
			if(current==iTarget){
				clearInterval(obj.timer);
				//当运动结束了，回调函数，告诉调用者，我的运动结束了
				if(fn){
					fn(obj);//回调
				}
			}else{
				//4.移动改变，
				//透明度
				if(attr == "opacity"){
					obj.style.opacity = (current+iSpeed)/100;
					obj.style.filter  = "alpha(opacity="+(current+iSpeed)+")";
					
				}else{
					//非透明度
					obj.style[attr] = current +iSpeed + "px";
					
				}
			}
			
		}
	},90);
}

