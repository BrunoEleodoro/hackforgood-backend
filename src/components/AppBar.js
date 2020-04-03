import * as React from "react";
import {
	HeaderNavigation,
	ALIGN,
	StyledNavigationList,
	StyledNavigationItem
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { Button } from "baseui/button";
import { StatefulSelect, TYPE } from "baseui/select";

export default class AppBar extends React.Component {
	render() {
		return (
			<HeaderNavigation style={{ padding: '10px' }}>
				<StyledNavigationList $align={ALIGN.left}>
					<StyledNavigationItem>GoodVibes</StyledNavigationItem>
				</StyledNavigationList>
				<StyledNavigationList $align={ALIGN.center} />
				<StyledNavigationList $align={ALIGN.right}>
					<StyledNavigationItem>
						<StyledLink href="/home">
							Home
			  			</StyledLink>
					</StyledNavigationItem>
					<StyledNavigationItem>
						<StyledLink href="/emalta">
							Em Alta
			  			</StyledLink>
					</StyledNavigationItem>
					<StyledNavigationItem>
						<StyledLink href="/filtros">
							Filtros
			  			</StyledLink>
					</StyledNavigationItem>
				</StyledNavigationList>
				<StyledNavigationList $align={ALIGN.right}>
					<StyledNavigationItem style={{ width: '300px' }}>
						<StatefulSelect
							// {...options}
							placeholder="Pesquisar..."
							type={TYPE.search}
							getOptionLabel={props => props.option.id || null}
							onChange={() => { }}

						/>
					</StyledNavigationItem>
				</StyledNavigationList>
			</HeaderNavigation>
		);
	}
}