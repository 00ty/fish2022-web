<template>
	<div>
		测试
		<div style="padding: 30px">
			<van-button plain hairline type="danger" size="small" @click="go">发送数据</van-button>
		</div>
	</div>
</template>
<script>
import api from '@/api'

export default {
	data () {
		return {
			user : ''
		}
	},
	methods : {
		go() {
			// 使用api
			api.getInit().then(data=>{
				console.log(data)
			})
		}
	}
}
</script>