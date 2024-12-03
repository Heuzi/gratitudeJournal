<template>
	<view class="full-page">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view class="padding flex flex-wrap justify-between align-end bg-white">
			<button class="cu-btn round" @click="settings">Settings</button>
			<button class="cu-btn round" @click="examples">Gratitude Examples</button>
			<button class="cu-btn round" @click="about">About</button>
		</view>
		<!-- <view class="text-area">
			<text class="title">{{title}}</text>
		</view> -->
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="newjournal">
				<view class="uni-media-list-body">
					<view class="uni-media-list-text-top" type="primary">+ New Journal</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">Date will be automatically set to today's date</view>
				</view>
			</view>
<!-- 			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-media-list-body">
					<view class="uni-media-list-text-top" @tap="openJournal" data-id="vhuierjivfnjsdf">journal1</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">sample date</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">sample content</view>
				</view>
			</view> -->
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(journal, index) in journals" :key="index" @tap="openJournal" :data-id="journal.id">
				<view class="uni-media-list-body">
					<view class="uni-media-list-text-top">{{journal.title}}</view>
					<view class="uni-media-list-text-bottom uni-ellipsis">{{journal.date}}</view>				
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Request from '../../utils/luch-request/request.js'
	import moment from "../../moment.js"
		
	function getJournal(i){
		// console.log("getJournal("+i+") is called");
		var journal = {id:i, title: null, date:null, content:null};
		journal.title = plus.storage.getItem("journal"+i+"_title");
		journal.date = plus.storage.getItem("journal"+i+"_date");
		journal.content = plus.storage.getItem("journal"+i+"_content");
		return journal;
	}
	export default {
		data() {
			return {
				title: 'Hello',
				numberOfJournals: 0,
				journals: [],
			}
		},
		onShow() {
			console.log("index onLoad()");
			uni.showLoading({
				title:"loading..."
			});
			this.numberOfJournals = parseInt(plus.storage.getItem("numberOfJournals"),10);
			this.journals = []
			// this.journals = [];
			var i;
			// for (i = 1; i <= this.numberOfJournals; i++) {
			for (i = this.numberOfJournals; i >0 ; i--) {
				// var journal = {title: null, date:null, content:null};
				// journal.title = plus.storage.getItem("journal"+i+"_title");
				// journal.date = plus.storage.getItem("journal"+i+"_date");
				// journal.content = plus.storage.getItem("journal"+i+"_content");
				// console.log("index onLoad() 21312");
				// this.journals.push("vvv");
				this.journals.push(getJournal(i));
				// console.log("index onLoad() 451");
				var submitted = plus.storage.getItem("journal"+i+"_submitted");
				if(submitted == 'false'){
					console.log(submitted);
					console.log(submitted == 'false')
					console.log("trying to submit journal id:" +i);
					var title = plus.storage.getItem("journal"+i+"_title");
					var date = plus.storage.getItem("journal"+i+"_date");
					var content1 = plus.storage.getItem("journal"+i+"_content1");	
					var content2 = plus.storage.getItem("journal"+i+"_content2");	
					var content3 = plus.storage.getItem("journal"+i+"_content3");
					
					var grateful = plus.storage.getItem("journal"+i+"_grateful");
					var happy = plus.storage.getItem("journal"+i+"_happy");
					var sad = plus.storage.getItem("journal"+i+"_sad");
					
					var grateful = parseInt(grateful,10);
					var happy = parseInt(happy,10);
					var sad = parseInt(sad,10);
					var journalID = i;
					var http = new Request();
					http.post('https://redcap.uits.iu.edu/api/', 
						{'token': '109C822E84832BAA0E9A842632F04772',
						'data':'[{"recordid":"55",'.concat(
							'"userid":', '"',getApp().globalData.userID, '",',
							'"journalid":', JSON.stringify(i),",",//'"',this.id,'",',
							'"title":', JSON.stringify(title),",",//'"',this.title, '",',
							'"date":', '"',moment(date, 'MM/DD/YYYY').format('YYYY-MM-DD'),'",',//this.date, 
							'"content1":', JSON.stringify(content1),",",
							'"content2":', JSON.stringify(content2),",",
							'"content3":', JSON.stringify(content3),",",
							'"grateful":', JSON.stringify(grateful+1),",",//'"',this.grateful+1+'','",',
							'"happy":', JSON.stringify(happy+1),",",//'"',this.happy+1+'','",',
							'"sad":', JSON.stringify(sad+1),",",//'"',this.sad+1+'','",',
							'"journal_complete":"2" }]'),
						// 'data':'[{  "recordid": "55",  "userid": "Hyuk",  "journalid": 22,  "title": "grat1",  "date": "2000-11-11",  "content": "I am grateful for good lunch today.",  "grateful": "2",  "happy": "0",  "sad": "8" ,"journal_complete":"2" }]',
						'content': 'record',
						'format': 'json',
						'type': 'flat',
						'overwriteBehavior': 'normal',
						'forceAutoNumber': 'true',
						'returnContent': 'count',
						'returnFormat': 'json',
						'forceAutoNumber': 'true'
						})
					.then(res => {
						console.log(res);
						console.log("notepad post success");
						plus.storage.setItem("journal"+journalID+"_submitted","true");
						console.log(journalID);
					}).catch(err => {
						console.log(err);
						console.log("notepad post fail")
					})
				}
			}
			console.log("before hide loading in index");
			// console.log(this.journals);
			// console.log(this.journals[0])
			uni.hideLoading();
		},
		// onShow() {
			
		// 	console.log("index onShow()");
		// 	var new_numberOfJournals = plus.storage.getItem("numberOfJournals");
		// 	if(new_numberOfJournals != this.numberOfJournals){
		// 		console.log("index onShow() refresh happens");
		// 		uni.showLoading({
		// 			title:"loading..."
		// 		});
		// 		var i;
		// 		for(i = parseInt(this.numberOfJournals,10) + 1; i <= new_numberOfJournals; i ++){
		// 			this.journals.push(getJournal(i));
		// 		}
		// 		this.numberOfJournals = new_numberOfJournals;
		// 		console.log("before hide loading in index");
		// 		uni.hideLoading();
		// 	}
		// },
		methods: {
			settings(){
				uni.navigateTo({
					url:'../setting/setting'
				})
			},
			examples(){
				uni.navigateTo({
					url:'../examples/examples'
				})
			},
			about(){
				uni.navigateTo({
					url:'../about/about'
				})
			},
			newjournal(){
				//convert to number?
				var id = this.numberOfJournals + 1; 
				uni.navigateTo({
					url: '../notepad1/notepad1?id='+id
				});
			},
			openJournal(e){
				console.log(e);
				var id = e.currentTarget.dataset.id;
				uni.navigateTo({
					url: '../notepad1/notepad1?id='+id
				});
			},
		}
	}
</script>

<style>
	.uni-media-list-body{height: auto;}
	


	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
