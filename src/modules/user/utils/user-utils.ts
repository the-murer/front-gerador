export function getUserInitials(name: string) {
  const splittedName = name.split(' ')

  if (splittedName.length === 1) {
    return splittedName[0].substring(0, 2)
  }

  return splittedName
    .map((name) => name[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

export function getUserBackgroundColor(name: string) {
  const hash = name.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0)
  }, 0)

  return `hsl(${hash % 360}, 60%, 50%)`
}
