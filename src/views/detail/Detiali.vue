<template>
  <div id="detialitop">
    <detiali-nav-bar
      class="detailNav"
      @titleClick="titleClick"
      ref="nav"
    ></detiali-nav-bar>
      <scroll
        class="content"
        ref="scroll"
        :probe-type="3"
        @scroll="contentScroll"
      >
        <detiali-swiper :top-images="topImages"></detiali-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info
          :detail-info="detailInfo"
          @imageLoad="imageLoad"
        ></detail-goods-info>
          <detail-param-info
            :param-info="paramInfo"
            ref="params"
          ></detail-param-info>
            <detail-comment-info
              :comment-info="commentInfo"
              ref="comment"
            ></detail-comment-info>
              <goods-list
                :goods="recommend"
                ref="recommend"
              ></goods-list>
                </scroll>
                <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
import DetialiNavBar from "@/views/detail/DetialiNavBar";
import DetialiSwiper from "@/views/detail/DetialiSwiper";
import DetailBaseInfo from "@/views/detail/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/DetailCommentInfo";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "@/views/detail/DetailBottomBar"

import Scroll from "@/components/common/scroll/Scroll";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "@/network/detail.js";
import { debounce } from "@/common/utils.js";

export default {
  name: "Detiali",
  components: {
    DetialiNavBar,
    DetialiSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      //保存商品详情数据
      this.detailInfo = data.detailInfo;
      //尺码数据
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      this.$nextTick(() => {});
    });
    getRecommend().then(res => {
      this.recommend = res.data.list;
    });
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
    }, 100);
  },
  mounted() {},
  methods: {
    imageLoad() {
      this.$refs.scroll.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      //1.获取y值
      const positionY = -position.y;
      //2.positionY和主题中值进行对比
      //[0-7938-9120-9452]
      //positionYz在0-7938，index=0
      //positionYz在7938-9120，index=1
      //positionYz在9120-9452，index=2
      //positionYz在9452以上，index=3
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          {
            this.currentIndex = i;
            console.log(this.currentIndex);
            this.$refs.nav.currindex = this.currentIndex;
          }
        }
      }
    }
  }
};
</script>
<style scoped>
#detialitop {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
  overflow: hidden;
}
/* .detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
} */
</style>