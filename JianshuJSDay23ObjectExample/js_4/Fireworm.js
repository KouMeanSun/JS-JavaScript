

		//构造函数
		//Fireworm 萤火虫
		function Fireworm(){
			//属性ele
			this.ele = document.createElement("img");
			this.ele.src = "images/1.jpg";
			this.ele.style.left = this.randomPoint().left + "px";
			this.ele.style.top  = this.randomPoint().top  + "px";
			this.ele.style.opacity = 0.5;//透明度
			this.ele.style.filter = "alpha(opacity=50)";
			document.body.appendChild(this.ele);
			//飞
			this.fly();
		}
		
		//随机数
		Fireworm.prototype.randomPoint = function(){
			var x = parseInt(Math.random()*document.documentElement.clientWidth);
			var y = parseInt(Math.random()*document.documentElement.clientHeight);
			return {left:x,top:y};
		}

		//飞
		Fireworm.prototype.fly = function(){
			var self = this;
			animate(this.ele,this.randomPoint(),{callback:function(){
				//运动结束后会调用
				self.fly();
			}});
		}
