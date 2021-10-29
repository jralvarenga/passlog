import { Theme, Button } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { SettingsProps } from '../interfaces/interfaces'
import BottomSheet from './BottomSheet'
import { wipeAllStorageData } from '../lib/localStorage'
import { usePasslogUserData } from '../services/PasslogUserdataProvider'

interface AppSettingsSheetProps {
  open: boolean
  setOpen: Function
  settings: SettingsProps | null
  setSettings: Function
}

const AppSettingsSheet = ({ open, setOpen, setSettings, settings }: AppSettingsSheetProps) => {
  const styles = styleSheet()
  const { renderPasslogDataHandler } = usePasslogUserData()

  const wipeData = () => {
    wipeAllStorageData()
    renderPasslogDataHandler!()
    setOpen(false)
  }

  return (
    <BottomSheet
      open={open}
      setOpen={setOpen}
      snapPoints={[200]}
    ><>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <span>App Settings</span>
        </div>
        <div>
          <span>
            Wipe data will only affect your data in the app, not the data in the cloud
          </span>
        </div>
        <div className={styles.buttonContainer}>
          <Button
            className={styles.backupButton}
            variant="contained"
            onClick={wipeData}
            style={{ background: '#ff2e2e' }}
          >
            Wipe data
          </Button>
        </div>
      </div>
      </>
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

export default AppSettingsSheet