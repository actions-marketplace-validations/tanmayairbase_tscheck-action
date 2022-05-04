require("dotenv").config()
const core = require("@actions/core")
const exec = require("child_process").exec
const fs = require("fs")

async function run() {
  const TSNOCHECK_COUNT = Number(core.getInput("TSNOCHECK_COUNT")) || 0

  exec(
    "find ./src -type f -name \\*.ts -o -name \\*.tsx | grep -v 'test\\|coverage\\|stories\\|scripts'",
    (err, stdout) => {
      if (err) {
        return
      }

      let failCount = 0

      stdout
        .split("\n")
        .filter(Boolean)
        .forEach((fileName) => {
          const fileContent = fs.readFileSync(fileName)

          if (fileContent.includes("ts-nocheck")) {
            exec(`wc -l ${fileName}`, () => {
              failCount = failCount + 1

              if (failCount > TSNOCHECK_COUNT) {
                console.log(`COUNT THRESHOLD: ${TSNOCHECK_COUNT}`)
                console.log(`COUNT IN THIS PULL REQUEST: ${failCount}`)

                throw new Error(
                  "Oh no! New @ts-nocheck instance(s) got introduced :( Please remove them."
                )
              }
            })
          }
        })
    }
  )
}

run().catch((e) => core.setFailed(e.message))
