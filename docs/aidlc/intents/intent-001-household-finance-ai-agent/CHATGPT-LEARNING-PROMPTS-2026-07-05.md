# ChatGPT 学習用プロンプト集 — AI-DLC Construction（7/5実践）

**基準ログ**: `WORK-LOG-2026-07-05.md`  
**前提ログ**: `WORK-LOG-2026-06-07.md`（Product Discovery〜Inception Exit まで完了済み）  
**対象プロジェクト**: 家計 AI エージェント MVP（`intent-001-household-finance-ai-agent`）  
**目的**: 7/5に実践した **Construction フェーズ** を ChatGPT の解説で深く理解し、今日の作業への納得感を得る

---

## 使い方

1. 下の **推奨順** に従い、優先度の高いプロンプトから投げる
2. 各プロンプトの **「ChatGPT に投げる文面」** をコピー＆ペーストする
3. 初回のみ **補足コンテキスト** を先に渡すと、家計 AI プロジェクトの文脈で答えてもらいやすい
4. 返答を読んだら、自分の言葉で1〜2文要約してから次へ進む

### 優先度の意味

| 優先度 | 意味 |
|---|---|
| **最高** | 最初に理解すべき。Construction 全体の「なぜこの順序か」がつかめる |
| **高** | 7/5の実践の核心。ここを押さえると各ステージの成果物の意味が腹落ちする |
| **中** | 深掘り・実装直前の理解。上記を押さえたあとに投げると効果的 |

### 補足コンテキスト（任意・最初に1回渡すとよい）

```text
私は小規模 Greenfield MVP「家計 AI エージェント」で AI-DLC を実践しています。
6/7に Product Discovery と Inception Exit まで完了し、7/5に Construction を開始しました。

【7/5までに確定した前提】
- 単一ユニット U-1（家計 AI Web アプリ）
- 技術: Next.js 16.2.10、OpenAI（gpt-5.4-mini）、localStorage
- Zaim 取り込み最優先、Moneytree（L-6）は後回し
- AI 送信は Bプラン（質問文 + 関連取引要約のみ）
- 実装コードはリポジトリの web/ 配下
- L-1（Next.js 初期化・App Shell・ホーム Empty）まで実装し build 成功。Layer 承認待ち

【7/5で通過した Construction ステージ】
Input Readiness → Construction Plan → Functional Design → NFR Assessment → NFR Design → Infrastructure Design → Code Generation Plan → L-1 実装

この前提で、以下の質問に答えてください。
```

---

## 推奨順（優先度順）

| 順 | # | テーマ | 優先度 |
|---|---|---|---|
| 1 | 1 | Construction 全体像と Inception との境界 | 最高 |
| 2 | 2 | Construction Input Readiness | 最高 |
| 3 | 3 | Construction Plan と Layer 分割 | 最高 |
| 4 | 4 | Functional Design（Construction 内） | 高 |
| 5 | 5 | NFR Assessment と技術スタック決定 | 高 |
| 6 | 6 | NFR Design パターン | 高 |
| 7 | 7 | Infrastructure Design と Operations 境界 | 高 |
| 8 | 8 | Code Generation Plan と Layer 承認 | 高 |
| 9 | 9 | L-1 実装と Build/Test チェックポイント | 中 |
| 10 | 10 | 承認ゲートと Decision の積み上げ（D-19〜D-30） | 中 |

---

## プロンプト一覧

### 1. AI-DLC Construction では具体的に何をするのか

- **優先度**: 最高
- **WORK-LOG 対応**: §1 Construction 開始、§11 Construction の本質
- **なぜこのプロンプトを投げるか**: Inception Exit 後に「いきなりコード」ではなく、Input Readiness から始まった理由を俯瞰するため。Construction の全体像がないと、細かい承認が儀式に見える。
- **理解が重要な理由**: **Construction 全体像**を押さえると、7/5の順序（Readiness → Plan → 各種 Design → Code Generation）が「実装リスクを段階的に下げる流れ」として納得できる。Inception で固めた論理設計が、Construction でどう実装可能な形に落ちるかが見える。

**ChatGPT に投げる文面**:

```text
AI-DLC の Construction フェーズでは、Inception Exit 承認後に具体的にどのような処理・判断を行うのか説明してください。

次のステージがなぜこの順序なのかも教えてください:
Construction Input Readiness → Construction Plan → Functional Design → NFR Assessment → NFR Design → Infrastructure Design → Code Generation（Layer 単位）

「Inception でやったこと」と「Construction で初めてやること」の境界も明確にしてください。
家計 AI エージェント（単一ユニット U-1、Next.js、OpenAI、localStorage）を例に、Construction で何が決まり、何がまだコードにしないのかも示してください。
```

---

### 2. Construction Input Readiness では何を確認するのか

- **優先度**: 最高
- **WORK-LOG 対応**: §1 Construction 開始、§2 Construction 前提の確定
- **なぜこのプロンプトを投げるか**: 7/5の最初の実務が Input Readiness だった。Inception 成果物が「本当に実装に足りるか」を検証するゲートの意味を理解するため。
- **理解が重要な理由**: **Input Readiness**を理解すると、「Q-2（技術スタック）をここで埋める」「ギャップがあっても Inception に戻すか Construction で決めるか」を判断できるようになる。実装開始の Go/No-Go の考え方が身につく。

**ChatGPT に投げる文面**:

```text
AI-DLC Construction の Construction Input Readiness では、具体的にどの入力を確認し、何をもって Ready と判断するのか説明してください。

確認項目（Components、Unit-to-Story 対応、完了条件など）と、
ギャップが残る場合に Inception へ差し戻す条件・Construction で先に決めてよい条件の違いを教えてください。

例: 技術スタック（Next.js）や LLM（OpenAI）は Input Readiness 前後のどのタイミングで Decision にするのが妥当か、理由も述べてください。
```

---

### 3. Construction Plan と Layer 分割（L-1〜L-5、L-6 後回し）

- **優先度**: 最高
- **WORK-LOG 対応**: §3 Construction Plan、P-4「L-6は後回し」
- **なぜこのプロンプトを投げるか**: 7/5で **L-6（Moneytree）を第1弾から外す** 判断をした。Plan がスコープと実装順を固定する役割を理解するため。
- **理解が重要な理由**: **Construction Plan と Layer 分割**を理解すると、「なぜ一度に全部作らないか」「なぜ 5〜8 ファイル単位か」「後回しにした機能をどう文書化するか（D-23）」が説明できる。MVP の段階的リリース思考と AI-DLC の接続が分かる。

**ChatGPT に投げる文面**:

```text
AI-DLC Construction における Construction Plan と Code Generation の Layer 分割は、なぜ必要か、どう設計するのがよいか説明してください。

次も含めてください:
- 単一ユニット（U-1）でも Plan が必要な理由
- Layer を 5〜8 ファイル程度に抑える意図
- 第1弾から除外する機能（例: Moneytree 取り込み L-6）を Plan にどう記録するか
- shared baseline（known-constraints 等）の役割

家計 AI の例で、L-1（シェル）→ L-2（storage）→ L-3（Zaim）→ L-4（AI）→ L-5（設定）の順が妥当な理由も説明してください。
```

---

### 4. Construction 内の Functional Design では何を定義するのか

- **優先度**: 高
- **WORK-LOG 対応**: §4 U-1 Functional Design
- **なぜこのプロンプトを投げるか**: Inception の `application-design.md` は技術非依存の論理設計だった。Construction の Functional Design が **U-1 向けの業務ロジック・エンティティ・ルール** に落とす段階であることを区別するため。
- **理解が重要な理由**: **Functional Design**を理解すると、Inception の論理コンポーネントと Construction の Workflow / Business Rules の関係が分かる。「会話履歴はセッションのみ」「再取り込みは上書き」など、実装直前の業務判断がここに集約されることが腹落ちする。

**ChatGPT に投げる文面**:

```text
AI-DLC Construction の Functional Design（business-logic-model、domain-entities、business-rules）は、Inception の application-design とどう役割が違うのか説明してください。

Construction 段階で新たに定義すべき内容（Workflow、Edge case、Business Rule、共通方針との差分）を具体例つきで教えてください。

家計 AI の例:
- Zaim 取り込み Workflow
- localStorage の HouseholdDataset / Transaction
- AI 送信は質問 + 要約のみ（Bプラン）
- Moneytree は後回し

これらが Functional Design に書かれる理由も説明してください。
```

---

### 5. NFR Assessment と技術スタック決定（Next.js 16、OpenAI、依存パッケージ）

- **優先度**: 高
- **WORK-LOG 対応**: §5 NFR Assessment、P-6「Next.js 16 最新」、D-26〜D-27
- **なぜこのプロンプトを投げるか**: 7/5で **Next.js 15 想定から 16.2.10 へ更新**し、依存13件を承認した。NFR Assessment が「品質要件」と「技術選定」を同時に閉じる場であることを理解するため。
- **理解が重要な理由**: **NFR Assessment**を理解すると、`nfr-requirements.md` と `tech-stack-decisions.md` の役割分担、Security Lite Checklist の位置づけ、shared baseline 更新のタイミングが分かる。技術選定を「なんとなく latest」ではなく Decision として残す理由が説明できる。

**ChatGPT に投げる文面**:

```text
AI-DLC Construction の NFR Assessment では、nfr-requirements.md と tech-stack-decisions.md をそれぞれ何のために作るのか説明してください。

次も含めてください:
- Inception の NFR（NFR-1〜5）を Unit 向けにどう具体化するか
- 技術スタック（フレームワーク、LLM、ストレージ、テスト）をここで確定する理由
- 依存パッケージ追加を人間承認する意味
- Security Lite Checklist との関係

実例: Next.js 16.2.10、OpenAI gpt-5.4-mini、localStorage、Vitest を選んだとき、各文書に何を書くべきかも示してください。
```

---

### 6. NFR Design パターンと論理コンポーネント

- **優先度**: 高
- **WORK-LOG 対応**: §5 NFR Design（BFF、Structured Output、Trust Boundary）
- **なぜこのプロンプトを投げるか**: Assessment で「何を満たすか」を決め、Design で **どう満たすかのパターン**（BFF、30秒タイムアウト、Server-only Secret）を決めた。この二段構えを理解するため。
- **理解が重要な理由**: **NFR Design**を理解すると、Functional Design のコンポーネントと NFR 充足用の論理コンポーネント（`ChatApiRoute`、`LocalStorageAdapter` 等）の対応が分かる。後の L-4 実装で「なぜ API Route 経由か」が設計根拠付きで説明できる。

**ChatGPT に投げる文面**:

```text
AI-DLC Construction の NFR Design（nfr-design-patterns、logical-components）は、NFR Assessment のあとに何を追加で設計するのか説明してください。

次のパターンが家計 AI MVP でなぜ妥当か、Tradeoff も含めて説明してください:
- Mobile-first レイアウト（320px+）
- BFF パターン（クライアント → /api/chat → OpenAI）
- Structured Output（改善案 + 良かった点を JSON で検証）
- Server-only Secret（OPENAI_API_KEY）
- Fail Closed（API エラー時は応答を返さない）

NFR と design pattern の対応表の読み方も教えてください。
```

---

### 7. Infrastructure Design と Operations 境界

- **優先度**: 高
- **WORK-LOG 対応**: §5 Infrastructure Design、mock API、`.env.example` は Code Generation へ
- **なぜこのプロンプトを投げるか**: 7/5で環境変数・OpenAI 接続条件・ランタイム形状を設計したが、**デプロイや Terraform はしていない**。Infrastructure Design の「設計のみ」と Operations の境界を理解するため。
- **理解が重要な理由**: **Infrastructure Design**を理解すると、`.env.example` をいつ作るか、`OPENAI_API_KEY=mock` の開発方針、本番ホスティング想定を「参考のみ」と書く理由が分かる。Construction Harness で止まる位置が明確になる。

**ChatGPT に投げる文面**:

```text
AI-DLC Construction の Infrastructure Design では、何を設計し、何をあえて実施しないのか説明してください。

次を含めてください:
- 環境変数（名前、用途、Secret 区分、Mock 可否）の定義方法
- 外部 API（OpenAI）の Timeout・送信データ範囲
- deployment-architecture.md の「Intended Runtime Shape」の書き方
- なぜ Terraform Apply や本番デプロイは Construction の対象外か
- .env.example を Infrastructure Design では作らず Code Generation に回す理由

家計 AI（ブラウザ localStorage + Next.js API Route + OpenAI）の構成図を言葉で説明する練習もしてください。
```

---

### 8. Code Generation Plan と Layer ごとの承認

- **優先度**: 高
- **WORK-LOG 対応**: §6 Code Generation Plan、§12 P-10
- **なぜこのプロンプトを投げるか**: Plan 承認後に初めてコードを書くルールと、**Layer ごとに diff-summary / build-and-test / review** がある運用を理解するため。
- **理解が重要な理由**: **Code Generation Plan**を理解すると、`web/` をアプリルートにした理由、各 Layer の Planned Files、CODE_SUMMARY と traceability の更新タイミングが一貫して見える。「Plan 承認なしに L-2 へ進まない」Harness ルールの意図が説明できる。

**ChatGPT に投げる文面**:

```text
AI-DLC Construction の Code Generation では、code-generation-plan.md の承認後に何が変わるのか説明してください。

次も含めてください:
- Layer ごとの成果物（diff-summary、build-and-test-report、review）
- 実装コードの配置先（Harness 文書 docs/ とアプリ web/ の分離）
- CODE_SUMMARY.md と traceability.md の更新タイミング
- Layer 承認前に次 Layer に進んではいけない理由

7/5の例: L-1 で Next.js 初期化と App Shell だけを実装し、/import /chat /settings は未実装のまま build 成功、という進め方が妥当か評価してください。
```

---

### 9. L-1 実装と Build/Test チェックポイント

- **優先度**: 中
- **WORK-LOG 対応**: §7 Code Generation L-1
- **なぜこのプロンプトを投げるか**: 7/5で初めて **実コード（web/）** ができた。設計フェーズの延長として Layer 実装・build 検証・人間チェックポイントがどうつながるかを具体で理解するため。
- **理解が重要な理由**: **L-1 と Build/Test**を理解すると、「小さく動くものを先に出す」Layer 戦略の効果、ナビ先 404 を許容するスコープの切り方、build Pass をもって Layer 完了候補とする基準が分かる。実装フェーズのレビュー観点が身につく。

**ChatGPT に投げる文面**:

```text
AI-DLC Construction で最初の Code Generation Layer（L-1）を実装したあと、Build/Test と人間チェックポイントで何を確認すべきか説明してください。

家計 AI の L-1 の例:
- Next.js 16 + Tailwind 4 で web/ を初期化
- AppShell（ヘッダー + フッターナビ 4 タブ）
- ホームは Empty 状態のみ
- npm run build は成功
- /import /chat /settings は未実装で 404

この状態を「Layer として完了候補」とみなしてよい理由と、承認前に人間が確認すべき観点（UI、スコープ、リスク）を教えてください。
aidlc-build-and-test-lite の位置づけも説明してください。
```

---

### 10. 承認ゲートと Decision の積み上げ（D-19〜D-30）

- **優先度**: 中
- **WORK-LOG 対応**: §2〜§6 の Decision、§12 承認プロンプトパターン
- **なぜこのプロンプトを投げるか**: 7/5は **「〇〇を承認」** という短いプロンプトを繰り返し、D-19〜D-30 が積み上がった。承認と Decision 記録の関係を振り返るため。
- **理解が重要な理由**: **承認ゲートと Decision**を理解すると、Agent が勝手に次へ進まない Harness の意図、各承認が `reviews/` と `decisions.md` にどう残るか、後から「なぜ Moneytree を後回しにしたか」を説明できるようになる。チーム開発への拡張時にも応用できる。

**ChatGPT に投げる文面**:

```text
AI-DLC Construction で人間が「Construction Plan を承認」「NFR Assessment を承認」のように短く承認する運用は、なぜ機能するのか説明してください。

次も含めてください:
- 各ステージの reviews/*.md と decisions.md（例: D-19〜D-30）の役割の違い
- 承認なしに次ステージへ進まないルールのメリット・デメリット
- Open Questions（Q-1 スキップ、Q-2 Next.js）を Construction 中にどう扱うか
- 7/5のように1日で複数ステージを進めたとき、学習者が混乱しないためのコツ

最後に、従来の「いきなり実装」型開発と比べ、Construction の承認ゲートが家計 AI MVP にどんな効果を与えたか、具体例で述べてください。
```

---

## 学習の進め方（7/5向けミニロードマップ）

```text
Day A（30〜45分）: プロンプト 1 → 2 → 3
  → Construction の全体像・開始条件・Plan/Layer を押さえる

Day B（30〜45分）: プロンプト 4 → 5 → 6
  → 設計3層（Functional / NFR Assessment / NFR Design）の役割分担

Day C（30分）: プロンプト 7 → 8
  → インフラ設計の境界とコード生成の入り口

Day D（20〜30分）: プロンプト 9 → 10
  → L-1 の実装チェックポイントと承認運用の振り返り
```

---

## 6/7版プロンプト集との関係

| ファイル | 対象フェーズ | 使うタイミング |
|---|---|---|
| `CHATGPT-LEARNING-PROMPTS.md` | Product Discovery + Inception | 計画・要件・画面の理解を深めたいとき |
| `CHATGPT-LEARNING-PROMPTS-2026-07-05.md`（本ファイル） | Construction（7/5実践） | 実装前設計〜L-1 の理解を深めたいとき |

Inception をまだ不安な場合は、先に 6/7版のプロンプト 1〜12 を完了してから、本ファイルのプロンプト 1 へ進むと理解がつながりやすい。

---

## 自己チェック（プロンプト消化後）

すべて投げ終わったら、自分で次を説明できるか確認する。

1. Construction はなぜ Input Readiness から始まるか
2. Functional / NFR Assessment / NFR Design / Infrastructure の違い
3. なぜ L-6（Moneytree）を後回しにできたか（D-23）
4. なぜ OpenAI API キーは Route Handler のみか
5. L-1 で何ができて、何がまだできないか
6. 「〇〇を承認」が次の成果物作成のトリガーになる理由

6問中4問以上を自分の言葉で説明できれば、7/5の Construction 実践は十分に定着している。
