import{_ as a,c as i,o as n,ag as p}from"./chunks/framework.Bw-5EFTY.js";const o=JSON.parse('{"title":"시작하기","description":"","frontmatter":{"order":1},"headers":[],"relativePath":"ko/guide/getting-started.md","filePath":"ko/guide/getting-started.md","lastUpdated":1764466093000}'),e={name:"ko/guide/getting-started.md"};function l(t,s,h,k,r,d){return n(),i("div",null,s[0]||(s[0]=[p(`<h1 id="시작하기" tabindex="-1">시작하기 <a class="header-anchor" href="#시작하기" aria-label="Permalink to &quot;시작하기&quot;">​</a></h1><p>이 페이지에서는 VitePress Sidebar 모듈의 설치 및 사용 방법을 안내합니다.</p><h2 id="설치" tabindex="-1">설치 <a class="header-anchor" href="#설치" aria-label="Permalink to &quot;설치&quot;">​</a></h2><p>먼저 이 모듈을 사용하기 전에 <strong><a href="https://vitepress.dev/ko/" target="_blank" rel="noreferrer">VitePress</a></strong> 모듈을 사전 구성해야 할 수 있습니다.</p><p>Node.js 버전은 20.x 이상을 사용하는 것이 좋습니다. <strong>VitePress Sidebar</strong>는 <code>ESM</code>으로 작성되었습니다. CommonJS 환경에서 사용하려면 <a href="/ko/troubleshooting/err-require-esm">여기 지침을 참조하세요</a>.</p><p><a href="https://www.npmjs.com/package/vitepress-sidebar" target="_blank" rel="noreferrer">NPM</a> 또는 다른 노드 모듈 패키지 관리자를 사용하여 모듈을 설치할 수 있습니다. 이 패키지는 개발자 환경에서만 사용되므로 <code>devDependencies</code>에 설치해야 합니다. 아래 명령어로 설치하세요:</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># \`npm\`으로 설치</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vitepress-sidebar</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># \`yarn\`으로 설치</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vitepress-sidebar</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># \`pnpm\`으로 설치</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -D</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vitepress-sidebar</span></span></code></pre></div><h2 id="동작-과정" tabindex="-1">동작 과정 <a class="header-anchor" href="#동작-과정" aria-label="Permalink to &quot;동작 과정&quot;">​</a></h2><p>VitePress Sidebar는 귀하의 프로젝트의 폴더에서 지정한 폴더 경로(<code>documentRootPath</code>)를 기준으로 폴더와 마크다운 파일을 계층별로 스캔합니다.</p><p>이후 설정에 따라 특정 파일을 제외, 정렬, 포맷팅하여 사이드바 메뉴의 제목을 읽어온 후 VitePress에서 요구하는 사이드바 스펙에 따라 설정 데이터를 최종적으로 출력하게 됩니다.</p><p>결과적으로는 VitePress의 <code>config.js</code> 파일은 다음과 같이 변환 될 것입니다.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  themeConfig: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    sidebar: [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // VitePress Sidebar의 출력 결과</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Guide&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        items: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          { text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Introduction&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, link: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/introduction&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          { text: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Getting Started&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, link: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/getting-started&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><p>이로 인해 <code>sidebar</code>의 각 메뉴에 대한 수동 작성이 필요하지 않습니다.</p><h2 id="사용-방법" tabindex="-1">사용 방법 <a class="header-anchor" href="#사용-방법" aria-label="Permalink to &quot;사용 방법&quot;">​</a></h2><p>VitePress Sidebar는 <code>withSidebar</code>와 <code>generateSidebar</code> 두가지 함수로 사이드 바를 자동으로 생성할 수 있습니다. 이 둘의 동작은 같지만 함수를 사용하는 위치가 다릅니다. 일반적으로는 <code>withSidebar</code>를 사용하는 것을 권장합니다.</p><p>설치한 모듈을 코드에 가져오려면 VitePress의 <code>config.js</code> 파일을 엽니다. 이 파일은 <code>.vitepress</code> 디렉토리에 위치하며 프로젝트에 따라 다른 확장자의 이름일 수 있으니 유의하시기 바랍니다.</p><p>파일을 열고 아래 두가지 방법 중 하나를 사용하여 <code>vitepress-sidebar</code>를 사용할 수 있습니다:</p><h3 id="_1-withsidebar-사용-권장" tabindex="-1">1. <code>withSidebar</code> 사용 (권장) <a class="header-anchor" href="#_1-withsidebar-사용-권장" aria-label="Permalink to &quot;1. \`withSidebar\` 사용 (권장)&quot;">​</a></h3><p><code>withSidebar</code>는 <code>defineConfig</code>레벨에서 사용합니다. 이 때 주의할 점은 VitePress의 설정 객체가 첫번째 파라미터에, 이후 VitePress Sidebar의 옵션이 두번째 파라미터에 위치해야 합니다.</p><p>VitePress Sidebar는 기존 VitePress의 옵션에 필요한 추가 옵션을 오버라이딩 할 것입니다. 기존에 설정한 수동 <code>sidebar</code> 옵션은 새 옵션에 의해 무시됩니다.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// \`.vitepress/config.js\`</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { withSidebar } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vitepress-sidebar&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> vitePressOptions</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // VitePress의 옵션</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;VitePress Sidebar&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  themeConfig: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> vitePressSidebarOptions</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // VitePress Sidebar의 옵션</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  documentRootPath: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  collapsed: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  capitalizeFirst: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">withSidebar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(vitePressOptions, vitePressSidebarOptions));</span></span></code></pre></div><h3 id="_2-generatesidebar-사용" tabindex="-1">2. <code>generateSidebar</code> 사용 <a class="header-anchor" href="#_2-generatesidebar-사용" aria-label="Permalink to &quot;2. \`generateSidebar\` 사용&quot;">​</a></h3><p><code>generateSidebar</code>는 <code>themeConfig.sidebar</code> 레벨에서 사용할 수 있습니다. 이는 좀 더 세부적인 <code>themeConfig</code> 설정을 위해 코드 분리가 필요할 때 사용할 수 있습니다.</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// \`.vitepress/config.js\`</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { generateSidebar } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vitepress-sidebar&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  themeConfig: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    sidebar: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">generateSidebar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // VitePress Sidebar의 옵션</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p>VitePress Sidebar는 프로젝트의 문서를 스캔하기 위해 <code>documentRootPath</code> 옵션으로 작업 경로를 지정하여 올바른 위치를 알려주어야 합니다. 기본값은 <code>/</code>이지만 프로젝트에 따라 <code>docs</code>와 같이 별도의 폴더에 VitePress 프로젝트가 위치하는 경우에는 직접 경로를 지정해야 합니다.</p><p>프로젝트 루트 경로를 기준으로, <code>documentRootPath</code>의 경로는 <code>.vitePress</code> 폴더가 위치한 경로를 작성합니다.</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/</span></span>
<span class="line"><span>├─ package.json</span></span>
<span class="line"><span>├─ src/</span></span>
<span class="line"><span>├─ docs/        &lt;--------------- \`documentRootPath\` (&#39;/docs&#39;)</span></span>
<span class="line"><span>│  ├─ .vitepress/</span></span>
<span class="line"><span>│  ├─ another-directory/</span></span>
<span class="line"><span>│  ├─ hello.md</span></span>
<span class="line"><span>│  └─ index.md</span></span>
<span class="line"><span>└─ ...</span></span></code></pre></div><p>위와 같은 구조의 프로젝트인 경우 아래와 같이 설정해야 합니다:</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// \`.vitepress/config.js\`</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { withSidebar } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vitepress-sidebar&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> vitePressOptions</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> vitePressSidebarOptions</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  documentRootPath: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/docs&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">withSidebar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(vitePressOptions, vitePressSidebarOptions));</span></span></code></pre></div><p>사이드바 결과가 어떻게 출력되는지 테스트하려면 <code>debugPrint</code> 옵션을 <code>true</code>로 설정하여 VitePress를 빌드해 보세요. 콘솔에 출력이 표시될 것입니다.</p><p>VitePress Sidebar의 설정에 대한 자세한 내용은 아래 <strong><a href="/ko/guide/options">옵션</a></strong> 섹션을 참조하세요.</p><h2 id="코드-예시" tabindex="-1">코드 예시 <a class="header-anchor" href="#코드-예시" aria-label="Permalink to &quot;코드 예시&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { withSidebar } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vitepress-sidebar&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> vitePressConfigs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;VitePress Sidebar&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  themeConfig: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  withSidebar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(vitePressConfigs, {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    /*</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     * 자세한 지침은 아래 링크를 참조하세요:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     * https://vitepress-sidebar.cdget.com/guide/options</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">     */</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ============ [ RESOLVING PATHS ] ============</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // documentRootPath: &#39;/&#39;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // scanStartPath: null,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // resolvePath: null,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // basePath: null,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // followSymlinks: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ============ [ GROUPING ] ============</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // collapsed: true,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // collapseDepth: 2,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // rootGroupText: &#39;Contents&#39;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // rootGroupLink: &#39;https://github.com/jooy2&#39;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // rootGroupCollapsed: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ============ [ GETTING MENU TITLE ] ============</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // useTitleFromFileHeading: true,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // useTitleFromFrontmatter: true,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // useFolderLinkFromIndexFile: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // useFolderTitleFromIndexFile: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // frontmatterTitleFieldName: &#39;title&#39;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ============ [ GETTING MENU LINK ] ============</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // useFolderLinkFromSameNameSubFile: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // useFolderLinkFromIndexFile: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // folderLinkNotIncludesFileName: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ============ [ INCLUDE / EXCLUDE ] ============</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // excludeByGlobPattern: [&#39;README.md&#39;, &#39;folder/&#39;],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // excludeFilesByFrontmatterFieldName: &#39;exclude&#39;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // excludeByFolderDepth: undefined,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // includeDotFiles: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // includeEmptyFolder: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // includeRootIndexFile: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // includeFolderIndexFile: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ============ [ STYLING MENU TITLE ] ============</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // hyphenToSpace: true,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // underscoreToSpace: true,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // capitalizeFirst: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // capitalizeEachWords: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // keepMarkdownSyntaxFromTitle: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // removePrefixAfterOrdering: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // prefixSeparator: &#39;.&#39;,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ============ [ SORTING ] ============</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // manualSortFileNameByPriority: [&#39;first.md&#39;, &#39;second&#39;, &#39;third.md&#39;],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // sortFolderTo: null,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // sortMenusByName: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // sortMenusByFileDatePrefix: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // sortMenusByFrontmatterOrder: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // frontmatterOrderDefaultValue: 0,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // sortMenusByFrontmatterDate: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // sortMenusOrderByDescending: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // sortMenusOrderNumericallyFromTitle: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // sortMenusOrderNumericallyFromLink: false,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ============ [ MISC ] ============</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // debugPrint: false,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><h2 id="출력-예시" tabindex="-1">출력 예시 <a class="header-anchor" href="#출력-예시" aria-label="Permalink to &quot;출력 예시&quot;">​</a></h2><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  documentRootPath: &#39;javascript&#39;,</span></span>
<span class="line"><span>  useTitleFromFileHeading: true,</span></span>
<span class="line"><span>  hyphenToSpace: true,</span></span>
<span class="line"><span>  excludeByGlobPattern: [&#39;vitepress-how-to&#39;]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/*</span></span>
<span class="line"><span>[</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    text: &#39;examples&#39;,</span></span>
<span class="line"><span>    items: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;Examples&#39;,</span></span>
<span class="line"><span>        link: &#39;/javascript/examples/examples&#39;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    text: &#39;functions&#39;,</span></span>
<span class="line"><span>    items: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;prototypes&#39;,</span></span>
<span class="line"><span>        items: [</span></span>
<span class="line"><span>          {</span></span>
<span class="line"><span>            text: &#39;Array&#39;,</span></span>
<span class="line"><span>            items: [</span></span>
<span class="line"><span>              {</span></span>
<span class="line"><span>                text: &#39;Array.indexOf&#39;,</span></span>
<span class="line"><span>                link: &#39;/javascript/functions/prototypes/Array/Array.indexOf&#39;</span></span>
<span class="line"><span>              }</span></span>
<span class="line"><span>            ]</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    text: &#39;Getting Started&#39;,</span></span>
<span class="line"><span>    link: &#39;/javascript/getting_started&#39;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>];</span></span>
<span class="line"><span>*/</span></span></code></pre></div>`,35)]))}const g=a(e,[["render",l]]);export{o as __pageData,g as default};
