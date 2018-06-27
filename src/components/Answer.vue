<template>
  <div style="height: 100%">
    <x-header :left-options="{backText: ''}">问答详情</x-header>
    <group style="height: calc(100% - 56px);background:#fff;" class="detailWrap">
      <cell :title="title" value="" class="title" style=" padding: 15px;">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../static/images/question.jpg">
      </cell>
      <cell :title="content" value="" class="content" style=" padding: 15px;align-items: end;">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../static/images/answer.jpg">
      </cell>
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
      content: '在很多网站上都可以看到FAQ，列出了一些用户常见的问题，是一种在线帮助形式。在利用一些网站的功能或者服务时往往会遇到一些看似很简单，但不经过说明可能很难搞清楚的问题，有时甚至会因为这些细节问题的影响而失去用户，其实在很多情况下，只要经过简单的解释就可以解决这些问题，这就是FAQ的价值',
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
.title {
  border-bottom: 1px solid #e6e6e6;
}
.title label.vux-label {
  font-size: 16px;
  font-weight: 600;
  margin-left: 5px;
}
.content label.vux-label {
  color: #666;
  margin-left: 5px;
}
.detailWrap .weui-cells:before, .detailWrap .weui-cells:after, .detailWrap .weui-cell:before {
  display: none;
}

</style>
