
export const persistSession = ({headers, data: {user: {id}}}) => {
    const header = headers['authorization'].split(" ")
    localStorage.setItem('token', header[1]);
    localStorage.setItem('userId', id);
};


export function getUserData() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    return {
        token,
        id,
    };
}