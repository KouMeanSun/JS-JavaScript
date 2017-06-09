


//构造函数
//属性：需要拖拽的元素节点ele
//方法startMove（）
//    moving（）
//   stopMove（）
function DragBox(id){
	//如果id为undefined，直接返回
	if(id==undefined){
		return;
	}
	//属性：
	this.ele = document.getElementById(id);
	var self = this;//保存this到self
	//给ele添加onmousedown方法
	this.ele.onmousedown = function(evt){
			var oEvent = evt || event;
			//开始移动
			self.startMove(oEvent.clientX,oEvent.clientY);
	}
}
//方法：
//startMove
DragBox.prototype.startMove = function(x,y){
	this.disX = x  - this.ele.offsetLeft;
	this.disY = y - this.ele.offsetTop;
	
	var self = this;
	document.onmousemove = function(evt){
		var oEvent = evt || event;
		//正在移动。。。
		//这里的this是document
		self.moving(oEvent.clientX,oEvent.clientY);
	}
	document.onmouseup  = function(){
		//停止移动
		self.stopMove();
	}
};

//moving
DragBox.prototype.moving = function(x,y){
	this.ele.style.left = x - this.disX + "px";
	this.ele.style.top  = y - this.disY + "px";
}

//stopMove()
DragBox.prototype.stopMove = function(){
	document.onmousemove = null;
	document.onmouseup  = null;
}
