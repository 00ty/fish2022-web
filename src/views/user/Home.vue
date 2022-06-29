<template>
	<div>
		<InfoCard :userDate="user" />
		<div class="list" v-show="user">
			<van-cell-group>
				<van-cell title="收藏夹" icon="star-o" is-link />
				<van-cell title="设置" icon="setting-o" is-link />
				<van-cell title="退出登录" icon="close" @click="logout" />
			</van-cell-group>
		</div>
	</div>
</template>
<script>
import InfoCard from '@/components/user/InfoCard.vue';

export default {
	data () {
		return {
			user : '1'
		}
	},
	components: {InfoCard},
	methods: {
		logout () {
			this.$store.dispatch('logout');
			this.$router.push('/');
		}
	},
}
</script>
<style scoped>
</style>