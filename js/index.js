//全局变量
var start = 0, // 数据的开始项
	count = 10, //单页条数
	city = "城市", //城市
	searchID = 1 //定义search变量，来判断是模糊收索，模糊收索需要把列表数据清空再渲染查询出的新数据



function init() {
	pull(); //上拉加载组件
	getTheaters();//初始加载1页10条数据
	search(); //搜索
}

//初始化mui上拉加载组件
function pull() {
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				contentrefresh: '正在加载...',
				callback: getTheaters
			}
		}
	});
}

//获取正在热映的数据
function getTheaters() {
	start++; //页数加一
	mui.getJSONP('https://api.douban.com/v2/movie/in_theaters', {
		start: start,
		count: count,
		city: city
	}, function(res) {
		if (res.subjects.length === 0) { //没有数据的情况下
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //没有数据了
		} else {
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //有数据
		}
		searchID = 0; //赋值为0，渲染列表不清空
		redenr(res.subjects); //数据渲染
	});
}

//数据渲染的函数
function redenr(data) {
	if (searchID == 1) { //变量为1，渲染列表清空
		document.querySelector('.list').innerHTML = "";
	}
	console.log(data)
	var str = '';
	var html = '';
	// 数组：第一种写法
	//<li>演员：<span>${item.casts[0].name},${item.casts[1].name},${item.casts[2].name}</span></li>
	//第二种写法
	data.forEach(function(item) {
		//循环
		html = item.casts.map(function(ite) {
			return `<span>${ite.name}</span>`;
		}).join('、');
		str +=
			`<div class="listBox">
			<div class="img"><img src="${item.images.large}" /></div>
			<div class="title">
				<ul>
					<li>名称：<span>${item.title}</span></li>
					<li>类型：<span>${item.genres}</span></li>
					<li>导演：<span>${item.directors.length === 0 ? '无' : item.directors[0].name }</span></li>
					<li>演员：${html}</li>
					<li>年份：<span>${item.year}</span> 的作品</li>
				</ul>
				<div class="tils">${item.rating.average}</div>
			</div>
		</div>`
	})
	dom('.list').innerHTML += str;
}

//模糊查询电影
function search() {
	dom('#search').addEventListener('input', function() {
		var text = this.value; //取输入框的值
		console.log()
		mui.getJSONP('http://api.douban.com/v2/movie/search', {
			start: start,
			count: count,
			q: text
		}, function(res) {
			searchID = 1; //赋值为，渲染列表清空，然后渲染出查询出来的新数据
			redenr(res.subjects); //数据渲染
		});
	})
}





init();
