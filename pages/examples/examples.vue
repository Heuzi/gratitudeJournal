<template>
	<view class="full-page">
		<form @submit="save">
			<view class="cu-form-group margin-top">
				<text>Daily Journal Examples</text>
			</view>
			
			<view class="cu-form-group margin-top">
				<text>I am grateful for today's beautiful weather because it reminded me of how much I love nature and I felt more energetic at work.</text>
				<!-- <textarea value="I am grateful for today's beautiful weather because it reminded me of how much I love nature and I felt more energetic at work."/> -->
			</view>
			<view class="cu-form-group margin-top">
				<text>I am grateful to my colleague Jess because she cheers me up whenever I feel down.</text>
				
			</view>
			<view class="cu-form-group margin-top">
				<text>I am grateful that my partner made me coffee this morning because I felt being cared for and wanted to do the same.</text>
			</view>
			<!-- <input class="uni-input" v-model="title" placeholder="optional title"/> -->
			<!-- <text>{{date}}</text> -->
			<!-- <textarea maxlength="-1" v-model="content" placeholder="I am grateful for ... because ..." /> -->
			<!-- <button form-type="reset">Reset</button> -->
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
