const colors = [
  '#F3722C',
  '#EC9628',
  '#F9C750',
  '#90BE6D',
  '#009D4F',
  '#00763B',
  '#577591',
  '#77C1FF',
  '#005DAA',
  '#AE78D7'
]

export function getRandomColor(name: string) {
  const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const randomIndex = seed % colors.length
  return colors[randomIndex]
}

export function getValueChangeTextColor(num: number) {
  if (num === 0) return '#ffffff'
  else if (num > 0) return '#009d4e'
  return '#e44d4d'
}

export const suffixTheNumber = (n: number) =>
  n +
  (n % 10 === 1 && n % 100 !== 11
    ? 'st'
    : n % 10 === 2 && n % 100 !== 12
    ? 'nd'
    : n % 10 === 3 && n % 100 !== 13
    ? 'rd'
    : 'th')
