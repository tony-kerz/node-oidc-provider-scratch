import Provider from 'oidc-provider'
import debug from 'debug'

const dbg = debug('app:oidc-provider')

const configuration = {}

const clients = [
  {
    application_type: 'web',
    client_id: 'foo',
    client_secret: 'bar',
    // redirect_uris: ['https://lvh.me:8080/'],
    redirect_uris: ['http://localhost:8080/'],
    grant_types: ['implicit'],
    token_endpoint_auth_method: 'none',
    response_types: ['id_token']
  }
]

const port = 3000
const oidc = new Provider(`http://localhost:${port}`, configuration)
oidc.initialize({clients}).then(() => {
  dbg('listening on port=%o', port)
  oidc.app.listen(port)
})
