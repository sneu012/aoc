const fs = require("fs").promises;
(async () => {
  try {
    let fileInput = await fs.readFile("./input.txt", "utf8");
    const list = [];
    // reading the entire file vs each line?
    let max = Number.MIN_SAFE_INTEGER;
    let runningSum = Number.MIN_SAFE_INTEGER;
    fileInput.split("\n").map((item) => { 
      if(item) {
        runningSum += parseInt(item, 10)
      } else {
        if(runningSum > max) {
          max = runningSum;
        }
        list.push(runningSum)
        runningSum = 0;
      }
      
    });

    console.log({ max })
    list.sort((a, b) => b - a)
    const [a, b, c] = list;
    console.log({ sum: a + b + c })

  } catch (e) {
    console.log("Error ", e);
  }
})();
