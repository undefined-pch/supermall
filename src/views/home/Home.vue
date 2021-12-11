<template>
  <div
    id="home"
    class="wrapper"
  >
    <nav-bar class="navcolor">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tabcontrol"
      :title="['流行', '新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>
      <back-top
        @click.native="backtop"
        ref="scroll"
        v-show="istruebacktop"
      ></back-top>
        <scroll
          class="content"
          ref="scroll"
          :probe-type="3"
          @scroll="contentScroll"
          :pull-up-load="true"
          @pullingUp="loadMore"
        >
          <!-- ：probe-type可以实时传递坐标 -->
          <home-swipe
            :banners="banners"
            @swiperImageLoad="swiperImageLoad"
          ></home-swipe>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control
              :title="['流行', '新款','精选']"
              @tabClick="tabClick"
              ref="tabControl2"
            ></tab-control>
              <goods-list :goods="showGoods"></goods-list>
              </scroll>

              </div>
</template>

<script scoped>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwipe from "./childComps/HomeSwipe";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "./childComps/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

import Scroll from "@/components/common/scroll/Scroll";

import { debounce } from "@/common/utils.js";
import { getHomeMultidata, getHomeGoods } from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwipe,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currenttupe: "pop",
      istruebacktop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currenttupe].list;
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //将函数传到防抖函数形成新的函数
    const refresh = debounce(this.$refs.scroll.refresh);
    //监听item中图片加载完成
    //在created中创建可能找不到
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
    // console.log(this.$refs.tabControl2.$el.offsetTop);
  },
  activated() {
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currenttupe = "pop";
          break;
        case 1:
          this.currenttupe = "new";
          break;
        case 2:
          this.currenttupe = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backtop() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 600);
    },
    contentScroll(position) {
      //判断返回顶部是否显示
      this.istruebacktop = -position.y > 1000;
      //决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currenttupe);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    //网络请求
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //将网络请求封装后只需要传类型type就好
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        // console.log(res);
        this.goods[type].page += 1;
        //数据加载完之后
        this.$refs.scroll.scroll.finishPullUp();
      });
    }
  }
};
</script>
<style>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  /* position: relative; */
}
.navcolor {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
  /* 原生滚动 */
}
.tabcontrol {
  position: relative;
  z-index: 2;
}
.content {
  /* height: 44px; */
  height: cale(100%-93px);
  overflow: hidden;
  margin-top: -1px;

  /* position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0; */
}

/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
</style>