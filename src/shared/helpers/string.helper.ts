export const isValidString = (value: string): boolean => {
  return value !== undefined && value !== null && typeof value === 'string' && value.trim() !== ''
}

export const isValidCpf = (cpf: string): boolean => {
  const cpfPattern = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/
  return cpfPattern.test(cpf)
}
