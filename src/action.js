require("dotenv").config()
const core = require("@actions/core")
const { exec } = require("child_process")
const fs = require("fs")

async function run() {
  const TSNOCHECK_COUNT = Number(core.getInput("TSNOCHECK_COUNT"))

  exec(
    "find ./src -type f -name \\*.ts -o -name \\*.tsx | grep -v 'test\\|coverage\\|stories\\|scripts'",
    (err, stdout) => {
      if (err) {
        return;
      }

      let failCount = 0

      stdout
        .split("\n")
        .filter(Boolean)
        .forEach((fn) => {
          const data = fs.readFileSync(fn);
          if (data.includes("ts-nocheck")) {
            exec(`wc -l ${fn}`, (err, stdout2) => {
              failCount = failCount + 1;
              if (failCount >= TSNOCHECK_COUNT) {
                throw new Error(
                  "Oh no! New @ts-nocheck instance(s) got introduced :( Could you please remove them? Thanks!"
                )
              }
            })
          }
        })
    }
  )
}

run().catch((e) => core.setFailed(e.message));
