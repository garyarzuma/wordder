const userReducer = (state = { lname:'l', fname:'d',  picUrl: 'du',email:'b' }, action) => {
  switch(action.type) {
  case 'SET_USER':
    return { lname: action.data.lname,
      fname: action.data.fname,
      picUrl: action.data.picUrl,
      email: action.data.email
    }
  default:
    return state
  }
}

export default userReducer

export const setUser = (lname,fname,picUrl,email) => {
  return {
    type: 'SET_USER',
    data: { lname:lname,fname:fname,picUrl:picUrl,email:email },
  }
}
