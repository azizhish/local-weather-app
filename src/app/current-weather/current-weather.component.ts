import { Component, Input, OnInit } from '@angular/core'
import { ICurrentWeather } from '../interfaces'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  @Input() current: ICurrentWeather
  show: boolean
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.currentWeather.subscribe(data => {
      this.current = data
      if (this.current.city === '') {
        this.show = false
      } else {
        this.show = true
      }
    })
  }

  getOrdinal(n: number): string {
    const s = ['th', 'st', 'nd', 'rd'],
      v = n % 100
    return s[(v - 20) % 10] || s[v] || s[0]
  }
}
