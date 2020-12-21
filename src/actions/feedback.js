// FeedbackAction

import {Feedback} from "../constants/constant";
export default FeedbackAction = (inputData)=>{
    // console.log("feedback"+inputData)
    return {
        type:Feedback,
        payload:inputData
    }
}