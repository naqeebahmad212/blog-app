export const createId = (array: any[]) => {
  let id;
  if (array.length > 0) {
    let last_item_array = array.slice(-1);
    let last_item = last_item_array[0];
    id = last_item.id + 1;
    return id;
  } else {
    id = 1;
    return id;
  }
};

const slugify = (text: string) => {
  return text
    .slice(0, 20)
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

// Function to create a unique slug
export const generateUniqueSlug = async (prismaModel: any, name: string) => {
  let slug = slugify(name);
  let uniqueSlug = slug;
  let count = 1;

  // Check if the slug exists and append a counter if it does
  while (
    await prismaModel.findFirst({
      where: { slug: uniqueSlug },
    })
  ) {
    uniqueSlug = `${slug}-${count}`;
    count++;
  }

  return uniqueSlug;
};
