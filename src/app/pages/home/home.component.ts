import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../../core/services/app.service';
import {ADD_FAV, DEFAULT_LAT, DEFAULT_LNG, REMOVE_FAV} from '../../app.consts';
import {GeoPositionRes} from '../../model/geo-cond';
import {DailyForecast, FiveDaysForecast} from '../../model/five-days';
import {Subject} from 'rxjs';
import {debounceTime, filter, switchMap, takeUntil} from 'rxjs/operators';
import {AutoCompleteSuggestions} from '../../model/auto-complete-suggestions';
import {WeatherService} from '../../core/services/weather.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  autoCompleteInput = new Subject();
  autoCompleteValue;
  autoCompletedSuggestions: AutoCompleteSuggestions[];
  cityName: string;
  headLine: string;
  forecasts: DailyForecast[];
  favState;
  selectedKey: any;
  
  constructor(protected appService: AppService, protected weatherService: WeatherService) {
  }

  ngUnSubscribe: Subject<void> = new Subject<void>();

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords;
        this.appService.getGeoPosition(latitude, longitude).subscribe((data: GeoPositionRes) => {
          this.handleInitPosition(data);
        });
      });
    } else {
      this.appService.getGeoPosition(DEFAULT_LAT, DEFAULT_LNG).subscribe((data: GeoPositionRes) => {
        this.handleInitPosition(data);
      });
    }


    this.autoCompleteInput
      .pipe(
        filter((data: string) => data.length > 0),
        takeUntil(this.ngUnSubscribe),
        debounceTime(300),
        switchMap((data: string) => {
          return this.appService.getAutoComplete(data);
        })
      )
      .subscribe((suggestions: AutoCompleteSuggestions[]) => {
        this.autoCompletedSuggestions = suggestions;
      });
  }


  private getFavState(Key: string) {
    const storeState = this.weatherService.get();
    return storeState[Key] ? REMOVE_FAV : ADD_FAV;
  }

  selectSuggestion(suggestion: AutoCompleteSuggestions) {
    this.favState          = this.getFavState(suggestion.Key);
    this.cityName          = `${suggestion.LocalizedName},${suggestion.Country.LocalizedName}`;
    this.autoCompleteValue = this.cityName;
    this.getFiveDays(suggestion.Key);
    this.autoCompletedSuggestions = null;
  }


  private handleInitPosition(geoPositionRes: GeoPositionRes) {
    this.favState    = this.getFavState(geoPositionRes.Key);
    this.cityName    = `${geoPositionRes.EnglishName},${geoPositionRes.Country.EnglishName}`;
    this.getFiveDays(geoPositionRes.Key);
  }


  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }


  getFiveDays(key) {
    this.selectedKey = key;
    this.appService.get5DaysOfForecasts(key).subscribe((fiveDaysForecastData: FiveDaysForecast) => {
      this.headLine  = fiveDaysForecastData.Headline.Text;
      this.forecasts = fiveDaysForecastData.DailyForecasts;
    });
  }


  toggleFavorites() {
    const faveState = this.getFavState(this.selectedKey);
    const selectedCity = {
      key: this.selectedKey,
      cityName: this.cityName
    };
    if (faveState === ADD_FAV) {
      this.weatherService.add(selectedCity);
    } else {
      this.weatherService.remove(selectedCity);
    }

    this.favState = faveState === ADD_FAV ? REMOVE_FAV : ADD_FAV;


  }
}
