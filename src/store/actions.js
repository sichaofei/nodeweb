// 给action注册事件处理函数。当这个函数被触发时候，将状态提交到mutations中处理
export function changeUserId({commit},userId){
    return commit('changeUserId',userId)
}
// 存储个人信息
export function changeUser({commit},user){
    return commit('changeUser',user)
}