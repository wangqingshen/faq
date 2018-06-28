// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import '../static/less/common.less'
import Home from './components/Question'
import Answer from './components/Answer'
import axios from 'axios'
import VueAxios from 'vue-axios'
import $ from 'jquery'

Vue.use(VueRouter)
Vue.prototype.$http = axios;
axios.defaults.withCredentials = true;

const routes = [{
  path: '/',
  component: Home
},{
  path: '/answer',
  component: Answer
}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.mergeInfo = function(name, d){
	function getRandStr(n) {
		let str = '';
		for (let i = 0; i < n; i++) {
			str += Math.floor(Math.random() * 10).toString();
		}
		return str;
	}

	function getCurTime() {
		let date = new Date(),
			y = date.getFullYear().toString().substr(2),
			m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString(),
			d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString(),
			h = date.getHours() % 12 < 10 ? '0' + date.getHours() % 12 : (date.getHours() % 12).toString(),
			i = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes().toString(),
			s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds().toString();
		return (y + m + d + h + i + s);
	}

	var appId = '100',
		randStr = getRandStr(5),
		date = getCurTime(),
		// timestamp = new Date().getTime(),
		signature = hex_sha1(hex_sha1(date + randStr) + appId),
		info = {
			"header": {
				"timestamp": date,
				"nonce": randStr,
				"signature": signature
			},
			"cmd": {
				"name": name
			},
			"data": d,
			"version":"1.1.1 "
		};
	return JSON.stringify(info);
}

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
