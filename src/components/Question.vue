<template>
  <div style="height: 100%">
    <x-header :left-options="{backText: ''}">问答中心</x-header>
    <tab :line-width=2 active-color='#fe6d4c' v-model="index">
        <tab-item class="vux-center" :selected="selectedId == item.faq_type_id" v-for="(item, index) in navList" @on-item-click="tabChange(item.faq_type_id)" :key="index" >{{item.faq_type_name}}</tab-item>
    </tab>
    <scroller lock-x scrollbar-y use-pullup use-pulldown height="-111" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller" class="scrollerWrap">
      <group>
        <cell v-for="(list, i) in lists" :title="list.question" value="" is-link :key="i" style="padding: 15px;" @click.native="detailEvt(list.faq_id)"></cell>
      </group>
      <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
        <span v-show="status.pulldownStatus === 'default'"></span>
        <span class="pulldown-arrow" v-show="status.pulldownStatus === 'down' || status.pulldownStatus === 'up'" :class="{'rotate': status.pulldownStatus === 'up'}" style="font-size: 13px;color: #7c7c7c;">下拉可以刷新</span>
        <span v-show="status.pulldownStatus === 'loading'" style="font-size: 13px;color: #7c7c7c;"><spinner type="ios-small"></spinner>刷新中...</span>
      </div>
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="status.pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="status.pullupStatus === 'default' || status.pullupStatus === 'up' || status.pullupStatus === 'down'" :class="{'rotate': status.pullupStatus === 'down'}" style="font-size: 13px;color: #7c7c7c;">上拉加载更多</span>
        <span v-show="status.pullupStatus === 'loading'" style="font-size: 13px;color: #7c7c7c;"><spinner type="ios-small"></spinner>加载中...</span>
      </div>
    </scroller>
   <!--  <swiper v-model="index" :show-dots="false">
        <swiper-item v-for="(item, index) in navList" :key="index">
          <div class="tab-swiper vux-center">
            
          </div>
        </swiper-item>
    </swiper> -->
  </div>
</template>

<script>
import { XHeader, Group, Cell, Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Scroller, Spinner } from 'vux'

export default {
  components: {
    XHeader,
    Group,
    Cell,
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem,
    Scroller,
    Spinner
  },
  data () {
    return {
      navList: [{
        "faq_type_id": "1",
        "faq_type_name": "猜你要问"
      },{
        "faq_type_id": "2",
        "faq_type_name": "购买需要"
      },{
        "faq_type_id": "3",
        "faq_type_name": "海关问题"
      },{
        "faq_type_id": "4",
        "faq_type_name": "税金"
      },{
        "faq_type_id": "5",
        "faq_type_name": "账户管理"
      },],
      index: 0,
      selectedId: '1',
      lists: [{question: '如何获取积分？', 'faq_id': '1'}, {question: '如何查询交易记录？', 'faq_id': '2'}, {question: '订单被取消了怎么办？', 'faq_id': '3'}, {question: '如何使用支付方式', 'faq_id': '4'},{question: '忘记密码怎么办？', 'faq_id': '5'},{question: '如何获取积分？', 'faq_id': '1'}, {question: '如何查询交易记录？', 'faq_id': '2'}, {question: '订单被取消了怎么办？', 'faq_id': '3'}, {question: '如何使用支付方式', 'faq_id': '4'},{question: '忘记密码怎么办？', 'faq_id': '5'}],
      page: 1,
      pagesize:10,
      currentPage: 1,
      n: 10,
      pullupEnabled: true,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
      curType: '',
      pulldownConfig: {
        content: '下拉可以刷新',
        downContent: '下拉可以刷新',
        upContent: '释放可刷新...',
        loadingContent: '刷新中...'
      },
      pullupConfig: {
        // content: '上拉加载更多',
        // downContent: '松开进行加载',
        // upContent: '上拉加载更多',
        // loadingContent: '加载中...'
      }
    }
  },

  mounted() {
    this.getTabWidth();
  },

  methods: {
    // 下拉刷新
    refresh () {
      setTimeout(() => {
        // this.status.pulldownStatus = 'default'
      }, 1000)
    },

    // 加载更多
    loadMore () {
      setTimeout(() => {
        this.n += 10
        setTimeout(() => {
         this.status.pullupStatus = 'default'
        }, 10)
        if (this.n === 30) { // unload plugin
          setTimeout(() => {
            this.status.pullupStatus = 'disabled'
          }, 100)
        }
      }, 2000)
    },

    // 计算tab宽度
    getTabWidth () {
      let width = ($('.vux-tab .vux-tab-item').length - 1)*15
      $('.vux-tab .vux-tab-item').each(function(i,item){
        let w = $(item).outerWidth();
        width += w;
      })
      $('.vux-tab').css('width', width);
    },

    // 获取
    getScollerH () {

    },

    // 获取faq问题类型
    getFaqType () {

    },

    // 获取当前类型下的问题列表
    getList () {

    },

    // 跳转至详情页面
    detailEvt (id) {
      localStorage.setItem('fid', id);
      this.$router.push({
        path:'/answer'
      })
    },

    // 切换tab
    tabChange (id) {
      if(this.selectedId == id) return;
      this.selectedId = id;
    }
  }
}
</script>

<style>

</style>
