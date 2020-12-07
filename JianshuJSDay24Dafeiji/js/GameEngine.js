

//游戏引擎
 var gameEngine = {
 	bulletList:{},//保存所有屏幕上的最新的子弹
 	enemyList:{},//保存所有最新的屏幕上的敌机
 	
 	ele:null,
 	//初始化方法
 	init:function(){
 		this.ele = document.getElementById("body_main");
 		return this;
 	},
 	//开始游戏
 	start:function(){
 		//游戏加载页面
 		this.loading(function(){
 			//此时加载页面已经结束了
 			//正式开始游戏
 			
 			//显示我的飞机，并启动发射子弹
 			myPlane.init().autoFire();
 			
 			//键盘监听
 			gameEngine.keyListening();
 			
 			//创建敌机
 			gameEngine.createEnemy();
 			
 			//开启碰撞检测
 			gameEngine.crashListening();
 		});
 	},
 	
 	//加载游戏
 	loading:function(callback){
 		//显示logo，
 		logo.init().show();
 		
 		//创建加载的元素节点loadingEle
 		var loadingEle = document.createElement("div");
 		loadingEle.className = "loading";
 		document.body.appendChild(loadingEle);
 		
 		//定时器切换加载页面的图片
 		var index = 0;
 		var loadImgs = ["./images/loading1.png","./images/loading2.png","./images/loading3.png"];
 		var timer = setInterval(function(){
 			//当index = 6 时，正式进入游戏界面
 			if(index == 6){
 				clearInterval(timer);//清除定时器
 				logo.hide();//隐藏logo
 				document.body.removeChild(loadingEle);//隐藏loadingEle
 				
 				//加载页面结束后，进行回调
 				callback();
 				return;
 			}
 			//切换背景图
 			loadingEle.style.background = "url("+loadImgs[index%3]+") no-repeat";
 			index++;
 			
 		},500);
 	},
 	
 	//键盘监听（监听左右）
 	keyListening:function(){
 		var speed = 0;//速度
 		//键盘按下
 		document.onkeydown = function(evt){
 			var oEvent = evt || event;
 			//左
 			if(oEvent.keyCode == 37){
 				speed = -8;//表示会向左移动
 			}
 			//右
 			else if(oEvent.keyCode == 39){
 				speed = 8;//表示会向右移动
 			}
 		}
 		
 		//键盘松开
 		document.onkeyup = function(){
 			speed = 0;//不移动
 		}
 		
 		setInterval(function(){
 			//移动我的飞机
 			myPlane.ele.style.left = myPlane.ele.offsetLeft + speed + "px";
 			//如果超出了左边界，则最多移动到左边界的位置
 			if(myPlane.ele.offsetLeft <= gameEngine.ele.offsetLeft ){
 				myPlane.ele.style.left =  gameEngine.ele.offsetLeft + "px";
 			}
 			//如果超出了右边界，则最多移动到右边界的位置
 			else if(myPlane.ele.offsetLeft >= (gameEngine.ele.offsetLeft+gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth)){
 				myPlane.ele.style.left = gameEngine.ele.offsetLeft +gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth + "px";
 			}
 			
 		},30);
 	},
 	
 	//创建敌机
 	createEnemy:function(){
 		//大飞机
 		setInterval(function(){
 			//一定几率创建敌机
 			var flag = Math.random() > 0.8 ? true :false;
 			if(flag){
 				var enemy = new Enemy(Enemy.prototype.PLANE_TYPE_LARGE);
 				enemy.init().move();//让敌机初始化，并移动
 			}
 		},2000);
 		
 		//中型飞机
 		setInterval(function(){
 			var flag = Math.random()>0.8 ?true:false;
 			if(flag){
 				var enemy = new Enemy(Enemy.prototype.PLANE_TYPE_MIDDLE);
 				enemy.init().move();//让敌机初始化，并移动
 			}
 		},1000);
 		
 		//小型飞机
 		setInterval(function(){
 			var flag = Math.random() > 0.7 ?true :false;
 			if(flag){
 				var enemy = new Enemy(Enemy.prototype.PLANE_TYPE_SMALL);
 				enemy.init().move();//让敌机初始化，并且移动
 			}
 		},500);
 	},
 	
 	//碰撞检测
 	crashListening:function(){
 		var timer = setInterval(function(){
 			//判断是否有子弹和敌机碰撞（交集）
 			//遍历所有敌机：for - in
 			for(var i in gameEngine.enemyList){
 				//遍历所有子弹：for - in
 				for(var j in gameEngine.bulletList){
 					if(gameEngine.bulletList[j]==undefined){//剔除无效的子弹
 						continue;
 					}
 					//判断子弹和敌机是否有交集
 					if(isCrash(gameEngine.enemyList[i].ele,gameEngine.bulletList[j].ele)){
 						//如果有交集，说明发生了碰撞
 						//让子弹爆炸，再消失
 						gameEngine.bulletList[j].boom();
 						
 						//让敌机受到一点伤害
 						gameEngine.enemyList[i].hurt();
 						
 						//删除bulletList中的这个子弹
 						delete gameEngine.bulletList[j];
 					}
 				}
 				//敌机和我的飞机是否有碰撞
 				if(isCrash(gameEngine.enemyList[i].ele,myPlane.ele)){
 					if(confirm("GameOver,是否继续？")){
 						clearInterval(timer);//清除定时器（碰撞检测的）
 						//延迟2秒再重新开始检测碰撞
 						setTimeout(function(){
 							gameEngine.crashListening();//开始碰撞检测
 						},2000);
 					}else {
						clearInterval(timer);//清除定时器（碰撞检测的）
						window.location.reload();

					}
					// clearInterval(timer);//清除定时器（碰撞检测的）
					// new $Msg({
					// 	content:"GameOver,是否继续？",
					// 	type:"success",
					// 	cancle:function(){
					// 			clearInterval(timer);//清除定时器（碰撞检测的）
					// 			window.location.reload();
					// 	},
					// 	confirm:function(){
					// 			clearInterval(timer);//清除定时器（碰撞检测的）
					// 			//延迟2秒再重新开始检测碰撞
					// 			setTimeout(function(){
					// 				gameEngine.crashListening();//开始碰撞检测
					// 			},2000);
					// 	}
					// })
 				}
 				
 			}
 			
 		},100);
 	}
 	
 };

//logo
 var logo = {
 	ele:null,
 	init:function(){
 		this.ele = document.createElement("div");
 		this.ele.className = "logo";
 		return this;
 	},
 	
 	//显示logo
 	show:function(){
 		document.body.appendChild(this.ele);
 	},
 	//隐藏logo
 	hide:function(){
 		document.body.removeChild(this.ele);
 	}
 }
