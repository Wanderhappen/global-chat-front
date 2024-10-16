import React from 'react'
import s from './Container.module.css'

type Props = {
  children: React.ReactElement | React.ReactElement[]
}

export const Container = ({ children }: Props) => {
  return <div className={s.container}>{children}</div>
}
