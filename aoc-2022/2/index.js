const fs = require("fs").promises;
(async () => {
  try {

    const getItemScore = (x) => {
      return x === 'X' ? 1 : x === 'Y' ? 2 : 3
    }

    const getPointForLosingEntry = (x) => {
      if(x === 'A') return 3
      if(x === 'B') return 1
      if(x === 'C') return 2
      return 0;
    }

    const getPointForWinningEntry = (x) => {
      if(x === 'A') return 2
      if(x === 'B') return 3
      if(x === 'C') return 1
      return 0;
    }

    const getPointForTieingEntry = (x) => {
      if(x === 'A') return 1
      if(x === 'B') return 2
      if(x === 'C') return 3
      return 0;
    }

    const getRevisedItemScore = (opponent, result) => {
      if(result === 'X') {
        return getPointForLosingEntry(opponent)
      } else if(result === 'Y') {
        return getPointForTieingEntry(opponent)
      } else if(result === 'Z') {
        return getPointForWinningEntry(opponent)
      }
    }

    const isWin = (player, opponent) => {
      if(player === 'Y' && opponent === 'A') return true;
      if(player === 'Z' && opponent === 'B') return true;
      if(player === 'X' && opponent === 'C') return true;

      return false;
    }

    const isTie = (player, opponent) => {
      if(player === 'X' && opponent === 'A') return true;
      if(player === 'Y' && opponent === 'B') return true;
      if(player === 'Z' && opponent === 'C') return true;

      return false;
    }

    const calculateScore = (player, opponent) => {
      let roundScore = getItemScore(player);
      if(isWin(player, opponent)) {
        roundScore += 6; 
      } else if(isTie(player, opponent)) {
        roundScore += 3
      }
      return roundScore;
    }

    const calculateRevisedScore = (opponent, result) => {
      let scoreFromEntity = getRevisedItemScore(opponent, result);
      const scoreFromResults = result === 'X' ? 0 : result === 'Y' ? 3 : 6
      return scoreFromEntity + scoreFromResults;
    }

    let fileInput = await fs.readFile("./input.txt", "utf8");
    let score = 0;
    fileInput.split("\n").map((item) => { 
      const [opponent, result] = item.split(" ");
      score += calculateRevisedScore(opponent, result)
      
    });

    console.log({ score })

  } catch (e) {
    console.log("Error ", e);
  }
})();
