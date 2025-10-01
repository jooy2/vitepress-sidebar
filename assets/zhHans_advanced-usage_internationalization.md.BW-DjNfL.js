import{_ as a,c as n,o as i,ag as p}from"./chunks/framework.Bw-5EFTY.js";const u=JSON.parse('{"title":"国际化","description":"","frontmatter":{},"headers":[],"relativePath":"zhHans/advanced-usage/internationalization.md","filePath":"zhHans/advanced-usage/internationalization.md","lastUpdated":1753152110000}'),t={name:"zhHans/advanced-usage/internationalization.md"};function e(l,s,o,h,k,c){return i(),n("div",null,s[0]||(s[0]=[p(`<h1 id="国际化" tabindex="-1">国际化 <a class="header-anchor" href="#国际化" aria-label="Permalink to &quot;国际化&quot;">​</a></h1><p>本页介绍如何使用 VitePress Sidebar 实现国际化（i18n）。</p><p>VitePress 支持多语言文档。如果您将翻译好的标记文件放在每种语言的目录中，并在 VitePress 的 <code>defineConfig</code> 中使用 <code>locales</code> 选项，就会显示语言选择器，并显示指定目录中每种语言的文档。</p><h2 id="翻译页面布局-手动" tabindex="-1">翻译页面布局（手动） <a class="header-anchor" href="#翻译页面布局-手动" aria-label="Permalink to &quot;翻译页面布局（手动）&quot;">​</a></h2><p>首先，VitePress 允许您翻译各种布局界面元素。所谓布局，是指 “上一页”、“下一页”、“目录”、“更改主题 ”等功能的所有相关文本。 它还包括翻译搜索功能中出现的所有文本。</p><p>VitePress 页面上的各种界面（布局）文本可提供特定语言的 <code>locales</code> 翻译。例如:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;locales&quot;: {</span></span>
<span class="line"><span>  &quot;root&quot;: {</span></span>
<span class="line"><span>    &quot;lang&quot;: &quot;en-US&quot;,</span></span>
<span class="line"><span>    &quot;label&quot;: &quot;English&quot;,</span></span>
<span class="line"><span>    &quot;description&quot;: &quot;VitePress Sidebar is a VitePress plugin that automatically generates sidebar menus with one setup and no hassle. Save time by easily creating taxonomies for tons of articles.&quot;,</span></span>
<span class="line"><span>    &quot;themeConfig&quot;: {</span></span>
<span class="line"><span>      &quot;docFooter&quot;: {</span></span>
<span class="line"><span>        &quot;prev&quot;: &quot;Previous page&quot;,</span></span>
<span class="line"><span>        &quot;next&quot;: &quot;Next page&quot;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      &quot;outline&quot;: {</span></span>
<span class="line"><span>        &quot;label&quot;: &quot;On this page&quot;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      &quot;lastUpdated&quot;: {</span></span>
<span class="line"><span>        &quot;text&quot;: &quot;Last updated&quot;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      &quot;langMenuLabel&quot;: &quot;Change language&quot;,</span></span>
<span class="line"><span>      &quot;returnToTopLabel&quot;: &quot;Return to top&quot;,</span></span>
<span class="line"><span>      &quot;sidebarMenuLabel&quot;: &quot;Menu&quot;,</span></span>
<span class="line"><span>      &quot;darkModeSwitchLabel&quot;: &quot;Appearance&quot;,</span></span>
<span class="line"><span>      &quot;lightModeSwitchTitle&quot;: &quot;Switch to light theme&quot;,</span></span>
<span class="line"><span>      &quot;darkModeSwitchTitle&quot;: &quot;Switch to dark theme&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  &quot;ko&quot;: {</span></span>
<span class="line"><span>    &quot;lang&quot;: &quot;ko-KR&quot;,</span></span>
<span class="line"><span>    &quot;label&quot;: &quot;한국어&quot;,</span></span>
<span class="line"><span>    &quot;description&quot;: &quot;VitePress Sidebar는 번거로운 작업 없이 한번의 설정만으로 사이드바 메뉴를 자니다. 수많은 문서에 대한 분류를 손쉽게 만들어 시간을 절약하세요.&quot;,</span></span>
<span class="line"><span>    &quot;themeConfig&quot;: {</span></span>
<span class="line"><span>      &quot;docFooter&quot;: {</span></span>
<span class="line"><span>        &quot;prev&quot;: &quot;이전&quot;,</span></span>
<span class="line"><span>        &quot;next&quot;: &quot;다음&quot;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      &quot;outline&quot;: {</span></span>
<span class="line"><span>        &quot;label&quot;: &quot;이 페이지 콘텐츠&quot;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      &quot;lastUpdated&quot;: {</span></span>
<span class="line"><span>        &quot;text&quot;: &quot;업데이트 일자&quot;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      &quot;langMenuLabel&quot;: &quot;언어 변경&quot;,</span></span>
<span class="line"><span>      &quot;returnToTopLabel&quot;: &quot;맨 위로&quot;,</span></span>
<span class="line"><span>      &quot;sidebarMenuLabel&quot;: &quot;사이드바 메뉴&quot;,</span></span>
<span class="line"><span>      &quot;darkModeSwitchLabel&quot;: &quot;다크 모드&quot;,</span></span>
<span class="line"><span>      &quot;lightModeSwitchTitle&quot;: &quot;라이트 모드로 변경&quot;,</span></span>
<span class="line"><span>      &quot;darkModeSwitchTitle&quot;: &quot;다크 모드로 변경&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>(<code>root</code> &quot;语言指页面上的主要语言）。</p><p>要了解有关翻译布局的更多信息，请参阅以下文章: <a href="https://vitepress.dev/zh/guide/i18n" target="_blank" rel="noreferrer">https://vitepress.dev/zh/guide/i18n</a></p><p>对于搜索功能中出现的文本，需要在 <code>defineConfig</code> 中的 <code>themeConfig.search</code> 选项中进行设置，例如:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;themeConfig&quot;: {</span></span>
<span class="line"><span>  &quot;search&quot;: {</span></span>
<span class="line"><span>    &quot;provider&quot;: &quot;local&quot;,</span></span>
<span class="line"><span>    &quot;options&quot;: {</span></span>
<span class="line"><span>      &quot;locales&quot;: {</span></span>
<span class="line"><span>        &quot;root&quot;: {</span></span>
<span class="line"><span>          &quot;translations&quot;: {</span></span>
<span class="line"><span>            &quot;button&quot;: {</span></span>
<span class="line"><span>              &quot;buttonText&quot;: &quot;Search&quot;,</span></span>
<span class="line"><span>              &quot;buttonAriaLabel&quot;: &quot;Search&quot;</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            &quot;modal&quot;: {</span></span>
<span class="line"><span>              &quot;displayDetails&quot;: &quot;Display detailed list&quot;,</span></span>
<span class="line"><span>              &quot;resetButtonTitle&quot;: &quot;Reset search&quot;,</span></span>
<span class="line"><span>              &quot;backButtonTitle&quot;: &quot;Close search&quot;,</span></span>
<span class="line"><span>              &quot;noResultsText&quot;: &quot;No results for&quot;,</span></span>
<span class="line"><span>              &quot;footer&quot;: {</span></span>
<span class="line"><span>                &quot;selectText&quot;: &quot;to select&quot;,</span></span>
<span class="line"><span>                &quot;selectKeyAriaLabel&quot;: &quot;enter&quot;,</span></span>
<span class="line"><span>                &quot;navigateText&quot;: &quot;to navigate&quot;,</span></span>
<span class="line"><span>                &quot;navigateUpKeyAriaLabel&quot;: &quot;up arrow&quot;,</span></span>
<span class="line"><span>                &quot;navigateDownKeyAriaLabel&quot;: &quot;down arrow&quot;,</span></span>
<span class="line"><span>                &quot;closeText&quot;: &quot;to close&quot;,</span></span>
<span class="line"><span>                &quot;closeKeyAriaLabel&quot;: &quot;escape&quot;</span></span>
<span class="line"><span>              }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        &quot;ko&quot;: {</span></span>
<span class="line"><span>          &quot;translations&quot;: {</span></span>
<span class="line"><span>            &quot;button&quot;: {</span></span>
<span class="line"><span>              &quot;buttonText&quot;: &quot;검색&quot;,</span></span>
<span class="line"><span>              &quot;buttonAriaLabel&quot;: &quot;검색&quot;</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            &quot;modal&quot;: {</span></span>
<span class="line"><span>              &quot;displayDetails&quot;: &quot;상세 목록 표시&quot;,</span></span>
<span class="line"><span>              &quot;resetButtonTitle&quot;: &quot;검색 초기화&quot;,</span></span>
<span class="line"><span>              &quot;backButtonTitle&quot;: &quot;검색 닫기&quot;,</span></span>
<span class="line"><span>              &quot;noResultsText&quot;: &quot;결과를 찾을 수 없음&quot;,</span></span>
<span class="line"><span>              &quot;footer&quot;: {</span></span>
<span class="line"><span>                &quot;selectText&quot;: &quot;선택&quot;,</span></span>
<span class="line"><span>                &quot;selectKeyAriaLabel&quot;: &quot;선택하기&quot;,</span></span>
<span class="line"><span>                &quot;navigateText&quot;: &quot;탐색&quot;,</span></span>
<span class="line"><span>                &quot;navigateUpKeyAriaLabel&quot;: &quot;위로&quot;,</span></span>
<span class="line"><span>                &quot;navigateDownKeyAriaLabel&quot;: &quot;아래로&quot;,</span></span>
<span class="line"><span>                &quot;closeText&quot;: &quot;닫기&quot;,</span></span>
<span class="line"><span>                &quot;closeKeyAriaLabel&quot;: &quot;esc&quot;</span></span>
<span class="line"><span>              }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="翻译页面布局-自动" tabindex="-1">翻译页面布局（自动） <a class="header-anchor" href="#翻译页面布局-自动" aria-label="Permalink to &quot;翻译页面布局（自动）&quot;">​</a></h2><p><a href="https://vitepress-i18n.cdget.com" target="_blank" rel="noreferrer">VitePress I18n</a>是VitePress侧边栏的一个家族插件，可让您自动完成上述手动翻译过程。只需进行一些简单的设置，您就不必花费数小时来翻译布局！</p><p>使用以下命令安装 VitePress I18n 模块:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vitepress-i18n</span></span></code></pre></div><p>在 <code>defineConfig</code> 中，将其设置为:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { withSidebar } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vitepress-sidebar&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { withI18n } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vitepress-i18n&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> vitePressConfig</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // VitePress config</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> vitePressSidebarConfig</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // VitePress Sidebar config</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> vitePressI18nConfig</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // VitePress I18n config</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  locales: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;en&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ko&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// first locale &#39;en&#39; is root locale</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  searchProvider: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;local&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // enable search with auto translation</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  withSidebar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">withI18n</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(vitePressConfig, vitePressI18nConfig), vitePressSidebarConfig)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><p>现在，您可以将界面翻译工作交给模块来完成！当然，您也可以自定义详细文本。</p><p>更多信息，请阅读 VitePress I18n 文档页面: <a href="https://vitepress-i18n.cdget.com/guide/getting-started" target="_blank" rel="noreferrer">https://vitepress-i18n.cdget.com/guide/getting-started</a></p><h2 id="特定语言侧边栏设置" tabindex="-1">特定语言侧边栏设置 <a class="header-anchor" href="#特定语言侧边栏设置" aria-label="Permalink to &quot;特定语言侧边栏设置&quot;">​</a></h2><p>在 VitePress 中，您可以根据不同的语言显示不同的侧边栏。例如，假设您的文件夹结构如下:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/</span></span>
<span class="line"><span>├─ package.json</span></span>
<span class="line"><span>├─ docs/</span></span>
<span class="line"><span>│  ├─ .vitepress/</span></span>
<span class="line"><span>│  │  └─ config.js</span></span>
<span class="line"><span>│  ├─ en/</span></span>
<span class="line"><span>│  │  └─ abc.md</span></span>
<span class="line"><span>│  ├─ ko/</span></span>
<span class="line"><span>│  │  └─ abc.md</span></span>
<span class="line"><span>│  └─ zhHans/</span></span>
<span class="line"><span>│     └─ abc.md</span></span>
<span class="line"><span>└─ ...</span></span></code></pre></div><p>在示例中，<code>abc.md</code> 是翻译成每种语言的同一文档。如果将语言分别改为英文、韩文和中文，侧边栏将扫描每个目录<code>en</code>、<code>ko</code>和<code>zhHans</code>，以获取该语言的标题。</p><p>下面举例说明如何做到这一点:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> rootLocale</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;en&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> supportedLocales</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [rootLocale, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;ko&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;zhHans&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> vitePressConfigs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  rewrites: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &#39;en/:rest*&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;:rest*&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> commonSidebarConfigs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // Sidebar common configurations</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> vitePressSidebarConfigs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">supportedLocales.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">          ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">commonSidebarConfigs,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">          ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(rootLocale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lang </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { basePath: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`/\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">lang</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}/\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }), </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// If using \`rewrites\` option</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          documentRootPath: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`/docs/\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">lang</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          resolvePath: rootLocale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lang </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;/&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`/\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">lang</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}/\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">withSidebar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(vitePressConfigs, vitePressSidebarConfigs)</span></span></code></pre></div><p>首先，<code>rewrites</code> 允许您在使用英语作为根语言（<code>en</code> 目录）时抑制 URI 路径中的 <code>/en/</code>（这是可选的）。</p><p>下一步，<code>sidebar</code> 的设置与上一步类似，但需要为每种语言设置多个侧边栏和目录。 下文将解释每个选项：</p><ul><li><code>basePath</code>: 与 <code>rewrites</code> 规则一起使用时，可防止根本地化指向 <code>/en/</code> 路径。</li><li><code>documentRootPath</code>: 实际文档文件所在的根路径。 对于每种语言，查找 <code>en</code>、<code>ko</code> 和 <code>zhHans</code> 目录。</li><li><code>resolvePath</code>: <code>/docs</code> 实际扫描侧边栏列表的目录中文件的位置。 为每种语言指定目录位置，不包括根本地语言。</li></ul><p>这样可以确保侧边栏只显示指定目录下每种语言的文档。以上只是一个示例，您可能需要根据项目规模或目录结构设置不同的选项。</p>`,29)]))}const d=a(t,[["render",e]]);export{u as __pageData,d as default};
