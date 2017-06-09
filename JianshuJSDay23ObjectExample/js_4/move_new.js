
/**
 * 
 * @param {Object} obj   目标对象
 * @param {Object} json  要改变的属性
 * @param {Object} extend {buffer,callback} 当buffer为true时为弹性运动
 * animate(obj, {top:500, left: 300}, {callback:function(){}, buffer: true})
 */
function animate(obj,json,extend){
	if(obj.isMoving){
		return ;
	}else {
		stop();
		obj.isMoving = true;
	}
	obj.timerlist = {};
	//为每一个属性添加一个定时器
	for(var attr in json){
		(function(attr){
			obj.timerlist[attr] = {speed:0};
			obj.timerlist[attr].timer = setInterval(function(){
				//首先得到当前值
				var iNow = 0;
				if(attr == "opacity"){
					iNow = parseFloat(parseFloat(getStyle(obj,attr))*100);
					
				}else{
					iNow = parseFloat(getStyle(obj,attr));
				}
				var speed = obj.timerlist[attr].speed;
				//根据目标值，计算需要的速度
				if(extend && extend.buffer){
					speed += (json[attr]-iNow)/5;
					speed *= 0.75;
				}else{
					speed = (json[attr]-iNow)/5;
				}
				//speed > 0 ? speed=Math.ceil(speed) : speed=Math.floor(speed);
				//当接近目标值时，停止定时器
				if(Math.abs(iNow-json[attr])<0.1){
					clearInterval(obj.timerlist[attr].timer);
					delete obj.timerlist[attr];
					if(getObjLength(obj.timerlist)==0){//所有定时器已经停止
						stop();
						(extend &&extend.callback())?extend.callback():"";
					}
				}else{
					//根据速度，修改当前值
					if(attr == "opacity"){
						obj.style.opacity = (iNow +speed)/100;
						obj.style.filter = 'alpha(opacity='+parseFloat(iNow+speed)+')';
						
					}else{
						obj.style[attr] = iNow +speed + "px";
					}
					obj.timerlist[attr].speed = speed;
				}
			},30);
		})(attr);
		
		
	}
	//清除所有定时器
	function clearTimer(){
		for(var i in obj.timerlist){
			clearInterval(obj.timerlist[i].timer);
		}
	}
	
	function getStyle(obj,attr){
		if(obj.currentStyle){
			return isNaN(parseFloat(obj.currentStyle[attr]))?obj.style[attr]=0:obj.currentStyle[attr];
		}else{
			return isNaN(parseFloat(getComputedStyle(obj,null)[attr]))?obj.style[attr]=0:getComputedStyle(obj,null)[attr];
		}
	}
	
 function getObjLength(obj){
 	var n = 0;
 	for(var i in obj){
 		n++;
 	}
 	return n;
 }
	
	//停止方法
function stop(){
	clearTimer();//清除所有定时器
	obj.isMoving  = false;
}
}



