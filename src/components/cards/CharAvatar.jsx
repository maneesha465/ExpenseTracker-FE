import React from 'react'
import { getInitials } from '../../utils/helper'

export const CharAvatar = ({fullName, width, height, style}) => {
  return (
    <div className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center rounded-full text-grey-900 font-medium bg-grey-100`}>
        {getInitials(fullName || "")}
    </div>
  )
}
