export default {
    "name": "Class Compass",
    "slug": "class-compass",
    "version": "1.2.0",
    "runtimeVersion": "1.2.0",
    "updateIdentifier": "new dropdown, data fetch fix",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "splash": {
        "image": "./assets/splash.png",
        "resizeMode": "cover",
        "backgroundColor": "#d6a64f"
    },
    "assetBundlePatterns": [
        "**/*"
    ],
    "ios": {
        "supportsTablet": true,
        "bundleIdentifier": "com.darkweeblet.classcompass"
    },
    "android": {
        "adaptiveIcon": {
            "foregroundImage": "./assets/icon.png",
            "backgroundColor": "#0000"
        },
        "package": "com.darkweeblet.classcompass",
        "googleServicesFile": process.env.GOOGLE_SERVICES_JSON,
        "versionCode": 4
    },
    "web": {
        "favicon": "./assets/icon.png"
    },
    "extra": {
        "eas": {
            "projectId": "04cfda80-9c90-4662-ac61-aa51a4f1de16"
        }
    },
    "updates": {
        "url": "https://u.expo.dev/04cfda80-9c90-4662-ac61-aa51a4f1de16",
        "fallbackToCacheTimeout": 60000,
        "enabled": true,
        "checkAutomatically": "ON_LOAD",
        "requestHeaders": {
            "expo-platform": "android"
        }
    },
    "plugins": [
        [
            "expo-build-properties",
            {
                "ios": {
                    "useFrameworks": "static"
                }
            }
        ]
    ]
}