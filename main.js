window.onload = function () {
    const domNode = document.querySelector(".js-root");
    const game = new Game(domNode);

    game.start();
}
