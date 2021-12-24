copy(a.filter(v => v.categorie == "萌新穿越机日记").map(v => `### [简书-原创]:[${v.title}](萌新穿越机日记/${v.basename}.md)

> 原文链接:[https://www.jianshu.com${v.href}](https://www.jianshu.com/${v.href})
>
> 发布时间:${v.time}    阅读:${v.read}    点赞:${v.like}    评论:${v.comments}

${v.abstract}

![](https://${v.preview.replace("/static/","")})

`).join("\n"));