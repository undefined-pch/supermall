import BackTop from "components/content/backTop/BackTop.vue";
import {POP, NEW, SELL} from "./const";
//图片列表刷新
export const imgRefrashMixin = {
  mounted() {
  	//请求数据列表后刷新
  	this.itemImgLister = ()=> {
  		this.$refs.scroll.refresh();
  	}
  	this.$bus.$on('itemImgLoad',this.itemImgLister);
  }
}

//返回顶部
export const scrollTopMixin = {
  data() {
	  return {
		  isShowBackTop: false,
	  }
  },
  components: {
	  BackTop
  },
  methods: {
	  backTop(){
	  	//返回顶部
	  	this.$refs.scroll.scrollTo(0,0);
	  }
  }
}

export const tabControlMixin = {
	data: function () {
	  return {
		currentType: POP
	  }
	},
	methods: {
	  tabClick(index) {
		switch (index) {
		  case 0:
			this.currentType = POP
			break
		  case 1:
			this.currentType = NEW
			break
		  case 2:
			this.currentType = SELL
			break
		}
		console.log(this.currentType);
	  }
	}
  }