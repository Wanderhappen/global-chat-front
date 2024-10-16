export const copyTextToBuffer = (
  textToCopy: string | number,
  callback: () => void
) => {
  // Копируем текст в буфер обмена
  const text = textToCopy.toString()
  navigator.clipboard
    .writeText(text)
    .then(() => {
      callback()
    })
    .catch((error) => {
      console.error('Ошибка при копировании текста:', error)
    })
}
