import * as React from "react";

import { Grid, Row, Col } from 'react-flexbox-grid';

export default class Destaques extends React.Component {
	render() {
		return (
			<Grid fluid>
				<Row center="xs">
					<Col xs={8} >
						<div style={{ height: '400px' }}>
							<Row>
								<Col xs={6}>
									{this.props.card1}
								</Col>
								<Col xs={6}>
									<Row>
										<Col xs={12}>
											{this.props.card2}
										</Col>
										<Col xs={12}>
											{this.props.card3}
										</Col>
									</Row>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			</Grid>
		);
	}
}