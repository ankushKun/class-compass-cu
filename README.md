<a href="classcompass.github.io" target="_blank"><img src="https://classcompass.github.io/icon.png" width="100px" align="right"></a>

# Class Compass CU

Codebase for Class Compass - vacant class locator for CU


## Download the app

The app is available on the Google Play Store. You can download it from the links below:

<center>
      
<a href="https://play.google.com/store/apps/details?id=com.darkweeblet.classcompass" target="_blank"><img width="200px" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"></a>
      
Apple App Store hopefully coming soon (if we dont stay broke)
  
</center>

## Getting Started

### Tech Stack Used

* [Node.js](https://nodejs.org/en/) - JavaScript runtime (use latest LTS version)
* [npm](https://www.npmjs.com/) - Package manager
* [Firebase](https://firebase.google.com/) - Realtime Database 
* [React Native](https://reactnative.dev/) - Cross-platform mobile app framework
* [Expo](https://expo.io/) - React Native development environment

### Clone the repo

First for the repo and clone it to your local machine.

We assume you already have git installed on your machine. If not, you can download it from [here](https://git-scm.com/downloads).

We also hope you have setup SSH keys for your github account. If not, you can follow the instructions [here](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh).


```bash
git clone git@github.com:<YOUR_USERNAME>/class-compass-cu.git
cd class-compass-cu/RNApp
```

**NOTE: All commands assume you are inside the `RNApp` directory. If not, it will be mentioned**

### Install dependencies

```bash
npm install
```

### Setup API keys

* Create a new Firebase project
* Create a new file `.env` in `/RNApp` and add the following environment variables 

```env
EXPO_PUBLIC_API_KEY=FIREBASE_API_KEY
EXPO_PUBLIC_AUTH_DOMAIN=FIREBASE_AUTH_DOMAIN
EXPO_PUBLIC_DB_URL=FIREBASE_DB_URL
EXPO_PUBLIC_PROJ_ID=FIREBASE_PROJECT_ID
EXPO_PUBLIC_STORAGE_BUCKET=FIREBASE_STORAGE_BUCKET
EXPO_PUBLIC_MESSAGING_SENDER_ID=FIREBASE_MESSAGE_SENDER_ID
EXPO_PUBLIC_APP_ID=FIREBASE_APP_ID
EXPO_PUBLIC_MEASURMENT_ID=FIREBASE_MEASURMENT_ID
```

* Replace the values with your Firebase project's API keys
* You will need to install and login to the expo cli to run the app. Follow the instructions [here](https://docs.expo.io/get-started/installation/)
* You will also need a google-services.json file from Firebase. Add an app, download its google-services.json and place it in `/RNApp`, then upload the file to eas secrets using the following command, as it will be ignored by the build.

``` bash
eas secret:create --scope project --name GOOGLE_SERVICES_JSON --type file --value ./google-services.json
```


### Running the app

#### Creating a development build

```bash
# For cloud build through EAS
eas build --profile development
# For local build
eas build --profile development --local
```

The dev build should be installed either on a real device or a simulator for development and live testing purposes.
Every time new Native code is added to the project through expo or npm a new development build will have to be created and installed.

#### Creating a production build

```bash
# For cloud build through EAS
eas build --profile production
# For local build
eas build --profile production --local
```

The production build can be installed on any device and will be used for testing before publishing to the app store.

## Contributing

Any and all contributions are welcome! Please create a new issue to report bugs or suggest new features. If you would like to work on an issue, please comment on it to let us know.

Any questions regarding development or build process are welcome on Github, or you can reach out to us at [@darkweebletapps](https://www.instagram.com/darkweebletapps/) on Instagram, or mail us at [darkweeblet@gmail.com](mailto:darkweeblet@gmail.com)

## License

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]


This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].


[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

See [LICENSE](/LICENSE) for details.