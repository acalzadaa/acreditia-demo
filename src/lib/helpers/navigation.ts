import type { NavigationItem } from "$lib/schemas/navigation.schema";

export function findParentIdByUrl(url: string, navigationItems: NavigationItem[]): number | null {
  for (const item of navigationItems) {
    if (item.href === url) {
      return item.id;
    }

    if (item.children && item.children.length > 0) {
      for (const child of item.children) {
        if (child.href === url) {
          return item.id;
        }
      }
      
      const nestedParentId = findParentIdByUrl(url, item.children);
      if (nestedParentId !== null) {
        return nestedParentId;
      }
    }
  }
  
  return null;
}
