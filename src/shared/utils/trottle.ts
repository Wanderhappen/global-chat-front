export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): T {
  let lastFunc: ReturnType<typeof setTimeout> | null
  let lastRan: number | null = null

  return function (this: any, ...args: Parameters<T>) {
    const context = this

    // Если функция еще не выполнялась, вызовем ее
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc!) // Очистим предыдущий таймер
      lastFunc = setTimeout(
        () => {
          // Если прошло более заданного интервала
          if (lastRan !== null && Date.now() - lastRan >= limit) {
            func.apply(context, args)
            lastRan = Date.now() // Обновим время последнего вызова
          }
        },
        limit - (Date.now() - lastRan)
      )
    }
  } as T
}
