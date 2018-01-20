var app = new Vue({
	el: '#app',
  data () {
  	return {
      max: 0,
      project: {
        title: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
      },
    	timers: [
      	{ name: '计划', timestamp: moment().add(5, 'second').valueOf(), countdown: 0, percent: 0 },
      	{ name: '明天', timestamp: moment().add(10, 'second').valueOf(), countdown: 0, percent: 0 },
      	{ name: '死线', timestamp: moment().add(15, 'second').valueOf(), countdown: 0, percent: 0 }
      ]
    }
  },
  mounted () {
  	this.runTimer(true)
  	setInterval(this.runTimer.bind(this), 1000)
  },
  methods: {
    set: function (event) {
      newTimer = { name: this.project.title, timestamp: moment().set({'month': this.project.month - 1, 'date': this.project.date, 'hour': this.project.hour, 'minute': this.project.minute, 'second': 0}).valueOf(), countdown: 0, percent: 0 }
      this.timers.push(newTimer)
      this.runTimer(true)
    },
  	format (time, format) {
    	return moment(time).format(format)
    },
    timeDiff (t) {
      let hms = `${Math.floor(t/3600)}:${Math.floor(t%3600/60)}:${t%60}`
    	return hms
    },
    runTimer (init) {
    	for (let i in this.timers) {
        let timer = this.timers[i]
        if(moment(timer.timestamp).isBefore(moment())) {
          timer.countdown = 0
        }
        else {
          timer.countdown = Math.floor(moment(timer.timestamp).diff(moment()) / 1000)
          if (init) {
            this.max = Math.max(this.max, timer.countdown)
          }
          else {
            timer.percent = timer.countdown / this.max
          }
        }
      }
    }
  }
})
