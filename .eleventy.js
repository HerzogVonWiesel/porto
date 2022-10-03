const fs = require("fs");
const fg = require("fast-glob");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img")
const path = require('path')

let img_collection = async () => {
    console.log("Rendering images...")
    const img_dir = "src/images/";
    const img_config = {
        widths: [null, 600, 1000, 2000],
        formats: ['webp', 'jpeg'],
        outputDir: "./_site/img/",
        filenameFormat: function (id, src, width, format, options) {
            const extension = path.extname(src)
            const name = path.basename(src, extension)
            return `${name}-${width}w.${format}`
        },
        sharpWebpOptions: {
            quality: 90,
            smartSubsample: true,
            effort: 6,
        }
    }
    const rawImages = fg.sync(img_dir+"**/*.{jpg,jpeg,png,gif,tiff,webp}");
    console.log(rawImages)
    const mapping = {};
  
    for (const path of rawImages) {
      mapping[path] = await Image(path, img_config);
    }
    // `Object.freeze` isn’t necessary, I just prefer it.
    console.log("Rendered images!");
    return Object.freeze(mapping);
  }

module.exports = (function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/js")
    eleventyConfig.addPassthroughCopy("src/fonts")
    eleventyConfig.addPassthroughCopy("src/images")

    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addFilter("toUppercase", function(string) {
        return string.toUpperCase();
    });

    eleventyConfig.addCollection("img_collection", img_collection);


    global.filters = eleventyConfig.javascriptFunctions; // magic happens here
    eleventyConfig.setPugOptions({ // and here
        globals: ['filters']
    });

    return {
        dir: { input: 'src', output: '_site' }
    };
});