//页面加载完成后执行
window.onload=function(){
	//页面滚动的时候，搜索部分的背景色改变
	//超过轮播图的时候，背景色不变了
	//调用相应的函数
	scrollSearchColor();
	// 实现轮播图的播放：自动播放，滑动播放
	// 调用播放函数
	bannerPlay();
	
};
//搜索部分颜色变化的函数
function scrollSearchColor(){
	//获取搜索盒子
	//querySelector("样式选择器")
	//它返回的是满足条件的第一个元素对象
	//根据类选择器的格式：.类名
	//querySelectorAll("样式选择器")
	//它返回的是满足条件的所有元素对象，以数组保存
	var searchBox=document.querySelector(".jd_header_box");
	// console.log(searchBox);
	// 要知道轮播图的高度
	// 获取到轮播图
	var bannerBox=document.querySelector(".jd_banner");
	// console.log(bannerBox);
	// 获取轮播图的高度
	var h=bannerBox.offsetHeight;
	// console.log(h);
	// 页面滚动，改变背景色
	window.onscroll=function(){
		//页面滚动的距离
		var top=document.body.scrollTop||document.documentElement.scrollTop;
		console.log(top);
		// 保存透明度
		var opacity=0;
		if(top<h){
			// 透明度逐渐加深
			opacity=top/h*0.85;
		}else{
			// 超过轮播图，不变
			opacity=0.85;
		}
		console.log("透明度："+opacity);
		// 设置搜索盒子的透明度
		searchBox.style.background="rgba(201,21,35,"+opacity+")";
		// searchBox.style.background="rgba(0,0,0,"+opacity+")";		
	};
}
// 轮播图的播放函数功能
// 1 自动播放
// 2 小圆点和图片的顺序对应起来
// 3 滑动播放
// 4 滑动的时候，滑动到一定的距离才能滑动到下一张，否则会吸附回去
function bannerPlay(){
	// 获取轮播图
	var banner=document.querySelector(".jd_banner");
	// 获取轮播图盒子的宽度（屏幕的宽度）
	var w=banner.offsetWidth;
	// 获取存放图片的ul盒子
	var imageBox=banner.querySelector("ul:first-child");
	// 考虑对应的小圆圈
	//获取小圆圈的盒子ul
	var pointBox=banner.querySelector("ul:last-child");
	//获取所有的小圆圈li
	var points=pointBox.querySelectorAll("li");
	// 定义改变轮播图片盒子位置的函数
	function setTranslateX(translateX){
		imageBox.style.transform="translateX("+translateX+"px)";
	}
	// 改变位置的时候，加上过渡效果
	function addTransition(){
		imageBox.style.transition="all 0.2s";
	}
	// 取消过渡
	function removeTransition(){
		imageBox.style.transition="none";
	}
	// 自动播放
	// 使用定时器
	var timer=null;
	// 当前图片的编号
	var index=1;
	timer=setInterval(function(){
		// 调用函数
		index=index+1;
		// 加上过渡效果
		addTransition();
		// 改变位置
		setTranslateX(-index*w);
	},3000);
	// 给轮播图片盒子添加一个过渡结束事件
	imageBox.addEventListener("transitionend",function(){
		if(index>=9){
			index=1;
			//重新定位
			//删除过渡效果
			removeTransition();
			setTranslateX(-index*w);
		}else if(index<=0){
			index=8;
			removeTransition();
			setTranslateX(-index*w);
		}
		// 小圆圈都要对应起来
		setPoint();
	});
	// 小圆圈都要对应起来的函数
	function setPoint(){
		// 把所有的小圆圈的样式清除
		for(var i=0;i<points.length;i++){
			points[i].className="";
		}
		// 对应的小圆圈才有class="now"
		points[index-1].className="now";
	}
	//下面是滑动播放代码
	//保存起始滑动位置变量
	var startX=0;
	// 保存滑动到的位置
	var moveX=0;
	// 保存滑动的距离
	var distanceX=0;
	// 保持是否滑动状态true表示滑动，false表示未滑动(滑动结束)
	var isMove=false;
	// 给图片所在的盒子，也就是第一个ul添加开始滑动事件
	imageBox.addEventListener("touchstart",function(e){
		//开始滑动，马上停止自动播放
		//关闭定时器
		clearInterval(timer);
		// 记下手指按下的位置
		startX=e.touches[0].clientX;
		console.log("startX:"+startX);
	});
	// 按下手指准备滑动，添加滑动事件
	imageBox.addEventListener("touchmove",function(e){
		// 处于滑动状态
		isMove=true;
		// 读取滑动到的位置(手指所在的位置)
		moveX=e.touches[0].clientX;
		console.log("moveX:"+moveX);
		// 计算滑动的距离=当前手指的位置-按下手指的位置
		distanceX=moveX-startX;
		console.log("distanceX:"+distanceX);
		// 图片盒子ul当前位置=现在的位置+滑动的距离
		var currX=-index*w+distanceX;
		//手动改变位置，不需要过渡效果
		//所以要删除过渡
		removeTransition();
		// 图片出现在当前位置
		setTranslateX(currX);
	});
	// 滑动结束的时候考虑是否切换到另外一张图片
	// 添加滑动结束事件
	// 滑动结束后还要恢复自动播放状态
	imageBox.addEventListener("touchend",function(e){
		//超过一定的距离（距离取合适的）
		//屏幕宽度的:W/3
		if(isMove && Math.abs(distanceX)>w/3){
			//滑动过切超过一定的距离
			//可能左滑，也可能右滑
			if(distanceX>0){
				//右滑
				index=index-1;
			}else{
				//左滑
				index=index+1;
			}
			// 加上过渡效果
			addTransition();
			// 定位
			setTranslateX(-index*w);
		}else{
			// 滑动的距离不够(还是显示当前图片)
			//加上过渡效果
			addTransition();
			// 回到老位置
			setTranslateX(-index*w);			
		}
		//手指离开屏幕了
		//重置，准备下一次滑动
		startX=0;
		moveX=0;
		distanceX=0;
		isMove=false;
		//从新自动播放
		//避免定时器的重复，
		//再次停止定时器
		clearInterval(timer);
		//开始定时器
		timer=setInterval(function(){
			// 默认往左滑动
			index=index+1;
			//加过渡效果
			addTransition();
			//定位
			setTranslateX(-index*w);
		},3000);
	});
}