import { HttpClientTestingModule } from '@angular/common/http/testing'
import { inject, TestBed } from '@angular/core/testing'
import { WeatherService } from './weather.service'
import { WeatherServiceFake } from './weather.service.fake'
import { MaterialModule } from '../material.module'

describe('WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule],
      providers: [{ provide: WeatherService, useClass: WeatherServiceFake }],
    })
  })

  it('should be created', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy()
  }))
})
