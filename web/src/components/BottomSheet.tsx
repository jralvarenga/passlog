import { ReactElement, useEffect, useRef } from 'react'
import { Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import Sheet from 'react-modal-sheet'

interface BottomSheetProps {
  open: boolean
  setOpen: Function
  children: ReactElement
  snapPoints: number[]
}

const BottomSheet = ({ open, setOpen, children, snapPoints }: BottomSheetProps) => {
  const styles = styleSheet()
  const theme = useTheme()

  return (
    <Sheet
      isOpen={open}
      onClose={() => setOpen(false)}
      snapPoints={snapPoints}
    >
      <Sheet.Container
        style={{
          backgroundColor: theme.palette.background.default,
          borderTopRightRadius: theme.shape.borderRadius,
          borderTopLeftRadius: theme.shape.borderRadius
        }}
      >
        <Sheet.Header />
        <Sheet.Content
          style={{
            padding: 12,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          {children}
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onTapCancel={() => setOpen(false)} />
    </Sheet>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  
}))

export default BottomSheet