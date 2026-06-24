import React from 'react'
import { Profile } from '../../../UI/Icons'
function Footer() {
  return (
    <div className="flex flex-row mt-auto border-t border-border p-4">
        <Profile/>
        <span className='whitespace-nowrap'>Tanish Gupta</span>
    </div>
  )
}

export default Footer
