<template>
  <div style="height: 100%">
    <x-header :left-options="{backText: ''}">问答详情</x-header>
    <group>
      <cell :title="title" value="">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../static/images/question.jpg">
      </cell>
      <cell-box>
        cell-box hello world hello world hello world
      </cell-box>
    </group>
  </div>
</template>

<script>
import { XHeader, Group, Cell, Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, CellBox} from 'vux'

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
    CellBox
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
      title: '可以使用哪些支付方式',
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
