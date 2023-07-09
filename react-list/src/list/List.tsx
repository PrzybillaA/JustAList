import { Component } from 'react';
import './List.scss';
import { ListView } from './listView';
import { ListResponse } from './ListResponse';

type ListProps = {
	list: ListView[]
}

class List extends Component {
	private readonly url = "https://my-json-server.typicode.com/typicode/demo/posts";

	state = {
		error: null as Error | null,
		isLoaded: false,
		items: [] as ListView[]
	};

	componentDidMount() {
		fetch(this.url)
			.then(res => res.json())
			.then(
				(result: ListResponse[]) => {
					this.setState({
						isLoaded: true,
						items: result.map(item => {
							return {
								...item,
								description: "This is number " + item.id
							}
						})
					});
				},
				(error: Error) => {
					this.setState({
						isLoaded: true,
						error: error
					});
				}
			);
	}

	sortById = (): void => {
		this.state.items.sort((a, b) => this.idSortDesc
			? a.id - b.id
			: b.id - a.id);
		this.idSortDesc = !this.idSortDesc;
		this.titleSortDesc = undefined;
	};
	public idSortDesc: boolean | undefined = undefined;

	sortByTitle = (): void => {
		this.state.items.sort((a, b) => this.titleSortDesc
			? a.title.localeCompare(b.title)
			: b.title.localeCompare(a.title));
		this.titleSortDesc = !this.titleSortDesc;
		this.idSortDesc = undefined;
	}
	public titleSortDesc: boolean | undefined = undefined;

	render() {
		const { error, isLoaded, items } = this.state;
		const sortById = this.sortById;
		const idSortDesc = this.idSortDesc;
		const sortByTitle = this.sortByTitle;
		const titleSortDesc = this.titleSortDesc;

		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Data is loading</div>;
		} else {
			return (
				<table className="list-table">
					<tr>
						<th onClick={sortById} className={`pointer ${idSortDesc == null ? '' : idSortDesc ? 'desc' : 'asc'}`}>
							Id <span className="arrow">{idSortDesc ? "▼" : "▲"}</span>
						</th>
						<th onClick={sortByTitle} className={`pointer ${titleSortDesc == null ? '' : titleSortDesc ? 'desc' : 'asc'}`}>
							Title <span className="arrow">{titleSortDesc ? "▼" : "▲"}</span>
						</th>
						<th>
							Description
						</th>
					</tr>
					{items?.map(item => (
						<tr key={item.id}>
							<td>{item.id}</td>
							<td>{item.title}</td>
							<td>{item.description}</td>
						</tr>
					))}
				</table >
			);
		}
	}
}

export default List;
