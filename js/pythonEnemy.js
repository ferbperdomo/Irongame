class PythonEnemy {
    constructor(ctx, pythonEnemyX, pythonEnemyY, pythonEnemyWidth, pythonEnemyHeight, gameLimits, playerPos, speed = 3 ) {
        this.ctx = ctx
        this.pythonEnemyPos = {x: pythonEnemyX, y: pythonEnemyY}
        this.pythonEnemySize = {w: pythonEnemyWidth, h: pythonEnemyHeight}
        this.gameLimits =  gameLimits
        this.playerPos = playerPos
        this.speed = speed
        this.imageInstance = undefined
        
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = 'img/pythonEnemy.png'
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.pythonEnemyPos.x, this.pythonEnemyPos.y, this.pythonEnemySize.w, this.pythonEnemySize.h)
    }

    normalize(x, y) {
        return Math.sqrt(x * x + y * y)
      }
    
      move(playerPos) {
        let normal = this.normalize(playerPos.x - this.pythonEnemyPos.x, playerPos.y - this.pythonEnemyPos.y)
    
        playerPos.x != this.pythonEnemyPos.x &&
        (this.pythonEnemyPos.x += ((playerPos.x - this.pythonEnemyPos.x) / normal) * this.speed)
        playerPos.y != this.pythonEnemyPos.y &&
        (this.pythonEnemyPos.y += ((playerPos.y - this.pythonEnemyPos.y) / normal) * this.speed)
      }
   
}


