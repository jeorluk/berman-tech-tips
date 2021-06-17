export default {
  name: 'list',
  title: 'Ordered List',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'List Name',
      type: 'string',
    },
    {
      name: 'listItems',
      type: 'array',
      of: [{ name: 'category', type: 'reference', to: { type: 'category' } }],
    },
  ],
}
