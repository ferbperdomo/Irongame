class OctoEnemy {
    constructor(ctx, octoEnemyX, octoEnemyY, octoEnemyWidth, octoEnemyHeight, gameLimits, speed = 5) {
        this.ctx = ctx
        this.octoEnemyPos = {x: octoEnemyX, y: octoEnemyY}
        this.octoEnemySize = {w: octoEnemyWidth, h: octoEnemyHeight}
        this.gameLimits =  gameLimits
        this.speed = speed
        this.imageInstance = undefined
        
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/octoEnemy.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.octoEnemyPos.x, this.octoEnemyPos.y, this.octoEnemySize.w, this.octoEnemySize.h)
        this.move()
    }

    move() {
        this.octoEnemyPos.y += this.speed
        this.checkCollision()
        
    }
    checkCollision() {
        if (this.octoEnemyPos.y >= this.gameLimits.b - this.octoEnemySize.h || this.octoEnemyPos.y <= this.gameLimits.t) {
            this.turn()
        }
    }
        
    turn(){
        this.speed *= -1
    }

}