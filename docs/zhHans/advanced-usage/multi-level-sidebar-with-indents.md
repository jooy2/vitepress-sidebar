# 带缩进的多级侧边栏

在多层侧边栏中，菜单显示时每层都会缩进。不过，VitePress 默认从第二层开始缩进。例如

![Multi level docs before](/doc-multi-level-docs-before.png)

上面,`directory-level-2`是`directory-level-1`的子文件,但看起来处于相同的层级。

这不是VitePress侧边栏的问题,要解决这个问题,您需要通过**[VitePress的自定义CSS](https://vitepress.dev/guide/extending-default-theme#customizing-css)**自定义现有主题的样式。

在`.vitepress`目录下创建一个`theme`目录,以覆盖现有样式所需的样式。然后在`theme`目录下创建一个`index.js`文件(如果您使用的是Typescript,请使用`index.ts`而不是`index.js`)和一个`custom.css`文件。

```text
/
├─ package.json
├─ src/
├─ docs/
│  ├─ .vitepress/
│  │  └─ theme/            <------------ Add this
│  │     ├─ custom.css     <------------ Add this
│  │     └─ index.js       <------------ Add this
│  ├─ example.md
│  └─ index.md
└─ ...
```

然后在 `index.js` 文件中添加以下内容：

```javascript
import DefaultTheme from 'vitepress/theme';
import './custom.css';

export default DefaultTheme;
```

接下来，在 `custom.css` 文件中添加以下内容：

```css
.group:has([role='button']) .VPSidebarItem.level-0 .items {
  padding-left: 16px !important;
  border-left: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  transition: background-color 0.25s;
}
```

现在启动 VitePress 服务器。这样就能更容易地看到子内容所在组的第一级层次结构。

![Multi level docs before](/doc-multi-level-docs-after.png)

需要注意的是,这里看到的垂直分隔线只是用CSS创建的;它应该创建为一个带有CSS类名为`indicator`的`div`,所以你应该知道,当你以后创建动态页面时,垂直分隔线可能不会被选中。
