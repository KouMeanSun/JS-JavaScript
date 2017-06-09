
	
	//DragBoxLimitText
	function DragBoxLimitText(id){
		//继承属性
		DragBoxLimit.call(this,id);
		
	}
	//原型链继承
	DragBoxLimitText.prototype = new DragBoxLimit();
	
	//重写DragBoxLimit.proto.moving方法
	DragBoxLimitText.prototype.moving = function(x,y){
		//借用DragBoxLimit  原型的moving函数
		DragBoxLimit.prototype.moving.call(this,x,y);
		//改变坐标位置
		this.ele.innerHTML = "left:"+this.ele.style.left+",\ntop:"+this.ele.style.top;
	}
 