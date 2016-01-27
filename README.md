# FinanceReactNative

[![Dependency Status](https://img.shields.io/david/7kfpun/FinanceReactNative.svg)](https://img.shields.io/david/7kfpun/FinanceReactNative)
[![devDependency Status](https://img.shields.io/david/dev/7kfpun/FinanceReactNative.svg)](https://github.com/7kfpun/FinanceReactNative#info=devDependencies)

iOS's Stocks App clone written in [React Native](https://github.com/facebook/react-native) for demo purpose (available both iOS and Android). Data is pulled from [Yahoo Finance](finance.yahoo.com).

![Preview](https://raw.github.com/7kfpun/FinanceReactNative/master/previewIOS.gif)
![Preview](https://raw.github.com/7kfpun/FinanceReactNative/master/previewAndroid.gif)

## Plugins used

* [react-native-navbar](https://github.com/Kureev/react-native-navbar): Simple customizable navbar component for react-native.
* [react-native-refreshable-listview](https://github.com/jsdf/react-native-refreshable-listview): A pull-to-refresh ListView which shows a loading spinner while your data reloads.
* [react-native-router-flux](https://github.com/aksonov/react-native-router-flux): iOS/Android React Native Router based on exNavigator.
* [react-native-simple-store](https://github.com/jasonmerino/react-native-simple-store): A minimalistic wrapper around React Native's AsyncStorage.
* [react-native-swipeout](https://github.com/dancormier/react-native-swipeout) - iOS-style swipeout buttons behind component.
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons): 3000 Customizable Icons for React Native with support for NavBar/TabBar, image source and full stying.
* [react-native-viewpager](https://github.com/race604/react-native-viewpager) - ViewPager component for React Native.
* [reflux](https://github.com/reflux/refluxjs): A simple library for uni-directional dataflow application architecture with React extensions inspired by Flux.

## Components used

* **Image** - A React component for displaying different types of images, including network images, static resources, temporary local images, and images from local disk, such as the camera roll.
* **ListView** - A core component designed for efficient display of vertically scrolling lists of changing data.
* **Navigator** - Use Navigator to transition between different scenes in your app.
* **PixelRatio** - A class gives access to the device pixel density.
* **Platform**
* **PullToRefreshViewAndroid**
* **StatusBarIOS**
* **StyleSheet** - A StyleSheet is an abstraction similar to CSS StyleSheets.
* **Text** - A React component for displaying text which supports nesting, styling, and touch handling.
* **TextInput** - A foundational component for inputting text into the app via a keyboard.
* **ToastAndroid**
* **ToolbarAndroid** - React component that wraps the Android-only Toolbar widget.
* **TouchableHighlight** - A wrapper for making views respond properly to touches.
* **TouchableOpacity** - A wrapper for making views respond properly to touches.
* **View** - A container that supports layout with flexbox, style, some touch handling, and accessibility controls, and is designed to be nested inside other views and to have 0 to many children of any type.
* **ViewPagerAndroid** - Container that allows to flip left and right between child views.
* **WebView** - Renders a native WebView.

## Additional

* [eslint](https://github.com/eslint/eslint): A fully pluggable tool for identifying and reporting on patterns in JavaScript.
* [flow](https://github.com/facebook/flow): Adds static typing to JavaScript to improve developer productivity and code quality.

## Running

#### Clone & install

* Clone this repo `git clone git@github.com:7kfpun/FinanceReactNative.git`
* `cd FinanceReactNative`
* run `npm install`

#### iOS

* Open `Finance.xcodeproj` in `XCode`
* Press `cmd+r` to build it

#### Android

* Run `android avd` and start an emulator
* Run `react-native run-android`

## License

Released under the [MIT License](http://opensource.org/licenses/MIT).
