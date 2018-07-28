import { Component } from '@angular/core'
import { WeatherService } from './weather/weather.service'
import { ICurrentWeather } from './interfaces'

@Component({
  selector: 'app-root',
  template: `
<mat-toolbar color="primary">
  <span>Better Weather</span>
</mat-toolbar>
<div fxLayoutAlign="center">
  <div class="mat-caption">Your city, your forecast, right now!</div>
</div>
  <div fxLayoutAlign="center">
    <app-city-search (searchEvent)="doSearch($event)"></app-city-search>
  </div>
<div fxLayout="row">
  <div fxFlex></div>
  <div fxFlex="300px">
    <mat-card>
    <mat-card-header>
      <mat-card-title>
        <div class="mat-title">Current Weather</div>
      </mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <app-current-weather [current]="currentWeather"></app-current-weather>
    </mat-card-content>
    </mat-card>
  </div>
  <div fxFlex></div>
</div>
  `,
})
export class AppComponent {
  constructor(private weatherService: WeatherService) {}
  currentWeather: ICurrentWeather
  doSearch(searchValue) {
    const userInput = searchValue.split(',').map(s => s.trim())
    this.weatherService
      .getCurrentWeather(userInput[0], userInput.length > 1 ? userInput[1] : undefined)
      .subscribe(data => (this.currentWeather = data))
  }
}
