const userReducer = (state = { lname:null, fname:'Guest',  picURL: null,email:null }, action) => {
  switch(action.type) {
  case 'SET_USER':
    return { lname: action.data.lname,
      fname: action.data.fname,
      picURL: action.data.picURL,
      email: action.data.email
    }
  default:
    return state
  }
}

export default userReducer

export const setUser = (lname,fname,picURL,email) => {
  return {
    type: 'SET_USER',
    data: { lname:lname,fname:fname,picURL:picURL,email:email },
  }
}
