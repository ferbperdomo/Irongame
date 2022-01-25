const irongame = {
    appName: 'Irongame',
    author: 'Cristian Perdomo y Ricardo Molpeceres' ,
    version: '1.0.0',
    license: undefined,
    gameSize: { w: 900, h: 500 },
    ctx: undefined,
    player: undefined,
    octoEnemies: [],
    pythonEnemies: [],
    bonus: [],
    bullets: [],
    coundown: 90, 
    FPS: 60,
    framesIndex: 0,
    gameLimits: {l: 90, r: 770, t: 50, b: 400},
    // game

    init() {
        this.setContext()
        this.createBackground()
        this.createPlayer()
        this.createBonus()
        this.createPythonEnemy()
        this.createOctoEnemy() 
        this.drawAll()
        this.setEventHandlers()
    },

    setContext() {
        this.ctx = document.querySelector('#myCanvas').getContext('2d')
        console.log(this.ctx)

    },

    drawAll() {
        setInterval(() => {
            this.framesIndex++
            this.framesIndex % 200 === 0 ? this.createPythonEnemy() : null
            this.framesIndex % 200 === 0 ? this.createOctoEnemy() : null
            this.clearAll()
            this.drawBackgroud()
            this.drawPlayer()
            this.drawBonus()
            this.drawPythonEnemy()
            this.drawOctoEnemy()
            this.bullets.forEach((bullet) => {
                bullet.drawBullets()
            })
        }, 20)
        
    },

    createBackground() {
        this.background = new Background (this.ctx, 0, 0, this.gameSize.w, this.gameSize.h)
    },
    
    drawBackgroud() {
       this.background.draw()
    },

    createPlayer() {
        this.player = new Player (this.ctx, 100, 100, 50, 50)
    },

    drawPlayer() {
        this.player.draw()
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },

    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            key === 'ArrowRight' ? this.player.moveRight() : null
            key === 'ArrowLeft' ? this.player.moveLeft() : null
            key === 'ArrowUp' ? this.player.moveUp() : null
            key === 'ArrowDown' ? this.player.moveDown() : null
        })
        document.addEventListener("click", (event) => {
            const angle = Math.atan2(
              event.clientY - this.gameSize.h / 2,
              event.clientX - this.gameSize.w / 2
            );
            const speed = {
              x: Math.cos(angle),
              y: Math.sin(angle),
            };
            this.bullets.push( new Bullets(this.ctx, event.clientX, event.clientY, this.player.playerSize.w, this.player.playerSize.h, speed, this.player.playerPos.x, this.player.playerPos.y
              )
            )
        })
    },

    createPythonEnemy() {
        console.log(this.createPythonEnemy)
        // this.pythonEnemy = new PythonEnemy (this.ctx, getRandomX, getRandomY, 80, 80, this.gameLimits)
        const newEnemy = new PythonEnemy (this.ctx, this.getRandomX('python'), this.getRandomY('python'), 80, 80, this.gameLimits)
        this.pythonEnemies.push(newEnemy)
    },

    drawPythonEnemy() {
        this.pythonEnemies.forEach(pythonEnemy => {
            pythonEnemy.draw()
        })
    },

    createOctoEnemy() {
        const newEnemy =  new OctoEnemy (this.ctx, this.getRandomX('octo'), this.getRandomY('octo'), 80, 80, this.gameLimits)
        this.octoEnemies.push(newEnemy)
    },
    
    drawOctoEnemy() {
        this.octoEnemies.forEach(octoEnemy => {
            octoEnemy.draw()
        })  
    },

    createBonus() {
        this.bonus = new Bonus (this.ctx, 750, 370, 20, 20)
    },

    drawBonus() {
        this.bonus.draw()
    },
    
    getRandomY(enemy) {
        let size = 80
        if (enemy === 'python' && this.pythonEnemies.length > 0) size = this.pythonEnemies[0].pythonEnemySize.h
        else if (enemy === 'octo' && this.octoEnemies.length > 0) size = this.octoEnemies[0].octoEnemySize.h
        if (size) {
            const random = Math.floor(Math.random() * (this.gameLimits.b - size - this.gameLimits.t) + this.gameLimits.t)
            console.log('Y',random)
            return random
        }
    },

    getRandomX(enemy) {
        let size = 80
        if (enemy === 'python' && this.pythonEnemies.length > 0) size = this.pythonEnemies[0].pythonEnemySize.w 
        else if (enemy === 'octo' && this.octoEnemies.length > 0) size = this.octoEnemies[0].octoEnemySize.w 
        if (size) {
        const random = Math.floor(Math.random() * (this.gameLimits.r - size - this.gameLimits.l) + this.gameLimits.l)
        console.log('X',random)
        return random
        }
    }

}

