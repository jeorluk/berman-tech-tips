export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'protectedPage',
      title: 'Protected',
      type: 'boolean',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'related',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'post' } }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      category0: 'categories.0.title',
      category1: 'categories.1.title',
      category2: 'categories.2.title',
    },
    prepare: (selection) => {
      const { title, category0, category1, category2 } = selection
      const categories = [category0, category1, category2].filter(Boolean)
      const subtitle = categories.length > 0 ? categories.join(', ') : ''
      return {
        title,
        subtitle,
      }
    },
  },
}
