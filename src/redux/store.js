import { createStore } from 'redux';
const initState = {
	userInfo: {},
  tokenList: [],
  nftList: [],
	tokenDetails: {
		allTokenVal: 0,
		MaxTokenItem: {}
	},
	nftDetails: {}
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
		case 'CHANGE_TOKEN_DETAILS':
			return {
				...state,
				tokenDetails: action.value,
			};
		case 'CHANGE_NFT_LIST':
			return {
				...state,
				nftList: action.value,
			};
		case 'CHANGE_NFT_DETAILS':
			return {
				...state,
				nftDetails: action.value,
			};
		default:
			return state;
	}
};

const store = createStore(reducer);

export default store;
