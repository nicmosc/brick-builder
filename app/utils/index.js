export function CSSToHex(cssColor) {
  return parseInt(`0x${cssColor.substring(1)}`, 16);
}
