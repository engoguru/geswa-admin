import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import contactReducer from "../slice/contactSlice"
import hospitalReducer from "../slice/hospitalSlice"
import blogReducer from "../slice/blogSlice"
import careerReducer from "../slice/careerslice"
import employeeReducer from "../slice/employee/employeeSlice"
import memberPlanReducer from "../slice/memberShipSlice"

import  memberPurchaseReducer from "../slice/memberPurchaseSlice"
import memberServiceReducer from "../slice/memberServiceSlice"

export const rootReducer = combineReducers({
    user: userReducer,
    contact:contactReducer,
    hospital:hospitalReducer,
    blog:blogReducer,
    career:careerReducer,
    employee:employeeReducer,
    memberPlan:memberPlanReducer,

    memberPurchase:memberPurchaseReducer,
    memberService:memberServiceReducer

    

});