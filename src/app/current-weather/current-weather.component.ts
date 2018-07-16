import { Component, OnInit } from '@angular/core'
import { ICurrentWeather } from '../interfaces'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService
      .getCurrentWeather('Bethesda', 'USD')
      .subscribe(data => (this.current = data))
  }

  getOrdinal(n: number): string {
    const s = ['th', 'st', 'nd', 'rd'],
      v = n % 100
    return s[(v - 20) % 10] || s[v] || s[0]
  }
}
