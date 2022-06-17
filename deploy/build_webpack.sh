MODE_TYPE=$1

if [ "$MODE_TYPE" != "prod" ]; then
    MODE_TYPE="dev"
fi

echo "webpack 執行程序"
echo "執行模式為 $MODE_TYPE"

echo "移除 public 資料夾"
    PUBLIC_PATH="$ABS_DIR/dist/js"
    rm -rf $PUBLIC_PATH
    echo "移除 public 資料夾 >> js 已刪除"
    PUBLIC_PATH="$ABS_DIR/dist/css"
    rm -rf $PUBLIC_PATH
    echo "移除 public 資料夾 >> css 已刪除"
    PUBLIC_PATH="$ABS_DIR/dist/img"
    rm -rf $PUBLIC_PATH
    echo "移除 public 資料夾 >> img 已刪除"
echo "移除 public 資料夾移除完成"


echo "執行 npm webpack bundle 把包程序"
cd $ABS_DIR
npm run build:$MODE_TYPE
echo "執行 npm webpack bundle 把包程序 完成"
