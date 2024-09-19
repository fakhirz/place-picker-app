import { useState, useEffect } from 'react';
export function useFetch(fetchFn, initialValue) {
	const [ isFetching, setIsFetching ] = useState(false);
	const [ error, setError ] = useState();
	const [ fetchedData, setFetchedData ] = useState(initialValue);
	useEffect(
		() => {
			async function fetchData() {
				try {
					setIsFetching(true);
					const data = await fetchFn();
					setFetchedData(data);
				} catch (error) {
					setError({
						message: error.mesage || 'Failed to fetch data!'
					});
				}
				setIsFetching(false);
			}
			fetchData();
		},
		[ fetchFn ]
	);
	return {
		isFetching,
		error,
		fetchedData,
		setFetchedData
	};
}
