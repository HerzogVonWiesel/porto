const fs = require("fs");
const fg = require("fast-glob");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img")
const path = require('path')

let img_collection = async () => {
    console.log("Rendering images...")
    const img_dir = "src/images/";
    const seperator = "/"; //NOT path.sep, breaks on windows
    const img_config = {
        //useCache: false,
        widths: [null, 600, 1000, 2000],
        formats: ['webp', 'jpeg'],
        outputDir: "./_site/img/",
        filenameFormat: function (id, src, width, format, options) {
            const extension = path.extname(src)
            var name = path.basename(src, extension)
            const seperator = "/";
            if(path.dirname(src).split(seperator).length > 3){
                name = path.dirname(src).split(seperator).pop()+"_"+name;
            }
            return `${name}-${width}w.${format}`
        },
        sharpWebpOptions: {
            quality: 90,
            smartSubsample: true,
            effort: 6,
        }
    }
    const rawImages = fg.sync(img_dir+"**/*.{jpg,jpeg,png,gif,tiff,webp,svg}");
    console.log(rawImages)
    const mapping = {};
  
    for (const path of rawImages) {
      mapping[path] = await Image(path, img_config);
    }
    // `Object.freeze` isn’t necessary, I just prefer it.
    console.log("Rendered images!");
    return Object.freeze(mapping);
}

const video_types = [".mp4", ".ogg", ".avi", ".mkv"];
function is_video(src){
    const extension = path.extname(src);
    return video_types.includes(extension);
}

module.exports = (function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/js")
    eleventyConfig.addPassthroughCopy("src/fonts")
    eleventyConfig.addPassthroughCopy("src/images")
    eleventyConfig.addPassthroughCopy("src/favicon")
    eleventyConfig.addPassthroughCopy("src/site.webmanifest")
    eleventyConfig.addPassthroughCopy("src/files")

    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addFilter("toUppercase", function(string) {
        return string.toUpperCase();
    });
    eleventyConfig.addFilter("is_video", is_video);

    eleventyConfig.addCollection("img_collection", img_collection);


    global.filters = eleventyConfig.javascriptFunctions; // magic happens here
    eleventyConfig.setPugOptions({ // and here
        globals: ['filters']
    });

    return {
        dir: { input: 'src', output: '_site' }
    };
});