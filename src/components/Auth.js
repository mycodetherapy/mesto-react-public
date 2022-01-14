export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })

    }