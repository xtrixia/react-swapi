import { SET_PERSON } from "../actions";

function person(state = {}, action) {
	switch(action.type) {
		case SET_PERSON:
			return action.person;
		default:
			return state;
	}
}

export default person;
