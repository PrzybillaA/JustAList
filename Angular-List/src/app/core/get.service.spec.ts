import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetService } from './get.service';
import { ListView } from './list-view.model';

describe("GetService", () => {
	let service: GetService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [GetService]
		});

		service = TestBed.inject(GetService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should retrieve a list of items from the API", () => {
		const mockList: ListView[] = [
			{ id: 1, title: "Item 1", description: "This is number 1" },
			{ id: 2, title: "Item 2", description: "This is number 2" },
			{ id: 3, title: "Item 3", description: "Das ist Nummer 3" }
		];

		service.list$().subscribe((result: ListView[]) => {
			expect(result).toEqual(mockList);
		});

		const req = httpMock.expectOne(service.url);
		expect(req.request.method).toBe("GET");
		req.flush(mockList);
	});
});
