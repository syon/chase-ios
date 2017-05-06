# chase-ios

## dev

```bash
$ cd Chase
$ react-native run-ios
```

## package upgrade

```bash
$ brew update

$ brew doctor

$ brew upgrade yarn

$ rm -rf node_modules/

$ yarn

$ react-native link

$ yarn upgrade-interactive
```

## Re:Install Xcode Project

```bash
$ react-native init Chase

$ cd Chase/

$ react-native run-ios

# Restore package.json

$ rm -rf node_modules/

$ yarn

$ react-native link

# Edit AppDelegate.m for wix/react-native-navigation

# Edit AppDelegate.m for URL Scheme
```

## `.env`

```bash
CONSUMER_KEY=66650-xxxxxxxxxxxxxxxxxxxxxxxx
REDIRECT_URI=pocketapp66650:authorizationFinished
```
