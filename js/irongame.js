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
    randomSize: 1,
    

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
            this.getRandomW()
            this.framesIndex % 80 === 0 ? this.createPythonEnemy() : null
            this.framesIndex % 40 === 0 ? this.createOctoEnemy() : null
            this.clearAll()
            this.drawBackgroud()
            this.drawPlayer()
            this.drawBonus()
            this.drawPythonEnemy()
            this.drawOctoEnemy()
            this.checkPlayerPythonCollision()
            this.checkPlayerOctoCollision()
            this.checkBulletEnemyCollision()
            this.bullets.forEach((bullet) => {
                bullet.drawBullets()
            })
            this.pythonEnemies.forEach(enemy => {
                enemy.move(this.player.playerPos)
                enemy.draw()
            })
            this.octoEnemies.forEach(enemy => {
                enemy.move(this.player.playerPos)
                enemy.draw()
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
        this.player = new Player (this.ctx, 450, 250, 50, 50)
    },

    drawPlayer() {
        this.player.draw()
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
        this.clearBullets()
        // console.log("BALASSSSSSS:", this.bullets);
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
            this.bullets.push( new Bullets(this.ctx, event.clientX, event.clientY, this.player.playerSize.w, this.player.playerSize.h, speed, this.player.playerPos.x, this.player.playerPos.y))
        })
    },

    createPythonEnemy() {
        const newEnemy = new PythonEnemy (this.ctx, this.getRandomX('python'), this.getRandomY('python'), 80, 80, this.gameLimits, this.playerPos)
        this.pythonEnemies.push(newEnemy)
    },

    drawPythonEnemy() {
        this.pythonEnemies.forEach(pythonEnemy => {
            pythonEnemy.draw()
        })
    },

    createOctoEnemy() {
        const newEnemy =  new OctoEnemy (this.ctx, this.getRandomX('octo'), this.getRandomY('octo'), this.randomSize, this.randomSize, this.gameLimits, this.playerPos)
        this.octoEnemies.push(newEnemy)
        console.log('PULPITOSSS',this.octoEnemies)
    },
    
    drawOctoEnemy() {
        this.octoEnemies.forEach(octoEnemy => {
            octoEnemy.draw()
        })  
    },

    clearBullets() {
        this.bullets = this.bullets.filter((bullet) => this.gameSize.w > bullet.bulletPos.x && bullet.bulletPos.x > 0 &&
            this.gameSize.h > bullet.bulletPos.y && bullet.bulletPos.y > 0)
    },

    createBonus() {
        this.bonus = new Bonus (this.ctx, 750, 370, 20, 20)
    },

    drawBonus() {
        this.bonus.draw()
    },
    
    getRandomY() {
        const random = Math.floor(Math.random() * (this.gameLimits.b - 80 - this.gameLimits.t) + this.gameLimits.t)
        return random
    },

    getRandomX() {
        const random = Math.floor(Math.random() * (this.gameLimits.r - 80 - this.gameLimits.l) + this.gameLimits.l)
        return random
    },

    getRandomW() {
        const random = Math.floor(Math.random() * (50 - 15) + 15)
        this.randomSize = random
    },

    checkPlayerPythonCollision() {
        this.pythonEnemies.forEach(pythonEnemy => {        
        if (this.player.playerPos.x  < pythonEnemy.pythonEnemyPos.x + pythonEnemy.pythonEnemySize.w &&
            this.player.playerPos.x  + this.player.playerSize.w > pythonEnemy.pythonEnemyPos.x &&
            this.player.playerPos.y < pythonEnemy.pythonEnemyPos.y + pythonEnemy.pythonEnemySize.h &&
            this.player.playerSize.h + this.player.playerPos.y > pythonEnemy.pythonEnemyPos.y) {
                // console.log('¡colision detectada!')
            }
        })      
    },

    checkPlayerOctoCollision() {
        this.octoEnemies.forEach(octoEnemy => {        
        if (this.player.playerPos.x  < octoEnemy.octoEnemyPos.x + octoEnemy.octoEnemySize.w &&
            this.player.playerPos.x  + this.player.playerSize.w > octoEnemy.octoEnemyPos.x &&
            this.player.playerPos.y < octoEnemy.octoEnemyPos.y + octoEnemy.octoEnemySize.h &&
            this.player.playerSize.h + this.player.playerPos.y > octoEnemy.octoEnemyPos.y) {
                // console.log('¡OLEEEEEE!')
            }
        })
    },
    
    checkBulletEnemyCollision() {
        this.bullets.forEach((bullet, i, bullets) => {
          this.octoEnemies.forEach((octoEnemy, j, octoEnemies) => {
            if (bullet.bulletPos.x < octoEnemy.octoEnemyPos.x + octoEnemy.octoEnemySize.w &&
              bullet.bulletPos.x + bullet.bulletSize.w > octoEnemy.octoEnemyPos.x &&
              bullet.bulletPos.y < octoEnemy.octoEnemyPos.y + octoEnemy.octoEnemySize.h &&
              bullet.bulletSize.h + bullet.bulletPos.y > octoEnemy.octoEnemyPos.y) {
              bullets.splice(i, 1)
              octoEnemies.splice(j, 1)
            //   console.log("Ay!!!")
            }
          })
        })
    
        this.bullets.forEach((bullet, i, bullets) => {
        this.pythonEnemies.forEach((pythonEnemy, j, pythonEnemies) => {
            if (bullet.bulletPos.x < pythonEnemy.pythonEnemyPos.x + pythonEnemy.pythonEnemySize.w &&
              bullet.bulletPos.x + bullet.bulletSize.w > pythonEnemy.pythonEnemyPos.x &&
              bullet.bulletPos.y < pythonEnemy.pythonEnemyPos.y + pythonEnemy.pythonEnemySize.h &&
              bullet.bulletSize.h + bullet.bulletPos.y > pythonEnemy.pythonEnemyPos.y) {
              bullets.splice(i, 1);
              pythonEnemies.splice(j, 1);
            //   console.log("Muerto!!!");
            }
          })
        })
    },
  
}

