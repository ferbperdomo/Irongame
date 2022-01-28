const irongame = {
    appName: 'Irongame',
    author: 'Cristian Perdomo and Ricardo Molpeceres' ,
    version: '1.0.0',
    license: undefined,
    gameSize: { w: 900, h: 500 },
    ctx: undefined,
    player: undefined,
    octoEnemies: [],
    pythonEnemies: [],
    bonus: [],
    bullets: [],
    seconds: 30, 
    countdown: undefined,
    FPS: 60,
    framesIndex: 0,
    gameLimits: {l: 90, r: 770, t: 50, b: 400},
    randomSize: 1,
    intervalID: undefined,
    sound: undefined,


    // Init to call functions

    init() {
        this.setContext()
        this.createBackground()
        this.createCountdown()
        this.createPlayer()
        this.createBonus()
        this.createPythonEnemy()
        this.createOctoEnemy() 
        this.createLifeBar() 
        this.drawAll()
        this.setEventHandlers()
        this.audio()
        this.clearAll()
        this.imageLastWill = new Image()
        this.imageLastWill.src = "img/last-will.jpeg"
        this.imageCongrats = new Image()
        this.imageCongrats.src = "img/congrats.jpg"
    },

    //Context 

    setContext() {
        this.ctx = document.querySelector('#myCanvas').getContext('2d')
        console.log(this.ctx)
    },

    //Call and draw

    
    drawAll() {
        backgroundAudio.backgroundAudio.play();
        backgroundAudio.backgroundAudio.volume = 0.2;
        backgroundAudio.backgroundAudio.loop = true;
        this.intervalID = setInterval(() => {
        this.framesIndex++
        this.getRandomW()
        this.framesIndex % 60 === 0 ? this.createPythonEnemy() : null
        this.framesIndex % 40 === 0 ? this.createOctoEnemy() : null
        this.framesIndex % 500 === 0 ? this.createBonus() : null
        this.framesIndex % 50 === 0 && this.seconds--
        this.clearAll()
        this.drawBackgroud()
        this.drawPlayer()
        this.drawBonus()
        this.drawPythonEnemy()
        this.drawOctoEnemy()
        this.drawLifeBar()
        this.checkPlayerPythonCollision()
        this.checkPlayerOctoCollision()
        this.checkBulletEnemyCollision()
        this.checkPlayerBonusCollision()
        this.bullets.forEach((bullet) => {bullet.draw(this.framesIndex)})
        this.checkLife() ? this.gameOver() : null
        this.drawCountdown()
    }, 20)
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
        this.clearBullets()
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
            this.sound.play()            
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

    //Create and draw characters and elements

    createBackground() {
        this.background = new Background (this.ctx, 0, 0, this.gameSize.w, this.gameSize.h)
    },
    
    drawBackgroud() {
       this.background.draw()
    },

    createPlayer() {
        this.player = new Player (this.ctx, 450, 250, 70, 70)
    },

    drawPlayer() {
        this.player.draw(this.framesIndex)
    },

    createPythonEnemy() {
        const newEnemy =  new PythonEnemy (this.ctx, this.getRandomX(), this.getRandomY(), 80, 80, this.gameLimits, this.playerPos)
        this.pythonEnemies.push(newEnemy)
    },

    drawPythonEnemy() {
        this.pythonEnemies.forEach((pythonEnemy) => {pythonEnemy.move(this.player.playerPos)
        pythonEnemy.draw(this.framesIndex)})
    },

    createOctoEnemy() {
        const newEnemy =  new OctoEnemy (this.ctx, this.getRandomX(), this.getRandomY(), this.randomSize, this.randomSize, this.gameLimits, this.playerPos)
        this.octoEnemies.push(newEnemy)
    },
    
    drawOctoEnemy() {
        this.octoEnemies.forEach((octoEnemy) => {octoEnemy.move(this.player.playerPos)
            octoEnemy.draw(this.framesIndex)})
    },

    clearBullets() {
        this.bullets = this.bullets.filter((bullet) => this.gameSize.w > bullet.bulletPos.x && bullet.bulletPos.x > 0 &&
            this.gameSize.h > bullet.bulletPos.y && bullet.bulletPos.y > 0)
    },

    createBonus() {
        const newBonus = new Bonus (this.ctx, this.getRandomX(), this.getRandomY(), 70, 70)
        this.bonus.push(newBonus)
    },

    drawBonus() {
        this.bonus.forEach(bonus => {
            bonus.draw(this.framesIndex)
        })
    },

    createCountdown() {
        this.countdown = new Countdown(this.ctx)
    },

    drawCountdown() {
        this.countdown.draw(this.seconds)
        if(this.seconds <= 0) {
        
        clearInterval(this.intervalID)
        this.manageWin()
        }
    },

    manageWin() {
        this.clearAll()
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.gameSize.w, this.gameSize.h)
        this.ctx.drawImage(this.imageCongrats, 300, 0, 500, 520)
        this.reload()

    },

    createLifeBar() {
        this.lifeBar = new Lifebar(this.ctx);
    },

    drawLifeBar() {
        this.lifeBar.draw(this.player.playerHealth);
    },
    
    audio(){
        this.sound = new Audio('./audios/shoot.mp3')
    },

    //Get random input
    
    getRandomY() {
        const random = Math.floor(Math.random() * (this.gameLimits.b - 80 - this.gameLimits.t) + this.gameLimits.t)
        if (this.player.playerPos.y + this.player.playerSize.h + 80 > random &&
            this.player.playerPos.y - 80 < random) {
            return 375
        } else return random
    },

    getRandomX() {
        const random = Math.floor(Math.random() * (this.gameLimits.r - 80 - this.gameLimits.l) + this.gameLimits.l)
        if (this.player.playerPos.x + this.player.playerSize.w + 80 > random &&
            this.player.playerPos.x - 80 < random) {
            return 600
        } else return random
    },

    getRandomW() {
        const random = Math.floor(Math.random() * (80 - 45) + 45)
        this.randomSize = random
    },

    //Internal collisions

    checkPlayerPythonCollision() {
        this.pythonEnemies.forEach((pythonEnemy, i) => {        
        if (this.player.playerPos.x  < pythonEnemy.pythonEnemyPos.x + pythonEnemy.pythonEnemySize.w &&
            this.player.playerPos.x  + this.player.playerSize.w > pythonEnemy.pythonEnemyPos.x &&
            this.player.playerPos.y < pythonEnemy.pythonEnemyPos.y + pythonEnemy.pythonEnemySize.h &&
            this.player.playerSize.h + this.player.playerPos.y > pythonEnemy.pythonEnemyPos.y) {
            this.pythonEnemies.splice(i, 1)
            this.player.playerHealth -= 100
            }
        })      
    },

    checkPlayerOctoCollision() {
        this.octoEnemies.forEach((octoEnemy, i) => {        
        if (this.player.playerPos.x  < octoEnemy.octoEnemyPos.x + octoEnemy.octoEnemySize.w &&
            this.player.playerPos.x  + this.player.playerSize.w > octoEnemy.octoEnemyPos.x &&
            this.player.playerPos.y < octoEnemy.octoEnemyPos.y + octoEnemy.octoEnemySize.h &&
            this.player.playerSize.h + this.player.playerPos.y > octoEnemy.octoEnemyPos.y) {
            this.octoEnemies.splice(i, 1)
            this.player.playerHealth -= 100
            }
        })
    },

    checkPlayerBonusCollision() {
        this.bonus.forEach((bonus, i) => {        
        if (this.player.playerPos.x  < bonus.bonusPos.x + bonus.bonusSize.w &&
            this.player.playerPos.x  + this.player.playerSize.w > bonus.bonusPos.x &&
            this.player.playerPos.y < bonus.bonusPos.y + bonus.bonusSize.h &&
            this.player.playerSize.h + this.player.playerPos.y > bonus.bonusPos.y) {
            this.bonus.splice(i, 1)
            this.player.playerHealth += 100 
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
            }
          })
        })
    },

    //Final game
  
    checkLife() {
        // console.log(this.player.playerHealth)
        if (this.player.playerHealth === 0) {
            return true
        }

    },

    gameOver() {
        backgroundAudio.backgroundAudio.volume = false
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.gameSize.w, this.gameSize.h)
        this.ctx.drawImage(this.imageLastWill, 100, 0, 550, 550)
        clearInterval(this.intervalID)
        this.reload()
    },

    reload() {
        const canvas = document.getElementById('myCanvas')
        canvas.addEventListener('click', () => window.location.reload(false))
    }


}

