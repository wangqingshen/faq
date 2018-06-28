<template>
  <div style="height: 100%">
    <x-header :left-options="{backText: ''}">问答中心</x-header>
    <tab :line-width=2 active-color='#fe6d4c' v-model="index">
        <tab-item class="vux-center" :selected="selectedId == item.faq_type_id" v-for="(item, index) in navList" @on-item-click="tabChange(item.faq_type_id)" :key="index" >{{item.faq_type_name}}</tab-item>
    </tab>
    <scroller v-if="lists.length" lock-x scrollbar-y use-pullup use-pulldown height="-111" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller" class="scrollerWrap">
      <group>
        <cell v-for="(list, i) in lists" :title="list.question" value="" is-link :key="i" style="padding: 15px;" @click.native="detailEvt(list.faq_id)"></cell>
      </group>
      <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
        <span v-show="status.pulldownStatus === 'default'"></span>
        <span class="pulldown-arrow" v-show="status.pulldownStatus === 'down' || status.pulldownStatus === 'up'" :class="{'rotate': status.pulldownStatus === 'up'}" style="font-size: 13px;color: #7c7c7c;position: relative;padding-left: 23px;"><img src="../../static/images/ico_down.png" class="loading"/>下拉可以刷新</span>
        <span v-show="status.pulldownStatus === 'loading'" style="font-size: 13px;color: #7c7c7c;position: relative;padding-left: 23px;"><img src="../../static/images/loading.gif" class="loading"/>刷新中...</span>
      </div>
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="status.pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="status.pullupStatus === 'default' || status.pullupStatus === 'up' || status.pullupStatus === 'down'" :class="{'rotate': status.pullupStatus === 'down'}" style="font-size: 13px;color: #7c7c7c;">上拉加载更多</span>
        <span v-show="status.pullupStatus === 'loading'" style="font-size: 13px;color: #7c7c7c;position: relative;padding-left: 23px;"><img src="../../static/images/loading.gif" class="loading" />加载中...</span>
      </div>
    </scroller>
    <div class="nodata" v-if="!lists.length" style="height: calc(100% - 112px);">{{nodata}}</div>
   <!--  <swiper v-model="index" :show-dots="false">
        <swiper-item v-for="(item, index) in navList" :key="index">
          <div class="tab-swiper vux-center">
            
          </div>
        </swiper-item>
    </swiper> -->
    <div v-transfer-dom>
      <loading :show="loadingState" text="数据加载中"></loading>
    </div>
  </div>
</template>

<script>
import { XHeader, Group, Cell, Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Scroller, Spinner, Loading, TransferDomDirective as TransferDom} from 'vux'

export default {
  directives: {
    TransferDom
  },
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
    Spinner,
    Loading
  },
  data () {
    return {
      navList: [],
      index: 0,
      selectedId: '1',
      lists: [],
      pagesize:10,
      currentPage: 1,
      pullupEnabled: true,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
      // apiurl: 'api',
      apiurl: 'https://apisdbtest.ihangou.com/api.php',
      nodata: '',
      pulldownConfig: {
        // content: '下拉可以刷新',
        // downContent: '下拉可以刷新',
        // upContent: '释放可刷新...',
        // loadingContent: '刷新中...'
      },
      pullupConfig: {
        // content: '上拉加载更多',
        // downContent: '松开进行加载',
        // upContent: '上拉加载更多',
        // loadingContent: '加载中...'
      },
      compeleted: false,
      loadingState: true,
    }
  },

  mounted() {
    this.getFaqType();
  },

  methods: {
    // 下拉刷新
    refresh () {
      this.currentPage = 1;
      this.getList();
    },

    // 加载更多
    loadMore () {
      this.currentPage++;
      this.getList();
    },

    // 计算tab宽度
    getTabWidth () {
      let timer = setInterval(res=>{
        if(this.compeleted) {
          clearInterval(timer);
          let width = ($('.vux-tab .vux-tab-item').length - 1)*15+5;
          $('.vux-tab .vux-tab-item').each(function(i,item){
            let w = $(item).outerWidth();
            width += w;
          })
          $('.vux-tab').css('width', width);
        }
      },200)
    },

    // 获取faq问题类型
    getFaqType () {
      let that = this;
      $.ajax({  
        url : this.apiurl,  
        type : 'post',  
        data : this.mergeInfo('get_faq_type', ''),
        dataType : 'json',  
        success : function(data) {  
          if(data.errcode == 1) {
            that.compeleted = true;
            that.navList = data.data.list;
            that.selectedId = data.data.list[0].faq_type_id;
            that.getList();
            that.getTabWidth();
          }
        },
        error: function(data) {
          console.log(data);
        }
      })
    },

    // 获取当前类型下的问题列表
    getList () {
      let that = this;
      let d = {
        'faq_type_id': this.selectedId,
        'page': this.currentPage,
        'page_size': this.pagesize
      };
      $.ajax({  
        url : this.apiurl,  
        type : 'post',  
        data : this.mergeInfo('get_faq_list', d),
        dataType : 'json',  
        success : function(data) {  
          if(data.errcode == 1) {
            if(that.currentPage == 1) {
              that.lists = [];
            }
            let list = data.data.list;
            if(list.length) {
              for(var i in list) {
                let obj = list[i];
                that.lists.push(obj);
              }
            }else{
              that.nodata = '暂无数据信息';
              // that.status.pullupStatus = 'disabled'
            }
            that.status.pullupStatus = 'default'
            that.status.pulldownStatus = 'default'
            that.loadingState = false
          }
        },
        error: function(data) {
          console.log(data);
        }
      })
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
      this.currentPage = 1;
      this.lists = [];
      this.loadingState = true;
      this.nodata= '';
      this.status.pullupStatus = 'default';
      this.getList();
    }
  }
}
</script>

<style>
.loading {
  position: absolute;
  left: 0;
  top: 0;
  width: 18px;
}
.weui-toast__content {
  font-size: 13px;
  color: #fff;
}
</style>
