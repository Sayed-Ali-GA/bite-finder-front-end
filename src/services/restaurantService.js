const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/restaurant`


const index = async () => {
  try {
    const res = await fetch(BASE_URL)
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}


const show = async (restaurantId) => {
  try {
    const res = await fetch(`${BASE_URL}/${restaurantId}`)
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}


const create = async (formData) => {
  try {
    const token = localStorage.getItem('token')

    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })

       const data = await res.json()
    return data

  } catch (err) {
    console.log(err)
  }
}


const createComment = async (formData, restaurantId) => {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${restaurantId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    return data
}


const deleteRestaurant = async (restaurantId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${restaurantId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    return data
  } catch(err) {
    console.log(err)
  }
}


const update = async (formData, restaurantId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${restaurantId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    return data
  } catch(err) {
    console.log(err)
  }
}

export {
  index,
  show,
  create,
  createComment,
  deleteRestaurant,
  update,
}