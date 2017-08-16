import Provider from 'oidc-provider'
import debug from 'debug'

const dbg = debug('app:oidc-provider')

const configuration = {
  claims: {
    openid: ['scope']
  },
  async findById(ctx, id) {
    dbg('find-by-id: ctx=%o, id=%o', ctx, id)
    return {
      accountId: id,
      async claims() {
        dbg('claims')
        return id === 'admin' ? {scope: 'admin'} : {}
      }
    }
  },
  features: {sessionManagement: true}
}

const clients = [
  {
    application_type: 'web',
    client_id: 'foo',
    client_secret: 'bar',
    // redirect_uris: ['http://lvh.me:8080/'],
    redirect_uris: ['http://localhost:8080/'],
    grant_types: ['implicit'],
    // token_endpoint_auth_method: 'none',
    // response_types: ['id_token']
    // hello.js client seems to want 'id_token token'...
    response_types: ['id_token token']
  }
]

const port = 3000
const oidc = new Provider(`http://localhost:${port}`, configuration)
oidc.initialize({clients}).then(() => {
  dbg('listening on port=%o', port)
  oidc.app.listen(port)
})
