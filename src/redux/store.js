import { createStore } from 'redux';
const initState = {
	userInfo: {},
  tokenList: [],
  nftList: []
}
const reducer = (state = initState, action) => {
	switch (action.type) {
		case 'CHANGE_USER_INFO':
			return {
				...state,
				userInfo: action.value,
			};
		case 'CHANGE_TOKEN_LIST':
			return {
				...state,
				tokenList: action.value,
			};
		case 'CHANGE_NFT_LIST':
			return {
				...state,
				nftList: action.value,
			};
		default:
			return state;
	}
};

const store = createStore(reducer);

export default store;
