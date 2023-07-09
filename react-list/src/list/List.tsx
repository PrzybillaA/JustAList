import React, { Component } from 'react';
import './List.scss';
import { ListView } from './listView';
import { ListResponse } from './ListResponse';

interface ListState {
	error: Error | null;
	isLoaded: boolean;
	items: ListView[];
	idSortDesc: boolean | undefined;
	titleSortDesc: boolean | undefined;
}

class List extends Component<{}, ListState> {
	private readonly url = "https://my-json-server.typicode.com/typicode/demo/posts";

	state: ListState = {
		error: null,
		isLoaded: false,
		items: [],
		idSortDesc: undefined,
		titleSortDesc: undefined
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
		this.setState(prevState => {
			const idSortDesc = prevState.idSortDesc === undefined ? true : !prevState.idSortDesc;
			const titleSortDesc = undefined;
			const sortedItems = [...prevState.items].sort((a, b) => idSortDesc ? a.id - b.id : b.id - a.id);

			return {
				items: sortedItems,
				idSortDesc,
				titleSortDesc
			};
		});
	};

	sortByTitle = (): void => {
		this.setState(prevState => {
			const titleSortDesc = prevState.titleSortDesc === undefined ? true : !prevState.titleSortDesc;
			const idSortDesc = undefined;
			const sortedItems = [...prevState.items].sort((a, b) =>
				titleSortDesc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
			);

			return {
				items: sortedItems,
				idSortDesc,
				titleSortDesc
			};
		});
	};

	render() {
		const { error, isLoaded, items, idSortDesc, titleSortDesc } = this.state;

		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Data is loading</div>;
		} else {
			return (
				<table className="list-table">
					<thead>
						<tr>
							<th onClick={this.sortById} className={`pointer ${idSortDesc == null ? '' : idSortDesc ? 'desc' : 'asc'}`}>
								Id <span className="arrow">{idSortDesc ? "▼" : "▲"}</span>
							</th>
							<th onClick={this.sortByTitle} className={`pointer ${titleSortDesc == null ? '' : titleSortDesc ? 'desc' : 'asc'}`}>
								Title <span className="arrow">{titleSortDesc ? "▼" : "▲"}</span>
							</th>
							<th>
								Description
							</th>
						</tr>
					</thead>
					<tbody>
						{items?.map(item => (
							<tr key={item.id}>
								<td>{item.id}</td>
								<td>{item.title}</td>
								<td>{item.description}</td>
							</tr>
						))}
					</tbody>
				</table >
			);
		}
	}
}

export default List;
