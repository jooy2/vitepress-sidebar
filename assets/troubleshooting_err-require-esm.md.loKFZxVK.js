import{_ as i,c as e,ag as a,o as t}from"./chunks/framework.-a8jReyC.js";const E=JSON.parse('{"title":"CommonJS: ERR_REQUIRE_ESM","description":"","frontmatter":{"title":"CommonJS: ERR_REQUIRE_ESM"},"headers":[],"relativePath":"troubleshooting/err-require-esm.md","filePath":"en/troubleshooting/err-require-esm.md","lastUpdated":1724371989000}'),n={name:"troubleshooting/err-require-esm.md"};function o(r,s,l,h,p,d){return t(),e("div",null,s[0]||(s[0]=[a(`<h1 id="commonjs-err-require-esm" tabindex="-1"><code>CommonJS: ERR_REQUIRE_ESM</code> <a class="header-anchor" href="#commonjs-err-require-esm" aria-label="Permalink to &quot;\`CommonJS: ERR_REQUIRE_ESM\`&quot;">​</a></h1><p><code>vitepress-sidebar</code> is an <strong>ESM</strong> module. If your project is using <strong>CJS</strong>, you will need to convert it to an <strong>ESM</strong> module.</p><p>For more information about the <strong>ESM</strong> module, see below: <a href="https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c" target="_blank" rel="noreferrer">https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c</a></p><p>To address these issues, there are several solutions below:</p><h3 id="solution-a" tabindex="-1">Solution A <a class="header-anchor" href="#solution-a" aria-label="Permalink to &quot;Solution A&quot;">​</a></h3><p>If you are trying to use it with a CJS project, change the file extension from <code>.js</code> to <code>.mjs</code> and try again. You can define that you want to use the module script for a specific file.</p><h3 id="solution-b" tabindex="-1">Solution B <a class="header-anchor" href="#solution-b" aria-label="Permalink to &quot;Solution B&quot;">​</a></h3><p>in the <code>package.json</code> file, add the line <code>&quot;type&quot;: &quot;module&quot;</code> line. This may require the project to be converted to an ESM project.</p><div class="language-json5 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json5</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;docs&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;module&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// &lt;-- Add this</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;1.0.0&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  scripts</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    dev</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;vitepress dev src&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    build</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;vitepress build src&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    serve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;vitepress serve src&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,9)]))}const c=i(n,[["render",o]]);export{E as __pageData,c as default};
