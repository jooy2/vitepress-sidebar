import{_ as a,c as n,o as i,ag as t}from"./chunks/framework.Bw-5EFTY.js";const k=JSON.parse('{"title":"Internationalization","description":"","frontmatter":{},"headers":[],"relativePath":"advanced-usage/internationalization.md","filePath":"en/advanced-usage/internationalization.md","lastUpdated":1730678716000}'),e={name:"advanced-usage/internationalization.md"};function p(l,s,o,h,r,u){return i(),n("div",null,s[0]||(s[0]=[t(`<h1 id="internationalization" tabindex="-1">Internationalization <a class="header-anchor" href="#internationalization" aria-label="Permalink to &quot;Internationalization&quot;">​</a></h1><p>This page describes how to achieve internationalization (i18n) using VitePress Sidebar.</p><p>VitePress supports multilingual documentation. If you place translated markdown files in a directory for each language and use the <code>locales</code> option in VitePress&#39;s <code>defineConfig</code>, a language selector will be displayed and will show documents in the specified directory for each language.</p><h2 id="translate-page-layouts-manually" tabindex="-1">Translate page layouts (manually) <a class="header-anchor" href="#translate-page-layouts-manually" aria-label="Permalink to &quot;Translate page layouts (manually)&quot;">​</a></h2><p>First, VitePress allows you to translate various layout interface elements. By layout, we mean all the associated text for features like &#39;Previous&#39;, &#39;Next&#39;, &#39;Table of Contents&#39;, and &#39;Change Theme&#39;. It also includes translating any text that appears in the search function.</p><p>Various interface (layout) texts on a VitePress page can provide language-specific translations for <code>locales</code>. For example</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;locales&quot;: {</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>(The <code>root</code> language is the primary language on the page).</p><p>To learn more about translating layouts, see the following articles: <a href="https://vitepress.dev/guide/i18n" target="_blank" rel="noreferrer">https://vitepress.dev/guide/i18n</a></p><p>For the text that appears in the search function, you need to set it in the <code>themeConfig.search</code> option in <code>defineConfig</code>, for example</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;themeConfig&quot;: {</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><h2 id="translate-page-layouts-automatic" tabindex="-1">Translate page layouts (automatic) <a class="header-anchor" href="#translate-page-layouts-automatic" aria-label="Permalink to &quot;Translate page layouts (automatic)&quot;">​</a></h2><p><a href="https://vitepress-i18n.cdget.com" target="_blank" rel="noreferrer">VitePress I18n</a>, a family plugin of VitePress Sidebar, allows you to automate the process of translating manually like above. With a few simple settings, you can stop spending hours translating layouts!</p><p>Install the VitePress I18n module with the command below:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vitepress-i18n</span></span></code></pre></div><p>And in <code>defineConfig</code>, set the following:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { withSidebar } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vitepress-sidebar&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><p>Now leave the interface translation to the module! Of course, you can customize the detailed text as well.</p><p>For more information, read the documentation page for VitePress I18n: <a href="https://vitepress-i18n.cdget.com/guide/getting-started" target="_blank" rel="noreferrer">https://vitepress-i18n.cdget.com/guide/getting-started</a></p><h2 id="language-specific-sidebar-settings" tabindex="-1">Language-specific sidebar settings <a class="header-anchor" href="#language-specific-sidebar-settings" aria-label="Permalink to &quot;Language-specific sidebar settings&quot;">​</a></h2><p>In VitePress, you can display the sidebar differently for different languages. For example, let&#39;s say you have a folder structure like this</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/</span></span>
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
<span class="line"><span>└─ ...</span></span></code></pre></div><p>In the example, <code>abc.md</code> is the same document translated into each language. If you change the language to English, Korean, and Chinese respectively, the sidebar will scan each directory <code>en</code>, <code>ko</code>, and <code>zhHans</code> to get the title for the language.</p><p>Here&#39;s an example of how to accomplish this:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> rootLocale</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;en&#39;</span></span>
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
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">supportedLocales.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">map</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">lang</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">commonSidebarConfigs,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      ...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(rootLocale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lang </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { basePath: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`/\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">lang</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}/\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }), </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// If using \`rewrites\` option</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      documentRootPath: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`/docs/\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">lang</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      resolvePath: rootLocale </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> lang </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;/&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> :</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`/\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">lang</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}/\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">withSidebar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(vitePressConfigs, vitePressSidebarConfigs)</span></span></code></pre></div><p>First, <code>rewrites</code> allows you to suppress <code>/en/</code> in the URI path when you are using English as the root language (the <code>en</code> directory). (This is optional.)</p><p>Next, the setup of <code>sidebar</code> is similar to the previous one, but you need to set up multiple sidebars with directories for each language. Here&#39;s a description of each option:</p><ul><li><code>basePath</code>: When used in conjunction with the <code>rewrites</code> rule, it prevents the root locale from pointing to the <code>/en/</code> path.</li><li><code>documentRootPath</code>: The root path where the actual documentation files are located. For each language, look for the <code>en</code>, <code>ko</code>, and <code>zhHans</code> directories.</li><li><code>resolvePath</code>: <code>/docs</code> The location of the file from the directory that should actually scan the sidebar listings. Specify the directory location for each language, excluding the root locale.</li></ul><p>This ensures that the sidebar only displays articles from the specified directory per language. The above is an example, so you may need to set the options differently depending on the size of your project or directory structure.</p>`,29)]))}const d=a(e,[["render",p]]);export{k as __pageData,d as default};
