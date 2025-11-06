# sunaba

@shotanue のサンドボックス/実験用モノレポです。UI コンポーネントや Storybook を使った検証を行います。

## 構成

```
.
├─ apps/
│  └─ storybook/      # Storybook アプリ (Vite)
└─ packages/
   └─ components/     # 共有 UI コンポーネント（ビルド/配布物あり）
```

## 主要技術

- **パッケージ管理**: pnpm + Turborepo (ワークスペース管理)
- **ビルド**: tsup, PostCSS
- **ドキュメント/検証**: Storybook (Vite)
- **言語/型**: TypeScript
- **Linter**: Biome

## セットアップ

```bash
pnpm i
```

## よく使うスクリプト

- **Storybook 起動**: apps/storybook

  ```bash
  pnpm --filter @sunaba/storybook dev
  ```

- **components をビルド**: packages/components

  ```bash
  pnpm --filter @sunaba/components build
  ```

- **全体ビルド（依存順）**

  ```bash
  pnpm build
  ```

## パッケージ概要

- `packages/components`
  - `src/GridCanvas.tsx` などの UI コンポーネントを提供
  - 出力は `packages/components/dist` に生成（`index.js`, `index.css` 等）

- `apps/storybook`
  - コンポーネントの動作確認/ドキュメント化
  - 例: `src/GridCanvas.stories.tsx`

## 開発フロー（例）

1. コンポーネントを `packages/components` に追加/更新
2. ローカルビルド: `pnpm --filter @sunaba/components build`
3. Storybook で確認: `pnpm --filter @sunaba/storybook dev`

## ライセンス

MIT
