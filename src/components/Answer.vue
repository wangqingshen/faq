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
import { XHeader, Group, Cell} from 'vux'

export default {
  components: {
    XHeader,
    Group,
    Cell
  },
  data () {
    return {
      // apiurl: 'api',
      apiurl: 'https://apisdbtest.ihangou.com/api.php',
      id: localStorage.getItem('fid'),
      title: '',
      content: '',
    }
  },
  mounted () {
    this.getinfo()
  },
  methods: {
    getinfo () {
      let d = {
        'faq_id': this.id
      },
      that = this;
      $.ajax({  
        url : this.apiurl,  
        type : 'post',  
        data : this.mergeInfo('get_faq_info', d),
        dataType : 'json',  
        success : function(data) {  
          if(data.errcode == 1) {
            let info = data.data;
            that.title = info.question;
            that.content = info.answer;
          }
        },
        error: function(data) {
          console.log(data);
        }
      })
    }
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
