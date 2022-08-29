import * as t from '../Types'

const initialState = {
    All: [],
    Pdf: [],
    isLoading: true,
    isError: null,
}

const Main = (state=initialState,action)=>{
    switch(action.type){
        case t.GET_ALL_FILES:
            return {
                ...state,
                All: action.payload,
                isLoading: false,
            };

            default:
                return { ...state };
    }
}

export default Main