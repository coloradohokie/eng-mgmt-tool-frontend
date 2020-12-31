export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const insertItemIntoArray = (array, action) => {
    let newArray = array.slice()
    newArray.splice(action.index, 0, action.item)
    return newArray
}

//not currently used.
export const removeItemFromArray = (array, action) => {
    return array.filter((item, index) => index !== action.index)
}
