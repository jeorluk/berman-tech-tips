import React from 'react'
import * as Icons from '.'

const RenderIcon = ({ iconName }) => {
  const Icon = Icons[iconName]
  return Icon ? <Icon /> : <div>Missing Icon</div>
}

export default RenderIcon
