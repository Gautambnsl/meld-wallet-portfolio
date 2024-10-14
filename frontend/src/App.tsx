// project import
import Routes from 'routes'
import Locales from 'components/Locales'
import ScrollTop from 'components/ScrollTop'
import Snackbar from 'components/@extended/Snackbar'
import Notistack from 'components/third-party/Notistack'

// auth-provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext'
import ThemeCustomization from 'themes'

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    {/* <RTLLayout> */}
    <Locales>
      <ScrollTop>
        <AuthProvider>
          <Notistack>
            <Routes />
            <Snackbar />
          </Notistack>
        </AuthProvider>
      </ScrollTop>
    </Locales>
    {/* </RTLLayout> */}
  </ThemeCustomization>
)

export default App
