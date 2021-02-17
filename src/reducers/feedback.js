// FeedbackReducer
import {Feedback} from "../constants/constant";


let initialState = {
    imageUrl:"../../utilities/person.jpg",
    name:"ali",
    rates:"",
    comment:""
}

export default  FeedbackReducer = (state = initialState , action)=>
{
    switch (action.type) {
        case Feedback:
            // console.log(action.payload.rates)
            return {...state,...action.payload}
            break;
    
        default:
            return state;
            break;
    }
}