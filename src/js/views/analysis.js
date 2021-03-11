import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, NavLink, useParams } from "react-router-dom";
import { NavbarLeft } from "../component/navbarleft";
const get = require("simple-get");

const fmp_url = "https://financialmodelingprep.com/";
const fcs_url = "https://fcsapi.com/";

export const Analysis = props => {
	const [analyzedata, setAnalyzeData] = useState([]);
	const [comparisons, setComparisons] = useState([]);
	const apikey = "262c745fe3c5212a43505988b53267ad"; // da6240539dc1685ff601c5c2edb3ff29
	get.concat("http://example.com", function(err, res, data) {
		if (err) throw err;
		console.log(res.statusCode); // 200
		console.log(data); // Buffer('this is the server response')
	});
	// const {
	// 	match: { params }
	// } = this.props;
	const symbol = props.match.params.tickerSymbol;
	// add symbol details fetch for each
	useEffect(() => {
		fetch(fmp_url + `api/v3/profile/${symbol}?apikey=${apikey}`)
			.then(resp => {
				if (!resp.ok) {
					throw new Error(resp.statusText);
				}
				return resp.json();
			})
			.then(resp => {
				setAnalyzeData(resp);
				return true;
			})
			.catch(err => {
				console.error(err);
				return false;
			});
	}, []);
	return (
		<>
			<div className="columns is-multiline">
				<div className="column is-2-tablet">
					<NavbarLeft />
				</div>
				<div className="column is-10-tablet">
					<section className="section">
						<h3 className="title is-3 pb-3 is-spaced">Analysis for {symbol}</h3>
						<div className="container">
							<table className="table is-fullwidth">
								<thead className="thead-dark">
									<tr>
										<th scope="col">Company</th>
										<th scope="col">Price</th>
										<th scope="col">Final Div</th>
										<th scope="col">Exchange</th>
										<th scope="col">Range</th>
										<th scope="col">Beta</th>
										<th scope="col">Changes</th>
										<th scope="col">Currency</th>
										<th scope="col">Address</th>
									</tr>
								</thead>
								<tbody>
									{analyzedata
										? analyzedata.map((value, index) => {
												return (
													<tr key={index}>
														<td>{value.companyName}</td>
														<td>${value.price === null ? "N/A" : value.price}</td>
														<td>{value.lastDiv === 0 ? "N/A" : value.lastDiv}</td>
														<td>
															{value.exchangeShortName === ""
																? "N/A"
																: value.exchangeShortName}
														</td>
														<td>{value.range === null ? "N/A" : value.range}</td>
														<td>{value.beta === null ? "N/A" : value.beta}</td>
														<td>{value.changes === null ? "N/A" : value.changes}</td>
														<td>{value.currency === null ? "N/A" : value.currency}</td>
														<td>{value.address === "" ? "N/A" : value.address}</td>
													</tr>
												);
										  })
										: "Loading..."}
									<br />
									<div className="pt-4 is-10-tablet">
										<h5 className="title is-5">Technical Indicators</h5>
										<iframe
											className="is-full"
											width="100%"
											frameBorder="0"
											height="100%"
											src={`https://widget.finnhub.io/widgets/stocks/chart?symbol=${symbol}&watermarkColor=white&backgroundColor=white&textColor=black`}
											title={`${symbol} Data by Finnhub Stock API`}
										/>
										{/* style="border: 1px solid #e0e3eb;" */}
									</div>
								</tbody>
							</table>
						</div>
					</section>
				</div>
			</div>
		</>
	);
};
