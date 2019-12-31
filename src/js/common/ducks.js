const SET_USER_PROPS = "common/SET_USER_PROPS"

export const setUserProps = (props) => ({type: SET_USER_PROPS, props})

const defaultState = {}

export const commonReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_USER_PROPS:
			return {
				...state,
				userProps: action.props
			}
		default:
			return state
	}
}
