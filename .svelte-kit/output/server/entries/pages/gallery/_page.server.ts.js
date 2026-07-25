import { _ as __vite_glob_0_8, a as __vite_glob_0_7, b as __vite_glob_0_6, c as __vite_glob_0_5, d as __vite_glob_0_4, e as __vite_glob_0_3, f as __vite_glob_0_2, g as __vite_glob_0_1, h as __vite_glob_0_0 } from "../../../chunks/invitational.js";
import { readdir, stat } from "fs/promises";
import { join } from "path";
const load = async () => {
  const imageModules = /* @__PURE__ */ Object.assign({
    "/src/lib/assets/gallery/Induction.jpg": __vite_glob_0_0,
    "/src/lib/assets/gallery/Induction2.jpg": __vite_glob_0_1,
    "/src/lib/assets/gallery/Induction3.jpg": __vite_glob_0_2,
    "/src/lib/assets/gallery/Induction4.jpg": __vite_glob_0_3,
    "/src/lib/assets/gallery/Induction5.jpg": __vite_glob_0_4,
    "/src/lib/assets/gallery/Induction6.jpg": __vite_glob_0_5,
    "/src/lib/assets/gallery/Induction7.jpg": __vite_glob_0_6,
    "/src/lib/assets/gallery/Meeting.jpg": __vite_glob_0_7,
    "/src/lib/assets/gallery/invitational.jpg": __vite_glob_0_8
  });
  const galleryDir = join(process.cwd(), "src/lib/assets/gallery");
  const fileDates = /* @__PURE__ */ new Map();
  try {
    const files = await readdir(galleryDir);
    await Promise.all(
      files.map(async (file) => {
        const filePath = join(galleryDir, file);
        const stats = await stat(filePath);
        fileDates.set(file, stats.mtime.getTime());
      })
    );
  } catch (e) {
    console.error("Could not read gallery directory for dates:", e);
  }
  const galleryImages = Object.entries(imageModules).map(([path, module]) => {
    const fullFilename = path.split("/").pop() ?? "";
    const filename = fullFilename.replace(/\.[^/.]+$/, "") ?? "";
    const alt = filename.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
    const src = typeof module === "object" && module !== null && "default" in module ? module.default : path;
    const date = fileDates.get(fullFilename) ?? 0;
    return { src, alt, date };
  }).sort((a, b) => b.date - a.date);
  const outputImages = galleryImages.map(({ date, ...img }) => img);
  return {
    galleryImages: outputImages
  };
};
export {
  load
};
