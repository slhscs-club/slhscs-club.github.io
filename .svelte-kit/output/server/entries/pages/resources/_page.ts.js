const load = () => {
  const images = /* @__PURE__ */ Object.assign({});
  const pdfs = /* @__PURE__ */ Object.assign({});
  const markdownFiles = /* @__PURE__ */ Object.assign({});
  const getResourceInfo = (filename) => {
    const ext = filename.split(".").pop()?.toLowerCase() ?? "";
    if (ext === "pdf") {
      return { type: "PDF", color: "color-orange" };
    }
    if (ext === "md") {
      return { type: "Guide", color: "color-orange" };
    }
    if (["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(ext)) {
      return { type: "Document", color: "color-orange" };
    }
    return { type: "Document", color: "color-orange" };
  };
  const convertModules = (modules) => {
    return Object.entries(modules).sort(([a], [b]) => a.localeCompare(b)).map(([path, module]) => {
      const filename = path.split("/").pop() ?? "";
      const slug = filename.replace(/\.[^/.]+$/, "").toLowerCase();
      const title = slug.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
      let url;
      if (typeof module === "object" && module !== null && "default" in module) {
        url = module.default;
      } else {
        url = path;
      }
      const { type, color } = getResourceInfo(filename);
      return { slug, title, type, color, url };
    });
  };
  const resourceList = [
    ...convertModules(images),
    ...convertModules(pdfs),
    ...convertModules(markdownFiles)
  ].sort((a, b) => a.slug.localeCompare(b.slug));
  return {
    resources: resourceList
  };
};
export {
  load
};
