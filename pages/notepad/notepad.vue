<template>
<!-- 	<cu-custom bgColor="bg-gradual-blue" :isBack="true">
	    <block slot="backText">Back</block>
	    <block slot="content">Journal</block>
	</cu-custom> -->
	<view class="full-page">
		<form @submit="save">
			<view class="cu-form-group margin-top">
				<view class="title">Title</view>
				<input placeholder="optional title" v-model="title"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">Date</view>
				<text>{{date}}</text>
			</view>
			<view class="cu-form-group margin-top">
				<text>Self Assessment</text>
			</view>
			<view class="cu-form-group">
				<view class="align-start title">How grateful do you feel today?</view>
				<picker @change="gratefulPickerChange"  :value="grateful" :range= "gratefularray">
					<view class="picker">{{array[grateful]}}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">How happy do you feel today?</view>
				<picker @change="happyPickerChange"  :value="happy" :range= "happyarray">
					<view class="picker">{{array[happy]}}</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">How sad do you feel today?</view>
				<picker @change="sadPickerChange"  :value="sad" :range= "sadarray">
					<view class="picker">{{array[sad]}}</view>
				</picker>
			</view>
			<!-- 
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						当前选择
					</view>
					<view class="uni-list-cell-db">
						<picker :value="sad" :range="array">
							<view class="uni-input">{{array[sad]}}</view>
						</picker>
					</view>
				</view>
			</view> -->
			
			<view class="cu-form-group margin-top margin-bottom">
				<textarea maxlength="-1" v-model="content1" placeholder="I am grateful for/to/that ... because ..." />
			</view>
			<view class="cu-form-group margin-top margin-bottom">
				<textarea maxlength="-1" v-model="content2" placeholder="I am grateful for/to/that ... because ..." />
			</view>
			<view class="cu-form-group margin-top margin-bottom">
				<textarea maxlength="-1" v-model="content3" placeholder="I am grateful for/to/that ... because ..." />
			</view>
			<!-- <input class="uni-input" v-model="title" placeholder="optional title"/> -->
			<!-- <text>{{date}}</text> -->
			<!-- <textarea maxlength="-1" v-model="content" placeholder="I am grateful for ... because ..." /> -->
			<button form-type="submit">Save</button>
			<!-- <button form-type="reset">Reset</button> -->
		</form>
	</view>
</template>

<script>
	import Request from '../../utils/luch-request/request.js'
	import moment from "../../moment.js"
	export default {
		data() {
			return {
				id: null,
				title: '',
				date: '',
				content1: '',
				content2: '',
				content3: '',
				grateful:0,
				happy:0,
				sad:0,
				submitted: "false",
				array:['1','2','3','4','5','6','7','8','9','10'],
				sadarray:['1(least sad)','2','3','4','5','6','7','8','9','10(most sad)'],
				happyarray:['1(least happy)','2','3','4','5','6','7','8','9','10(most happy)'],
				gratefularray:['1(least grateful)','2','3','4','5','6','7','8','9','10(most grateful)'],
			}
		},
		onLoad: function(e) {
			console.log(e);
			this.id = parseInt(e.id,10);
			uni.showLoading({
				title:"loading..."
			})
			var numberOfJournals = parseInt(plus.storage.getItem("numberOfJournals"),10);
			if(this.id > numberOfJournals){
				console.log("1");
				//TODO bugged here.
				this.date = moment().format('MM-DD-YYYY'); //Date.getDate();
				//new journal
			}else{
				console.log("2");
				this.title = plus.storage.getItem("journal"+this.id+"_title");
				this.date = plus.storage.getItem("journal"+this.id+"_date");
				this.content1 = plus.storage.getItem("journal"+this.id+"_content1");	
				this.content2 = plus.storage.getItem("journal"+this.id+"_content2");	
				this.content3 = plus.storage.getItem("journal"+this.id+"_content3");
				
				this.grateful = plus.storage.getItem("journal"+this.id+"_grateful");
				this.happy = plus.storage.getItem("journal"+this.id+"_happy");
				this.sad = plus.storage.getItem("journal"+this.id+"_sad");
				console.log(this.sad);
				this.grateful = parseInt(this.grateful,10);
				this.happy = parseInt(this.happy,10);
				this.sad = parseInt(this.sad,10);
				console.log(this.sad);
				this.submitted = plus.storage.getItem("journal"+this.id+"_submitted");
				
			}
			console.log("before hideLoading");
			uni.hideLoading();
			
		},
		methods: {
			sadPickerChange(e) {
				this.sad = parseInt(e.detail.value,10);
			},
			happyPickerChange(e) {
				this.happy = parseInt(e.detail.value,10);
			},
			gratefulPickerChange(e){
				this.grateful = parseInt(e.detail.value,10);
			},
			save(e){
				uni.showLoading({
					title:"saving..."
				})
				plus.storage.setItem("journal"+this.id+"_submitted","false");
				
				var numberOfJournals = parseInt(plus.storage.getItem("numberOfJournals"),10);
				console.log("number of journals: "+ numberOfJournals);
				console.log("this.id: "+this.id);
				if(this.id > numberOfJournals){
					console.log("save new journal. Current numberof Journals: "+ numberOfJournals);
					plus.storage.setItem("numberOfJournals", this.id+"");
					numberOfJournals = parseInt(plus.storage.getItem("numberOfJournals"),10);
					console.log("number of journals after save: "+ numberOfJournals);
				}				
				plus.storage.setItem("journal"+this.id+"_title", this.title);
				plus.storage.setItem("journal"+this.id+"_date", this.date);
				plus.storage.setItem("journal"+this.id+"_content1",this.content1);
				plus.storage.setItem("journal"+this.id+"_content2",this.content2);
				plus.storage.setItem("journal"+this.id+"_content3",this.content3);
				
				// console.log(this.content);
				plus.storage.setItem("journal"+this.id+"_grateful",this.grateful+'');
				plus.storage.setItem("journal"+this.id+"_happy",this.happy+'');
				plus.storage.setItem("journal"+this.id+"_sad",this.sad+'');
				console.log(this.sad);
				uni.hideLoading();
				
				//submitting mechanism here. we can hide the UIs from the user.
				const http = new Request();
				http.post('https://redcap.uits.iu.edu/api/', 
					{'token': '109C822E84832BAA0E9A842632F04772',
					'data':'[{"recordid":"55",'.concat(
						'"userid":', '"',getApp().globalData.userID, '",',
						'"journalid":', JSON.stringify(this.id),",",//'"',this.id,'",',
						'"title":', JSON.stringify(this.title),",",//'"',this.title, '",',
						'"date":', '"',moment(this.date, 'MM/DD/YYYY').format('YYYY-MM-DD'),'",',//this.date, 
						'"content1":', JSON.stringify(this.content1),",",
						'"content2":', JSON.stringify(this.content2),",",
						'"content3":', JSON.stringify(this.content3),",",
						'"grateful":', JSON.stringify(this.grateful+1),",",//'"',this.grateful+1+'','",',
						'"happy":', JSON.stringify(this.happy+1),",",//'"',this.happy+1+'','",',
						'"sad":', JSON.stringify(this.sad+1),",",//'"',this.sad+1+'','",',
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
					plus.storage.setItem("journal"+this.id+"_submitted","true");
				}).catch(err => {
					console.log(err);
					console.log("notepad post fail")
				})
				// console.log("reached here");
				// const token = '109C822E84832BAA0E9A842632F04772';
				// const options = {
				// 	host: 'redcap.uits.iu.edu',//https://
				// 	path: '/api/'
				// };
				// console.log("reached here");
				// // var redcap = require('../../node_modules/redcap')(token, options);
				// var redcap = require('redcap')(token, options);
				// console.log("reached here");
				// // var recordID = redcap.projects.generateNextRecordName();
				// var data = [{userid: getApp().globalData.userID,
				// 	journalid: this.id,
				// 	title: this.title, 
				// 	date: this.date, 
				// 	content: this.content,
				// 	grateful: this.grateful,
				// 	happy: this.happy,
				// 	sad: this.sad}];
				// var params = {
				// 	data: data,
				// 	type: 'flat', 
				// 	overwriteBehavior: 'normal',
				// };
				// console.log("reached here");
				// redcap.records.import (params, function (err, res) {
				//       // error containts oprtional errors
				//       if (err) {
				//           // handle error
				// 		  console.log("import record failed");
				// 		  console.log(err);
				//       }
				//       else {
				//           // res is return value
				// 		  console.log("import record success");
				//           console.log (res);
				//       }
				// });
				// console.log("reached here");
			}
		}
	}
</script>

<style>

</style>
