import React from 'react';
import useWindowSize from './hooks/useWindowSize';

export const withHooksHOC = (Component) => {
	return (props) => {
		const { width } = useWindowSize();

		return <Component screenWidth={width} {...props} />;
	};
};
