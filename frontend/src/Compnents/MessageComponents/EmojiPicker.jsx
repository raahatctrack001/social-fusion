import React from 'react'
import EmojiPicker from 'emoji-picker-react'

const EmojiPickerComponent = () => {
  return (
    <div >
       <EmojiPicker open={true} autoFocusSearch={true} />
    </div>
  )
}

export default EmojiPickerComponent