import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { CurrentWeatherComponent } from "./current-weather/current-weather.component";
// Services imports
import { WeatherService } from "./weather/weather.service";
import { WeatherServiceFake } from "./weather/weather.service.fake";

@NgModule({
  declarations: [AppComponent, CurrentWeatherComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [WeatherService, WeatherServiceFake],
  bootstrap: [AppComponent]
})
export class AppModule {}
