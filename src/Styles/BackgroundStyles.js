export function newMinecraftStyle(size = 0.24) {
  return (_size, position, pixelSize) =>
    BackgroundStyles.minecraft(_size, position, pixelSize, size)
}

let BackgroundStyles = {
  minecraft: (size, position, pixelSize, blocks) => {
    let s = pixelSize.x * blocks
    let ss = +(s * 0.5).toFixed(2)
    let sss = +(s * 1.5).toFixed(2)

    return {
      "background-color": " #c6c6c6",
      "box-shadow": `${s}px 0 0 0 #555555, 0 ${s}px 0 0 #555555, ${ss}px ${ss}px 0 0 #555555, -${s}px 0 0 0 #e8e8e8, 0 -${s}px 0 0 #e8e8e8, -${ss}px -${ss}px 0 0 #e8e8e8, 0 0 0 ${ss}px #b5b4b5, ${ss}px ${s}px 0 0 #555, ${s}px ${ss}px 0 0 #555, -${ss}px -${s}px 0 0 #e8e8e8, -${s}px -${ss}px 0 0 #e8e8e8, ${s}px -${ss}px 0 0 #000, ${ss}px -${s}px 0 0 #000, -${s}px ${ss}px 0 0 #000, -${ss}px ${s}px 0 0 #000, -${s}px -${s}px 0 0 #000, ${s}px ${s}px 0 0 #000, -${sss}px 0 0 0 #000, -${sss}px -${ss}px 0 0 #000, ${sss}px 0 0 0 #000, ${sss}px ${ss}px 0 0 #000, 0 -${sss}px 0 0 #000, -${ss}px -${sss}px 0 0 #000, 0 ${sss}px 0 0 #000, ${ss}px ${sss}px 0 0 #000`,
    }
  },
  /** Uses min size */
  minecraft1: (size, position) => {
    let min = size.min() //Math.max(4 * this.getPixelSize().x, size.min())
    let s = Math.max(5, min * 0.03)
    let ss = +(s * 0.5).toFixed(2)
    let sss = +(s * 1.5).toFixed(2)

    return {
      "background-color": " #c6c6c6",
      "box-shadow": `${s}px 0 0 0 #555555, 0 ${s}px 0 0 #555555, ${ss}px ${ss}px 0 0 #555555, -${s}px 0 0 0 #e8e8e8, 0 -${s}px 0 0 #e8e8e8, -${ss}px -${ss}px 0 0 #e8e8e8, 0 0 0 ${ss}px #b5b4b5, ${ss}px ${s}px 0 0 #555, ${s}px ${ss}px 0 0 #555, -${ss}px -${s}px 0 0 #e8e8e8, -${s}px -${ss}px 0 0 #e8e8e8, ${s}px -${ss}px 0 0 #000, ${ss}px -${s}px 0 0 #000, -${s}px ${ss}px 0 0 #000, -${ss}px ${s}px 0 0 #000, -${s}px -${s}px 0 0 #000, ${s}px ${s}px 0 0 #000, -${sss}px 0 0 0 #000, -${sss}px -${ss}px 0 0 #000, ${sss}px 0 0 0 #000, ${sss}px ${ss}px 0 0 #000, 0 -${sss}px 0 0 #000, -${ss}px -${sss}px 0 0 #000, 0 ${sss}px 0 0 #000, ${ss}px ${sss}px 0 0 #000`,
    }
  },
  /** Uses max size */
  minecraft2: (size, position) => {
    let min = size.max() //Math.max(4 * this.getPixelSize().x, size.min())
    let s = Math.max(5, min * 0.03)
    let ss = +(s * 0.5).toFixed(2)
    let sss = +(s * 1.5).toFixed(2)

    return {
      "background-color": " #c6c6c6",
      "box-shadow": `${s}px 0 0 0 #555555, 0 ${s}px 0 0 #555555, ${ss}px ${ss}px 0 0 #555555, -${s}px 0 0 0 #e8e8e8, 0 -${s}px 0 0 #e8e8e8, -${ss}px -${ss}px 0 0 #e8e8e8, 0 0 0 ${ss}px #b5b4b5, ${ss}px ${s}px 0 0 #555, ${s}px ${ss}px 0 0 #555, -${ss}px -${s}px 0 0 #e8e8e8, -${s}px -${ss}px 0 0 #e8e8e8, ${s}px -${ss}px 0 0 #000, ${ss}px -${s}px 0 0 #000, -${s}px ${ss}px 0 0 #000, -${ss}px ${s}px 0 0 #000, -${s}px -${s}px 0 0 #000, ${s}px ${s}px 0 0 #000, -${sss}px 0 0 0 #000, -${sss}px -${ss}px 0 0 #000, ${sss}px 0 0 0 #000, ${sss}px ${ss}px 0 0 #000, 0 -${sss}px 0 0 #000, -${ss}px -${sss}px 0 0 #000, 0 ${sss}px 0 0 #000, ${ss}px ${sss}px 0 0 #000`,
    }
  },
  /** Uses average size */
  minecraft3: (size, position) => {
    let min = size.average() //Math.max(4 * this.getPixelSize().x, size.min())
    let s = Math.max(5, min * 0.03)
    let ss = +(s * 0.5).toFixed(2)
    let sss = +(s * 1.5).toFixed(2)

    return {
      "background-color": " #c6c6c6",
      "box-shadow": `${s}px 0 0 0 #555555, 0 ${s}px 0 0 #555555, ${ss}px ${ss}px 0 0 #555555, -${s}px 0 0 0 #e8e8e8, 0 -${s}px 0 0 #e8e8e8, -${ss}px -${ss}px 0 0 #e8e8e8, 0 0 0 ${ss}px #b5b4b5, ${ss}px ${s}px 0 0 #555, ${s}px ${ss}px 0 0 #555, -${ss}px -${s}px 0 0 #e8e8e8, -${s}px -${ss}px 0 0 #e8e8e8, ${s}px -${ss}px 0 0 #000, ${ss}px -${s}px 0 0 #000, -${s}px ${ss}px 0 0 #000, -${ss}px ${s}px 0 0 #000, -${s}px -${s}px 0 0 #000, ${s}px ${s}px 0 0 #000, -${sss}px 0 0 0 #000, -${sss}px -${ss}px 0 0 #000, ${sss}px 0 0 0 #000, ${sss}px ${ss}px 0 0 #000, 0 -${sss}px 0 0 #000, -${ss}px -${sss}px 0 0 #000, 0 ${sss}px 0 0 #000, ${ss}px ${sss}px 0 0 #000`,
    }
  },
  minecraft3unlimited: (size, position) => {
    let min = size.average() //Math.max(4 * this.getPixelSize().x, size.min())
    let s = min * 0.1
    let ss = +(s * 0.5).toFixed(2)
    let sss = +(s * 1.5).toFixed(2)

    return {
      "background-color": " #c6c6c6",
      "box-shadow": `${s}px 0 0 0 #555555, 0 ${s}px 0 0 #555555, ${ss}px ${ss}px 0 0 #555555, -${s}px 0 0 0 #e8e8e8, 0 -${s}px 0 0 #e8e8e8, -${ss}px -${ss}px 0 0 #e8e8e8, 0 0 0 ${ss}px #b5b4b5, ${ss}px ${s}px 0 0 #555, ${s}px ${ss}px 0 0 #555, -${ss}px -${s}px 0 0 #e8e8e8, -${s}px -${ss}px 0 0 #e8e8e8, ${s}px -${ss}px 0 0 #000, ${ss}px -${s}px 0 0 #000, -${s}px ${ss}px 0 0 #000, -${ss}px ${s}px 0 0 #000, -${s}px -${s}px 0 0 #000, ${s}px ${s}px 0 0 #000, -${sss}px 0 0 0 #000, -${sss}px -${ss}px 0 0 #000, ${sss}px 0 0 0 #000, ${sss}px ${ss}px 0 0 #000, 0 -${sss}px 0 0 #000, -${ss}px -${sss}px 0 0 #000, 0 ${sss}px 0 0 #000, ${ss}px ${sss}px 0 0 #000`,
    }
  },
}

export default BackgroundStyles
