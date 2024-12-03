<template>
	<view class="full-page">
		<form @submit="save">
			<view class="cu-form-group margin-top">
				<view class="title">User ID</view>
				<input placeholder="Once set, do not change" v-model="userID" :disabled="userIDset"></input>
				<!-- <text>Once this ID is set, you won't be able to modify it</text> -->
			</view>
			
			<button form-type="submit">Save</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userID:'',
				userIDset:false,
			}
		},
		onLoad() {
			this.userID = getApp().globalData.userID;
			console.log(this.userID);
			if(this.userID == '' || this.userID == undefined){
				console.log("this.userIDset = false;")
				this.userIDset = false;
			}else{
				console.log("this.userIDset = true;")
				this.userIDset = true;
			}
		},
		methods: {
			save(e){
				uni.showLoading({
					title:"saving..."
				})
				plus.storage.setItem("userID",this.userID);
				getApp().globalData.userID = this.userID;
				console.log(this.userID);
				console.log(plus.storage.getItem("userID"));
				this.userIDset = true;
				uni.hideLoading();
			}
		}
	}
</script>

<style>

</style>
