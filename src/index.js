import Provider from 'oidc-provider'
import debug from 'debug'

const dbg = debug('app:oidc-provider')

const configuration = {}

const clients = [
  {
    client_id: 'foo',
    client_secret: 'bar',
    redirect_uris: ['http://lvh.me:8080/cb']
  }
]

const port = 3000
const oidc = new Provider(`http://localhost:${port}`, configuration)
oidc.initialize({clients}).then(() => {
  dbg('listening on port=%o', port)
  oidc.app.listen(port)
})
