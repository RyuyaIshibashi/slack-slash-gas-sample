## 説明
これは以下のQiita記事のソースコードです。
- [SlackのSlashコマンドでSpreadsheetのGASを実行する方法](https://qiita.com/rubita/items/c58ba926d669ff51c88c)


## 操作方法
docker上でbash起動
```sh
docker compose build
docker compose run gas bash
```

bash上の操作
```bash
# ログイン
bash ./docker/login.sh

# pull & push
clasp pull
clasp push
```
