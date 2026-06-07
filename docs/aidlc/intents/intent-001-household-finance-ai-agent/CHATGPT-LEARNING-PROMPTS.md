# ChatGPT 学習用プロンプト集 — AI-DLC アプリケーション開発

**基準ログ**: `WORK-LOG-2026-06-07.md`  
**対象プロジェクト**: 家計 AI エージェント MVP（`intent-001-household-finance-ai-agent`）  
**目的**: 本日実践した AI-DLC の流れを、ChatGPT の解説で深く理解し、納得感を得る

---

## 使い方

1. 下の **推奨順** に従い、優先度の高いプロンプトから投げる
2. 各プロンプトの **「ChatGPT に投げる文面」** をコピー＆ペーストする
3. 必要なら **補足コンテキスト**（本日の成果物の要約）を先に渡す
4. 返答を読んだら、自分の言葉で1〜2文要約し、次のプロンプトへ進む

### 優先度の意味

| 優先度 | 意味 |
|---|---|
| **最高** | 最初に理解すべき。全体像と AI-DLC の「なぜ」がつかめる |
| **高** | 本日の実践の核心。ここを押さえると各ステージの意味が腹落ちする |
| **中** | 深掘り・実務応用。上記を理解したあとに投げると効果的 |

### 補足コンテキスト（任意・最初に1回渡すとよい）

```text
私は小規模 Greenfield MVP「家計 AI エージェント」で AI-DLC を実践しました。
Product Discovery から Inception Exit まで完了し、Construction 手前で停止しています。
対象は4人家族の父、Zaim エクスポート最優先、データは端末内保存、AI は質問+関連取引要約を外部 API に一時送信（Bプラン）。
成果物は要件(FR/NFR)、ストーリー(S-1〜8)、ワイヤーフレーム(SCR-1〜4)、論理設計、単一ユニット(U-1)です。
この前提で、以下の質問に答えてください。
```

---

## 推奨順（優先度順）

| 順 | # | テーマ | 優先度 |
|---|---|---|---|
| 1 | 1 | AI-DLC 全体像 | 最高 |
| 2 | 2 | Product Discovery の役割 | 最高 |
| 3 | 5 | 人間の承認ゲート | 最高 |
| 4 | 3 | Facts / Hypotheses / Decisions / Open Questions | 高 |
| 5 | 4 | トレーサビリティ | 高 |
| 6 | 6 | AI-DLC Inception 全体 | 高 |
| 7 | 7 | intent-bootstrap と workflow-composition | 高 |
| 8 | 8 | requirements と user-stories | 高 |
| 9 | 9 | wireframes の位置づけ | 高 |
| 10 | 10 | application-design（技術非依存） | 高 |
| 11 | 11 | units-generation と Construction-ready | 高 |
| 12 | 12 | Inception Exit と Construction の境界 | 高 |
| 13 | 13 | 3層構成（Skill / Rule / docs） | 中 |
| 14 | 14 | 成功指標の定量化（SM-1〜3） | 中 |
| 15 | 15 | D-16 Zaim 優先の意味 | 中 |
| 16 | 16 | D-17 Bプランとプライバシー | 中 |
| 17 | 17 | 家計 AI への当てはめ（具体例） | 中 |
| 18 | 18 | 従来開発との比較 | 中 |

---

## プロンプト一覧

### 1. AI-DLC 全体像とは何か

- **優先度**: 最高
- **なぜこのプロンプトを投げるか**: 個別ステージの詳細に入る前に、「何のための手法か」を俯瞰しないと、承認ゲートや成果物が「儀式」に見えてしまうから。
- **理解が重要な理由**: 全体像が分かると、本日やった Product Discovery → Inception → 停止 の順序が「正しい流れ」として納得できる。

**ChatGPT に投げる文面**:

```text
ソフトウェア開発における AI-DLC（AI-Driven Development Life Cycle）とは何か、Product Discovery・Inception・Construction の3段階を含めて、初心者向けに説明してください。
「コードを書く前に何を固めるか」「AI Agent が関わる場面」を特に強調してください。
最後に、小規模 Greenfield MVP に AI-DLC が向く理由を3点でまとめてください。
```

---

### 2. Product Discovery では具体的に何をするのか

- **優先度**: 最高
- **なぜこのプロンプトを投げるか**: 本日の出発点が Product Discovery だった。ここで作った `product-hypothesis.md` が Inception 全体の入力になることを理解するため。
- **理解が重要な理由**: Discovery を飛ばすと、要件や画面が「いきなり作りたい機能」から始まり、検証すべき仮説や成功指標が後付けになりやすい。

**ChatGPT に投げる文面**:

```text
AI-DLC の Product Discovery フェーズでは、具体的にどのような処理・判断を行うのか説明してください。
対象ユーザー、ペインポイント、リスキーな仮説、成功指標、対象外をなぜ先に定義するのか。
成果物として product-hypothesis.md と user-journey.md がなぜ必要かも教えてください。
家計簿 AI エージェント（父が Zaim エクスポートを取り込み AI に相談）を例にすると、Discovery で何が決まっていたべきかも示してください。
```

---

### 3. Facts / Hypotheses / Decisions / Open Questions の分離

- **優先度**: 高
- **なぜこのプロンプトを投げるか**: 本日の成果物全体で繰り返し登場する区分。混同すると「確定事実」と「まだ検証していない仮説」を同じ重みで扱ってしまう。
- **理解が重要な理由**: 分離を理解すると、Q-3・Q-4 を後から Decision に昇格させた流れ（D-16, D-17）が合理的に感じられる。

**ChatGPT に投げる文面**:

```text
AI-DLC における Facts、Hypotheses、Decisions、Open Questions の4区分を、それぞれ定義・例・混同しやすいパターンとともに説明してください。
「主利用者は父」は Fact か Decision か、「カテゴリ誤りを補正できる」は Hypothesis か Requirement か、の見分け方も教えてください。
Open Question が残ったまま Inception Exit してよい条件も述べてください。
```

---

### 4. トレーサビリティ（H → SM → FR → S → SCR → U）

- **優先度**: 高
- **なぜこのプロンプトを投げるか**: 本日 `traceability.md` で一本線をつないだ。AI-DLC の「つながり」を説明する最重要概念のひとつ。
- **理解が重要な理由**: 「なぜ SCR-3（AI チャット）に S-4（カテゴリ別支出）があるのか」を上流の H-1・SM-2 まで説明できるようになる。

**ChatGPT に投げる文面**:

```text
AI-DLC のトレーサビリティマトリクスについて、Hypothesis → Success Metric → Requirement → User Story → Screen → Unit of Work の流れを説明してください。
各レイヤーが次のレイヤーに「何を渡すか」を表形式で示してください。
例として、仮説 H-1「カテゴリ誤りを補正して食費を把握できる」が SM-2、FR-6、S-4、SCR-3、U-1 にどうつながるか、具体例で辿ってください。
トレーサビリティが切れているとプロジェクトにどんな問題が起きるかも教えてください。
```

---

### 5. 人間の承認ゲートの意味

- **優先度**: 最高
- **なぜこのプロンプトを投げるか**: 本日は「intent-bootstrap を承認」「workflow を承認」…と8回以上、短い承認で進めた。この設計意図を理解したい。
- **理解が重要な理由**: 承認ゲートは「Agent を遅くするため」ではなく、スコープと品質の境界を人間が握るため。ここが分かると AI-DLC Harness の設計思想が理解できる。

**ChatGPT に投げる文面**:

```text
AI-DLC で各ステージに「人間の承認ゲート」を置く理由を説明してください。
Agent が自動で次のステージに進む方式と比較したメリット・デメリットも述べてください。
reviews/*-review.md と state.md の役割、承認なしで進んだ場合に起きうる問題（スコープクリープ、仮説未検証の要件化など）を具体例で説明してください。
```

---

### 6. AI-DLC Inception では具体的に何をするのか

- **優先度**: 高
- **なぜこのプロンプトを投げるか**: 本日の作業時間の大半が Inception。8ステージそれぞれの「処理内容」と成果物の対応を整理したい。
- **理解が重要な理由**: Inception の中で特に重要なのは「要件 → ストーリー → 画面 → 論理設計」の変換チェーン。ここが Inception のポイント全体を理解する鍵になる。

**ChatGPT に投げる文面**:

```text
AI-DLC Inception フェーズでは、具体的にどのような処理を順に行うのか、以下の8ステージについて説明してください。
1) intent-bootstrap 2) workflow-composition 3) requirements-analysis 4) user-stories
5) wireframes 6) application-design 7) units-generation 8) inception-exit
各ステージの入力・出力・「なぜこの順番か」を表にまとめ、Inception 全体のゴール（Construction-ready）も定義してください。
特に Inception の核心はどのステージの連携にあるか、1段落で強調してください。
```

---

### 7. intent-bootstrap と workflow-composition

- **優先度**: 高
- **なぜこのプロンプトを投げるか**: Inception の冒頭2ステップは地味だが、`workflow.md`・`traceability.md`・`open-questions.md` など後続の土台を作る。
- **理解が重要な理由**: 「なぜいきなり要件から始めないのか」が分かる。right-sizing（何の Skill を実行するか）も workflow-composition の要点。

**ChatGPT に投げる文面**:

```text
AI-DLC Inception の intent-bootstrap と workflow-composition はそれぞれ何をするステージか、詳しく説明してください。
intent-bootstrap で workflow.md、traceability.md、open-questions.md、inception/ ディレクトリを用意する理由。
workflow-composition で「実行する Skill」「省略する Skill」「条件付き Skill」を記録する意味（right-sizing）も教えてください。
小規模 Greenfield MVP で Reverse Engineering や Construction を省略する判断の例も示してください。
```

---

### 8. requirements-analysis と user-stories

- **優先度**: 高
- **なぜこのプロンプトを投げるか**: 本日 FR-1〜10、S-1〜8 を作成。要件とストーリーの違い・関係が実務の要所。
- **理解が重要な理由**: FR は「検証可能なシステム振る舞い」、S は「ユーザー価値と Given/When/Then」。この違いが分かると、要件定義の質が上がる。

**ChatGPT に投げる文面**:

```text
AI-DLC における requirements-analysis（FR/NFR）と user-stories（ペルソナ、S-*、Given/When/Then）の違いと関係を説明してください。
なぜ Product Hypothesis のあとに FR を作り、さらにストーリーに分解するのか。
FR-6「カテゴリ別支出を回答できる」と S-4「先月の食費を聞く」の対応関係を例に、上流から下流への落とし込みを示してください。
NFR（30秒以内応答、±10%精度など）が設計に与える影響も述べてください。
```

---

### 9. wireframes の位置づけ

- **優先度**: 高
- **なぜこのプロンプトを投げるか**: 本日 HTML ワイヤーフレーム4画面を作成。低忠実度 UI が application-design の前にある理由を理解したい。
- **理解が重要な理由**: ワイヤーフレームで Empty/Error/Loading 等の状態を先に共有すると、後の論理設計で「画面が要求するデータ」が明確になる（screen-data-map の意味）。

**ChatGPT に投げる文面**:

```text
AI-DLC で wireframes を application-design の前に置く理由を説明してください。
低忠実度 HTML ワイヤーフレームで画面遷移、入力、状態（Loading/Empty/Error/Success）を先に定義するメリット。
screen-structure.md、screen-data-map.md、wireframe-guidance.md がそれぞれ何を担うか。
家計 AI の例で、SCR-2（取り込み）と SCR-3（AI チャット）がストーリー S-1〜S-7 とどう対応するかも説明してください。
```

---

### 10. application-design（技術非依存の論理設計）

- **優先度**: 高
- **なぜこのプロンプトを投げるか**: 本日 `application-design.md` でコンポーネント・サービス・データモデルを定義。フレームワークを選ばない段階の意味が分かりにくい。
- **理解が重要な理由**: 「論理設計」と「実装技術選定」を分けることで、Inception 中に React/Next/LLM プロバイダに引きずられない。Construction-ready の設計書の正体がここ。

**ChatGPT に投げる文面**:

```text
AI-DLC の application-design が「技術非依存の論理設計」である理由を説明してください。
コンポーネント、サービス、データモデル、論理 API の役割と、wireframes のデータ需要をどう満たすか。
なぜ Inception 中にフレームワーク・DB・クラウドを選ばないのか。Construction フェーズとの役割分担も述べてください。
家計 AI の例で、取り込みモジュール・ローカルデータストア・AI ゲートウェイ・取引正規化エンジンの分担を図解してください。
```

---

### 11. units-generation と Construction-ready

- **優先度**: 高
- **なぜこのプロンプトを投げるか**: 本日は単一ユニット U-1 と判断。いつ分割するか／しないかの基準を理解したい。
- **理解が重要な理由**: Unit of Work は「Construction に渡す単位」。単一ユニットと判断した理由（D-15）が、実装・デプロイ・検証の粒度に直結する。

**ChatGPT に投げる文面**:

```text
AI-DLC の units-generation ステージでは何を判断するのか説明してください。
単一 Unit で十分な場合と複数 Unit に分割すべき場合の基準（独立したユーザー価値、デプロイ単位、ドメイン境界など）。
「Construction-ready」とは具体的にどの成果物が揃った状態を指すのか、チェックリスト形式で示してください。
家計 AI MVP を単一ユニット U-1 とした場合のメリット・将来分割するタイミングも述べてください。
```

---

### 12. Inception Exit と Construction の境界

- **優先度**: 高
- **なぜこのプロンプトを投げるか**: 本日は `stopped-before-construction` で終了。ここで止める意味が AI-DLC Lite Harness の設計の要。
- **理解が重要な理由**: Inception Exit を理解すると、「計画は完了したがコードはまだ書いていない」状態が正常であると腹落ちする。Construction 開始は別の明示的決断であることも重要。

**ChatGPT に投げる文面**:

```text
AI-DLC における Inception Exit とは何か、inception-exit-checklist で何を確認するのか説明してください。
なぜ Inception のあとにいきなり Construction（コード生成）に進まない設計が有効なのか。
「stopped-before-construction」状態で揃っているもの・まだ揃っていないものを整理してください。
Construction を開始する前に解消しておくべき Open Questions（技術選定、プライバシー方針など）の例も挙げてください。
```

---

### 13. 3層構成（.agents / .cursor / docs）

- **優先度**: 中
- **なぜこのプロンプトを投げるか**: 本日実践したリポジトリは Skill・Rule・成果物の3層。Harness としてどう連携するかを整理したい。
- **理解が重要な理由**: 「Agent に何をさせるか（Skill）」「いつ始めるか（Rule）」「何が残るか（docs）」の分離が、再現可能な AI-DLC 運用の鍵。

**ChatGPT に投げる文面**:

```text
軽量 AI-DLC Harness における .agents/skills（手順書）、.cursor/rules（入口ルール）、docs/aidlc（成果物・テンプレ・チェックリスト）の3層の役割を説明してください。
/ux-product-discovery-lite や /aidlc-inception-lite のような Skill 起動から、intent ディレクトリに成果物が蓄積されるまでの流れを説明してください。
AWS Labs AI-DLC v2 から何を簡略化し、何を残したかの観点も含めてください。
```

---

### 14. 成功指標の定量化（SM-1〜3）

- **優先度**: 中
- **なぜこのプロンプトを投げるか**: 本日 SM を「相談できる」から「5問中4問・30秒以内」等に更新。定性から定量への昇格の意味を深掘りしたい。
- **理解が重要な理由**: 成功指標が測定可能だと、NFR・受け入れテスト・MVP 検証の合格ラインが一貫する。

**ChatGPT に投げる文面**:

```text
Product Discovery で定義する Success Metrics を、定性から定量（SM-1: 5問中4問・30秒以内、SM-2: ±10%、SM-3: 10回中8回）にする意味を説明してください。
Success Metric が NFR や受け入れ基準にどう変換されるか、家計 AI の SM-2 を例に示してください。
指標が緩すぎる・厳しすぎる場合のリスクと、MVP 初回で「緩い指標」を許容する判断の是非も述べてください。
```

---

### 15. D-16 — Zaim エクスポートを最優先する意味

- **優先度**: 中
- **なぜこのプロンプトを投げるか**: Open Question Q-3 を Decision に落とした実例。right-sizing と実装順序の具体例として学べる。
- **理解が重要な理由**: 「両方対応」と「先にどちらを作るか」は別問題。MVP の学習速度に直結する判断。

**ChatGPT に投げる文面**:

```text
MVP で複数のデータソース（Zaim と Moneytree）に対応予定だが、エクスポート対応を Zaim 最優先とする判断の意味を説明してください。
Open Question から Decision（D-16）に昇格させるタイミングと、requirements・実装・検証への影響。
パーサー実装、テストデータ、SM-2 の検証を早く回す観点で、なぜ優先順位が重要か具体例で説明してください。
```

---

### 16. D-17 — Bプラン（質問 + 関連取引要約の一時送信）

- **優先度**: 中
- **なぜこのプロンプトを投げるか**: 「端末内のみ保存（D-7）」と「外部 AI API 利用」の関係は初心者が混乱しやすい。本日の重要な設計判断。
- **理解が重要な理由**: プライバシー設計と AI 精度のトレードオフを理解すると、application-design の AI ゲートウェイの責務が明確になる。

**ChatGPT に投げる文面**:

```text
家計データを「端末内（ブラウザローカル）のみ永続保存」しつつ、AI 応答時に「質問文 + 関連取引の要約」を外部 API に一時送信する Bプランについて説明してください。
永続保存と一時送信の違い、NFR-5 との整合、ユーザーへの説明責任。
Aプラン（質問のみ）・Cプラン（集計のみ）・Dプラン（完全ローカル）と比較し、Bプランを選ぶ典型的な理由を述べてください。
```

---

### 17. 家計 AI プロジェクトへの当てはめ（総合）

- **優先度**: 中
- **なぜこのプロンプトを投げるか**: 抽象論を本日の成果物に結びつけ、理解が「自分のプロジェクトの話」になるか確認するため。
- **理解が重要な理由**: テンプレートの理解と、自分の Intent への適用が一致すると、強い納得感が得られる。

**ChatGPT に投げる文面**:

```text
以下の家計 AI エージェント MVP について、AI-DLC の観点から総合解説してください。
■ 父が主利用者、Zaim 最優先、端末内保存、AI は Bプラン
■ 成果物: FR-1〜10、S-1〜8、SCR-1〜4、U-1、H-1→SM-2→FR-6→S-4→SCR-3→U-1 のトレーサビリティ
■ Inception Exit 済み、Construction 未着手
このプロジェクトで AI-DLC が特に効いた点3つと、Construction 前に残る Q-1・Q-2 の影響を説明してください。
```

---

### 18. 従来の開発プロセスとの比較

- **優先度**: 中
- **なぜこのプロンプトを投げるか**: AI-DLC の価値を、馴染みのあるウォーターフォール・アジャイルと対比すると定着しやすい。
- **理解が重要な理由**: 「なぜわざわざ AI-DLC するのか」への自分なりの答えが持てる。チーム説明にも使える。

**ChatGPT に投げる文面**:

```text
従来のウォーターフォールやアジャイルと、AI-DLC（Product Discovery → Inception → Construction）を比較してください。
要件定義・設計・実装のタイミング、ドキュメントの粒度、AI Agent の関与、承認ゲートの違いを表にまとめてください。
小規模 Greenfield MVP 1人〜少人数で、AI-DLC が特に有利な場面と、過剰になりうる場面も述べてください。
```

---

## 学習後のセルフチェック（自分用）

ChatGPT の解説を読んだあと、次を自分の言葉で答えられるか確認する。

- [ ] AI-DLC の3フェーズを一言ずつ説明できる
- [ ] なぜ Product Hypothesis の承認前に Inception に進まないか説明できる
- [ ] H-1 から SCR-3 までのつながりを1本の線で説明できる
- [ ] FR と User Story の違いを説明できる
- [ ] wireframes を設計の前に置く理由を説明できる
- [ ] Construction-ready と Construction 開始の違いを説明できる
- [ ] D-7（ローカル保存）と D-17（Bプラン一時送信）の関係を説明できる

---

## 関連ファイル

- `WORK-LOG-2026-06-07.md` — 本日の作業ログ・プロンプト対応表
- `docs/aidlc/UPSTREAM.md` — AWS Labs AI-DLC v2 との関係
- `docs/aidlc/CONSTRUCTION-CANDIDATES.md` — Construction 以降の候補
