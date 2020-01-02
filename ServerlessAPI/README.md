Chase Serverless API
====================

- https://github.com/serverless/examples


### AWS Credentials

- https://github.com/serverless/serverless/blob/master/docs/providers/aws/guide/credentials.md

```bash
$ aws configure list
```

### Run on Docker

```bash
$ docker pull node:6.10

$ docker run -it --rm -v (pwd):/app node:6.10 bash
root@b679c821674a:/# node -v
v6.10.2

root@b679c821674a:/# cd /app

root@b679c821674a:/# node try-libra.js
```

### Test

```bash
serverless invoke --function info --log --data='{ "url": "https://wix.github.io/react-native-navigation/#/screen-api?id=poptorootparams-" }'
```

```bash
serverless invoke --function info --log --data='{ "url": "https://syon.github.io/refills/rid/1495884/" }'
```

```bash
serverless invoke --function thumb --log --data='{ "url": "http://qiita.com/clockmaker/items/2a6ba69ef6e452844adf", "pocket_id": "1698793461", "suggested": "https://qiita-image-store.s3.amazonaws.com/0/2544/8ecf3c51-3ee4-3d81-3666-8f421b2ea12a.jpeg"}'
```

```bash
serverless invoke --function thumb --log --data='{ "url": "http://qiita.com/szk3/items/298dfc8bb86ba802617f", "pocket_id": "1184649995", "suggested": "https://cdn.qiita.com/emoji/twemoji/unicode/1f617.png"}'
```

```bash
serverless invoke --function thumb --log --data='{ "url": "https://syon.github.io/refills/rid/1495884/", "pocket_id": "1761611352", "suggested": "undefined"}'
```

```bash
curl "https://uysa8o7cq6.execute-api.us-east-1.amazonaws.com/prod/thumb?url=http://yutoma233.hatenablog.com/entry/2017/04/28/073000&pocket_id=1719054137"
```


## API Gateway

以下のメモは Serverless Framework を使用しない場合を含むメモ。

- [API Gateway＋Lambdaでのステージ管理やCloudWatch Logsのログ運用のはなし – サーバーワークスエンジニアブログ](http://blog.serverworks.co.jp/tech/2017/02/01/apigateway-lambda-cloudwatchlogs/)
- リソースはとある時間の断面、ではない
- リソースの作成は REST 的な意味であり、パスを切るのと同義
- ステージに対するデプロイは断面のアップロードではない
- ステージはただ場所が違うだけ、それゆえエンドポイント末尾に付加される
- リソースの状況を変えると動作中すべてのステージに影響を与える
- ステージ変数を使って呼び出す Lambda を振り分けることができる
- ステージ変数はメニューの「ステージ」から設定
- ARNに従い"関数名:エイリアス"で呼び出す関数のバージョン指定ができる
- 統合リクエストの設定から `chase-${stageVariables.stage}-info:${stageVariables.alias}` のように指定
- これを設定するときダイアログが出現し手動でコマンド実行する必要がある
- ダイアログ内のコマンドをすべてコピーし、`${stageVariables.〜〜}`を実際に使用するものに書き換えて bash で実行
- CORSの有効化は GET などのメソッドを作ってから実施する必要がある？プリフライトの OPTIONS メソッドのレスポンスヘッダーに関連の設定がされていても GET のそれに設定されていなければ Ajax で失敗する。
- 統合リクエストの LAMBDA_PROXY とはツールチップに表示の通り: “リクエストは Lambda にプロキシされ、リクエストの詳細がハンドラー関数の「イベント」で利用できるようになります。” → Lambda 関数の `event` 引数が通常の仕様と異なる。リクエスト送信時の本文は `event.body` から取得できるように変わる。


## Serverless Framework

Serverless Framework を使ってデプロイすると Lambda と API Gateway の両方に反映される。

- `$ sls deploy` コマンドでエラー `Invalid Resource identifier specified.`
  が発生して困った時は `$ sls remove` でリセットした。ブラウザから API Gateway 上の API を削除したため、ローカルにあるものが取り残された。
- 開発中の関数のローカル実行 :: [Serverless Framework Commands \- AWS Lambda \- Invoke Local](https://serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/)
- 本フレームワークはデフォルトで LAMBDA-PROXY を介して実行されることが前提となるため `event` オブジェクトに対するパラメータの参照方法が通常と異なる。
- ローカル実行時のパラメータ引き渡しは `--path` オプションを使用する。
- > Lambda only allows you to write to the /tmp directory.

```bash
$ serverless invoke local --function function_name --path testdata.json
```

__testdata.json__
```json
{
  "queryStringParameters": {
    "greet": "Hello"
  }
}
```

```bash
$ serverless deploy --verbose
```

#### prod

Edit `serverless.yml` > `stage: prod` temporary, then `serverless deploy`.


## Memo

- API Gateway: Chase for iOS (uysa8o7cq6) は手作業で作られた
- Serverless Framework は使っていなかった
- 連携している Lambda は`chase-${stageVariables.stage}-thumb:${stageVariables.alias}`
- Lambda のエイリアス `:release` を参照している
- これらを Chase for iOS が使っている
- 2020年1月に Node.js v6 を EoL に伴いメンテして v12 に移行
- Serverless Framework は使った
- API Gateway: prod-chase (4qjumflqu3) は不使用、Lambda だけ使っている
