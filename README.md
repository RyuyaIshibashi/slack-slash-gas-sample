## 説明
これは以下のQiita記事のソースコードです。
[]()


## 操作方法
docker上でbash起動
```sh
docker compose build
docker compose run gas bash
```

bash上の操作
```bash
npm install

# ログイン
bash ./docker/login.sh

# pull & push
clasp pull
clasp push
```
