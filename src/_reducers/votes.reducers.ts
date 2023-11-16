import {vote} from "../_constants"

export type Votes = {
    one_qn_no_vote_weightage: number
    one_qn_yes_vote_weightage: number
    two_qn_no_vote_weightage: number
    two_qn_yes_vote_weightage: number
    three_qn_no_vote_weightage: number
    three_qn_yes_vote_weightage: number
    four_qn_no_vote_weightage: number
    four_qn_yes_vote_weightage: number
    five_qn_no_vote_weightage: number
    five_qn_yes_vote_weightage: number
    one_qn_no_vote_pct: number
    one_qn_yes_vote_pct: number
    two_qn_no_vote_pct: number
    two_qn_yes_vote_pct: number
    three_qn_no_vote_pct: number
    three_qn_yes_vote_pct: number
    four_qn_no_vote_pct: number
    four_qn_yes_vote_pct: number
    five_qn_no_vote_pct: number
    five_qn_yes_vote_pct: number
  };

const defaultVotes: Votes = {
    one_qn_no_vote_weightage: 0,
    one_qn_yes_vote_weightage: 0,
    two_qn_no_vote_weightage: 0,
    two_qn_yes_vote_weightage: 0,
    three_qn_no_vote_weightage: 0,
    three_qn_yes_vote_weightage: 0,
    four_qn_no_vote_weightage: 0,
    four_qn_yes_vote_weightage: 0,
    five_qn_no_vote_weightage: 0,
    five_qn_yes_vote_weightage: 0,
    one_qn_no_vote_pct: 0,
    one_qn_yes_vote_pct: 0,
    two_qn_no_vote_pct: 0,
    two_qn_yes_vote_pct: 0,
    three_qn_no_vote_pct: 0,
    three_qn_yes_vote_pct: 0,
    four_qn_no_vote_pct: 0,
    four_qn_yes_vote_pct: 0,
    five_qn_no_vote_pct: 0,
    five_qn_yes_vote_pct: 0
};

const setOneQnNoVoteWeightage = (payload: number) => {
    return { type: vote.SET_ONE_QN_NO_VOTE_WEIGHTAGE, payload: payload };
}

const setOneQnYesVoteWeightage = (payload: number) => {
    return { type: vote.SET_ONE_QN_YES_VOTE_WEIGHTAGE, payload: payload };
}

const setTwoQnNovoteWeightage = (payload: number) => {
    return { type: vote.SET_TWO_QN_NO_VOTE_WEIGHTAGE, payload: payload };
}

const setTwoQnYesvoteWeightage = (payload: number) => {
    return { type: vote.SET_TWO_QN_YES_VOTE_WEIGHTAGE, payload: payload };
}

const setThreeQnNoVoteWeightage = (payload: number) => {
    return { type: vote.SET_THREE_QN_NO_VOTE_WEIGHTAGE, payload: payload };
}

const setThreeQnYesVoteWeightage = (payload: number) => {
    return { type: vote.SET_THREE_QN_YES_VOTE_WEIGHTAGE, payload: payload };
}

const setFourQnNoVoteWeightage = (payload: number) => {
    return { type: vote.SET_FOUR_QN_NO_VOTE_WEIGHTAGE, payload: payload };
}

const setFourQnYesVoteWeightage = (payload: number) => {
    return { type: vote.SET_FOUR_QN_YES_VOTE_WEIGHTAGE, payload: payload };
}

const setFiveQnNoVoteWeightage = (payload: number) => {
    return { type: vote.SET_FIVE_QN_NO_VOTE_WEIGHTAGE, payload: payload };
}

const setFiveQnYesVoteWeightage = (payload: number) => {
    return { type: vote.SET_FIVE_QN_YES_VOTE_WEIGHTAGE, payload: payload };
}

const setOneQnNoVotePct = (payload: number) => {
    return { type: vote.SET_ONE_QN_NO_VOTE_PCT, payload: payload };
}

const setOneQnYesVotePct = (payload: number) => {
    return { type: vote.SET_ONE_QN_YES_VOTE_PCT, payload: payload };
}

const setTwoQnNoVotePct = (payload: number) => {
    return { type: vote.SET_TWO_QN_NO_VOTE_PCT, payload: payload };
}

const setTwoQnYesVotePct = (payload: number) => {
    return { type: vote.SET_TWO_QN_YES_VOTE_PCT, payload: payload };
}

const setThreeQnNoVotePct = (payload: number) => {
    return { type: vote.SET_THREE_QN_NO_VOTE_PCT, payload: payload };
}

const setThreeQnYesVotePct = (payload: number) => {
    return { type: vote.SET_THREE_QN_YES_VOTE_PCT, payload: payload };
}

const setFourQnYesvotePct = (payload: number) => {
    return { type: vote.SET_FOUR_QN_NO_VOTE_PCT, payload: payload };
}

const setFourQnNovotePct = (payload: number) => {
    return { type: vote.SET_FOUR_QN_YES_VOTE_PCT, payload: payload };
}

const setFiveQnYesvotePct = (payload: number) => {
    return { type: vote.SET_FIVE_QN_NO_VOTE_PCT, payload: payload };
}

const setFiveQnNovotePct = (payload: number) => {
    return { type: vote.SET_FIVE_QN_YES_VOTE_PCT, payload: payload };
}

type Actions = ReturnType< 
    typeof setOneQnNoVoteWeightage | 
    typeof setOneQnYesVoteWeightage | 
    typeof setTwoQnNovoteWeightage | 
    typeof setTwoQnYesvoteWeightage | 
    typeof setThreeQnNoVoteWeightage | 
    typeof setThreeQnYesVoteWeightage | 
    typeof setFourQnNoVoteWeightage | 
    typeof setFourQnYesVoteWeightage | 
    typeof setFiveQnNoVoteWeightage | 
    typeof setFiveQnYesVoteWeightage | 
    typeof setOneQnNoVotePct | 
    typeof setOneQnYesVotePct | 
    typeof setTwoQnNoVotePct | 
    typeof setTwoQnYesVotePct | 
    typeof setThreeQnNoVotePct | 
    typeof setThreeQnYesVotePct | 
    typeof setFourQnYesvotePct | 
    typeof setFourQnNovotePct | 
    typeof setFiveQnYesvotePct | 
    typeof setFiveQnNovotePct
    >;

export function votesReducer(state = defaultVotes, action: Actions) {

  switch (action.type) {
    case vote.SET_ONE_QN_NO_VOTE_WEIGHTAGE:
        return {
        ...state,
        one_qn_no_vote_weightage: action.payload
    };
    case vote.SET_ONE_QN_YES_VOTE_WEIGHTAGE:
        return {
        ...state,
        one_qn_yes_vote_weightage: action.payload
    };
    case vote.SET_TWO_QN_NO_VOTE_WEIGHTAGE:
        return {
        ...state,
        two_qn_no_vote_weightage: action.payload
    };
    case vote.SET_TWO_QN_YES_VOTE_WEIGHTAGE:
        return {
        ...state,
        two_qn_yes_vote_weightage: action.payload
    };
    case vote.SET_THREE_QN_NO_VOTE_WEIGHTAGE:
        return {
        ...state,
        three_qn_no_vote_weightage: action.payload
    };
    case vote.SET_THREE_QN_YES_VOTE_WEIGHTAGE:
        return {
        ...state,
        three_qn_yes_vote_weightage: action.payload
    };
    case vote.SET_FOUR_QN_NO_VOTE_WEIGHTAGE:
        return {
        ...state,
        four_qn_no_vote_weightage: action.payload
    };
    case vote.SET_FOUR_QN_YES_VOTE_WEIGHTAGE:
        return {
        ...state,
        four_qn_yes_vote_weightage: action.payload
    };
    case vote.SET_FIVE_QN_NO_VOTE_WEIGHTAGE:
        return {
        ...state,
        five_qn_no_vote_weightage: action.payload
    };
    case vote.SET_FIVE_QN_YES_VOTE_WEIGHTAGE:
        return {
        ...state,
        five_qn_yes_vote_weightage: action.payload
    };
    case vote.SET_ONE_QN_NO_VOTE_PCT:
        return {
        ...state,
        one_qn_no_vote_pct: action.payload
    };
    case vote.SET_ONE_QN_YES_VOTE_PCT:
        return {
        ...state,
        one_qn_yes_vote_pct: action.payload
    };
    case vote.SET_TWO_QN_NO_VOTE_PCT:
        return {
        ...state,
        two_qn_no_vote_pct: action.payload
    };
    case vote.SET_TWO_QN_YES_VOTE_PCT:
        return {
        ...state,
        two_qn_yes_vote_pct: action.payload
    };
    case vote.SET_THREE_QN_NO_VOTE_PCT:
        return {
        ...state,
        three_qn_no_vote_pct: action.payload
    };
    case vote.SET_THREE_QN_YES_VOTE_PCT:
        return {
        ...state,
        three_qn_yes_vote_pct: action.payload
    };
    case vote.SET_FOUR_QN_NO_VOTE_PCT:
        return {
        ...state,
        four_qn_no_vote_pct: action.payload
    };
    case vote.SET_FOUR_QN_YES_VOTE_PCT:
        return {
        ...state,
        four_qn_yes_vote_pct: action.payload
    };
    case vote.SET_FIVE_QN_NO_VOTE_PCT:
        return {
        ...state,
        five_qn_no_vote_pct: action.payload
    };
    case vote.SET_FIVE_QN_YES_VOTE_PCT:
        return {
        ...state,
        five_qn_yes_vote_pct: action.payload
    };      
    default:
      return state
  }
  
}