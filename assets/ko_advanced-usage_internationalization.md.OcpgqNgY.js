import{_ as a,c as n,o as i,ag as p}from"./chunks/framework.Bw-5EFTY.js";const u=JSON.parse('{"title":"국제화","description":"","frontmatter":{},"headers":[],"relativePath":"ko/advanced-usage/internationalization.md","filePath":"ko/advanced-usage/internationalization.md","lastUpdated":1753152234000}'),t={name:"ko/advanced-usage/internationalization.md"};function e(l,s,o,h,k,c){return i(),n("div",null,s[0]||(s[0]=[p(`<h1 id="국제화" tabindex="-1">국제화 <a class="header-anchor" href="#국제화" aria-label="Permalink to &quot;국제화&quot;">​</a></h1><p>이 페이지에서는 VitePress Sidebar를 사용하여 i18n (internationalization)을 달성하는 방법을 기술합니다.</p><p>VitePress에서는 다국어 문서를 지원합니다. 번역된 마크다운 파일을 각 언어별 디렉토리에 배치하고 VitePress의 <code>defineConfig</code>의 <code>locales</code> 옵션을 사용할 경우 언어 선택기가 표시되며 각 언어별로 지정된 디렉토리의 문서를 표시합니다.</p><h2 id="페이지-레이아웃-번역-수동" tabindex="-1">페이지 레이아웃 번역 (수동) <a class="header-anchor" href="#페이지-레이아웃-번역-수동" aria-label="Permalink to &quot;페이지 레이아웃 번역 (수동)&quot;">​</a></h2><p>먼저 VitePress에서는 각종 레이아웃 인터페이스 요소를 번역할 수 있습니다. 여기서 레이아웃은 &#39;이전&#39;, &#39;다음&#39;, &#39;목차&#39;, &#39;테마 변경&#39;과 같은 기능에 대한 관련된 모든 텍스트를 의미합니다. 또한 검색 기능에 표시되는 모든 텍스트 번역을 포함합니다.</p><p>VitePress 페이지에 있는 각종 인터페이스(레이아웃) 텍스트는 <code>locales</code>에 언어별로 번역된 텍스트를 제공할 수 있습니다. 예를 들면 다음과 같습니다:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;locales&quot;: {</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><p>(<code>root</code> 언어는 페이지에서 주 언어를 의미합니다.)</p><p>레이아웃 번역을 자세히 알아보려면 다음 문서를 참고하세요: <a href="https://vitepress.dev/ko/guide/i18n" target="_blank" rel="noreferrer">https://vitepress.dev/ko/guide/i18n</a></p><p>검색 기능에 표시되는 텍스트의 경우 <code>defineConfig</code>의 <code>themeConfig.search</code> 옵션에서 설정해야 합니다. 예를 들면 다음과 같습니다:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;themeConfig&quot;: {</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><h2 id="페이지-레이아웃-번역-자동" tabindex="-1">페이지 레이아웃 번역 (자동) <a class="header-anchor" href="#페이지-레이아웃-번역-자동" aria-label="Permalink to &quot;페이지 레이아웃 번역 (자동)&quot;">​</a></h2><p>VitePress Sidebar의 패밀리 플러그인인 <a href="https://vitepress-i18n.cdget.com/ko/" target="_blank" rel="noreferrer">VitePress I18n</a>을 사용하면 위와 같이 수동으로 번역하는 과정을 자동화할 수 있습니다. 몇가지 간단한 설정만으로 레이아웃 번역에 시간을 투자하지 않아도 됩니다!</p><p>아래 명령어로 VitePress I18n 모듈을 설치하세요:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vitepress-i18n</span></span></code></pre></div><p>그리고 <code>defineConfig</code>에 다음과 같이 설정합니다:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { withSidebar } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vitepress-sidebar&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><p>이제 인터페이스 번역은 모듈에게 맡기세요! 물론 세부적인 텍스트도 커스터마이징 할 수 있습니다.</p><p>자세한 내용은 VitePress I18n의 문서 페이지를 읽어주세요: <a href="https://vitepress-i18n.cdget.com/ko/guide/getting-started" target="_blank" rel="noreferrer">https://vitepress-i18n.cdget.com/ko/guide/getting-started</a></p><h2 id="언어별-사이드바-설정" tabindex="-1">언어별 사이드바 설정 <a class="header-anchor" href="#언어별-사이드바-설정" aria-label="Permalink to &quot;언어별 사이드바 설정&quot;">​</a></h2><p>VitePress에서 언어별로 사이드바를 다르게 표시할 수 있습니다. 예를 들면 다음과 같은 폴더 구조를 가지고 있다고 가정해보겠습니다:</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/</span></span>
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
<span class="line"><span>└─ ...</span></span></code></pre></div><p>예시의 <code>abc.md</code>는 각 언어로 번역된 같은 문서입니다. 언어를 각각 영어, 한국어, 중국어로 변경할 경우 사이드바는 각 디렉토리 <code>en</code>, <code>ko</code>, <code>zhHans</code>를 스캔하여 언어에 맞는 제목을 가져 올 것입니다.</p><p>이를 달성하는 예시는 다음과 같습니다:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> rootLocale</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;en&#39;</span></span>
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
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">withSidebar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(vitePressConfigs, vitePressSidebarConfigs)</span></span></code></pre></div><p>먼저 <code>rewrites</code>는 root 언어인 영어(<code>en</code> 디렉토리)를 사용 중일 때, URI 경로에 <code>/en/</code>을 표시하지 않게 해줍니다. (이는 선택사항입니다.)</p><p>다음으로 <code>sidebar</code>의 설정은 기존과 비슷하지만, 각 언어별 디렉토리로 구성된 다중 사이드바를 설정해야 합니다. 각 옵션에 대한 설명은 다음과 같습니다:</p><ul><li><code>basePath</code>: <code>rewrites</code> 규칙과 함께 사용 중일 때 root 로캐일이면 <code>/en/</code> 경로를 가리키지 않도록 합니다.</li><li><code>documentRootPath</code>: 실제 문서 파일이 위치한 루트 경로입니다. 각 언어별로 <code>en</code>, <code>ko</code>, <code>zhHans</code> 디렉토리를 찾도록 합니다.</li><li><code>resolvePath</code>: <code>/docs</code> 디렉토리로부터 실제로 사이드바 목록을 스캔해야 할 파일의 위치입니다. root 로캐일을 제외하고 각 언어별로 디렉토리 위치를 지정합니다.</li></ul><p>이렇게 하면 언어 마다 지정한 디렉토리의 문서만 사이드바에서 표시할 수 있도록 합니다. 위는 예시이므로 프로젝트의 규모나 디렉토리 구조에 따라 옵션 설정을 다르게 해야 할 수 있습니다.</p>`,29)]))}const d=a(t,[["render",e]]);export{u as __pageData,d as default};
