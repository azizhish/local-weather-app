import { Observable, of, BehaviorSubject } from 'rxjs'
import { ICurrentWeather } from '../interfaces'
import { IWeatherService } from './weather.service'

export class WeatherServiceFake implements IWeatherService {
  private fakeWeather: ICurrentWeather = {
    city: 'Bursa',
    country: 'TR',
    date: 1485789600,
    image: '',
    temperature: 280.32,
    description: 'light intensity drizzle',
  }
  currentWeather = new BehaviorSubject<ICurrentWeather>({
    city: '',
    country: '',
    date: Date.now(),
    image: '',
    temperature: 0,
    description: '',
  })

  public getCurrentWeather(city: string, country: string): Observable<ICurrentWeather> {
    return of(this.fakeWeather)
  }

  getCurrentWeahterByCoords(coords: Coordinates): Observable<ICurrentWeather> {
    return of(this.fakeWeather)
  }
}
