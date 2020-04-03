import React from 'react';
import AppBar from '../../components/AppBar';
import Destaques from './Destaques';
import {
	Card,
	StyledBody,
	StyledAction
} from "baseui/card";
import { Button } from "baseui/button";

class MyCustomCard extends React.Component {
	render() {
		return (<Card style={{ height: '100%' }}>
			<StyledBody>
				{this.props.body}
			</StyledBody>
			<StyledAction>
				<Button
					overrides={{
						BaseButton: { style: { width: "100%" } }
					}}
				>
					Button Label
		</Button>
			</StyledAction>
		</Card>);
	}
}

export default class Home extends React.Component {

	render() {
		// var cardComponent = (
		// 	<MyCustomCard
		// 		body="Proin ut dui sed metus pharetra hend rerit vel non
		// 		mi. Nulla ornare faucibus ex, non facilisis nisl.
		// 		Proin ut dui sed metus pharetra hend rerit vel non
		// 		mi. Nulla ornare faucibus ex, non facilisis nisl."/>
		// );

		return (
			<div>
				<AppBar />
				<br />
				<Destaques
					card1={<div></div>}
					card2={<div></div>}
					card3={<div></div>}
				/>
			</div>
		);
	}
}