import dayjs from 'dayjs'

export const formatDate = (date?: Date, showTime?: boolean) => {
  if (!date) return ''

  const format = showTime ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY'

  return dayjs(date).format(format)
}
