export default {
  name: "products",
  type: "document",
  title: "Products",
  fields: [
    {
      name: "productname",
      type: "string",
      title: "Product Name",
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "productname",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input: any) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      name: "description",
      type: "array",
      title: "Description",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "image",
      type: "array",
      title: "Image",
      of: [
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "text",
              title: "Alternative Text",
            },
          ],
        },
      ],
    },
    {
      name: "productTypes",
      type: "array",
      title: "Product Types",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      name: "sizes",
      type: "array",
      title: "Sizes",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      name: "quantity",
      type: "number",
      title: "Quantity",
    },
    {
      name: "price",
      type: "number",
      title: "Price",
    },
  ],
};
