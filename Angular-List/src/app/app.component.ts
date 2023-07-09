import { Component, OnInit } from '@angular/core';
import { GetService } from './core/get.service';
import { Observable } from 'rxjs';
import { ListView } from './core/list-view.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = "Angular-List";

	public list$: Observable<ListView[]>;

	constructor(
		private readonly getService: GetService
	) { }

	public ngOnInit(): void {
		this.list$ = this.getService.list$();
	}
}
