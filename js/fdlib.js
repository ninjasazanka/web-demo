//*** by FDLIB.js ***//


function FDLIB() {

	/*底层*/
	FDLIB.prototype.__initialized__ = false; 			//是否已经初始化
	FDLIB.prototype.__monitor_timer__ = "timer_ID";		//监听器[定时器]标识
	//FDLIB.prototype.__monitor_count__ = 0; 			//监听器[定时器]执行次数统计
	FDLIB.prototype.__monitor_millisec__ = 10;			//监听器[定时器]每执行一次的时间间隔,以毫秒计
	
	FDLIB.prototype.Init = function() { 				//初始化对象,只允许执行初始化一次//
		if (FDLIB.prototype.__initialized__) {	//
			FDLIB.prototype.error(2);
			return false;
		}
		FDLIB.prototype.__monitor_timer__ = window.setInterval(this.Monitor, FDLIB.prototype.__monitor_millisec__);
		FDLIB.prototype.__initialized__ = true;
		FDLIB.prototype.console(`${this}： 监听器打开！`);
		return true;
	};

	FDLIB.prototype.Cease = function() {						//停止
		window.clearInterval(FDLIB.prototype.__monitor_timer__);//关闭定时器
		FDLIB.prototype.__initialized__ = false; 				//其他设置也恢复到初始化之前
		//FDLIB.prototype.__monitor_count__ = 0;
		FDLIB.prototype.__monitor_timer__ = "timer_ID";
		FDLIB.prototype.console(`${this}： 监听器关闭！`);
		return true;
	};
	
	FDLIB.prototype.Monitor = function() { 						//对象监听器,预留编程接口
		//code 编程接口
		
		return FDLIB.prototype.__monitor_count__++;
	};
	
	/*错误与错误提示*/
	
	FDLIB.prototype.__error_tip__ = [ //错误提示语句
		"ERR_0: 未知的错误！", //0
		"ERR_1: 未知的错误！", //1
		"ERR_2: 监听器已经打开了，只能设置一个监听器！", //2
		"ERR_3: 不允许用户调用monitor()方法！",
		"ERR_4: 搜索关键词不合法（搜索关键字不能为空）！",
		"ERR_5: 错误，有关[__serch_test__]",
	];
	
	FDLIB.prototype.error = function(id = 0) { //错误提示，返回错误的ID；
		try {
			if (id >= FDLIB.prototype.__error_tip__.length || id < 0) {
				throw new Error("抛出一个异常"); //如果ID不符合规范，手动抛出一个异常
			}
			FDLIB.prototype.console(FDLIB.prototype.__error_tip__[id], "color:red", "error");
		} catch (error) {
			FDLIB.prototype.console(FDLIB.prototype.__error_tip__[0], "color:red", "error");
		}
	};
	
	/*控制台输出函数*/
	
	FDLIB.prototype.__console_style__ = "color: pink"; 	//控制台输出 默认样式
	FDLIB.prototype.__console_str__ = "未定义"; 			//控制台输出 默认文本
	FDLIB.prototype.__console_type__ = "log"; 			//控制台输出 默认类型 
	/*控制台输出类型可以为:"log"  "info"  "warn"  "error"  "debug" ...*/

	FDLIB.prototype.console = function(str, style, type) { //带样式的控制台输出函数
		str = str || FDLIB.prototype.__console_str__ || "未定义";
		style = style || FDLIB.prototype.__console_style__ || "color: lightblue";
		type = type || FDLIB.prototype.__console_type__ || "info";
		switch (type) {
			case "log":
				console.log("%c%s", style, str);
				break;
			case "info":
				console.info("%c%s", style, str);
				break;
			case "warn":
				console.warn("%c%s", style, str);
				break;
			case "error":
				console.error("%c%s", style, str);
				break;
			case "debug":
				console.debug("%c%s", style, str);
				break;
			default:
				console.log("%c%s", style, str);
		}
		//console.info("%c%s", style, str);
	};

	/*搜索函数*/
	
	FDLIB.prototype.__search_key__ = ""; 				//搜索函数 默认搜索关键词(不使用)
	FDLIB.prototype.__search_engine__ = "baidu"; 		//搜索函数 默认搜索引擎
														/*搜索引擎参数可以为 "baidu", "sougo"...*/
														
														
	FDLIB.prototype.__serch_test__ = function(key) { 	//搜索函数 测试搜索关键词是否合法
		try {
			if (key == undefined || key == "" || key == null || key == "undefined" || key == false) {
				return false;
			}
			return true;
		} catch {
			//code
			FDLIB.prototype.error(5);
		}
	}
	
	//搜索
	FDLIB.prototype.Baidu = function(key) { //百度
		try {
			if (!FDLIB.prototype.__serch_test__(key)) {
				throw new Error("抛出一个异常"); //如果测试搜索关键词不合法，手动抛出一个异常
			}
			window.open(
				`https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=${key}&oq=%25E8%258A%2599%25E5%2585%25B0%25E6%259C%25B5%25E9%259C%25B2&rsv_pq=8eb85a52004d8308&rsv_t=900evnw09NlwnP87hdCbcUHKTTSzsJSJug1jdlsdAiHOPgPSE7aL2ZdPLPE&rqlang=cn&rsv_enter=1&rsv_dl=tb&inputT=3&rsv_sug3=36&rsv_sug1=35&rsv_sug7=100&rsv_sug2=0&rsv_sug4=1061`
			);
			FDLIB.prototype.console(`Baidu("${key}")`, "color:#4e6ef2");
		} catch {
			//code
			FDLIB.prototype.error(4);
			window.open(`https://www.baidu.com/`); //打开百度主页
			return false;
		}
		return true;
	};

	FDLIB.prototype.Google = function(key) { //谷歌
		try {
			if (!FDLIB.prototype.__serch_test__(key)) {
				throw new Error("抛出一个异常"); //如果测试搜索关键词不合法，手动抛出一个异常
			}
			FDLIB.prototype.console(`Google("${key}")`, "color:red");
			FDLIB.prototype.console(`地区限制，Google搜索暂时不可用`, "color:red");
		} catch {
			//code
			FDLIB.prototype.error(4);
			return false;
		}
		return false;
	};

	FDLIB.prototype.Sogou = function(key) { //搜狗
		try {
			if (!FDLIB.prototype.__serch_test__(key)) {
				throw new Error("抛出一个异常"); //如果测试搜索关键词不合法，手动抛出一个异常
			}
			window.open(
				`https://www.sogou.com/web?query=${key}&_asf=www.sogou.com&_ast=&w=01019900&p=40040100&ie=utf8&from=index-nologin&s_from=index`
			);
			FDLIB.prototype.console(`Sougou("${key}")`, "color:#fe6f17");
		} catch {
			//code
			FDLIB.prototype.error(4);
			return false;
		}
		return true;
	};

	FDLIB.prototype.Bilibili = function(key) { //B站
		try {
			if (!FDLIB.prototype.__serch_test__(key)) {
				throw new Error("抛出一个异常"); //如果测试搜索关键词不合法，手动抛出一个异常
			}
			window.open(
				`https://search.bilibili.com/all?keyword=${key}&from_source=nav_search&spm_id_from=333.851.b_696e7465726e6174696f6e616c486561646572.11`
			);
			FDLIB.prototype.console(`Bilibili("${key}")`, "color:#fb7299");
		} catch {
			//code
			FDLIB.prototype.error(4);
			window.open(`https://search.bilibili.com/`); //打开B站搜索页面
			return false;
		}
		return true;
	};

	FDLIB.prototype.Patchy = function(key) { //帕琪站
		try {
			if (!FDLIB.prototype.__serch_test__(key)) {
				throw new Error("抛出一个异常"); //如果测试搜索关键词不合法，手动抛出一个异常
			}
			window.open(
				`https://patchyvideo.com/#/home?coupon=last_modified&keyword=${key}&qtype=tag`
			);
			FDLIB.prototype.console(`Patchy("${key}")`, "color:#e7d2ff");
		} catch {
			//code
			FDLIB.prototype.error(4);
			window.open(`https://patchyvideo.com/`); //打开帕琪站主页
			return false;
		}
		return true;
	};

	FDLIB.prototype.Search = function(key, engine) { //搜索函数 参数 key: 搜索关键词 engine: 搜索引擎
		try {
			
			try{this.Search_Before();}catch(error){}	//API函数执行前
			
			key = key || this.__search_key__;
			if (!FDLIB.prototype.__serch_test__(key)) {
				throw new Error("抛出一个异常"); //如果测试搜索关键词不合法，手动抛出一个异常
			}
			
			engine = engine || this.__search_engine__;//
			
			var ren = false; //返回值，判断函数是否成功执行
			switch (engine) {

				case 0:
				case 1:
				case "baidu":
				case "Baidu":
				case "百度":
					{
						//FDLIB.prototype.console("baidu");
						FDLIB.prototype.Baidu(key);
						ren = 1;
						break;
					}

				case 2:
				case "Google":
				case "google":
				case "谷歌":
					{
						FDLIB.prototype.Google(key);
						ren = 2;
						break;
					}

				case 3:
				case "sougou":
				case "Sougou":
				case "sogou":
				case "搜狗":
					{
						FDLIB.prototype.Sogou(key);
						ren = 3;
						break;
					}

				case 4:
				case "bilibili":
				case "Bilibili":
				case "B站":
					{
						//FDLIB.prototype.console("baidu");
						FDLIB.prototype.Bilibili(key);
						ren = 4;
						break;
					}
				case 5:
				case "Patchy":
				case "patchy":
				case "帕琪站":
				case "帕琪":
					{
						FDLIB.prototype.Patchy(key);
						ren = 5;
						break;
					}

				default:
					FDLIB.prototype.console(`错误：key:${key};engine:${engine}`);
					ren = 0;
			}
			try{this.Search_After();}catch(error){}	//API函数执行后
		} catch (error) {
			//code
			FDLIB.prototype.error(4);
			return false;
		}
	};

	//其他
	this.debug = false;
	FDLIB.prototype.fun = function() { //TEST
		console.log("->");
	};

	//兼容性
	FDLIB.prototype.Console = FDLIB.prototype.console;
	FDLIB.prototype.Error = FDLIB.prototype.error;
}

//
//var f = new FDLIB;
