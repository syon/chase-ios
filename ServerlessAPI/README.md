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

## Deploy

#### Note

- http://blog.serverworks.co.jp/tech/2017/02/01/apigateway-lambda-cloudwatchlogs/

- API Gateway
  - リソースはとある時間の断面、ではない
  - リソースの作成は REST 的な意味であり、パスを切るのと同義
  - よくわからないが POST で作ってもうまく呼べなかったので全部 GET にした
  - ステージに対するデプロイは断面のアップロードではない
  - ステージはただ場所が違うだけ、それゆえエンドポイント末尾に付加される
  - リソースの状況を変えると動作中すべてのステージに影響を与える
  - ステージ変数を使って呼び出す Lambda を振り分けることができる
  - ステージ変数はメニューの「ステージ」から設定
  - ARNに従い"関数名:エイリアス"で呼び出す関数のバージョン指定ができる
  - 統合リクエストの設定から `chase-${stageVariables.stage}-info:${stageVariables.alias}` のように指定
  - これを設定するときダイアログが出現し手動でコマンド実行する必要がある
  - ダイアログ内のコマンドをすべてコピーし、`${stageVariables.〜〜}`を実際に使用するものに書き換えて bash で実行


#### dev

- [Serverless Framework Commands \- AWS Lambda \- Invoke Local](https://serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/)

```bash
$ serverless invoke local --function functionName
```

```bash
$ serverless deploy
```

#### prod

Edit `serverless.yml` > `stage: prod` temporary, then `serverless deploy`.
