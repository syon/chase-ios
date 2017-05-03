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
serverless invoke --function thumb --log --data='{ "url": "http://yutoma233.hatenablog.com/entry/2017/04/28/073000", "pocket_id": "1719054137"}'
```

```bash
curl "https://uysa8o7cq6.execute-api.us-east-1.amazonaws.com/prod/thumb?url=http://yutoma233.hatenablog.com/entry/2017/04/28/073000&pocket_id=1719054137"
```
