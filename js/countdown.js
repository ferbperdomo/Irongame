class Countdown {
    constructor(ctx, clockPosX = 200, clockPosY = 400) {
      this.currentTime = 0
      this.ctx = ctx
      this.clockPos = {x: clockPosX, y: clockPosY}

    }

    draw(seconds) {
        this.ctx.font = "450px sans-serif"
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
        if (seconds < 10) {
            seconds = `0${seconds}`
        } else if (seconds === 0){
            setTimeout(() => {
                clearInterval(this.intervalID)
            }, 1000);
        }
        this.ctx.fillText(`${seconds}`,this.clockPos.x, this.clockPos.y );
    }

}
  
