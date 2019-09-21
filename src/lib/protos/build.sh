
# So weird - ts-protoc-gen & grpc_tools_node_protoc_ts output same bin
TS_PROTOC=../../../../../node_modules/ts-protoc-gen/bin/protoc-gen-ts

INPUT=*.proto
OUT=generated

mkdir -p $OUT
rm -rf $OUT/*.js $OUT/*.ts

protoc -I=. $INPUT \
  --plugin=protoc-gen-ts=${TS_PROTOC} \
  --js_out=import_style=commonjs,binary:$OUT \
  --ts_out=service=true:${OUT} \