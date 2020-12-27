import axios from 'axios';

const PATH_LOCAL_API = 'http://localhost:9001';


const getComparisonsSuccess = loadedComparisons => {
    return {
        type: 'GET_COMPARISONS',
        payload: loadedComparisons
    };
};

async function _getComparisons(callback) {
    try {
        const response = await axios({
            method: 'get',
            url: `${PATH_LOCAL_API}/shoppingLists`
        });
        if (!response) return console.log('Request failed');

        const responseData = response.data;

        const loadedComparisons = responseData;
        callback(getComparisonsSuccess(loadedComparisons));
    } catch (e) {
        console.log(e);
    }
}

export const getComparisons = () => {
    return async (dispatch, getState) => {
        await _getComparisons(dispatch);
        stateAfter = getState();
        return stateAfter.priceComparison.loadedComparisons;
    };
};