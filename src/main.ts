import { bootstrapApplication } from '@angular/platform-browser'
import { appConfig } from './app/app.config'
import { AppComponent } from './app/app.component'
import { provideAuth0 } from '@auth0/auth0-angular'
import { mergeApplicationConfig } from '@angular/core'
import { environment } from './environments/environment'

const authConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideAuth0({
      domain: environment.authDomain,
      clientId: environment.authClientId,
      authorizationParams: {
        redirect_uri: window.location.href,
      },
    }),
  ],
})

bootstrapApplication(AppComponent, authConfig).catch((err) => console.error(err))
