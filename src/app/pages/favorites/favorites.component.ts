import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../../core/services/weather.service';
import {Subject} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';
import {AppService} from '../../core/services/app.service'; 

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(protected weatherService: WeatherService, protected appService: AppService) {
  }

  ngUnSubscribe: Subject<void> = new Subject<void>();

  favArr = [];

  ngOnInit() {
    this.weatherService.stateChanged
      .pipe(
        takeUntil(this.ngUnSubscribe),
        filter(state => state !== null)
      )
      .subscribe(state => {
        Object.keys(state).map((key) => {
          this.favArr.push(state[key]);
        });
      });
  }

}
