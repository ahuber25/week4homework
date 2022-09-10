const highScores = function() {
    var highscore = JSON.parse(window.localStorage.getItem('score')) || [];

    highscore.sort(function(a, b) {
        return b.score - a.score;
    });

    highscore.forEach(function(score) {
        var dots = document.createElement('li');
        dots.textContent = score.initials + ' - ' + score.score;

        var block = document.getElementById('score');
        block.appendChild(dots);
    });
}

const clearScores = function() {
    window.localStorage.removeItem('score');
    window.location.reload();
}

document.getElementById('clear').onclick = clearScores;

highScores();