import { header } from './src/components/Layout/header/header'
import { main } from './src/components/Layout/main/main'
import { home } from './src/pages/home/home'
import { restoreSession } from './src/utils/functions/restoreSession'
import './style.css'

await restoreSession()
header()
main()
home()
