import { Field, FieldHook } from 'payload/types';

const format = (val: string): string => val.replace(/ /g, '-').replace(/[^\w-]+/g, '').toLowerCase();

// Format a URL-friendly "slug" automatically
const formatSlug: FieldHook = ({ value, originalDoc, data }) => {

  // If someone passes a value directly to the slug field, use that
  // Make sure to format it so that it's URL-safe
  if (typeof value === 'string') {
    return format(value);
  }

  // If someone does not pass a slug, then use the `title` field
  // and convert it automatically into a URL-safe slug
  const fallbackData = (data && data.title) || (originalDoc && originalDoc.title);

  if (fallbackData && typeof fallbackData === 'string') {
    return format(fallbackData);
  }

  // Otherwise return value
  return value;
};

const slug: Field = {
  name: 'slug',
  type: 'text',
  unique: true,
  required: true,
  // Always validate as true, 
  // so we can have this field be required
  // BUT prefilled on the backend
  validate: () => true,
  hooks: {
    beforeValidate: [
      formatSlug,
    ]
  },
  admin: {
    position: 'sidebar',
  },
}

export default slug;