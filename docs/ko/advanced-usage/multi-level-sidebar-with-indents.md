# 다중 레벨 사이드바의 들여쓰기

다중 사이드바에서는 메뉴가 각 계층마다 들여쓰기로 표시됩니다. 그러나 VitePress는 기본적으로 두 번째 계층부터 들여쓰기를 시작합니다. 예를 들어:

![Multi level docs before](/doc-multi-level-docs-before.png)

위의 `directory-level-2`는 `directory-level-1`의 하위 파일이지만 같은 계층 구조에 있는 것으로 보입니다.

이 문제는 VitePress 사이드바의 문제가 아니므로 이 문제를 해결하려면 **[VitePress의 사용자 정의 CSS](https://vitepress.dev/ko/guide/extending-default-theme#customizing-css)** 기능을 사용하여 기존 테마의 스타일을 사용자 정의해야 합니다.

`.vitepress` 디렉토리에 `theme` 디렉토리를 만들어 기존 스타일에 필요한 스타일을 재정의합니다. 그런 다음 `theme` 디렉토리 안에 `index.js` 파일(타입스크립트를 사용하는 경우 `index.js` 대신 `index.ts`를 사용)과 `custom.css` 파일을 만듭니다.

```text
/
├─ package.json
├─ src/
├─ docs/
│  ├─ .vitepress/
│  │  └─ theme/            <------------ 이 줄 추가
│  │     ├─ custom.css     <------------ 이 줄 추가
│  │     └─ index.js       <------------ 이 줄 추가
│  ├─ example.md
│  └─ index.md
└─ ...
```

그런 다음 `index.js` 파일에 다음을 추가합니다:

```javascript
import DefaultTheme from 'vitepress/theme';
import './custom.css';

export default DefaultTheme;
```

다음으로 `custom.css` 파일에 다음을 추가합니다:

```css
.group:has([role='button']) .VPSidebarItem.level-0 .items {
  padding-left: 16px !important;
  border-left: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  transition: background-color 0.25s;
}
```

이제 VitePress 서버를 시작합니다. 이렇게 하면 하위 콘텐츠가 존재하는 그룹의 첫 번째 레벨의 계층 구조를 더 쉽게 확인할 수 있습니다.

![Multi level docs before](/doc-multi-level-docs-after.png)

여기에서 보이는 세로선은 CSS로만 생성된 것으로, `indicator`라는 CSS 클래스가 있는 `div`로 생성되어야 하므로 향후 동적 페이지를 작성할 때 세로선이 선택되지 않을 수 있다는 점에 유의해야 합니다.
