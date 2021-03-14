import { registration,Loingdata,token } from "./initState"; 
export function Reducers(state = registration, action) {
    switch (action.type) {
      case "reg_next":
        return { ...state, next: state.next + 1,data: action.data};
      case "reg_prev":
        return { ...state, next: state.next - 1};
      case "step1":
          return { ...state, step1: true };
      case "step2":
            return { ...state, step2: true };
      case "profileimg":
            return { ...state,profileimg: action.profileimg };
      case "profileimgURL":
             return { ...state,profileimgURL: action.profileimgURL };
      case "aadharfrontimg":
              return { ...state,aadharfrontimg: action.aadharfrontimg };
      case "aadharfrontimgURL":
              return { ...state,aadharfrontimgURL: action.aadharfrontimgURL };
      case "aadharBackimg":
              return { ...state,aadharBackimg: action.aadharBackimg };
      case "aadharBackimgURL":
              return { ...state,aadharBackimgURL: action.aadharBackimgURL };
      case "setp3":
              return { ...state, step3: true};
      case "isLogin":
        return { ...state, isLogin:true ,data: action.data}


      default:
        return state;
    }
  }
