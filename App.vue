<script>
	import moment from "./moment.js"
	
	export default {
		globalData:{
			userID: '',
		},
		data(){
			return{
				settings_indexShowContent: false,
				settings_indexShowDate: false,
			}			
		},
		onLaunch: function() {
			console.log('App Launch');
			// read data from local
			// if
			// plus.storage.
			this.$options.globalData.userID = plus.storage.getItem("userID");
			//first launch data settting
			var numberOfJournals = plus.storage.getItem("numberOfJournals");
			console.log("numberOfJournals: " +numberOfJournals);
			if(numberOfJournals == null){
				console.log("setting numberOfJournals to 0")
				plus.storage.setItem("numberOfJournals", "0");
			}
			//load settings
			//TODO
			this.settings_indexShowContent = plus.storage.getItem("settings_indexShowContent");
			this.settings_indexShowDate = plus.storage.getItem("settings_indexShowDate");
			// settings.indexShowDate = plus.storage.getItem("settings.indexShowDate")
			// settings.indexShowContent = plus.storage.getItem("settings.indexShowContent")
			
			//notification setting
			// var notificationDate = plus.storage.getItem("notificationDate");
			// var date1 = new Date();
			// if(notificationDate != date1.getDate()){
			// 	console.log(notificationDate);
			// 	console.log(date1.getDate());
			// 	console.log("notification not set for today");
			// 	var morningTime = new Date();
			// 	var eveningTime = new Date();
			// 	morningTime.setHours(9,0,0);
			// 	eveningTime.setHours(20,0,0);
			// 	var diff = (morningTime.getTime() - date1.getTime())/1000 + 86400; //the next morning
			// 	if(diff > 0 ){
			// 		console.log(diff);
			// 		plus.push.createMessage("Gratitude Journal Reminder 9 am reminder", undefined, {delay: diff});
			// 	}
			// 	diff = (eveningTime.getTime() - date1.getTime())/1000;
			// 	if(diff > 0 ){
			// 		console.log(diff);
			// 		plus.push.createMessage("Gratitude Journal Reminder 8 pm reminder", undefined, {delay: diff});
			// 	}
			// 	plus.storage.setItem("notificationDate", date1.getDate()+"");
			// }else{
			// 	console.log("notification already set for today");
			// }
			// plus.push.createMessage("test message 30sec delay", undefined, {delay: 30});
			// plus.push.createMessage("test message instant");
			
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "./common/uni.css";
	page,
	view {
		display: flex;/* uni-app默认使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。若不需要flex布局可删除本行*/
	}
</style>
