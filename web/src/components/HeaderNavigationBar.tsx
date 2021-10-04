import { ReactElement } from 'react'
import { IconButton, Theme, useTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useRouter } from 'next/router'

interface HeaderNavigationBarProps {
  title: string
  showIcon?: boolean
  iconFunction?: Function
  icon?: ReactElement
}

export const HEADERBAR_HEIGHT = '16%'

const HeaderNavigationBar = ({ title, showIcon, iconFunction, icon }: HeaderNavigationBarProps) => {
  const styles = styleSheet()
  const theme = useTheme()
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerInfoContainer}>
        <div className={styles.returnContainer}>
          <IconButton
            onClick={goBack}
            style={{ marginTop: 10 }}
          >
            <ArrowBackIosNewIcon
              style={{ color: theme.palette.text.primary, fontSize: 25 }}
            />
          </IconButton>
        </div>
        <div className={styles.titleContainer}>
          <span>{title}</span>
        </div>
      </div>
      <div className={styles.iconContainer}>
        {showIcon && (
          // @ts-ignore
          <IconButton
            onClick={iconFunction}
            style={{ marginTop: 10 }}
          >
            {icon}
          </IconButton>
        )}
      </div>
    </div>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    height: HEADERBAR_HEIGHT,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
    },
  },
  headerInfoContainer: {
    width: '80%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  iconContainer: {
    width: '20%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  returnContainer: {
    width: '100%',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20
  },
  titleContainer: {
    width: '100%',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20,
    fontSize: 28,
    fontWeight: 'bold'
  }
}))

export default HeaderNavigationBar