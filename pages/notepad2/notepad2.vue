<template>
<!-- 	<cu-custom bgColor="bg-gradual-blue" :isBack="true">
	    <block slot="backText">Back</block>
	    <block slot="content">Journal</block>
	</cu-custom> -->
	<view class="full-page">
		<form @submit="save">
			<view class="cu-form-group margin-top">
				<text>Daily Journal</text>
				<button class="cu-btn round" @click="examples">Gratitude Examples</button>
			
			</view>
			
			<view class="cu-form-group margin-top margin-bottom">
				<textarea @blur="textConfirmed" maxlength="-1" v-model="content1" placeholder="I am grateful for/to/that ... because ..." />
			</view>
			<view class="cu-form-group margin-top margin-bottom">
				<textarea @blur="textConfirmed" maxlength="-1" v-model="content2" placeholder="I am grateful for/to/that ... because ..." />
			</view>
			<view class="cu-form-group margin-top margin-bottom">
				<textarea @blur="textConfirmed" maxlength="-1" v-model="content3" placeholder="I am grateful for/to/that ... because ..." />
			</view>
			<!-- <input class="uni-input" v-model="title" placeholder="optional title"/> -->
			<!-- <text>{{date}}</text> -->
			<!-- <textarea maxlength="-1" v-model="content" placeholder="I am grateful for ... because ..." /> -->
			<button form-type="submit">{{saveText}}</button>
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
				saveText: "Click to Save",
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
				this.title = plus.storage.getItem("journal"+this.id+"_title");
				this.date = plus.storage.getItem("journal"+this.id+"_date");
				this.content1 = plus.storage.getItem("journal"+this.id+"_content1");	
				this.content2 = plus.storage.getItem("journal"+this.id+"_content2");	
				this.content3 = plus.storage.getItem("journal"+this.id+"_content3");
				
				this.grateful = plus.storage.getItem("journal"+this.id+"_grateful");
				this.happy = plus.storage.getItem("journal"+this.id+"_happy");
				this.sad = plus.storage.getItem("journal"+this.id+"_sad");

				this.grateful = parseInt(this.grateful,10);
				this.happy = parseInt(this.happy,10);
				this.sad = parseInt(this.sad,10);

				this.submitted = plus.storage.getItem("journal"+this.id+"_submitted");
				if(this.submitted=='true'){
					this.saveText='Saved';
				}
			}
			console.log("before hideLoading");
			uni.hideLoading();
			
		},
		methods: {
			examples(){
				uni.navigateTo({
					url:'../examples/examples'
				})
			},
			textConfirmed(e){
				console.log("textConfirmed");
				this.saveText ='Click to Save';
			},
			save(e){
				uni.showLoading({
					title:"saving..."
				})
				plus.storage.setItem("journal"+this.id+"_submitted","false");
				
				plus.storage.setItem("journal"+this.id+"_content1",this.content1);
				plus.storage.setItem("journal"+this.id+"_content2",this.content2);
				plus.storage.setItem("journal"+this.id+"_content3",this.content3);
				
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
				this.saveText='Saved';
			}
		}
	}
</script>

<style>

</style>
