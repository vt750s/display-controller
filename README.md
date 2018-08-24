# display-controller

## 概要

リモートからHTTP/HTTPSでディスプレイの電源をOF/OFFするためのNodeアプリケーションです。

## 動作環境

### OS

* Windows（8.1にて動作確認済み）

### 必須ソフトウェア

* Excel（2010にて動作確認済み）

## 使用方法

### アプリケーション起動

```
$ npm start
```

### クライアントからの呼び出し

* 電源ON
```
$ curl -X POST -H 'pincode:sample-pincode' -H 'mode:on' localhost:3000/api/display/power
```

* 電源OFF
```
$ curl -X POST -H 'pincode:sample-pincode' -H 'mode:off' localhost:3000/api/display/power
```
## カスタマイズ方法

以下、いずれもアプリケーションの再起動が必要。

### PINコードの変更

config.jsonのpincodeを変更する。

### HTTPSの有効化

server_crt.pemおよびserver_key.pemを配置する。
