export function isEmptyObject(obj: unknown) {
  if (typeof obj === 'object' && obj !== null) {
    return !Object.keys(obj).length
  }

  return false
}
