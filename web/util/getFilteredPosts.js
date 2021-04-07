const getFilteredPosts = ({ categoryId, postList }) => {
  const filteredPosts = postList.filter((post) =>
    checkCategories(categoryId, post)
  )
  return filteredPosts
}

function checkCategories(categoryId, post) {
  const intersection = post.categories.filter(
    (category) => category._id === categoryId
  )
  return intersection.length > 0
}

export default getFilteredPosts
