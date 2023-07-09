import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ListView } from '../core/list-view.model';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'st-list-static',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './list-static.component.html',
	styleUrls: ['./list-static.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListStaticComponent {
	@Input() public set list(value: ListView[] | undefined | null) {
		if(value) {
			this.listIntern = [...value];
		}
	}

	public listIntern: ListView[];

	public idSortDesc: boolean | undefined = undefined;
	public titleSortDesc: boolean | undefined = undefined;

	public sortById(): void {
		this.listIntern.sort((a, b) => this.idSortDesc
			? a.id - b.id
			: b.id - a.id);
		this.idSortDesc = !this.idSortDesc;
		this.titleSortDesc = undefined;
	}

	public sortByTitle(): void {
		this.listIntern.sort((a, b) => this.titleSortDesc
			? a.title.localeCompare(b.title)
			: b.title.localeCompare(a.title));
		this.titleSortDesc = !this.titleSortDesc;
		this.idSortDesc = undefined;
	}
}