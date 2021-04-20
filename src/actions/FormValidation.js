export const regExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)

export const formValid = ({ isError, ...rest }) => {
  let isValid = false

  Object.values(isError).forEach(val => {
    if (val.length > 0) {
      isValid = false
    } else {
      isValid = true
    }
  })

  Object.values(rest).forEach(val => {
    if (val === null) {
      isValid = false
    } else {
      isValid = true
    }
  })

  return isValid
}
