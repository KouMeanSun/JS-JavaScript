

	//DragBoxLimt:
	//可以拖拽，限制不超出左边界，上边界
	function DragBoxLimit(id){
		if(id==undefined){
			return;
		}
		
		//借用构造函数，继承属性
		DragBox.call(this,id);
	}
	//原型链继承，
	DragBoxLimit.prototype = new DragBox();
	//重写DragBox.proto.moving方法
	DragBoxLimit.prototype.moving = function(x,y){
		var left = x - this.disX;
		var top  = y - this.disY;
		
		if(left<0){
			left = 0;
		}
		if(top<0){
			top = 0;
		}
		this.ele.style.left = left + "px";
		this.ele.style.top  = top + "px";
	};
