import { Theme, Button, useTheme, Switch  } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { setUserSettings as  setUserSettingsInStorage } from '../lib/localStorage'
import { UserSettingsProps } from '../interfaces/interfaces'
import BottomSheet from './BottomSheet'

interface CloudSettingsSheetProps {
  open: boolean
  setOpen: Function
  userSettings: UserSettingsProps | null
  setUserSettings: Function
}

const CloudSettingsSheet = ({ open, setOpen, setUserSettings, userSettings }: CloudSettingsSheetProps) => {
  const styles = styleSheet()
  const theme = useTheme()

  const enableAlwaysSync = (checked: boolean) => {
    const newSettings: UserSettingsProps = {
      ...userSettings!,
      alwaysSync: checked
    }
    setUserSettingsInStorage(newSettings)

    setUserSettings(newSettings)
    setTimeout(() => {
      setOpen(false)
    }, 300)
  }

  return (
    <BottomSheet
      open={open}
      setOpen={setOpen}
      snapPoints={[230]}
    >
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <span>Cloud Settings</span>
        </div>
        <div className={styles.enableContainer}>
          <span>
            Enable always backup
          </span>
          <div>
            <Switch
              checked={userSettings?.alwaysSync ? userSettings.alwaysSync : false}
              onChange={(e) => enableAlwaysSync(e.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.backupButton}
            variant="contained"
          >
            Backup now
          </Button>
        </div>
      </div>
    </BottomSheet>
  )
}

const styleSheet = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    maxWidth: 700,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  titleContainer: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  enableContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backupButton: {
    width: '100%',
    maxWidth: 700,
    fontSize: 16,
    color: theme.palette.text.primary,
    borderColor: theme.palette.text.primary,
    textTransform: 'none',
  },
}))

export default CloudSettingsSheet