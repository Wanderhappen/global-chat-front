import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import { Box, IconButton, Popover } from '@mui/material'
import React, { useRef, useState } from 'react'

type Props = {
  callback: (fn: (emoji: string) => string) => void
}

const emojis = ['😊', '😂', '😍', '🤔', '👍', '🎉', '🚀', '🌟', '🔥']

export const EmojiPopup = ({ callback }: Props) => {
  const emojiButtonRef = useRef<HTMLButtonElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)

  const insertEmoji = (emoji: string) => {
    callback((prevMessage) => prevMessage + emoji)
  }

  const EmojiButtonHandler = () => {
    setIsOpen((prev) => !prev)
  }

  const EmojiClosePopup = () => {
    setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  return (
    <>
      <IconButton
        ref={emojiButtonRef}
        // sx={{ p: '10px' }}
        aria-label='emoji'
        onClick={EmojiButtonHandler}
      >
        <InsertEmoticonIcon sx={{ color: '#ffffff' }} />
      </IconButton>
      <Popover
        open={isOpen}
        anchorEl={emojiButtonRef.current}
        onClose={EmojiClosePopup}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}
          onMouseLeave={EmojiClosePopup}
        >
          {emojis.map((emoji, index) => (
            <IconButton
              key={index}
              onClick={() => insertEmoji(emoji)}
              sx={{
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#444',
                },
                width: '40px',
                height: '40px',
              }}
            >
              {emoji}
            </IconButton>
          ))}
        </Box>
      </Popover>
    </>
  )
}
