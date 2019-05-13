import axios from 'axios'
import { AuthenticationContext } from 'vue-adal'

axios.defaults.crossDomain = true
axios.defaults.headers.get['access-control-allow-origin'] = '*'

export function getUserAdGroups (id) {
  AuthenticationContext.acquireToken(id, (err, token) => {
    if (err) {
      console.log('No token received...')
    }
    console.log(token)
    let graphEndpoint = 'https://registration-pool-api.dvsdev.uk/info/'

    axios.get(graphEndpoint + token)
      .then(response => {
        console.log('5. Response: ' + response)
      })
  })
}

// // import AuthenticationContext from 'adal-angular/lib/adal.js'
// import AuthenticationContext from 'vue-adal'
// import axios from 'axios'
// import store from '../store'
//
// axios.defaults.crossDomain = true
// axios.defaults.headers.get['access-control-allow-origin'] = '*'
//
// const config = {
//   tenant: 'govje.onmicrosoft.com',
//   clientId: 'f3088b8c-dd36-4051-8ec1-6e9340b1d9e7',
//   redirectUri: 'http://localhost:8080/',
//   cacheLocation: 'localStorage',
//   validateAuthority: true,
//   consentScopes: ['User.Read.All']
// }
//
// // Turn this on for logging
// // window.authContext.log = console.log;
//
// export default {
//   authenticationContext: null,
//   initialize () {
//     this.authenticationContext = new AuthenticationContext(config)
//
//     return new Promise((resolve, reject) => {
//       if (this.authenticationContext.isCallback(window.location.hash) || window.self !== window.top) {
//         this.authenticationContext.handleWindowCallback()
//         resolve()
//       } else {
//         let user = this.authenticationContext.getCachedUser()
//
//         if (user) {
//           resolve()
//         } else {
//           this.signIn()
//         }
//       }
//     })
//   },
//   acquireToken () {
//     return new Promise((resolve, reject) => {
//       // this.authenticationContext.acquireToken('53c96e73-d1eb-44cd-9c95-729f55303fd6', (error, token) => {
//       this.authenticationContext.acquireToken('f3088b8c-dd36-4051-8ec1-6e9340b1d9e7', (error, token) => {
//         if (error || !token) {
//           return reject(error)
//         } else {
//           return resolve(token)
//         }
//       })
//     })
//   },
//   acquireTokenRedirect () {
//     this.authenticationContext.acquireTokenRedirect('53c96e73-d1eb-44cd-9c95-729f55303fd6')
//     // this.authenticationContext.acquireTokenRedirect('f3088b8c-dd36-4051-8ec1-6e9340b1d9e7')
//   },
//   isAuthenticated () {
//     if (this.authenticationContext.getCachedToken(config.clientId)) {
//       return true
//     }
//     return false
//   },
//   getUserProfile () {
//     // console.log('1. Starting...')
//     let profile = this.authenticationContext.getCachedUser().profile
//     // console.log(profile)
//     return profile
//   },
//   async getUserADDetails (isGetMemberOf, actionName) {
//     console.log('2. Params:' + isGetMemberOf + ', ' + actionName)
//     let graphEndpoint = 'https://graph.microsoft.com/v1.0/me/'
//     if (isGetMemberOf) {
//       graphEndpoint = graphEndpoint + 'memberOf'
//       console.log('3. GraphEndPoint: ' + graphEndpoint)
//     }
//
//     let token = await new Promise((resolve, reject) => {
//       this.authenticationContext.acquireToken('https://graph.microsoft.com', (error, token) => {
//         if (error || !token) {
//           return reject(error)
//         } else {
//           return resolve('Token: ' + token)
//         }
//       })
//     })
//
//     console.log('4. ' + token)
//
//     let axiosConfig = {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + token
//       }
//     }
//
//     axios.get(graphEndpoint, axiosConfig).then(response => {
//       console.log('5. Response: ' + response)
//       if (isGetMemberOf) {
//         store.dispatch(actionName, { groups: response.data.value })
//       } else {
//         store.dispatch(actionName, { user: response.data })
//       }
//     })
//   },
//   signIn () {
//     this.authenticationContext.login()
//   },
//   signOut () {
//     this.authenticationContext.logOut()
//   }
// }
