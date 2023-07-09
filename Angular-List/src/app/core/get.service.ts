import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ListView } from './list-view.model';
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

	public list$(): Observable<ListView[]> {
		return this.http.get<List[]>(this.url)
			.pipe(
				map(res => {
					return res.map(list => {
						const toReturn: ListView = {
							...list,
							description: list.id === 3
								? "Das ist Nummer 3"
								: "This is number " + list.id
						};
	
						return toReturn;
					})
				})
			);
	}
}
