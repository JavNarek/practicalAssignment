import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppInitService } from './shared/services/app-init.service';


export function initializeApp(appInitService: AppInitService) {
  return (): Promise<any> => { 
    return appInitService.init();
  }
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [  
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps:[AppInitService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
