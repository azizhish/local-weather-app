import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import { ICurrentWeather } from '../interfaces'
import { environment } from '../../environments/environment'

export interface IWeatherService {
  getCurrentWeather(
    search: string | number,
    country?: string
  ): Observable<ICurrentWeather>
  getCurrentWeahterByCoords(coords: Coordinates): Observable<ICurrentWeather>
}

interface ICurrentWeatherData {
  weather: [
    {
      description: string
      icon: string
    }
  ]
  main: {
    temp: number
  }
  sys: {
    country: string
  }
  dt: number
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService implements IWeatherService {
  currentWeather = new BehaviorSubject<ICurrentWeather>({
    city: '',
    country: '',
    date: Date.now(),
    image: '',
    temperature: 0,
    description: '',
  })
  getCurrentWeahterByCoords(coords: Coordinates): Observable<ICurrentWeather> {
    const uriParams = `lat=${coords.latitude}&amplon=${coords.longitude}`
    return this.getCurrentWeatherHelper(uriParams)
  }
  private getCurrentWeatherHelper(uri: string): Observable<ICurrentWeather> {
    return this.httpClient
      .get<ICurrentWeatherData>(
        `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
          `${uri}&appid=${environment.appId}`
      )
      .pipe(map(data => this.transformToICurrentWeather(data)))
  }
  constructor(private httpClient: HttpClient) {}

  private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
    return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: this.convertKelvinToFahrenheit(data.main.temp),
      description: data.weather[0].description,
    } as ICurrentWeather
  }

  private convertKelvinToFahrenheit(kelvin: number): number {
    return (kelvin * 9) / 5 - 459.67
  }

  getCurrentWeather(
    search: string | number,
    country?: string
  ): Observable<ICurrentWeather> {
    let uri = ''
    if (typeof search === 'string') {
      uri = `q=${search}`
    } else {
      uri = `zip${search}`
    }
    if (country) {
      uri = `${uri},${country}`
    }
    return this.getCurrentWeatherHelper(uri)
  }
}
