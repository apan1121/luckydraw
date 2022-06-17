# 設定取得決定位置
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do
    DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null && pwd )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
done
export ABS_DIR="$( cd -P "$( dirname "$SOURCE" )/../" >/dev/null && pwd )"

# 歡迎使用 LavueAdmin Dev deploy 程序
echo "歡迎使用客製化 Webpack 程序"

echo "STEP 1: 執行 public 資料夾打包程序"
bash $ABS_DIR"/deploy/build_webpack.sh" prod "--user="$(who am i | awk '{print $1}')""

echo "STEP 2: 移除 public gitignore 限制"
bash $ABS_DIR"/deploy/build_gitIgnore.sh" prod
