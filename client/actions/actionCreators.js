export function addGoal (goalId, title, description) {
  return {
    type: 'ADD_GOAL',
    goalId,
    title,
    description
  }
}

export function removeGoal (goalId, i) {
  return {
    type: 'REMOVE_GOAL',
    goalId,
    i
  }
}
