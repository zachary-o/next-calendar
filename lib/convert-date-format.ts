
export function convertDateFormat(date: string) {
  return date
    .split(".")
    .map((part, index) => {
      if (index === 0) {
        return `${part.padStart(2, "0")}`
      } else if (index === 1) {
        return `${part.padStart(2, "0")}`
      }
      return part
    })
    .join(".")
}