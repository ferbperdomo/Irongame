let hasStarted = false

window.onload = () => {
document.getElementById('start-button').onclick = () => {
    if (!hasStarted) startGame()
  }

  function startGame() {
        irongame.init()
        hasStarted = true
  }
}