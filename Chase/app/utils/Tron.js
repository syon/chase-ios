class Tron {
  static log(msg) {
    if (!__DEV__) { return }
    console.info(msg)
  }

  static start(label, obj) {
    if (!__DEV__) { return }
    console.log(`>>>>>>>> ${label} >>>>>>>>>>>>>>>>>>>>>>>>>>>>`)
    console.info(obj)
  }

  static end(label, obj) {
    if (!__DEV__) { return }
    console.info(obj)
    console.log(`<<<<<<<<<<<<<<<<<<<<<<<<<<<< ${label} <<<<<<<<`)
  }

  static tmp(label, obj) {
    if (!__DEV__) { return }
    console.log(`★★ ${label} ★★★★★★★★★★★★★★★★★★★★★★★★★★★★`)
    console.log(obj)
    console.log(`★★★★★★★★★★★★★★★★★★★★★★★★★★★★ ${label} ★★`)
  }

  static info(label, obj) {
    if (!__DEV__) { return }
    console.info(label, obj)
  }

  static warn(label, obj) {
    if (!__DEV__) { return }
    console.warn(label, obj)
  }

  static error(label, obj) {
    if (!__DEV__) { return }
    console.error(label, obj)
  }
}

// Required both of Development & Production.
// Because of logging line still remains on Release.
console.tron = Tron
