import React from 'react'
import { getIntitials } from '../../utils/helper'

function CharAvatar({ fullName, width, height, style }) {
  return (
    <div className={`${width || 'w-12 '} ${height || 'h-12'} ${style || ''} flex items-center justify-center rounded-full text-gray-950 font-medium bg-gray-100`}>
        {getIntitials(fullName || "")}
    </div>
  )
}

export default CharAvatar