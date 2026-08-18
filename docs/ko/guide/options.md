---
order: 2
---

# 사이드바 옵션

이 페이지에서는 VitePress Sidebar의 모든 옵션에 대해 설명합니다.

## 개요

모든 옵션을 한눈에 볼 수 있습니다. 옵션 이름을 클릭하면 자세한 설명으로 이동합니다.

<div class="options-overview">
<table>
<thead>
<tr><th>그룹</th><th>옵션</th><th>타입</th><th>기본값</th><th><code>sidebar<wbr>.config<wbr>.json</code></th></tr>
</thead>
<tbody>
<tr><td rowspan="5">경로 해석</td><td><a href="#documentrootpath"><code>documentRootPath</code></a></td><td><code>string</code></td><td><code>'/'</code></td><td>⚠️</td></tr>
<tr><td><a href="#scanstartpath"><code>scanStartPath</code></a></td><td><code>string|null</code></td><td><code>null</code></td><td>⚠️</td></tr>
<tr><td><a href="#resolvepath"><code>resolvePath</code></a></td><td><code>string|null</code></td><td><code>null</code></td><td>⚠️</td></tr>
<tr><td><a href="#basepath"><code>basePath</code></a></td><td><code>string|null</code></td><td><code>null</code></td><td>⚠️</td></tr>
<tr><td><a href="#followsymlinks"><code>followSymlinks</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td rowspan="6">그룹핑</td><td><a href="#collapsed"><code>collapsed</code></a></td><td><code>boolean|null|undefined</code></td><td><code>undefined</code></td><td>✅</td></tr>
<tr><td><a href="#collapsedepth"><code>collapseDepth</code></a></td><td><code>number</code></td><td><code>1</code></td><td>✅</td></tr>
<tr><td><a href="#collapsefromlevel"><code>collapseFromLevel</code></a></td><td><code>number</code></td><td><code>undefined</code></td><td>✅</td></tr>
<tr><td><a href="#rootgrouptext"><code>rootGroupText</code></a></td><td><code>string</code></td><td><code>'Table of Contents'</code></td><td>⚠️</td></tr>
<tr><td><a href="#rootgrouplink"><code>rootGroupLink</code></a></td><td><code>string</code></td><td><code>null</code></td><td>⚠️</td></tr>
<tr><td><a href="#rootgroupcollapsed"><code>rootGroupCollapsed</code></a></td><td><code>boolean|null|undefined</code></td><td><code>null</code></td><td>⚠️</td></tr>
<tr><td rowspan="5">메뉴 제목</td><td><a href="#usetitlefromfileheading"><code>useTitleFromFileHeading</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#usetitlefromfrontmatter"><code>useTitleFromFrontmatter</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#usefoldertitlefromindexfile"><code>useFolderTitleFromIndexFile</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#frontmattertitlefieldname"><code>frontmatterTitleFieldName</code></a></td><td><code>string</code></td><td><code>'title'</code></td><td>✅</td></tr>
<tr><td><a href="#dynamicroutetitleparam"><code>dynamicRouteTitleParam</code></a></td><td><code>string</code></td><td><code>'title'</code></td><td>✅</td></tr>
<tr><td rowspan="3">메뉴 링크</td><td><a href="#usefolderlinkfromsamenamesubfile"><code>useFolderLinkFromSameNameSubFile</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#folderlinknotincludesfilename"><code>folderLinkNotIncludesFileName</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#usefolderlinkfromindexfile"><code>useFolderLinkFromIndexFile</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td rowspan="9">포함 및 제외</td><td><a href="#excludebyglobpattern"><code>excludeByGlobPattern</code></a></td><td><code>string[]</code></td><td><code>[]</code></td><td>✅</td></tr>
<tr><td><a href="#excludefilesbyfrontmatterfieldname"><code>excludeFilesByFrontmatterFieldName</code></a></td><td><code>string|null</code></td><td><code>null</code></td><td>✅</td></tr>
<tr><td><a href="#excludebyfolderdepth"><code>excludeByFolderDepth</code></a></td><td><code>number|null</code></td><td><code>null</code></td><td>✅</td></tr>
<tr><td><a href="#includedotfiles"><code>includeDotFiles</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#includeemptyfolder"><code>includeEmptyFolder</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#includerootindexfile"><code>includeRootIndexFile</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>⚠️</td></tr>
<tr><td><a href="#includefolderindexfile"><code>includeFolderIndexFile</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#includedynamicroutes"><code>includeDynamicRoutes</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>⚠️</td></tr>
<tr><td><a href="#vitepress-srcexclude">VitePress <code>srcExclude</code></a></td><td><code>string[]</code></td><td><code>undefined</code></td><td>❌</td></tr>
<tr><td rowspan="7">메뉴 제목 스타일링</td><td><a href="#hyphentospace"><code>hyphenToSpace</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#underscoretospace"><code>underscoreToSpace</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#capitalizefirst"><code>capitalizeFirst</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#capitalizeeachwords"><code>capitalizeEachWords</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#keepmarkdownsyntaxfromtitle"><code>keepMarkdownSyntaxFromTitle</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#removeprefixafterordering"><code>removePrefixAfterOrdering</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>⚠️</td></tr>
<tr><td><a href="#prefixseparator"><code>prefixSeparator</code></a></td><td><code>string|RegExp</code></td><td><code>'.'</code></td><td>✅<sup>1</sup></td></tr>
<tr><td rowspan="13">정렬</td><td><a href="#manualsortfilenamebypriority"><code>manualSortFileNameByPriority</code></a></td><td><code>string[]</code></td><td><code>[]</code></td><td>✅</td></tr>
<tr><td><a href="#sortfolderto"><code>sortFolderTo</code></a></td><td><code>undefined|'top'|'bottom'</code></td><td><code>undefined</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusbyname"><code>sortMenusByName</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusbyfiledateprefix"><code>sortMenusByFileDatePrefix</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusbyfrontmatterorder"><code>sortMenusByFrontmatterOrder</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#frontmatterorderdefaultvalue"><code>frontmatterOrderDefaultValue</code></a></td><td><code>number</code></td><td><code>0</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusbyfilecreatedate"><code>sortMenusByFileCreateDate</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusbyfilemodifydate"><code>sortMenusByFileModifyDate</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusbyfrontmatterdate"><code>sortMenusByFrontmatterDate</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusorderbydescending"><code>sortMenusOrderByDescending</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusordernumericallyfromtitle"><code>sortMenusOrderNumericallyFromTitle</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusordernumericallyfromlink"><code>sortMenusOrderNumericallyFromLink</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>✅</td></tr>
<tr><td><a href="#sortmenusbycustomfunction"><code>sortMenusByCustomFunction</code></a></td><td><code>(a: SidebarSortItem, b: SidebarSortItem) =&gt; number</code></td><td><code>undefined</code></td><td>❌</td></tr>
<tr><td>기타</td><td><a href="#debugprint"><code>debugPrint</code></a></td><td><code>boolean</code></td><td><code>false</code></td><td>⚠️</td></tr>
</tbody>
</table>
</div>

**[`sidebar.config.json`](/ko/advanced-usage/configuration-file)** — 해당 옵션을 설정 파일에 작성할 수 있는지 여부입니다:

- ✅ 모든 폴더의 설정 파일에서 사용할 수 있습니다.
- ⚠️ 문서 루트 또는 그보다 상위에 있는 설정 파일에서만 사용할 수 있습니다. 그보다 하위에 있는 파일에서는 경고와 함께 무시됩니다.
- ❌ 설정 파일에서는 사용할 수 없으며, 인자로 직접 전달해야 합니다.

<sup>1</sup> 설정 파일은 JSON이므로, `prefixSeparator`에 정규 표현식을 지정하려면 인자로 전달해야 합니다.

## `documentRootPath`

- Type: `string`
- Default: `'/'`

문서 파일이 위치한 최상위 경로입니다. 기본값은 `/`입니다.

이 옵션은 `.vitepress` 디렉터리가 있는 경로이며, 프로젝트 루트에서 문서가 있는 폴더가 `/docs`인 경우 이 옵션의 값을 `docs` 또는 `/docs`로 설정해야 합니다.

```text
/
├─ package.json
├─ src/
├─ docs/        <--------------- `documentRootPath` ('/docs')
│  ├─ .vitepress/        <------ VitePress 설정 디렉토리
│  ├─ another-directory/
│  ├─ hello.md
│  └─ index.md
└─ ...
```

`sidebar.config.json` 파일이 있는 경우 이 옵션은 생략할 수 있습니다. 자세한 내용은 **[설정 파일](/ko/advanced-usage/configuration-file)** 페이지를 참고하세요.

## `scanStartPath`

- Type: `string|null`
- Default: `null`

이 옵션은 다중 사이드바를 구성하는 데 사용됩니다. **[다중 사이드바](/ko/advanced-usage/multiple-sidebars-how-to)** 페이지에서 자세히 알아볼 수 있습니다.

문서 목록을 스캔할 루트 디렉터리 경로입니다. `scanStartPath`에 설정된 경로를 벗어난 `documentRootPath`에 설정된 경로에 있는 파일은 스캔되지 않습니다. `documentRootPath`에 설정된 상위 경로가 `link`에 표시되어야 하므로 `scanStartPath`를 지정하는 경우 `documentRootPath`도 함께 설정하는 것이 좋습니다.

예를 들어 루트 경로가 `/docs`이고 스캔할 문서가 `/docs/sub-dir/scan-me`인 경우, 설정은 다음과 같이 표시됩니다:

- `documentRootPath`: `/docs`,
- `scanStartPath`: `sub-dir/scan-me` (`documentRootPath` 경로를 포함하지 마세요.)

## `resolvePath`

- Type: `string|null`
- Default: `null`

이 옵션은 다중 사이드바를 구성하는 데 사용됩니다. **[다중 사이드바](/ko/advanced-usage/multiple-sidebars-how-to)** 페이지에서 자세히 알아볼 수 있습니다.

각 경로마다 다른 사이드바를 표시하려면 섹션의 경로를 입력합니다. 경로 앞에 `/`가 포함되어야 합니다. 이 값이 없는 옵션은 루트 섹션(`/`)으로 설정됩니다.

e.g. `/`, `/path/sub-path`, `/guide/`...

## `basePath`

- Type: `string|null`
- Default: `null`

이 옵션은 다중 사이드바를 구성하는 데 사용됩니다. **[다중 사이드바](/ko/advanced-usage/multiple-sidebars-how-to)** 페이지에서 자세히 알아볼 수 있습니다.

이 옵션은 VitePress의 `rewrites` 옵션으로 인해 경로가 변경된 경우에 사용할 수 있습니다. VitePress의 기본 경로를 대체합니다. 이 값이 존재하지 않으면 `resolvePath`의 값을 대신 사용합니다.

## `followSymlinks`

- Type: `boolean`
- Default: `false`

값이 `true`이면 폴더를 스캔할 때 심볼릭 링크가 설정된 폴더나 파일을 포함하여 메뉴에 추가합니다. 심볼릭 링크를 잘못 구성하거나 복잡한 수준의 링크가 설정된 경우 성능이 저하되거나 무한 스캔이 발생할 수 있으므로 주의해야 합니다.

## `useTitleFromFileHeading`

- Type: `boolean`
- Default: `false`

값이 `true`이면 `.md` 파일의 `h1` 제목 내용이 포함된 제목을 표시합니다. 파일에 `h1` 제목이 존재하지 않으면 기존과 같이 파일 이름으로 대체합니다. `Frontmatter` 블록에서는 제목을 찾지 않으므로 그 안에 작성된 주석은 제목으로 사용되지 않습니다.

기본 메뉴 항목은 폴더 트리 순서로 정렬되므로 변경된 메뉴 이름으로 다시 정렬하려면 `sortMenusByName` 옵션을 `true`로 설정합니다.

## `useTitleFromFrontmatter`

- Type: `boolean`
- Default: `false`

값이 `true`이면 파일의 `Frontmatter`에 있는 `title` 값에 따라 제목을 표시합니다. 이 값을 구문 분석할 수 없는 경우 `useTitleFromFileHeading` 옵션이 `true`인 경우 `h1` 태그에서, 실패하면 파일 이름에서 가져옵니다.

'제목'은 문서 상단에 위치해야 하며 다음과 같이 표시되어야 합니다(`title:` 값과 제목 사이에 공백이 필요합니다).

```markdown
---
title: Hello World
---
```

## `frontmatterTitleFieldName`

- Type: `string`
- Default: `title`

파일에 지정된 Frontmatter에서 지정한 키 이름을 기준으로 메뉴 제목을 표시합니다. 지정한 값이 Frontmatter에 존재하지 않으면 기본 `title`이 대체로 사용됩니다.

```markdown
---
name: 이 것은 Frontmatter의 제목값입니다.
---
```

자세한 내용은 다음 문서를 참조하세요: https://vitepress.dev/guide/frontmatter

기본 메뉴 항목은 폴더 트리 순서로 정렬되므로 변경된 메뉴 이름으로 다시 정렬하려면 `sortMenusByName` 옵션을 `true`로 설정합니다.

## `useFolderTitleFromIndexFile`

- Type: `boolean`
- Default: `false`

이 값이 `true`이면 현재 폴더의 `index.md` 파일에 있는 정보를 사용하여 메뉴 이름을 가져옵니다. 인덱스 파일이 존재하지 않으면 폴더 이름이 사용됩니다. 일반적으로 `index`라는 이름은 `index.md` 파일에서 가져오기 때문에 `useTitleFromFileHeading` 또는 `useTitleFromFrontmatter` 옵션을 함께 사용하여 해당 파일의 마크다운 헤더 또는 프론트매터에서 제목을 가져오는 것이 좋습니다.

인덱스 파일은 사이드바 메뉴에서 숨겨져 있지만, 인덱스 파일은 `includeFolderIndexFile` 옵션이 `true`인 경우 메뉴에 표시될 수 있습니다.

## `useFolderLinkFromIndexFile`

- Type: `boolean`
- Default: `false`

이 값이 `true`이면 현재 폴더에 있는 `index.md` 파일로 이동할 수 있도록 폴더에 대한 링크를 지정합니다. 인덱스 파일이 존재하지 않으면 링크가 생성되지 않습니다.

인덱스 파일은 사이드바 메뉴에서 숨겨져 있지만, 인덱스 파일은 `includeFolderIndexFile` 옵션이 `true`인 경우 메뉴에 표시될 수 있습니다.

## `manualSortFileNameByPriority`

- Type: `Array<string>`
- Default: `[]`

파일 이름(확장자 포함) 배열을 순서대로 정렬합니다. 배열에 파일 이름과 일치하는 값이 없으면 정렬 우선순위가 반송됩니다. 이는 파일과 디렉터리 모두에 적용되며 하위 디렉터리에도 동일한 정렬 규칙이 적용됩니다.

## `sortFolderTo`

- Type: `undefined | 'top' | 'bottom'`
- Default: `undefined`

모든 정렬이 완료된 후 폴더와 파일을 묶어서 배치합니다. 값이 `top`이면 모든 폴더가 파일 보다 위쪽에 배치되며, `bottom`이면 파일 보다 아래쪽에 배치됩니다. 하위 폴더의 항목도 함께 정렬됩니다.

## `sortMenusByName`

- Type: `boolean`
- Default: `false`

메뉴 항목의 항목을 이름별로 정렬합니다. 일반적으로 폴더 스캔은 오름차순 이름 정렬로 이루어지므로 이 옵션을 적용하지 않고 기본 정렬이 적용되지만, `useTitleFromFileHeading` 또는 `useTitleFromFrontmatter` 옵션을 사용하는 경우 메뉴 이름이 변경되어 이름별로 다시 정렬해야 할 수 있습니다. 이 옵션은 변경된 메뉴 이름에 대해서도 이름별로 강제로 정렬합니다.

## `sortMenusByFileDatePrefix`

- Type: `boolean`
- Default: `false`

값이 `true`이면 메뉴 항목 이름의 날짜 접두사를 기준으로 정렬합니다. 날짜 형식은 `YYYY-MM-DD` 형식이어야 합니다(예: `2024-01-01-menu-name`, `2024-01-02.menu-name`...).

이후 메뉴 텍스트에 남아있는 날짜 접두사를 제거하려면 `prefixSeparator` 및 `removePrefixAfterOrdering` 옵션을 활용하면 됩니다.

기본 메뉴 항목은 폴더 트리 순서로 정렬되므로 변경된 메뉴 이름으로 다시 정렬하려면 `sortMenusByName` 옵션을 `true`로 설정합니다.

## `sortMenusByFrontmatterOrder`

- Type: `boolean`
- Default: `false`

Frontmatter의 `order` 속성을 기준으로 메뉴 항목을 정렬합니다. 각 폴더에 대해 `order` 속성의 값(숫자)을 오름차순으로 정렬하거나, `sortMenusOrderByDescending` 옵션이 `true`인 경우 내림차순으로 정렬합니다. 값은 숫자로 비교되므로 음수나 소수를 사용한 `order`도 그 값에 해당하는 자리에 놓입니다. `-2`는 `-1`보다 앞에, `2.25`는 `2.5`보다 앞에 옵니다. `order` 값이 숫자가 아니거나 존재하지 않는 경우 `order`는 `0`, 또는 `frontmatterOrderDefaultValue` 옵션의 값으로 판단됩니다.

## `sortMenusByFileCreateDate`

- Type: `boolean`
- Default: `false`

파일의 생성 날짜 속성을 기준으로 메뉴 항목을 정렬합니다. (`sortMenusOrderByDescending` 옵션이 `true`인 경우 내림차순).

## `sortMenusByFileModifyDate`

- Type: `boolean`
- Default: `false`

파일의 수정된 날짜 속성을 기준으로 메뉴 항목을 정렬합니다. (`sortMenusOrderByDescending` 옵션이 `true`인 경우 내림차순).

## `sortMenusByFrontmatterDate`

- Type: `boolean`
- Default: `false`

Frontmatter의 `date` 속성을 기준으로 메뉴 항목을 정렬합니다. 또한 `date` 속성 값을 가장 오래된 날짜 순으로 오름차순으로 정렬합니다(`sortMenusOrderByDescending` 옵션이 `true`인 경우 내림차순). 날짜 형식은 `YYYY-MM-DD` 또는 JavaScript 날짜 데이터 유형과 일치해야 합니다.

## `sortMenusOrderByDescending`

- Type: `boolean`
- Default: `false`

이 값이 `true`이면 메뉴 항목의 항목을 내림차순으로 정렬합니다. 이 옵션은 `sortMenusByName` 또는 `sortMenusByFrontmatterOrder`가 `true`인 경우에만 활성화됩니다.

## `sortMenusOrderNumericallyFromTitle`

- Type: `boolean`
- Default: `false`

이 값이 `true`이면 메뉴 이름 앞에 숫자가 포함된 경우 이름이 아닌 낮은 숫자를 기준으로 정렬됩니다. 예를 들어 `1-a`, `10-a`, `2-a`라는 이름의 파일이 있는 경우 일반 정렬에서는 `['1-a', '10-a', '2-a']`라는 이름으로 정렬됩니다. 이렇게 하면 `10-a`가 `2-a`보다 우선하기 때문에 메뉴가 의도하지 않은 순서로 표시됩니다.

이 옵션을 사용하면 다음과 같이 정렬됩니다: `['1-a', '2-a', '10-a']`

내림차순 정렬을 원할 경우 `sortMenusOrderByDescending` 옵션과 함께 사용해야 합니다.

## `sortMenusOrderNumericallyFromLink`

- Type: `boolean`
- Default: `false`

이 값이 `true`이면 메뉴 이름 앞에 숫자가 포함된 경우 이름이 아닌 낮은 숫자를 기준으로 정렬됩니다. 이 옵션은 `sortMenusOrderNumericallyFromTitle`과 동일하지만 파일 제목이 아닌 링크를 기준으로 정렬합니다. 따라서 `sortMenusOrderNumericallyFromTitle` 옵션과 함께 사용할 수 없습니다.

링크가 없는 폴더는 폴더 자신의 경로를 기준으로 정렬됩니다. 따라서 `useFolderTitleFromIndexFile`, `useTitleFromFileHeading` 옵션처럼 제목을 다른 곳에서 가져오는 경우에도 폴더와 파일이 이름의 숫자를 기준으로 함께 정렬됩니다.

내림차순 정렬을 원할 경우 `sortMenusOrderByDescending` 옵션과 함께 사용해야 합니다.

## `sortMenusByCustomFunction`

- Type: `(a: SidebarSortItem, b: SidebarSortItem) => number`
- Default: `undefined`

모든 폴더의 메뉴 항목을 직접 작성한 함수로 정렬합니다. `Array.prototype.sort`에 전달하는 함수와 동일하게 비교할 두 항목을 전달받아 숫자를 반환합니다.

버전 관리 시스템에 기록된 날짜나 직접 정의한 Frontmatter 속성처럼, 다른 옵션이 읽지 않는 값을 기준으로 정렬해야 할 때 사용합니다.

각 항목은 화면에 표시되는 형태뿐만 아니라 해당 항목이 디스크의 어디에서 왔는지도 함께 제공합니다.

| 속성 | 타입 | 설명 |
| --- | --- | --- |
| `text` | `string \| undefined` | 항목이 표시되는 텍스트입니다. |
| `link` | `string \| undefined` | 항목이 가리키는 링크입니다. 링크가 없는 폴더에는 존재하지 않습니다. |
| `fileName` | `string` | 디스크상의 파일 또는 폴더 이름이며 `.md` 확장자를 포함합니다. |
| `filePath` | `string` | 디스크상의 파일 또는 폴더의 절대 경로입니다. 동적 라우트로 생성된 페이지는 해당 템플릿의 경로입니다. |
| `isDirectory` | `boolean` | 항목이 폴더인지 여부입니다. |
| `createDate` | `number` | 생성 시각(밀리초)이며, 읽을 수 없으면 `0`입니다. |
| `modifyDate` | `number` | 수정 시각(밀리초)이며, 읽을 수 없으면 `0`입니다. |
| `frontmatter` | `object` | 파일의 Frontmatter이며, 폴더의 경우 해당 폴더 `index.md`의 Frontmatter입니다. 없으면 빈 객체입니다. |

`createDate`, `modifyDate`, `frontmatter`는 함수가 실제로 접근할 때만 읽습니다. 따라서 경로만으로 순서를 결정하는 함수는 추가 비용이 발생하지 않습니다.

이 옵션은 폴더 전체의 순서를 단독으로 결정하므로 `sortMenusByName`, `sortMenusByFileDatePrefix`, `sortMenusByFrontmatterOrder`, `sortMenusByFrontmatterDate`, `sortMenusByFileCreateDate`, `sortMenusByFileModifyDate`, `sortMenusOrderNumericallyFromTitle`, `sortMenusOrderNumericallyFromLink`, `sortMenusOrderByDescending` 옵션과 함께 사용할 수 없습니다. 내림차순이 필요하다면 `sortMenusOrderByDescending` 대신 함수 내부에서 원하는 방향으로 정렬하십시오.

함수는 JSON으로 표현할 수 없으므로 이 옵션은 [설정 파일](../advanced-usage/configuration-file)에서 사용할 수 없습니다.

아래 예시는 각 파일이 처음 커밋된 날짜를 기준으로 메뉴를 정렬합니다. Git으로 관리되는 프로젝트에서는 이 값이 곧 파일의 생성 날짜입니다. 항목마다 저장소를 조회하므로 결과를 캐시합니다.

```js
import { execFileSync } from 'child_process';
import { defineConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';

const gitCreateDateCache = new Map();

const getGitCreateDate = (filePath) => {
  if (!gitCreateDateCache.has(filePath)) {
    let timestamp = 0;

    try {
      const output = execFileSync(
        'git',
        ['log', '--diff-filter=A', '--format=%at', '-1', '--', filePath],
        { encoding: 'utf-8' }
      ).trim();

      timestamp = output ? Number(output) * 1000 : 0;
    } catch {
      // 아직 추적되지 않는 파일은 `0`으로 처리합니다
    }

    gitCreateDateCache.set(filePath, timestamp);
  }

  return gitCreateDateCache.get(filePath);
};

export default defineConfig(
  withSidebar(
    {
      // VitePress 옵션...
    },
    {
      documentRootPath: 'docs',
      sortMenusByCustomFunction: (a, b) =>
        getGitCreateDate(a.filePath) - getGitCreateDate(b.filePath)
    }
  )
);
```

## `frontmatterOrderDefaultValue`

- Type: `number`
- Default: `0`

설정되지 않은 경우 Frontmatter의 `order` 속성에 대한 기본값을 설정합니다. 이 옵션은 `sortMenusByFrontmatterOrder`가 `true`인 경우에만 활성화됩니다.

## `collapsed`

- Type: `boolean|null|undefined`
- Default: `undefined`

`collapsed` 옵션을 지정하지 않으면(`null` 또는 `정의되지 않음`) 그룹 접기/확장이 사용되지 않고 모든 메뉴가 한꺼번에 표시됩니다. `false`이면 모든 그룹이 확장된 상태로 메뉴가 생성됩니다. `true`이면 모든 그룹이 접힌 상태로 메뉴가 생성됩니다.

(값이 `true`이더라도 메뉴가 접힌 그룹 내의 문서에 있는 경우 메뉴가 확장될 수 있습니다.)

![Collapsed Example](/doc-collapsed-example.png)

## `collapseDepth`

- Type: `number`
- Default: `1`

지정된 깊이에서 메뉴 그룹이 축소됩니다. 이 옵션을 지정하면 그룹 축소/확장이 자동으로 활성화됩니다. 최상위 폴더의 깊이는 `1`입니다.

## `collapseFromLevel`

- Type: `number`
- Default: `undefined`

그룹이 접거나 펼칠 수 있도록 아이콘 메뉴를 표시 할 최소 깊이를 지정합니다. 이 값보다 낮은 깊이의 폴더에는 `collapsed` 속성이 무시된 채 화살표 없이 항상 펼쳐진 상태로 표시됩니다. 이 옵션은 `collapsed` 옵션과 함께 사용해야 하며 실제 접힘/펼침 상태는 `collapseDepth`에 의해 결정됩니다. 최상위 폴더의 깊이는 `1`입니다.

예를 들어 `{ collapsed: true, collapseDepth: 3, collapseFromLevel: 2 }`로 설정하면 1단계 폴더는 화살표 없이 고정 표시되고, 2단계 폴더는 접을 수 있는 상태로 펼쳐져 있으며, 3단계 이상의 폴더는 접힌 상태로 시작합니다.

## `hyphenToSpace`

- Type: `boolean`
- Default: `false`

값이 `true`이면 파일 이름에 포함된 `-` 기호가 공백으로 변환되어 제목으로 표시됩니다. 이 옵션은 메뉴 이름을 마크다운 머리글 또는 Frontmatter을 통해 가져올 때도 영향을 받습니다.

## `underscoreToSpace`

- Type: `boolean`
- Default: `false`

값이 `true`이면 파일 이름에 포함된 `_` 기호가 공백으로 변환되어 제목으로 표시됩니다. 이 옵션은 메뉴 이름을 마크다운 머리글 또는 Frontmatter을 통해 가져올 때도 영향을 받습니다.

## `capitalizeFirst`

- Type: `boolean`
- Default: `false`

값이 `true`이면 메뉴 이름의 첫 글자가 강제로 대문자로 바뀝니다. 이 옵션은 메뉴 이름을 마크다운 머리글 또는 Frontmatter을 통해 가져올 때도 영향을 받습니다.

## `capitalizeEachWords`

- Type: `boolean`
- Default: `false`

값이 `true`이면 특수문자로 구분된 단어의 첫 글자를 모두 대문자로 표시합니다. 이 옵션은 메뉴 이름을 마크다운 머리글 또는 Frontmatter을 통해 가져올 때도 영향을 받습니다.

예를 들어, `abc def ghi`와 `abc-def ghi`는 각각 `Abc Def Ghi`와 `Abc-Def Ghi`로 변경됩니다.

## `excludeByGlobPattern`

- Type: `Array<string>`
- Default: `[]`

[glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) 파일 패턴 문자열로 구성된 배열에 따라 파일이나 폴더를 제외합니다.

예를 들어 값은 다음과 같을 수 있습니다: `['abc/', 'def.md', 'ghi/file-**']` 이는 각각 모든 경로에 포함된 `abc` 디렉토리와 하위 항목, `def.md` 파일, `ghi` 경로에 있는 `file-`로 시작하는 파일이 해당되며 이 파일과 폴더들은 메뉴에서 제외됩니다.

각 패턴은 스캔하는 모든 폴더를 기준으로 개별 비교되므로, `abc/def/**`와 같이 문서 루트로부터의 경로를 나타내는 패턴은 아무것도 제외하지 못합니다. 이러한 경로에는 VitePress의 [`srcExclude`](#vitepress-srcexclude)를 사용하세요.

## VitePress `srcExclude`

`withSidebar`로 사이드바를 생성하는 경우, VitePress 설정의 [`srcExclude`](https://vitepress.dev/reference/site-config#srcexclude)가 자동으로 함께 적용됩니다. 별도로 설정할 옵션은 없습니다. 빌드에서 제외된 문서는 페이지로 생성되지 않으므로, 해당 메뉴가 남아있으면 존재하지 않는 페이지로 연결되기 때문입니다.

```javascript
// `.vitepress/config.js`
import { withSidebar } from 'vitepress-sidebar';

const vitePressOptions = {
  title: 'VitePress Sidebar',
  // `drafts/private.md`와 모든 `TODO.md`가 빌드에서 제외되며,
  // 사이드바에서도 함께 제외됩니다.
  srcExclude: ['drafts/private.md', '**/TODO.md']
};

export default defineConfig(
  withSidebar(vitePressOptions, {
    documentRootPath: '/docs'
  })
);
```

다음 사항에 유의하세요:

- 패턴은 VitePress가 `srcDir`을 기준으로 해석하는 것과 동일하게 `documentRootPath`를 기준으로 해석됩니다. [`scanStartPath`](#scanstartpath)로 문서 루트보다 하위에서 스캔을 시작하더라도 이 기준은 그대로 유지됩니다.
- [`excludeByGlobPattern`](#excludebyglobpattern)을 비롯한 다른 제외 옵션을 대체하지 않고, 그 위에 추가로 적용됩니다.
- [동적 라우트](#includedynamicroutes) 템플릿을 제외하면 해당 템플릿이 생성하는 모든 페이지가 함께 제외됩니다.
- [`generateSidebar`](/ko/guide/getting-started)는 VitePress 설정을 전달받지 않으므로 `srcExclude`를 읽을 수 없습니다. 이 경우 `excludeByGlobPattern`에 패턴을 직접 선언하세요.

## `excludeFilesByFrontmatterFieldName`

- Type: `string|null`
- Default: `null`

지정된 Frontmatter 필드 이름의 값이 `true`로 설정된 문서는 메뉴에서 제외됩니다.

옵션이 지정되지 않았거나 옵션 값이 정의되지 않은 경우 무시됩니다.

예를 들어 옵션 값이 `exclude`인 경우 콘텐츠에 `exclude: true`가 포함된 문서는 메뉴에 표시되지 않습니다.

```markdown
---
title: This article is excluded.
exclude: true
---

# Article

Content
```

이 옵션의 값에 따라 `exclude` 대신 `draft`, `hide` 등과 같은 다른 이름을 사용할 수 있습니다.

## `excludeByFolderDepth`

- Type: `number|null`
- Default: `null`

폴더 스캔 시 지정한 숫자의 깊이에 도달하면 더 이상 하위 폴더와 파일을 스캔하지 않고 메뉴에 표시하지 않습니다. 가장 최상위 단계는 `1`입니다.

예를 들어 아래와 같은 구조에서 옵션 값이 `3`인 경우 세번째 깊이의 메뉴부터 표시되지 않습니다.

```text
root/  <---------- depth: 1 / scan: yes
├─ aaa1/  <---------- depth: 1
│  ├─ bbb/  <---------- depth: 2
│  │  ├─ b1.md  <---------- depth: 3 / scan: no
│  │  ├─ ccc/  <---------- depth: 3
│  │  │  └─ c1.md  <---------- depth: 4 / scan: no
│  │  └─ b1.md  <---------- depth: 3 / scan: no
│  └─ a1.md  <---------- depth: 2 / scan: yes
└─ aaa2/  <---------- depth: 1
   └─ aaa1.md  <---------- depth: 2 / scan: yes
```

지정한 깊이에서 멈추는 것은 스캔이며, 폴더 항목 자체가 아닙니다. 하위 항목을 더 이상 스캔하지 않는 폴더는 표시할 내용이 남지 않아서 메뉴에서 제거되는 것이므로, 다음과 같이 잎 항목으로 남길 수 있습니다.

- `useFolderLinkFromIndexFile`이 `true`이면 `index.md` 파일이 있는 폴더는 해당 파일로 연결되는 잎 항목으로 남습니다. 위 구조에서는 `bbb/`가 메뉴에 남아 `bbb/index.md`로 연결되며, 그 하위 항목은 계속 표시되지 않습니다.
- `includeEmptyFolder`가 `true`이면 `index.md` 파일이 없어도 폴더 이름이 링크 없는 텍스트 항목으로 남습니다.

## `includeDotFiles`

- Type: `boolean`
- Default: `false`

일반적으로 파일 및 폴더 이름 앞에 점(`.`)이 있으면 숨겨진 것으로 간주되어 목록에 표시되지 않습니다. 하지만 이 옵션이 `true`이면 모든 숨겨진 파일과 폴더가 목록에 강제로 표시됩니다.

## `includeEmptyFolder`

- Type: `boolean`
- Default: `false`

값이 `true`인 경우, md 파일이 그룹으로 존재하지 않는 디렉터리도 표시합니다.

## `includeRootIndexFile`

- Type: `boolean`
- Default: `false`

값이 `true`인 경우 사이드바 메뉴에 최상위 경로 `index.md` 파일도 포함합니다. `includeFolderIndexFile` 옵션을 사용하여 하위 항목의 인덱스 파일도 포함합니다. (파일이 존재하지 않으면 무시됩니다.)

## `includeFolderIndexFile`

- Type: `boolean`
- Default: `false`

값이 `true`인 경우 사이드바 메뉴에 폴더 경로 `index.md` 파일도 포함합니다. 루트 항목의 인덱스 파일도 포함하려면 `includeRootIndexFile` 옵션을 사용합니다. (파일이 존재하지 않으면 무시됩니다.)

## `includeDynamicRoutes`

- Type: `boolean`
- Default: `false`

값이 `true`인 경우 [동적 라우트](https://vitepress.dev/guide/routing#dynamic-routes)를 템플릿 파일이 아니라 해당 템플릿이 생성하는 페이지들로 사이드바에 표시합니다.

다음과 같은 문서가 있다고 가정합니다.

```
docs/
├─ packages/
│  ├─ [pkg].md
│  └─ [pkg].paths.js
└─ index.md
```

```js
// packages/[pkg].paths.js
export default {
  paths() {
    return [{ params: { pkg: 'vitepress' } }, { params: { pkg: 'vitepress-sidebar' } }];
  }
};
```

사이드바에는 VitePress가 실제로 제공하는 페이지인 `/packages/vitepress`와 `/packages/vitepress-sidebar`가 표시됩니다. 이 옵션이 없으면 `[pkg]` 템플릿 하나만 표시되며, 그 링크는 존재하지 않는 페이지를 가리킵니다.

디렉터리 이름에도 매개변수를 사용할 수 있습니다. `[category]/[slug].md` 템플릿은 `category` 값마다 하나씩 폴더가 되고, 각 폴더에는 해당 분류의 페이지가 들어갑니다.

라우트는 VitePress와 동일한 방식으로 `paths` 파일을 실행하여 해석하므로 `.paths.ts` 파일과 비동기 `paths()` 함수를 모두 사용할 수 있습니다. 이 작업은 별도의 프로세스에서 약 0.2초 정도 소요되며, 템플릿이 하나 이상 있는 프로젝트에서만 실행됩니다. API 호출과 같이 `paths` 파일이 수행하는 작업은 사이드바를 생성할 때마다 한 번씩 더 실행된다는 점에 유의하세요.

::: tip 템플릿이 생성하는 페이지들은 하나의 파일을 공유하므로, `useTitleFromFrontmatter`나 `sortMenusByFrontmatterOrder`처럼 그 파일에서 읽는 값은 모든 페이지에서 동일합니다. 생성된 페이지마다 다른 값을 주려면 매개변수에 지정합니다.

- 제목: [`dynamicRouteTitleParam`](#dynamicroutetitleparam)이 지정한 이름
- `order`: [`sortMenusByFrontmatterOrder`](#sortmenusbyfrontmatterorder)에서 사용
- `date`: [`sortMenusByFrontmatterDate`](#sortmenusbyfrontmatterdate)에서 사용

템플릿에 <span v-pre>`{{ $params.pkg }}`</span> 형태로 작성한 제목도 치환되므로, `useTitleFromFileHeading`과 `useTitleFromFrontmatter`로 각 페이지를 매개변수 값에 따라 명명할 수 있습니다. :::

생성된 페이지를 제외하려면 [`excludeByGlobPattern`](#excludebyglobpattern)으로 해당 템플릿을 제외합니다.

## `dynamicRouteTitleParam`

- Type: `string`
- Default: `'title'`

동적 라우트가 생성한 페이지의 사이드바 제목을 담는 매개변수의 이름입니다. [`includeDynamicRoutes`](#includedynamicroutes)와 함께 사용할 때만 적용됩니다.

```js
// packages/[pkg].paths.js
export default {
  paths() {
    return [{ params: { pkg: 'vitepress-sidebar', title: 'VitePress Sidebar' } }];
  }
};
```

위 페이지는 `VitePress Sidebar`로 표시됩니다. 매개변수 제목은 하나의 템플릿에서 생성된 페이지마다 다르게 지정할 수 있는 유일한 방법이므로 다른 모든 제목 지정 방식보다 우선합니다. `title`을 이미 라우트 매개변수로 사용하고 있다면 이 옵션을 변경하세요.

## `removePrefixAfterOrdering`

- Type: `boolean`
- Default: `false`

모든 작업이 완료된 후에 표시되는 메뉴 항목에서 각 메뉴 제목의 특정 접두사를 제거합니다. 이 옵션은 Frontmatter의 정렬을 사용하지 않고 파일 이름의 숫자를 기준으로 정렬하고 메뉴에 해당 숫자를 표시하지 않으려는 경우에 이상적입니다.

예를 들어 `prefixSeparator`가 기본값(`.`)인 경우 다음 메뉴의 이름이 다음과 같이 변경됩니다:

- 파일명: `1.hello` -> 메뉴명: `hello`
- 파일명: `1.1.hello` -> 메뉴명: `1.hello`
- 파일명: `1-1.hello` -> 메뉴명: `hello`

구분 기호에 따라 문자를 한 번만 제거하므로 `1.1.`과 같은 하위 항목은 `1-1.`처럼 사용해야 합니다. 또는 `prefixSeparator` 값에 정규식을 설정하여 이 문제를 해결할 수 있습니다.

`prefixSeparator` 옵션과 함께 사용할 수 있습니다. 자세한 내용은 해당 옵션의 설명을 참조하세요.

(참고: 접두사는 제목에만 영향을 미치며, 링크는 파일 링크를 그대로 사용합니다).

(참고 B: 이 옵션은 `useTitleFromFileHeading` 또는 `useTitleFromFrontmatter` 옵션을 사용하는 경우 무시됩니다).

## `prefixSeparator`

- Type: `string|RegExp`
- Default: `'.'`

이 옵션은 접두사를 제거하기 위해 `removePrefixAfterOrdering` 옵션과 함께 사용할 때만 사용할 수 있습니다.

추출된 메뉴 텍스트에서 지정된 문자 수(하나 이상)의 첫 부분을 제거합니다. 예를 들어 메뉴 이름이 `1. Text`이고 `prefixSeparator` 값을 `. `로 설정하면 결과는 `Text`가 됩니다.

정규식을 사용할 수도 있습니다. 정규식과 일치하는 값은 제거됩니다. 예를 들어 `2024-01-01-hello`에서 문자열 앞의 날짜를 제거하려면 `prefixSeparator` 값을 `/[0-9]{4}-[0-9]{2}-[0-9]{2}-/g`로 지정합니다. 결과는 `hello`입니다.

## `rootGroupText`

- Type: `string`
- Default: `'Table of Contents'`

루트 그룹은 디렉토리 구조에 관계없이 메뉴의 전체 그룹을 지정합니다. 이 옵션은 하나의 메뉴 단계를 사용하므로 사용에 주의해야 하며, 필요하지 않은 경우 루트 그룹 옵션을 비활성화할 수 있습니다. 이 값을 지정하면 최상위 메뉴의 이름을 지정하는 것입니다.

## `rootGroupLink`

- Type: `string`
- Default: `null`

루트 그룹에 대한 자세한 내용은 `rootGroupText` 옵션 설명을 참조하세요. 이 값을 지정하면 루트 그룹에 대한 링크가 지정됩니다. 값이 비어 있으면 링크가 추가되지 않습니다.

## `rootGroupCollapsed`

- Type: `boolean`
- Default: `null`

루트 그룹에 대한 자세한 내용은 `rootGroupText` 옵션 설명을 참조하세요. `rootGroupCollapsed` 옵션은 루트 그룹의 하위 항목을 펼칠지 여부를 설정합니다. 기본값인 `null` 또는 `정의되지 않음`으로 지정하면 확장/축소 버튼이 표시되지 않습니다. 값이 `true`이면 하위 항목이 접힌 상태로 표시되고, `false`이면 확장됩니다.

이 옵션은 최상위 항목에만 적용됩니다. 일반적인 항목 축소 여부는 `collapsed` 옵션을 참조하세요.

## `useFolderLinkFromSameNameSubFile`

- Type: `boolean`
- Default: `false`

이 값이 `true`이면 폴더와 같은 이름의 하위 파일이 있는 경우 폴더에 해당 파일로 이동할 수 있는 링크가 생성되고 하위 항목에 해당 파일이 표시되지 않습니다.

예를 들어 다음과 같은 폴더가 있는 경우:

```
docs/
├─ guide/
│  ├─ api/
│  │  └─ api.md
│  ├─ one.md
│  └─ two.md
└─ config/
   └─ index.md
```

`api` 폴더에 링크가 추가되며, `api` 폴더의 `api` 페이지는 메뉴 목록에 포함되지 않습니다. 폴더의 링크를 클릭하면 `api/api.md`에 파일이 표시됩니다.

## `folderLinkNotIncludesFileName`

- Type: `boolean`
- Default: `false`

이 옵션은 특별한 경우에만 사용됩니다. [rewrite](https://vitepress.dev/guide/routing#route-rewrites) 규칙이 있고 폴더 이름이 같은 하위 파일이 있는 경우 `useFolderLinkFromSameNameSubFile` 옵션과 병렬로 사용합니다.

**참고:** VitePress rewrites를 설정하지 않고 이 옵션을 활성화하면 폴더 링크를 클릭할 때 404 오류가 발생합니다. VitePress 설정에서 해당 rewrite 규칙을 반드시 설정하세요.

이 값이 `true`인 경우 폴더 링크를 설정할 때 하위 항목의 존재를 무시하고 링크를 폴더 경로로만 지정합니다.

예를 들어 다음과 같은 폴더가 있는 경우:

```text
docs/
├─ guide/
│  ├─ api/
│  │  └─ api.md
│  ├─ one.md
│  └─ two.md
└─ config/
   └─ index.md
```

`useFolderLinkFromSameNameSubFile` 옵션을 사용하면 `guide/api` 폴더 메뉴를 클릭하면 `guide/api/api`로 이동하지만 `folderLinkNotIncludesFileName` 옵션을 함께 사용하면 `guide/api/`로 링크가 연결됩니다.

이 기능이 작동하려면 VitePress rewrites를 설정하여 폴더 경로를 실제 파일에 매핑해야 합니다. `.vitepress/config.ts`에 다음을 추가하세요:

```typescript
export default defineConfig({
  rewrites: {
    'guide/api/api.md': 'guide/api/index.md'
  }
});
```

또는 여러 폴더에 대해 동적 rewrite 함수를 사용할 수 있습니다:

```typescript
export default defineConfig({
  rewrites(id) {
    // 'folder/folder.md'를 'folder/index.md'로 다시 작성합니다
    return id.replace(/([^/]+)\/\1\.md$/, '$1/index.md');
  }
});
```

## `keepMarkdownSyntaxFromTitle`

- Type: `boolean`
- Default: `false`

이 값이 `true`이면 제목 텍스트에 포함된 마크다운 구문을 제거하지 않고 그대로 유지합니다. 일반적으로 강조 표시 또는 인라인 코드를 유지합니다. 하이퍼링크 텍스트는 이 옵션과 관계없이 제거됩니다.

## `debugPrint`

- Type: `boolean`
- Default: `false`

이 값이 `true`이면 실행 후 생성된 객체를 콘솔 로그에 출력합니다. 여러 사이드바를 구성한 경우 옵션 중 하나만 포함하더라도 모든 사이드바 결과를 출력합니다.
