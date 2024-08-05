import React, { useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import Detail from "./components/Detail";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
	const [state, setState] = useState({
		s: "sherlock",
		results: [],
		selected: {},
	});
	var x = document.getElementById("myDIV");
	const apiurl =
		"https://www.omdbapi.com/?apikey=a2526df0";

	const searchInput = (e) => {
		let s = e.target.value;

		setState((prevState) => {
			return { ...prevState, s: s };
		});
	};

	const search = (e) => {
		if (e.key === "Enter") {
			document.querySelector('.pic').style.display = 'none'
			axios(apiurl + "&s=" + state.s).then(
				({ data }) => {
					let results = data.Search;

					console.log(results);

					setState((prevState) => {
						return {
							...prevState,
							results: results,
						};
					});
				}
			);
		}
	};

	const openDetail = (id) => {
		axios(apiurl + "&i=" + id).then(({ data }) => {
			let result = data;

			setState((prevState) => {
				return { ...prevState, selected: result };
			});
		});
	};

	const closeDetail = () => {
		setState((prevState) => {
			return { ...prevState, selected: {} };
		});
	};

	return (
		
		<div className="App">
			<header className="App-header">
				<h1>Movie Search Interface</h1>
			</header>
			<main>
				<Search
					searchInput={searchInput}
					search={search}
				/>

				<div className="container">
					{state.results.map((e) => (
						
						<div
							className="item"
							onClick={() =>
								openDetail(e.imdbID)
								
							}
						>
							<img
								style={{ width: "200px" }}
								src={e.Poster}
							/>
							<h3 style={{ color: "white" }}>
								{e.Title}
							</h3>
						</div>
					))}
				</div>
				<div className="pic">
				{<img src={require('./test.jpg')} /> }
				</div>
				{typeof state.selected.Title !=
				"undefined" ? (
					<Detail
						selected={state.selected}
						closeDetail={closeDetail}
					/>
				) : (
					false
				)}
				
			</main>
		
        
		</div>
		
	);
}

export default App;
