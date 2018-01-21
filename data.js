var app = new Vue({
	el: '#app',
  data () {
  	return {
      max: 0,
      project: {
        title: '',
        type: '',
        month: '',
        date: '',
        hour: '',
        minute: '',
        color: ''
      },
    	timers: [
      	
      ]
    }
  },
  mounted () {
  	this.runTimer(true)
  	setInterval(this.runTimer.bind(this), 1000)
  },
  methods: {
    set: function (event) {
      var color = "#" + $(".jscolor").val()
      var sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt("0x" + color.slice(i, i + 2)));    
      }
      color = "rgba(" + sColorChange.join(",") + ",0.3)";
      if(this.project.type == '时间点') {
        newTimer = { name: this.project.title, type: 2, color: color, pause: false, timestamp: moment().set({'month': this.project.month - 1, 'date': this.project.date, 'hour': this.project.hour, 'minute': this.project.minute, 'second': 0}).valueOf(), countdown: 0, percent: 0 }
      }
      else {
        newTimer = { name: this.project.title, type: 1, color: color, pause: false, timestamp: moment().add({'days': this.project.date, 'hours': this.project.hour, 'minutes': this.project.minute}).valueOf(), countdown: 0, percent: 0 }
      }
      console.log(newTimer.color)
      this.timers.push(newTimer)
      this.runTimer(true)
    },
    pause: function (timer) {
      if(timer.pause == false) {
        timer.pause = true
      }
      else {
        timer.timestamp = moment() + timer.countdown * 1000
        timer.pause = false
      }
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
        if(timer.pause == true) {

        }
        else {
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
  }
})
