---
order: 2
---

# API

이 페이지에서는 VitePress Sidebar의 모든 옵션에 대해 설명합니다.

## @ 빠른 검색

| 경로 해석                             | 그룹핑                                    |
| ------------------------------------- | ----------------------------------------- |
| [documentRootPath](#documentrootpath) | [collapsed](#collapsed)                   |
| [scanStartPath](#scanstartpath)       | [collapseDepth](#collapsedepth)           |
| [resolvePath](#resolvepath)           | [rootGroupText](#rootgrouptext)           |
| [basePath](#basepath)                 | [rootGroupLink](#rootgrouplink)           |
|                                       | [rootGroupCollapsed](#rootgroupcollapsed) |

| 메뉴 제목 | 메뉴 링크 |
| --- | --- |
| [useTitleFromFileHeading](#usetitlefromfileheading) | [convertSameNameSubFileToGroupIndexPage](#convertsamenamesubfiletogroupindexpage) |
| [useTitleFromFrontmatter](#usetitlefromfrontmatter) | [folderLinkNotIncludesFileName](#folderlinknotincludesfilename) |
| [useFolderTitleFromIndexFile](#usefoldertitlefromindexfile) | [useFolderLinkFromIndexFile](#usefolderlinkfromindexfile) |
| [frontmatterTitleFieldName](#frontmattertitlefieldname) |  |

| 포함 및 제외 | 메뉴 제목 스타일링 |
| --- | --- |
| [excludePattern](#excludepattern) | [hyphenToSpace](#hyphentospace) |
| [excludeFiles](#excludefiles) | [underscoreToSpace](#underscoretospace) |
| [excludeFilesByFrontmatterFieldName](#excludefilesbyfrontmatterfieldname) | [capitalizeFirst](#capitalizefirst) |
| [excludeFolders](#excludefolders) | [capitalizeEachWords](#capitalizeeachwords) |
| [includeDotFiles](#includedotfiles) | [keepMarkdownSyntaxFromTitle](#keepmarkdownsyntaxfromtitle) |
| [includeEmptyFolder](#sortmenusbyfrontmatterdate) | [removePrefixAfterOrdering](#removeprefixafterordering) |
| [includeRootIndexFile](#sortmenusbyfrontmatterdate) | [prefixSeparator](#prefixseparator) |
| [includeFolderIndexFile](#sortmenusbyfrontmatterdate) |  |

| 정렬 | 기타 |
| --- | --- |
| [manualSortFileNameByPriority](#manualsortfilenamebypriority) | [debugPrint](#debugprint) |
| [sortMenusByName](#sortmenusbyname) |  |
| [sortMenusByFileDatePrefix](#sortmenusbyfiledateprefix) |  |
| [sortMenusByFrontmatterOrder](#sortmenusbyfrontmatterorder) |  |
| [frontmatterOrderDefaultValue](#frontmatterorderdefaultvalue) |  |
| [sortMenusByFrontmatterDate](#sortmenusbyfrontmatterdate) |  |
| [sortMenusOrderByDescending](#sortmenusorderbydescending) |  |
| [sortMenusOrderNumericallyFromTitle](#sortmenusordernumericallyfromtitle) |  |
| [sortMenusOrderNumericallyFromLink](#sortmenusordernumericallyfromlink) |  |

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

## `useTitleFromFileHeading`

- Type: `boolean`
- Default: `false`

값이 `true`이면 `.md` 파일의 `h1` 제목 내용이 포함된 제목을 표시합니다. 파일에 `h1` 제목이 존재하지 않으면 `Unknown`으로 표시됩니다.

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

앞부분의 `order` 속성을 기준으로 메뉴 항목을 정렬합니다. 각 폴더에 대해 `order` 속성의 값(숫자)을 오름차순으로 정렬하거나, `sortMenusOrderByDescending` 옵션이 `true`인 경우 내림차순으로 정렬합니다. `order` 값이 숫자가 아니거나 존재하지 않는 경우 `order`는 `0`으로 판단됩니다.

## `sortMenusByFrontmatterDate`

- Type: `boolean`
- Default: `false`

앞부분의 `date` 속성을 기준으로 메뉴 항목을 정렬합니다. 또한 `date` 속성 값을 가장 오래된 날짜 순으로 오름차순으로 정렬합니다(`sortMenusOrderByDescending` 옵션이 `true`인 경우 내림차순). 날짜 형식은 `YYYY-MM-DD` 또는 JavaScript 날짜 데이터 유형과 일치해야 합니다.

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

내림차순 정렬을 원할 경우 `sortMenusOrderByDescending` 옵션과 함께 사용해야 합니다.

## `frontmatterOrderDefaultValue`

- Type: `number`
- Default: `0`

설정되지 않은 경우 앞부분의 `order` 속성에 대한 기본값을 설정합니다. 이 옵션은 `sortMenusByFrontmatterOrder`가 `true`인 경우에만 활성화됩니다.

## `collapsed`

- Type: `boolean`
- Default: `false`

`collapsed` 옵션을 지정하지 않으면(`null` 또는 `정의되지 않음`) 그룹 접기/확장이 사용되지 않고 모든 메뉴가 한꺼번에 표시됩니다. `false`이면 모든 그룹이 확장된 상태로 메뉴가 생성됩니다. `true`이면 모든 그룹이 접힌 상태로 메뉴가 생성됩니다.

(값이 `true`이더라도 메뉴가 접힌 그룹 내의 문서에 있는 경우 메뉴가 확장될 수 있습니다.)

![Collapsed Example](/doc-collapsed-example.png)

## `collapseDepth`

- Type: `number`
- Default: `1`

지정된 깊이에서 메뉴 그룹이 축소됩니다. 이 옵션을 지정하면 그룹 축소/확장이 자동으로 활성화됩니다. 최상위 폴더의 깊이는 `1`입니다.

## `hyphenToSpace`

- Type: `boolean`
- Default: `false`

값이 `true`이면 파일 이름에 포함된 `-` 기호가 공백으로 변환되어 제목으로 표시됩니다. 이 옵션은 메뉴 이름을 마크다운 머리글 또는 앞부분을 통해 가져올 때도 영향을 받습니다.

## `underscoreToSpace`

- Type: `boolean`
- Default: `false`

값이 `true`이면 파일 이름에 포함된 `_` 기호가 공백으로 변환되어 제목으로 표시됩니다. 이 옵션은 메뉴 이름을 마크다운 머리글 또는 앞부분을 통해 가져올 때도 영향을 받습니다.

## `capitalizeFirst`

- Type: `boolean`
- Default: `false`

값이 `true`이면 메뉴 이름의 첫 글자가 강제로 대문자로 바뀝니다. 이 옵션은 메뉴 이름을 마크다운 머리글 또는 앞부분을 통해 가져올 때도 영향을 받습니다.

## `capitalizeEachWords`

- Type: `boolean`
- Default: `false`

값이 `true`이면 공백으로 구분된 단어의 첫 글자를 모두 대문자로 표시합니다. 이 옵션은 메뉴 이름을 마크다운 머리글 또는 앞부분을 통해 가져올 때도 영향을 받습니다.

## `excludePattern`

- Type: `Array<string>`
- Default: `[]`

[glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) 파일 패턴 문자열로 구성된 배열에 따라 파일이나 폴더를 제외합니다.

예를 들어 값은 다음과 같을 수 있습니다: `['abc/', 'def.md', 'ghi/file-**']` 이는 각각 모든 경로에 포함된 `abc` 디렉토리와 하위 항목, `def.md` 파일, `ghi` 경로에 있는 `file-`로 시작하는 파일이 해당되며 이 파일과 폴더들은 메뉴에서 제외됩니다.

## `excludeFiles` (deprecated)

- Type: `Array<string>`
- Default: `[]`

### 이 옵션은 폐기되었으며 다음 메이저 버전에서 제거됩니다. `excludePattern` 옵션을 대신 사용하세요.

파일 이름 배열(확장자 포함)에 해당하는 파일은 목록에 표시되지 않습니다.

## `excludeFilesByFrontmatterFieldName`

- Type: `string|null`
- Default: `null`

지정된 앞부분 필드 이름의 값이 `true`로 설정된 문서는 메뉴에서 제외됩니다.

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

## `excludeFolders` (deprecated)

### 이 옵션은 폐기되었으며 다음 메이저 버전에서 제거됩니다. `excludePattern` 옵션을 대신 사용하세요.

- Type: `Array<string>`
- Default: `[]`

폴더 이름의 배열에 해당하는 폴더는 목록에 표시되지 않으며, 폴더 내의 하위 항목도 표시되지 않습니다.

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

## `removePrefixAfterOrdering`

- Type: `boolean`
- Default: `false`

모든 작업이 완료된 후에 표시되는 메뉴 항목에서 각 메뉴 제목의 특정 접두사를 제거합니다. 이 옵션은 앞부분의 정렬을 사용하지 않고 파일 이름의 숫자를 기준으로 정렬하고 메뉴에 해당 숫자를 표시하지 않으려는 경우에 이상적입니다.

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

추출된 메뉴 텍스트에서 지정된 문자 수(하나 이상)의 첫 부분을 제거합니다. 예를 들어 메뉴 이름이 `1. Text`이고 `prefixSeparator` 값을 `. '로 설정하면 결과는 `Text`가 됩니다.

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

## `convertSameNameSubFileToGroupIndexPage`

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

이 옵션은 특별한 경우에만 사용됩니다. 다시 쓰기 규칙이 있고 폴더 이름이 같은 하위 파일이 있는 경우 `convertSameNameSubFileToGroupIndexPage` 옵션과 병렬로 사용합니다.

이 값이 `true`인 경우 폴더 링크를 설정할 때 하위 항목의 존재를 무시하고 링크를 폴더 경로로만 지정합니다.

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

`convertSameNameSubFileToGroupIndexPage` 옵션을 사용하면 `guide/api` 폴더 메뉴를 클릭하면 `guide/api/`로 이동하지만 `folderLinkNotIncludesFileName` 옵션을 함께 사용하면 `guide/api/`로 링크가 연결됩니다.

## `keepMarkdownSyntaxFromTitle`

- Type: `boolean`
- Default: `false`

이 값이 `true`이면 제목 텍스트에 포함된 마크다운 구문을 제거하지 않고 그대로 유지합니다. 일반적으로 강조 표시 또는 인라인 코드를 유지합니다. 하이퍼링크 텍스트는 이 옵션과 관계없이 제거됩니다.

## `debugPrint`

- Type: `boolean`
- Default: `false`

이 값이 `true`이면 실행 후 생성된 객체를 콘솔 로그에 출력합니다. 여러 사이드바를 구성한 경우 옵션 중 하나만 포함하더라도 모든 사이드바 결과를 출력합니다.
