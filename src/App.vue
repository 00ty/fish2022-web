<template>
	<div class="app">
		<router-view></router-view>

		<Tabbar v-show="$route.meta.navShow"/>
	</div>
</template>

<script>
import Tabbar from './components/common/Tabbar.vue'
export default {
	data () {
		return {}
	},
	components: {Tabbar},
	created () {
		this.$store.dispatch('getToken')
	},
}
</script>

<style scoped>
.app {
	width: 100%;
	height: 100%;
	/* background-color: #f5f5f5; */
}
</style>