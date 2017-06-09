

		//父类
		//属性：ele
		//方法：randomPoint（）
		function Base(imgSrc){
			if(imgSrc==undefined){
				return;
			}
			this.ele = document.createElement("img");
			this.ele.src = imgSrc;//图片
			
			document.body.appendChild(this.ele);
		}
		//随机数
		Base.prototype.randomPoint = function(){
			var x = parseInt(Math.random()*document.documentElement.clientWidth);
			var y = parseInt(Math.random()*document.documentElement.clientHeight);
			return {left:x,top:y};
		}
