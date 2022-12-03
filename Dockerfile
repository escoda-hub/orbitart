FROM node:19.2
FROM centos:centos8

# アプリケーションディレクトリを作成する
WORKDIR /usr/src/app

# アプリケーションの依存関係をインストールする
# ワイルドカードを使用して、package.json と package-lock.json の両方が確実にコピーされるようにします。
# 可能であれば (npm@5+)
COPY package*.json ./

# RUN npm install
RUN npm install 
# --production
# 本番用にコードを作成している場合
# RUN npm install --only=production

# アプリケーションのソースをバンドルする
# COPY . .
COPY . .

EXPOSE 8080
CMD ["npm","server.js"]