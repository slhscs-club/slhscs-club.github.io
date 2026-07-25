import { error } from "@sveltejs/kit";
import { marked } from "marked";
const load = async ({ params }) => {
  const { slug } = params;
  const imageModules = /* @__PURE__ */ Object.assign({});
  const pdfModules = /* @__PURE__ */ Object.assign({});
  const markdownModules = /* @__PURE__ */ Object.assign({});
  const findMatchingEntry = (modules) => {
    return Object.entries(modules).find(([path2]) => {
      const filename2 = path2.split("/").pop() ?? "";
      const fileSlug = filename2.replace(/\.[^/.]+$/, "").toLowerCase();
      return fileSlug === slug.toLowerCase();
    });
  };
  const matchingEntry = findMatchingEntry(imageModules) ?? findMatchingEntry(pdfModules) ?? findMatchingEntry(markdownModules);
  if (!matchingEntry) {
    throw error(404, "Resource not found");
  }
  const [path, module] = matchingEntry;
  const filename = path.split("/").pop() ?? "";
  let url;
  let content;
  let rendered;
  if (typeof module === "object" && module !== null && "default" in module) {
    url = module.default;
  } else if (typeof module === "string") {
    url = path;
    content = module;
    rendered = marked(content);
  } else {
    url = path;
  }
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const title = slug.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  const getResourceInfo = (ext2) => {
    if (ext2 === "pdf") {
      return { type: "PDF", icon: "fa-solid fa-file-pdf", isBinary: true };
    }
    if (ext2 === "md") {
      return { type: "Guide", icon: "fa-solid fa-book", isBinary: false };
    }
    if (["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(ext2)) {
      return { type: "Document", icon: "fa-solid fa-file-image", isBinary: true };
    }
    return { type: "Document", icon: "fa-solid fa-file", isBinary: true };
  };
  const { type, icon, isBinary } = getResourceInfo(ext);
  return {
    resource: {
      slug,
      title,
      type,
      icon,
      url,
      filename,
      rendered,
      isBinary
    }
  };
};
export {
  load
};
