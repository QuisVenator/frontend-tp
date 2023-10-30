import React, { createContext, useContext, useReducer } from 'react';

type State = {
	visible: boolean;
};

const initialState: State = {
	visible: false,
};

interface Toggle {
	type: SnackBarActionType.TOGGLE;
	payload: boolean;
}

interface Disable {
	type: SnackBarActionType.DISABLE;
}

type SnackBarAction = Toggle | Disable;

export const enum SnackBarActionType {
	TOGGLE,
	DISABLE
}

const SnackBarContext = createContext<{
	state: State;
	dispatch: React.Dispatch<SnackBarAction>;
}>({ state: initialState, dispatch: () => null });
(initialState);

const snackBarReducer = (state: State, action: SnackBarAction) => {
	switch (action.type) {
		case SnackBarActionType.TOGGLE:
			return {
				...state,
				visible: action.payload,
			};
		case SnackBarActionType.DISABLE:
			return {
				...state,
				visible: false,
			};
		default:
			return state;
	}
}

export const SnackBarProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(snackBarReducer, initialState);
	return (
		<SnackBarContext.Provider value={{ state, dispatch }}>
			{children}
		</SnackBarContext.Provider>
	);
};

export const useSnackBarContext = () => useContext(SnackBarContext);