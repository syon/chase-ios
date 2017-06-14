# chase-ios

## dev

- Open `Chase/ios/Chase.xcodeproj` and Run

## package upgrade

```bash
$ npm ls --depth=0 -g

$ npm update yarn -g

$ npm update react-native-cli -g
```

```bash
$ cd /path/to/rn-temp

$ react-native init hello

# see the official default installed versions
$ cat package.json
```

```bash
$ yarn upgrade-interactive

$ rm -rf node_modules/

$ yarn

$ react-native link
```

## Re-Install Xcode Project

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
REDIRECT_URI=pocketapp66650://authorizationFinished
```
