export const getUserFromLs = () => {
    const data = localStorage.getItem('user')
    return  data ? JSON.parse(data) : []
}