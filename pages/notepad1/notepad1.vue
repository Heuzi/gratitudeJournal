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
				<text>Daily Assessment</text>
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
			<button form-type="submit">Next</button>
		</form>
	</view>
</template>

<script>
	import Request from '../../utils/luch-request/request.js'
	import moment from "../../moment.js"
	export default {
		data() {
			return {
				changed: false,
				id: null,
				title: '',
				date: '',
				grateful:0,
				happy:0,
				sad:0,
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
				this.date = moment().format('MM-DD-YYYY'); //Date.getDate();
				this.changed = true;
				//new journal
			}else{
				// console.log("2");
				this.title = plus.storage.getItem("journal"+this.id+"_title");
				this.date = plus.storage.getItem("journal"+this.id+"_date");
				
				this.grateful = plus.storage.getItem("journal"+this.id+"_grateful");
				this.happy = plus.storage.getItem("journal"+this.id+"_happy");
				this.sad = plus.storage.getItem("journal"+this.id+"_sad");
				// console.log(this.sad);
				this.grateful = parseInt(this.grateful,10);
				this.happy = parseInt(this.happy,10);
				this.sad = parseInt(this.sad,10);
				// console.log(this.sad);
				// this.submitted = plus.storage.getItem("journal"+this.id+"_submitted");
				
			}
			// console.log("before hideLoading");
			uni.hideLoading();
			
		},
		methods: {
			sadPickerChange(e) {
				console.log(e.detail.value);
				var temp =parseInt(e.detail.value,10);
				console.log(temp);
				if(this.sad != temp){
					this.sad = temp;
					this.changed = true;
				}
				console.log(this.array[this.sad])
			},
			happyPickerChange(e) {
				var temp =parseInt(e.detail.value,10);
				if(this.happy != temp){
					this.happy = temp;
					this.changed = true;
				}
				// this.happy = parseInt(e.detail.value,10);
			},
			gratefulPickerChange(e){
				// this.grateful = parseInt(e.detail.value,10);
				var temp = parseInt(e.detail.value,10);
				if(this.grateful != temp){
					this.grateful = temp;
					this.changed = true;
				}
			},
			save(e){
				uni.showLoading({
					title:"saving..."
				})
				if(this.changed){
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
					
					plus.storage.setItem("journal"+this.id+"_grateful",this.grateful+'');
					plus.storage.setItem("journal"+this.id+"_happy",this.happy+'');
					plus.storage.setItem("journal"+this.id+"_sad",this.sad+'');
				}
				console.log(this.sad);
				uni.hideLoading();
				uni.navigateTo({
					url: '../notepad2/notepad2?id='+this.id
				});
			},
		}
	}
</script>

<style>

</style>
