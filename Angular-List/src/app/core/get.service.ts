import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from './list.model';

@Injectable({
	providedIn: 'root'
})
export class GetService {
	// Only public for the Tests
	public readonly url = "https://my-json-server.typicode.com/typicode/demo/posts";

	constructor(
		private readonly http: HttpClient
	) { }

	public list$(): Observable<List[]> {
		return this.http.get<List[]>(this.url);
	}
}
