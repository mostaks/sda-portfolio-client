import { bool } from './../node_modules/@types/prop-types/index.d';
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getItemsFiles(type: any) {
  const itemsDirectory = path.join(process.cwd(), "content", type);
  console.log('itemsDirectory:', itemsDirectory);
  return fs.readdirSync(itemsDirectory);
}

export function getItemData(itemIdentifier: any, type: any) {
  const itemsDirectory = path.join(`${process.cwd()}/content/${type}`);
  const itemSlug = itemIdentifier.replace(/\.mdx$/, "");
  const filePath = path.join(itemsDirectory, `${itemSlug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const itemData = {
    ...data,
    date: data.date ?? Number.POSITIVE_INFINITY,
    published: data.published ?? false,
    url: data?.url ?? '',
    title: data?.title ?? '',
    description: data?.description ?? '',
    repository: data?.repository ?? '',
    slug: itemSlug,
    content,
  };

  return itemData;
}

export function getAllItems(type: any) {
  const itemFiles = getItemsFiles(type);

  const allItems = itemFiles.map((itemFile) => getItemData(itemFile, type));

  const sortedItems = allItems.sort((itemA, itemB) =>
    itemA.date > itemB.date ? -1 : 1
  );

  return sortedItems;
}

export function getFeaturedItems(items: any) {
  return items.filter((item: any) => item.isFeatured);
}
