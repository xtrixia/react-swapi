export const SET_PERSON = 'SET_PERSON';

export function setPerson(person){
	return {
    type: SET_PERSON,
    person: person
	};
}
