
export const persistSession = ({headers, data: {user: {id}}}) => {
    console.log()
    const header = headers['authorization'].split(" ")
    localStorage.setItem('token', header[1]);
};


export function getUserData() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    return {
        token,
        id,
    };
}
