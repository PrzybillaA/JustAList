import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListView } from '../core/list-view.model';

@Component({
	selector: 'st-list-factory',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './list-factory.component.html',
	styleUrls: ['./list-factory.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListFactoryComponent {
	@Input() public set list(value: ListView[] | undefined | null) {
		if(value) {
			this.listIntern = [...value];
		}
	}

	public listIntern: ListView[];
	public sortOrder: {
		key: keyof ListView;
		ascending: boolean;
	} | undefined;

	// Can only be called, when the list isn't empty
	public getKeys(): (keyof ListView)[] {
		return Object.keys(this.listIntern[0]) as (keyof ListView)[];
	}

	// Can only be called, when the list isn't empty
	public sort(key: keyof ListView): void {
		const currentSort = this.sortOrder?.key === key ? this.sortOrder?.ascending : undefined;

		switch (typeof this.listIntern[0][key]) {
			case "string":
				this.sortString(key, currentSort ?? true);
				break;
			case "number":
				this.sortNumber(key, currentSort ?? true);
				break;
			default:
				throw new Error("Not Implemented type");
		}

		this.sortOrder = {
			key: key,
			ascending: currentSort ? !currentSort : true
		};
	}

	private sortString(key: keyof ListView, ascending: boolean): void {
		this.listIntern.sort((a, b) => ascending
			? (b[key] as string).localeCompare((a[key] as string))
			: (a[key] as string).localeCompare((b[key] as string)));
	}

	private sortNumber(key: keyof ListView, ascending: boolean): void {
		this.listIntern.sort((a, b) => ascending
			? (b[key] as number) - (a[key] as number)
			: (a[key] as number) - (b[key] as number));
	}
}
