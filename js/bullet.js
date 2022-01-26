class Bullets {
    constructor(ctx, finalBulletPosX, finalBulletPosY, playerWidth, playerHeight, speed, playerPosX, playerPosY) {
      this.ctx = ctx
      this.bulletPos = {x: playerPosX + playerWidth / 2 - 25, y: playerPosY + playerHeight / 2 - 25}
      this.finalBulletPos = {x: finalBulletPosX, y: finalBulletPosY}
      this.initBulletPos = {x: this.bulletPos.x, y: this.bulletPos.y}
      this.speed = 3
      this.bulletSize = { w: 50, h: 50 }
      this.imageInstance = undefined
      this.init()
    }

    init() {
      this.imageInstance = new Image()
      this.imageInstance.src = "img/bullet.png"
    }

    draw() {
      this.move()
      this.ctx.drawImage(this.imageInstance, this.bulletPos.x, this.bulletPos.y, this.bulletSize.h, this.bulletSize.h)
  }

  normalize(x, y) {
    return Math.sqrt(x * x + y * y);
  }

  move() {
    let normal = this.normalize(this.initBulletPos.x - this.finalBulletPos.x, this.initBulletPos.y - this.finalBulletPos.y)

    this.bulletPos.x +=
      ((this.finalBulletPos.x - this.initBulletPos.x) / normal) * this.speed
      this.bulletPos.y += ((this.finalBulletPos.y - this.initBulletPos.y) / normal) * this.speed
  }
}
