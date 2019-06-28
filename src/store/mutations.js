// 提交 mutations是更改Vuex状态的唯一合法方法
export const changeName = (state, name) => { // A组件点击更改餐馆名称为 A餐馆
    state.name = name // 把方法传递过来的参数，赋值给state中的resturantName
}
export const changeUserId=(state,userId)=>{
    state.userId=userId
}