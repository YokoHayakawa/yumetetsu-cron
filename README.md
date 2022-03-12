# yumetetsu-cron
 Cron jobs for yumetetsu

Commands:

- npm run start:dev
Starts the application in development using nodemon and ts-node to do cold reloading.

- npm run build
Builds the app at build, cleaning the folder first.

- npm run start
Starts the app in production by first building the project with npm run build, and then executing the compiled JavaScript at build/index.js.


Mac

- /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')
Run a dev version of chrome where puppeteer can connect.