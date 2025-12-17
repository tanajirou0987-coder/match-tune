/**
 * 54問の質問データを生成するスクリプト
 * 各軸18問ずつ、合計54問の異なる質問を生成
 */

import { writeFileSync, readFileSync } from "fs";
import { join } from "path";

// 18問の質問データを読み込む
const questions18 = JSON.parse(
  readFileSync(
    join(process.cwd(), "data/diagnoses/compatibility-18/questions.json"),
    "utf-8"
  )
);

// 54問の質問データを生成
interface Option {
  label: string;
  score: number;
}

interface Question {
  id: number;
  text: string;
  axis: string;
  options: Option[];
}

const questions54: Question[] = [];

// 各軸ごとに18問ずつ生成（54問全て異なる質問）
const axes = ["communication", "decision", "relationship"] as const;
let questionId = 1;

// 各軸ごとに18問の異なる質問を生成
for (const axis of axes) {
  const axisQuestions = questions18.filter((q: Question) => q.axis === axis);
  
  // 各軸の6問をベースに、バリエーションを追加して18問にする
  // まず6問をそのまま追加
  for (const question of axisQuestions) {
    questions54.push({
      id: questionId++,
      axis: axis,
      text: question.text,
      options: question.options,
    });
  }
  
  // 残り12問を生成（各軸ごとに異なる質問内容）
  const additionalQuestions = generateAdditionalQuestions(axis, axisQuestions.length);
  for (const question of additionalQuestions) {
    questions54.push({
      id: questionId++,
      axis: axis,
      text: question.text,
      options: question.options,
    });
  }
}

/**
 * 各軸ごとに追加の質問を生成
 */
function generateAdditionalQuestions(axis: string, baseCount: number): Question[] {
  const baseOptions = [
    { label: "強く当てはまる", score: 2 },
    { label: "やや当てはまる", score: 1 },
    { label: "どちらでもない", score: 0 },
    { label: "あまり当てはまらない", score: -1 },
    { label: "全く当てはまらない", score: -2 }
  ];

  const additionalQuestions: Question[] = [];
  
  if (axis === "communication") {
    // コミュニケーション軸の追加質問（12問）
    additionalQuestions.push(
      { id: 0, axis, text: "パーティーやイベントで、あなたは多くの人と話しますか？", options: baseOptions },
      { id: 0, axis, text: "メールやLINEの返信は、あなたはすぐに返しますか？", options: baseOptions },
      { id: 0, axis, text: "会議やディスカッションで、あなたは積極的に発言しますか？", options: baseOptions },
      { id: 0, axis, text: "相手の話を聞くとき、あなたは途中で割り込んで質問しますか？", options: baseOptions },
      { id: 0, axis, text: "初めて会う人との会話で、あなたは自分から話題を提供しますか？", options: baseOptions },
      { id: 0, axis, text: "グループチャットで、あなたは頻繁にメッセージを送りますか？", options: baseOptions },
      { id: 0, axis, text: "相手の気持ちを聞くとき、あなたは直接的に質問しますか？", options: baseOptions },
      { id: 0, axis, text: "会話が途切れたとき、あなたは自分から話題を変えますか？", options: baseOptions },
      { id: 0, axis, text: "相手の話に共感するとき、あなたは言葉で明確に伝えますか？", options: baseOptions },
      { id: 0, axis, text: "意見を求められたとき、あなたは即座に答えますか？", options: baseOptions },
      { id: 0, axis, text: "会話の主導権を、あなたは自分が握りますか？", options: baseOptions },
      { id: 0, axis, text: "相手の話を聞くとき、あなたは積極的にリアクションをしますか？", options: baseOptions }
    );
  } else if (axis === "decision") {
    // 意思決定軸の追加質問（12問）
    additionalQuestions.push(
      { id: 0, axis, text: "レストランでメニューを選ぶとき、あなたは時間をかけて選びますか？", options: baseOptions },
      { id: 0, axis, text: "重要な選択をするとき、あなたは他人の意見を聞きますか？", options: baseOptions },
      { id: 0, axis, text: "予定が変更になったとき、あなたはすぐに新しい計画を立てますか？", options: baseOptions },
      { id: 0, axis, text: "複数の選択肢があるとき、あなたはリストを作って比較しますか？", options: baseOptions },
      { id: 0, axis, text: "直感と論理が対立したとき、あなたは論理を優先しますか？", options: baseOptions },
      { id: 0, axis, text: "決断に迷ったとき、あなたは過去の経験を参考にしますか？", options: baseOptions },
      { id: 0, axis, text: "時間に余裕があるとき、あなたはじっくり考えてから決めますか？", options: baseOptions },
      { id: 0, axis, text: "選択肢を選ぶとき、あなたはメリット・デメリットを書き出しますか？", options: baseOptions },
      { id: 0, axis, text: "重要な決断をするとき、あなたは情報を集めてから判断しますか？", options: baseOptions },
      { id: 0, axis, text: "迷ったとき、あなたは他人に相談してから決めますか？", options: baseOptions },
      { id: 0, axis, text: "決断を下すとき、あなたは感情よりも理性を優先しますか？", options: baseOptions },
      { id: 0, axis, text: "計画を変更するとき、あなたは新しい計画を詳細に立てますか？", options: baseOptions }
    );
  } else if (axis === "relationship") {
    // 関係性軸の追加質問（12問）
    additionalQuestions.push(
      { id: 0, axis, text: "相手との約束を、あなたは自分から提案しますか？", options: baseOptions },
      { id: 0, axis, text: "関係が深まるにつれて、あなたは積極的に距離を縮めますか？", options: baseOptions },
      { id: 0, axis, text: "相手の誕生日や記念日を、あなたは自分から祝いますか？", options: baseOptions },
      { id: 0, axis, text: "関係で問題が起きたとき、あなたは自分から解決しようとしますか？", options: baseOptions },
      { id: 0, axis, text: "相手との時間を、あなたは自分から作りますか？", options: baseOptions },
      { id: 0, axis, text: "関係を深めるために、あなたは自分から話題を提供しますか？", options: baseOptions },
      { id: 0, axis, text: "相手の好みを、あなたは積極的に覚えようとしますか？", options: baseOptions },
      { id: 0, axis, text: "関係で主導権を、あなたは自分が握りますか？", options: baseOptions },
      { id: 0, axis, text: "相手とのコミュニケーションを、あなたは自分から増やしますか？", options: baseOptions },
      { id: 0, axis, text: "関係を維持するために、あなたは積極的に努力しますか？", options: baseOptions },
      { id: 0, axis, text: "相手との距離感を、あなたは自分から調整しますか？", options: baseOptions },
      { id: 0, axis, text: "関係でリードすることを、あなたは好みますか？", options: baseOptions }
    );
  }
  
  return additionalQuestions;
}

// ファイルに保存
const outputPath = join(
  process.cwd(),
  "data/diagnoses/compatibility-54/questions.json"
);
writeFileSync(outputPath, JSON.stringify(questions54, null, 2), "utf-8");

console.log(`✅ 54問の質問データを生成しました: ${outputPath}`);
console.log(`   総質問数: ${questions54.length}`);
console.log(`   各軸の質問数: ${questions54.filter((q) => q.axis === "communication").length}問`);
console.log(`   重複チェック: ${new Set(questions54.map(q => q.text)).size === questions54.length ? "✅ 重複なし" : "⚠️ 重複あり"}`);
