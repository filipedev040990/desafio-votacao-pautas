export const isValidString = (value: string): boolean => {
  return value !== undefined && value !== null && typeof value === 'string' && value.trim() !== ''
}
