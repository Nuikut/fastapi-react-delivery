```shell
openssl genrsa --out private.pem 2048
```

```shell
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```