import axios from 'axios';

const PATH_LOCAL_API = 'https://ancient-taiga-19247.herokuapp.com';


const getComparisonsSuccess = loadedComparisons => {
    return {
        type: 'GET_COMPARISONS',
        payload: loadedComparisons
    };
};

async function _loadPriceComparisons(callback, productName) {
    try {
        const response = await axios({
            method: 'get',
            url: `${PATH_LOCAL_API}/stores/${productName}`
        });
        if (!response) return console.log('Request failed');

        const responseData = response.data;

        const loadedComparisons = responseData;
        callback(getComparisonsSuccess(loadedComparisons));
    } catch (e) {
        console.log(e);
    }
}

export const loadPriceComparisons = (productName) => {
    return async (dispatch, getState) => {
        await _loadPriceComparisons(dispatch, productName);
        stateAfter = getState();
        return stateAfter.priceComparison.loadedComparisons;
    };
};