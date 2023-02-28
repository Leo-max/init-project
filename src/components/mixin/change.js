import util from '@/util'
export default {
  data () {
    return {
      winSize: window.innerWidth
    }
  },
  created: function() {
    window.onresize = util.debounce(this.change, this, 100)
  },
  destroyed() {
    window.onresize = null
  },
  methods: {
    change() {
      this.winSize = window.innerWidth
    }
  }
}
