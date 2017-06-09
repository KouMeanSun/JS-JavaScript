

//我的飞机独享

var myPlane = {
	//属性：ele
	ele:null,
	fireInterval:60,//发射子弹的时间间隔
	
	//方法
	//初始化方法
	init:function(){
		this.ele = document.createElement("div");//创建div
		this.ele.className = "myplane";//css样式
		document.body.appendChild(this.ele);//添加
		
		//位置
		var left = gameEngine.ele.offsetLeft + gameEngine.ele.offsetWidth/2 - this.ele.offsetWidth/2;
		this.ele.style.left = left + "px";
		this.ele.style.bottom = 0; 
		
		return this;
	},
	//自动发射子弹
	autoFire:function(){
		setInterval(function(){
			//创建子弹
			var bullet = new Bullet();
			bullet.init().move();//初始化并且移动
		},this.fireInterval);
	}
	
};
