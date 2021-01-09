export const areEqual = (obj1, obj2) => {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false

  return Object.entries(obj1).reduce(
    (acc,[key,value]) => (acc && key in obj2 && obj2[key] == value),
    true
  )
}