<template>
  <div style="height: 100%">
    <x-header :left-options="{backText: ''}">问答中心</x-header>
    <tab :line-width=2 active-color='rgb(253,106,76)' v-model="index">
        <tab-item class="vux-center" :selected="selectedId == item.faq_type_id" v-for="(item, index) in navList" @click="selectedId = item.faq_type_id" :key="index">{{item.faq_type_name}}</tab-item>
    </tab>
    <swiper v-model="index" :show-dots="false">
        <swiper-item v-for="(item, index) in navList" :key="index">
          <div class="tab-swiper vux-center">
            <group>
              <cell v-for="(list, i) in lists" :title="list.question" value="" is-link></cell>
            </group>
          </div>
        </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { XHeader, Group, Cell, Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'

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
    SwiperItem
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
      }],
      index: 0,
      selectedId: '1',
      lists: [{question: '如何获取积分？', 'faq_id': '1'}, {question: '如何查询交易记录？', 'faq_id': '2'}, {question: '订单被取消了怎么办？', 'faq_id': '3'}, {question: '如何使用支付方式', 'faq_id': '4'},{question: '忘记密码怎么办？', 'faq_id': '5'}],
      page: 1,
      pagesize:10,
      currentPage: 1,
    }
  },
  methods: {

  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
