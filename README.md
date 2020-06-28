This project is used for tracking activities

## How to run the project

1) Clone the project:
2) run cmd: `npm install`
3) run cmd: `npm start`

### How to deploy to github pages (https://github.com/gitname/react-gh-pages)
1) Provide the github repository (Ex: "http://RobertVo93.github.io/activitylogs") to the first line of `package.json` like below:
`"homepage": "http://RobertVo93.github.io/activitylogs"`
2) Provide `predeploy` and `deploy` in the first line of `script` tag like this:
```
"scripts": {
        "predeploy": "npm run build",
        "deploy": "gh-pages -d build",
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    }
```
3) run cmd: `npm run deploy`
