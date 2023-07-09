import { Component, OnInit } from '@angular/core';
import { GetService } from './core/get.service';
import { Observable } from 'rxjs';
import { List } from './core/list.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'Angular-List';

	public list$: Observable<List[]>;

	constructor(
		private readonly getService: GetService
	) { }

	public ngOnInit(): void {
		this.list$ = this.getService.list$();
	}
}
