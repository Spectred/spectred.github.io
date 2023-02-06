import { hopeTheme } from "vuepress-theme-hope";
import {  zhNavbar } from "./navbar/index.js";
import {  zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://spectred.github.io",
  // favicon: "/favicon.ico",
  head: [['link', { rel: 'icon', href: 'log.jpeg' }]],

  // 作者信息
  // author: {
  //   name: "Spectred",
  //   url: "https://github.com/Spectred",
  // },

  // 图标库
  iconAssets: "iconfont",
  // logo
  logo: "/logo.jpeg",

  repo: "Spectred/spectred.github.io",

  docsDir: "/src",

  themeColor: {
    blue: "#2196f3",
    red: "#f26d6d",
    green: "#3eaf7c",
    orange: "#fb9b5f",
    skyblue: "#87ceeb",
  },
  // 打印按钮
  print: false,
  // 全屏按钮
  fullscreen: true,

  locales: {
    "/": {
      // navbar
      navbar: zhNavbar,
      // sidebar
      sidebar: zhSidebar,
      // https://www.jinrishici.com/#
      footer: "<img src=\"https://v2.jinrishici.com/one.svg?font-size=14&spacing=2&color=SkyBlue\" alt=\"今日诗词API\">",

      displayFooter: true,

      metaLocales: {
        editLink: "编辑此页",
      },
    },
  },

  encrypt: {
    config: {
      "/java/concurrent/threads.html": ["1234"],

    },
  },

  plugins: {
    // 禁用评论插件
    comment: {
      comment: false,
    },

    // Disable features you don’t want here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    components:{
      components: [
        "Catalog",
      ],
    }
  },
});
