const fs = require("fs");
const fg = require("fast-glob");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img")
const mathjaxPlugin = require("eleventy-plugin-mathjax");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
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
    // console.log(rawImages)
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
function is_svg(src){
    const extension = path.extname(src);
    return extension === ".svg";
}
function inline_svg(src){
    return fs.readFileSync(src);
}

function render_code(lang, code){
    return this.highlight(lang, code);
}

function format_date(date){
    return date.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'});
}


module.exports = (function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/js")
    eleventyConfig.addPassthroughCopy("src/fonts")
    eleventyConfig.addPassthroughCopy("src/images")
    eleventyConfig.addPassthroughCopy("src/favicon")
    eleventyConfig.addPassthroughCopy("src/site.webmanifest")
    eleventyConfig.addPassthroughCopy("src/files")
    eleventyConfig.addPassthroughCopy("src/css/prism-one-dark.css")
    eleventyConfig.addPassthroughCopy("src/css/prism-min.css")

    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(mathjaxPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    eleventyConfig.addShortcode("domain", () => `${"jeromestephan.de"}`);

    eleventyConfig.addFilter("toUppercase", function(string) {
        return string.toUpperCase();
    });
    eleventyConfig.addFilter("is_video", is_video);
    eleventyConfig.addFilter("is_svg", is_svg);
    eleventyConfig.addFilter("inline_svg", inline_svg);
    eleventyConfig.addFilter("render_code", render_code);
    eleventyConfig.addFilter("format_date", format_date);

    eleventyConfig.addCollection("img_collection", img_collection);
    eleventyConfig.addCollection("blog", function (collection) {
        return collection.getFilteredByGlob("src/blog_posts/*.{pug,md}");
    });
    eleventyConfig.addCollection("blog_tags", function (collection) {
        let blog_tags = new Set();
        collection.getAll().forEach(function(item){
            if(item.data.tags){
                item.data.tags.forEach(function(tag){
                    blog_tags.add(tag);
                });
            }
        });
        return blog_tags;
    });
    eleventyConfig.addCollection("icons", function (collection) {
        const icons = {};
        icons["Ableton"] = "ableton";
        icons["After Effects"] = "aftereffects";
        icons["Various AI models"] = "aivar";
        icons["Arnold"] = "arnold";
        icons["Audio to Audio models"] = "aud2aud";
        icons["Axiom Solver"] = "axiom";
        icons["Cinema 4D"] = "c4d";
        icons["ComfyUI"] = "comfyui";
        icons["Disco Diffusion"] = "disco";
        icons["EmberGen"] = "embergen";
        icons["Topaz Gigapixel"] = "gigapixel";
        icons["Alhambra Classical Guitar"] = "guitar";
        icons["Houdini"] = "houdini";
        icons["Image to Video models"] = "img2vid";
        icons["Nuke"] = "nuke";
        icons["OpenVino"] = "openvino";
        icons["Ornatrix"] = "ornatrix";
        icons["OpenShadingLanguage"] = "osl";
        icons["Python Pandas"] = "pandas";
        icons["Photoshop"] = "photoshop";
        icons["PyAudio"] = "pyaudio";
        icons["Python"] = "python";
        icons["DaVinci Resolve"] = "resolve";
        icons["Redshift"] = "rs";
        icons["Stable Diffusion"] = "stablediffusion";
        icons["Substance Painter"] = "substancepainter";
        icons["Suno.AI"] = "suno";
        icons["Topaz Studio"] = "tstudio";
        icons["Video to Video models"] = "vid2vid";
        icons["Topaz VideoAI"] = "videoai";
        icons["World Creator"] = "worldcreator";
        icons["YOLOv8"] = "yolov8";
        for (let icon in icons) {
            icons[icon] = "/images/icons/" + icons[icon] + ".svg";
        }
        return icons;
    });


    // Add support for markdown
    let markdownIt = require("markdown-it");
    const markdownItTable = require("markdown-it-table");
    let markdownItOptions = {
        html: true,
        breaks: true,
        linkify: true,
    };
    eleventyConfig.setLibrary("md", markdownIt(markdownItOptions));
    module.exports = function (eleventyConfig) {
        eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItTable));
    };

    global.filters = eleventyConfig.javascriptFunctions; // magic happens here
    eleventyConfig.setPugOptions({ // and here
        globals: ['filters']
    });

    return {
        dir: { 
        input: 'src', 
        output: '_site',
        includes: "_includes",
        layouts: "_layouts",
        }
    };
});